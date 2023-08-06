import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import './verification.scss';
import {useUserStore} from "../../store/user.js";
import authService from "../../services/auth.js";
const Verification = (props) => {

    const {email} = useUserStore(state => state.userData)
    const [isWrongCode, setIsWrongCode] = useState(false)
    const setVerificationState = useUserStore(state => state.setVerificationState)

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm()

    const steps = ['Visit your email box!', 'Find the verification email!', 'Open that one!', 'Paste a code from your email']

    const sendForm = async (data) => {
        const { verificationCode } = data
        authService.verify(email, verificationCode)
            .then(res => {
                if (res.data==='A wrong code') return setIsWrongCode(true)
                setVerificationState(true)
                reset()
            })
            .catch(err => console.error(err))
    }

    return (
        <main className="verification">
            <div className="verification__body">
                <h2 className="verification__title">Verify your account</h2>
                <p className="verification__text">Your verification code has been send to {email}<br/>If your email box is empty, check the spam</p>
                <ul className="verification__steps">
                    {steps.map((item, index) => <li key={index} className="verification__step">{index+1}.{item}</li>)}
                </ul>
                <form className="verification__form" onSubmit={handleSubmit(sendForm)}>
                    <input  type="text" className="verification__code"
                    {...register('verificationCode', {
                        required: 'Enter the code...'
                    })} placeholder={'Put your code'}/>
                    {errors?.verificationCode && <span className="verification__error">{errors?.verificationCode?.message}</span>}
                    {isWrongCode && <span className="verification__error">It is a wrong code</span>}
                    <button type='submit' className="verification__submit">Verify</button>
                </form>
            </div>
        </main>
    );
}

export default Verification;