import React from 'react';
import './signout.scss';
import authService from "../../services/auth.js";
import {useUserStore} from "../../store/user.js";
import {useLoadingStore} from "../../store/loading.js";

const SignOut = (props) => {

    const setLoadingState = useLoadingStore(state => state.setLoadingState)
    const setAuthState = useUserStore(state => state.setAuthState)
    const removeUserData = useUserStore(state => state.removeUserData)
    const signOutHandler = async () => {
        setLoadingState(true)
        authService.signOut()
            .then(res => {
                localStorage.removeItem('token')
                props?.clearChats()
                setAuthState(false)
                removeUserData()
                setLoadingState(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <main className="signout" onClick={signOutHandler}>
            <div className="signout__body">
                <h3 className="signout__title">Sign out</h3>
            </div>
        </main>
    )
}

export default SignOut;