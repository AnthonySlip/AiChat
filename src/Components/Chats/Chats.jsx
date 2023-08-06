import React, {useEffect, useState} from 'react';
import './chats.scss';
import { ReactComponent as Pencil } from '../../assets/svg/pencil.svg';
import { ReactComponent as Trash } from '../../assets/svg/trash.svg';
import SignOut from "../SignOut/SignOut.jsx";
import {useMessageStore} from "../../store/message.js";
import messagesService from "../../services/messages.js";
import {useUserStore} from "../../store/user.js";
import {useForm} from "react-hook-form";
import {useLoadingStore} from "../../store/loading.js";
import openaiService from "../../services/openai.js";
import Loading from "../Loading/Loading.jsx";
import Nav from "../Navigation/Nav.jsx";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {mainRoute} from "../../../utils/parth.js";
const Chats = (props) => {

    const isMobile = window.innerWidth<910? true : false
    const userData = useUserStore(state => state.userData)
    const setCurrentChat = useMessageStore(state => state.setCurrentChat)
    const id = userData?.id
    const currentChat = useMessageStore(state => state.currentChat)
    const isAuth = useUserStore(state => state.isAuth)
    const isLoading = useLoadingStore(state => state.isLoading)

    const [chats, setChats] = useState([])
    const [isRename, setIsRename] = useState(false)
    const [renameId, setRenameId] = useState(null)
    const [randomImg, setRandomImg] = useState(sessionStorage.getItem('randomImgUrl'))
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        setChats([])
        if(isAuth && !isLoading) messagesService.getChats(id)
            .then(res => {
                res?.data?.forEach(item => setChats(prev => [...prev, item.title]))
            })
    },[userData])
    const createNewChat = () => {
        setChats(prev => [...prev, 'New Chat'])
        setCurrentChat(currentChat+1)
        if(isMobile) props.toClose()
    }
    const deleteChat = (chatId) => {
        messagesService.deleteChat(id, chatId)
            .then((res) => {
                setChats(prev => [...prev.filter((item, index) => {
                    if (chatId!==index) return item
                })])
                if(isMobile) props.toClose()
            })
    }
    const renameChat = (id) => {
        setRenameId(id)
        setIsRename(!isRename)
    }

    const {
        register,
        handleSubmit
    } = useForm()

    const sendForm = async (data) => {
        if (data.rename) {
            messagesService.renameChat(id, currentChat, data.rename)
                .then(res => {
                    setChats(prev => [...prev.map((item, index) => {
                        if (currentChat===index) return data.rename
                        return item
                    })])
                    setRenameId(null)
                    setIsRename(false)
                })
        } else {
            setRenameId(null)
            setIsRename(false)
        }
    }

    useEffect(() => {
        if (!isAuth && !randomImg) openaiService.generateImage()
            .then(res => {
                setRandomImg(res?.data)
                sessionStorage.setItem('randomImgUrl', res?.data)
            })
            .catch(err => console.error(err))
    },[])
    const clearChats = () => setChats([])

    return isAuth?(
        <aside className="chat__chats" onClick={() => {
            setIsRename(false)
            setRenameId(null)
        }}>
            <div className="chats__body">
                <button className="chats__createNewChat btnNoColor" onClick={createNewChat}>
                    + create new chat
                </button>
                <ul className="chats__list">
                {
                    chats.map((item, index) =>
                        <li key={index} className={index===currentChat? 'chats__item currentChatItem':'chats__item'} onClick={() => {
                            if (location.pathname[location.pathname.length-1]!=='/') navigate(mainRoute)
                            setCurrentChat(index)
                            if(isMobile) props.toClose()
                        }}>
                            {isRename && renameId===index?
                                <form onSubmit={handleSubmit(sendForm)}><input {...register('rename')} type="text" className="chats__rename-input" placeholder={item} onClick={e => e.stopPropagation()}/></form>
                                :
                                <h4 className="chats__item-title">
                                    {item}
                                </h4>}
                            <span>
                                <Pencil className="chats__item-svg" onClick={(e) => {
                                    e.stopPropagation()
                                    renameChat(index)
                                }}/>
                                <Trash className="chats__item-svg" onClick={(e) => {
                                    e.stopPropagation()
                                    deleteChat(index)
                                }}/>
                            </span>
                        </li>)
                }
                </ul>
                <Nav/>
                {isAuth && <SignOut clearChats={clearChats}/>}
            </div>
        </aside>
    ) : (
        <aside className="chat__chats" >
            <div className="chats__body">
                <a href="https://chat.openai.com/" target='_blank'><h3 className="chats__unauthorized-title">Chat GPT</h3></a>
                <a href="https://openai.com/dall-e-2" target='_blank'>
                    <div className="chats__unauthorized-random">
                    {randomImg? <img src={randomImg.toString()} alt="random-img" className="chats__random-img"/> : <Loading/>}
                    {randomImg && <p className="chats__random-p">This image was generated by OpenAi DALL·E</p>}
                    </div>
                </a>
                <Nav/>
            </div>
        </aside>
    )
}

export default React.memo(Chats);