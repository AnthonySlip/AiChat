import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import {ReactComponent as Person} from "../../assets/svg/person.svg";
import {ReactComponent as Mail} from "../../assets/svg/mail.svg";
import {ReactComponent as Lock} from "../../assets/svg/lock.svg";
import {ReactComponent as Arrow} from "../../assets/svg/arrow.svg";
import {ReactComponent as HideSVG} from "../../assets/svg/hide.svg";
import {ReactComponent as ShowSVG} from "../../assets/svg/show.svg";
import './auth.scss';
import authService from "../../services/auth.js";
import {useUserStore} from "../../store/user.js";
import {useLoadingStore} from "../../store/loading.js";

const Auth = (props) => {

    const setStateLoading = useLoadingStore(state => state.setLoadingState)
    const setAuthState = useUserStore((state) => state.setAuthState)
    const setUserData = useUserStore(state => state.setUserData)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()

    const [mode, setMode] = useState('Sign in')
    const [isInvalid, setIsInvalid] = useState(false)
    const [existUser, setExistUser] = useState(false)
    const [email, setEmail] = useState('')
    const [isPassword, setIsPassword] = useState(true)

    const authState = async (email) => {
        authService.user(email)
            .then(res => {
                const {_id, name, email, isVerify} = res.data
                setUserData(_id, name, email, isVerify)
                setStateLoading(false)
            })
            .catch(err => console.log(err))
    }

    const sendForm = async (data) => {
        const {name, email, password} = data
        setEmail(email)
        setIsInvalid(false)
        setExistUser(false)

        if (mode==='Sign in') {
            authService.signIn(name, email, password)
                .then(res => {
                    if (res.data.status === 400 && res.data.message==='already exist') {
                        setExistUser(true)
                    } else {
                        localStorage.setItem('token', res.data.accessToken)
                        if (res.data.accessToken) {
                            setAuthState(true)
                            authState(email)
                                .then(() => setStateLoading(false))
                        }
                        reset()
                    }
                })
                .catch(err => console.error(err))
        }
        // HERE! - Нет обработка ошибки для неверного логина - HERE!
        if (mode==='Log in') {
            authService.logIn(email, password)
                .then(res => {
                    setStateLoading(false)
                    if (res.data.status===400 && res.data.message==="invalid login/password") {
                        setIsInvalid(true)
                    } else {
                        localStorage.setItem('token', res?.data?.accessToken)
                        if (res?.data?.accessToken) {
                            setAuthState(true)
                            authState(email)
                        }
                    }
                })
                .catch(err => console.error(err))
        }
    }

    const inputsOptions = {
        name: {
            required: 'Name is required',
            minLength: {value: 2, message: 'It is too short'}
        },
        email: {
            required: 'Email is required',
            pattern: {value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'It is not an email address'}
        },
        password: {
            required: 'Password is required',
            pattern: {value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, message: 'It should contain at least one digit, lower case, upper case and 8 from the mentioned characters'}
        }
    }


    return (
        <main className={"auth"+' '+mode.replace(' ', '')}>
            <div className="auth__body">
                <span className={"auth__change"+' '+mode.replace(' ', '')} onClick={() => mode==='Sign in'? setMode('Log in'):setMode('Sign in')}>
                    <Arrow className={"auth__change-svg"+' '+mode.replace(' ', '')}/>
                    <h4 className="auth__change-title">{mode==='Sign in'? 'Log in':'Sign in'}</h4>
                </span>
                <h3 className="auth__title">{mode}</h3>
                <form className="auth__form" onSubmit={handleSubmit(sendForm)}>
                    {mode==='Sign in' && <div className="auth__input">
                        <input type="text" {...register('name', inputsOptions.name)} placeholder={'Name'}/>
                        {errors?.name && <span className="auth__error">{errors?.name?.message}</span>}
                        <Person className="auth__input-svg"/>
                    </div>}
                    <div className="auth__input">
                        <input type="text"  {...register('email', inputsOptions.email)} placeholder={'Email'}/>
                        {errors?.email && <span className="auth__error">{errors?.email?.message}</span>}
                        <Mail className="auth__input-svg"/>
                    </div>
                    <div className="auth__input">
                        <input type={isPassword? "password" : "text"} {...register('password', inputsOptions.password)} placeholder={'Password'}/>
                        {errors?.password && <span className="auth__error">{errors?.password?.message}</span>}
                        <Lock className="auth__input-svg"/>
                        <span onClick={() => setIsPassword(!isPassword)}>{isPassword? <HideSVG className="auth__input-svg" style={{left: '90%'}}/> : <ShowSVG className="auth__input-svg" style={{left: '90%'}}/>}</span>
                    </div>
                    {isInvalid && <span className="auth__error">Invalid login/password</span>}
                    {existUser && <span className="auth__error">{email} already exist</span>}
                    <button type="submit" className="auth__submit">
                        {mode!=='Sign in'? 'Log in':'Sign in'}
                    </button>
                </form>
            </div>
        </main>
    )
}

export default React.memo(Auth);