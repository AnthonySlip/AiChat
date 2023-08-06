import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import './messanger.scss';
import {useUserStore} from "../../store/user.js";
import Verification from "../Verification/Verification.jsx";
import messagesService from "../../services/messages.js";
import {useMessageStore} from "../../store/message.js";
import {useForm} from "react-hook-form";
import openaiService from "../../services/openai.js";
import {ReactComponent as CopySVG} from "../../assets/svg/copy.svg";
import Generating from "../Generating/Generating.jsx";
import {useLoadingStore} from "../../store/loading.js";
import {useNavigate} from "react-router-dom";
import ErrorApi from "../ErrorApi/ErrorApi.jsx";


const Messenger = () => {

    const currentChat = useMessageStore(state => state.currentChat)
    const isLoading = useLoadingStore(state => state.isLoading)
    const userData = useUserStore(state => state.userData)
    const userId = userData?.id || 0
    const isVerify = userData?.isVerify || false

    const [isErrorApi, setIsErrorApi] = useState(null)
    const [messages, setMessages] = useState([])
    const [isCopied, setIsCopied] = useState(false)
    const [currentCopied, setCurrentCopied] = useState(null)
    const [isSending, setIsSending] = useState(false)
    const listRef = useRef(null)

    useEffect(() => {
        setMessages([])
        if (!isLoading) messagesService.getHistory(userId, currentChat)
            .then(res => {
                res?.data?.forEach(item => {
                    setMessages(prev => [...prev, {
                        text: item.text,
                        role: item.role
                    }])
                })
            })
            .catch(err => {
                console.error(err)
                setIsErrorApi(err)
            })
    },[currentChat, userData])

    const {
        register,
        formState: {errors},
        handleSubmit,
        reset
    } = useForm()

    const sendForm = async (data) => {
        setIsSending(true)
        const text = data.text
        const message = data.text
        const chatId = currentChat

        messagesService.sendToDB('user', text, userId, chatId)
            .then(() => {
                reset()
                setMessages(prev => [...prev, {
                    role: 'user',
                    text: text
                }])
                openaiService.generate(message, userId, chatId)
                    .then(res => {
                        setMessages(prev => [...prev, {
                            role: 'assistant',
                            text: res.data
                        }])
                        setIsSending(false)
                    })
                    .catch(err => console.error(err))
            })
            .catch(err => console.error(err))
    }

    const clipboard = async (index, text) => {
        setIsCopied(true)
        setCurrentCopied(index)
        setTimeout(() => {
            setIsCopied(false)
            setCurrentCopied(null)
        }, 1500)
        await navigator.clipboard.writeText(text)
    }

    useLayoutEffect(() => {
        if (!isLoading) listRef?.current?.scrollTo(0, 99999999999999999)
    },[messages, isLoading])

    if (isErrorApi) return <ErrorApi error={isErrorApi}/>

    return isVerify? (
        <main className="messenger">
            <div className="messenger__body">
                <div className="messenger__messages" >
                    <ul ref={listRef} className="messenger__list">
                        {messages.map((item, index) =>
                            <li key={index+1} className={"messenger__message"+' '+item?.role}>
                                <p className={"messenger__message-text"}>{item?.text}</p>
                                <button disabled={isCopied} key={index} className={"messenger__copy"+' '+item?.role}
                                onClick={() => clipboard(index, item.text)}>
                                    <CopySVG className={"messenger__copy-svg"}/>
                                    <h6 className={"messenger__copy-title"}>{isCopied && currentCopied===index? 'Copied' : 'Copy'}</h6>
                                </button>
                            </li>)}
                    </ul>
                </div>
                {isSending && <Generating/>}
                <form className="messenger__form" onSubmit={handleSubmit(sendForm)}>
                    <input {...register('text', {
                        required: 'The message is empty!',
                        maxLength: {value: 1800, message: 'The message is too long'}
                    })} type="text" className="messenger__typing" placeholder={errors.text? errors.text?.message:'Message'}
                    disabled={isSending}/>
                    <button className="messenger__send" disabled={isSending}>Send</button>
                </form>
            </div>
        </main>
    ):(
        <Verification/>
    )
}

export default Messenger;