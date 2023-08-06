import React, {useEffect, useState} from 'react';
import './chat.scss';
import Chats from "../../Components/Chats/Chats.jsx";
import Messenger from "../../Components/Messenger/Messanger.jsx";
import Auth from "../../Components/Auth/Auth.jsx";
import {useUserStore} from "../../store/user.js";
import Burger from "../../Components/Burger/Burger.jsx";
const Chat = () => {

    const isMobile = window.innerWidth<910? true : false
    const isAuth = useUserStore(state => state.isAuth)

    useEffect(() => {

    },[])

    return (
            <main className="chat">
                {isMobile? <Burger/> : <Chats/>}
                <section className="chat__modal">
                    {isAuth? <Messenger /> : <Auth/>}
                </section>
            </main>
    )
}

export default Chat;