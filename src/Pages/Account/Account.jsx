import React, {useState} from 'react';
import './account.scss';
import Burger from "../../Components/Burger/Burger.jsx";
import Chats from "../../Components/Chats/Chats.jsx";
import {useForm} from "react-hook-form";
import {ReactComponent as NameSVG} from "../../assets/svg/person.svg";
import {ReactComponent as EmailSVG} from "../../assets/svg/mail.svg";
import {ReactComponent as PasswordSVG} from "../../assets/svg/lock.svg";
import {useUserStore} from "../../store/user.js";
import authService from "../../services/auth.js";
import {Navigate, useRouteError} from "react-router-dom";


const Account = (props) => {

    const isMobile = window.innerWidth<910? true : false
    const isAuth = useUserStore(state => state.isAuth)
    const {id, name, email, isVerify} = useUserStore(state => state.userData)
    const setUserData = useUserStore(state => state.setUserData)

    const [wrongOldPassword, setWrongOldPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm()

    const inputOptions = {
        name: {
            ...register('newName', {
            })
        },
        email: {
            ...register('newEmail', {
                pattern: {value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'It is not an email address'}
            })
        },
        passwordOld: {
            ...register('oldPassword', {
            })
        },
        passwordNew: {
            ...register('newPassword', {
                pattern: {value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, message: 'It should contain at least one digit, lower case, upper case and 8 from the mentioned characters'}
            })
        }
    }

    const sendForm = async (data) => {
        const {newName, newEmail, oldPassword, newPassword} = data
        if (newName && newName!==name) authService.updateName(newName, id)
            .then(res => {
                setUserData(id, newName, email, isVerify)
                reset()
            })
            .catch(err => {
                reset()
                console.error(err)
            })

        if (newEmail && newEmail!==email) authService.updateEmail(newEmail, id)
            .then(res => {
                setUserData(id, name, newEmail, isVerify)
            })
            .catch(err => {
                reset()
                console.error(err)
            })
        if (newPassword && oldPassword && newPassword!==oldPassword) authService.updatePassword(oldPassword, newPassword, id)
            .then(res => {
                if (res.data.status===400 && res.data.message==="Invalid old password") {
                    setWrongOldPassword(true)
                } else {
                    setWrongOldPassword(false)
                    reset()
                }
            })
            .catch(err => {
                reset()
                console.error(err)
            })
    }




    return isAuth? (
        <main className="account">
            {isMobile? <Burger/> : <Chats/>}
            <section className="account__body">
                <h3 className="account__title">change your data, {name}</h3>
                <form className="account__form" onSubmit={handleSubmit(sendForm)}>
                    <div className="account__input">
                        <input {...inputOptions.name} type="text" className="account__input-input" placeholder='New Name'/>
                        <NameSVG className="account__input-svg"/>
                        {errors?.newName && <span className="account__input-error">{errors?.newName?.message}</span>}
                    </div>
                    <div className="account__input">
                        <input {...inputOptions.email} type="text" className="account__input-input" placeholder='New Email'/>
                        <EmailSVG className="account__input-svg"/>
                        {errors?.newEmail && <span className="account__input-error">{errors?.newEmail?.message}</span>}
                    </div>
                    <div className="account__input">
                        <input {...inputOptions.passwordNew} type="text" className="account__input-input" placeholder='New Password'/>
                        <PasswordSVG className="account__input-svg"/>
                        {errors?.newPassword && <span className="account__input-error">{errors?.newPassword?.message}</span>}
                    </div>
                    <div className="account__input">
                        <input {...inputOptions.passwordOld} type="text" className="account__input-input" placeholder='Old Password'/>
                        <PasswordSVG className="account__input-svg"/>
                        {errors?.oldPassword && <span className="account__input-error">{errors?.oldPassword?.message}</span>}
                        {wrongOldPassword && <span className="account__input-error">Invalid old password</span>}
                    </div>
                    <button className="account__submit" type='submit'>Set New Data</button>
                </form>
            </section>
        </main>
    ) : (
        <Navigate to={'../'} replace/>
    )
}

export default Account;