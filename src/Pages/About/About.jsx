import React, {useEffect} from 'react';
import './about.scss';
import Burger from "../../Components/Burger/Burger.jsx";
import Chats from "../../Components/Chats/Chats.jsx";
import {useUserStore} from "../../store/user.js";
import {Navigate} from "react-router-dom";
import {ReactComponent as TelegramSVG} from "../../assets/svg/telegram-logo.svg";
import {ReactComponent as GmailSVG} from "../../assets/svg/gmail-logo.svg";
import {ReactComponent as GitHubSVG} from "../../assets/svg/github-logo.svg";

function About(props) {

    const isMobile = window.innerWidth<910? true : false
    const isAuth = useUserStore(state => state.isAuth)

    const articles = [{
        img: 'https://avatars.githubusercontent.com/u/122377815?s=400&u=ed24e6a127ce1d1d1f70947c264958931fcad65e&v=4',
        title: 'About me',
        text: 'I am a frontend developer. My goal is to provide you with chatbot communication through a website that I created for my portfolio. This chatbot is based on powerful artificial intelligence technology from OpenAI.'
    },{
        img: 'https://joshbersin.com/wp-content/uploads/2023/01/openai2.png',
        title: 'How it works',
        text: 'My website uses the OpenAI API to provide you with a smart and interesting chatbot. Just enter your questions or messages and the bot will try to provide you with information and answers.'
    },{
        img: 'https://uxwing.com/wp-content/themes/uxwing/download/crime-security-military-law/privacy-icon.png',
        title: 'Your privacy',
        text: 'I value your privacy. All your conversations with bots are strictly confidential and will not be shared with third parties. Also, your password is stored encrypted! Third-party services are not used to confirm the user\'s mail, in addition, to confirm the email address, you do not need to follow the links from the letter, but only enter the code on the site itself, which prevents the threat of theft of the email password!'
    }]

    // useEffect(() => {
    //     throw Error('error')
    // },[])



    return isAuth? (
        <main className="about">
            {isMobile? <Burger/> : <Chats/>}
            <section className="about__body">
                <h1 className="about__title">about app</h1>
                <ul className="about__articles">
                    {articles.map((item, index) =>
                        <li style={index%2===0? {alignSelf:'flex-start'}:{alignSelf:'flex-end'}} key={index} className="about__article">
                            <h4 className="about__article-title">{item.title}</h4>
                            <p className="about__article-text">{item.text}</p>
                        </li>)}
                </ul>
                <div className="about__footer">
                    <ul className="about__contacts">
                        <li className="about__contact">
                            <a href="https://t.me/slipchiD_D" target='_blank' className="about__contact-link">
                                <TelegramSVG className="about__contact-svg"/>
                                <span className="about__contact-tagname">Telegram</span>
                            </a>
                        </li>
                        <li className="about__contact">
                            <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=theslipocon@email.com&subject=MISSED%20CALL%20EZTRADER&body=" className="about__contact-link" target='_blank'>
                                <GmailSVG className="about__contact-svg"/>
                                <span className="about__contact-tagname">Gmail</span>
                            </a>
                        </li>
                        <li className="about__contact" >
                            <a href="https://github.com/AnthonySlip" className="about__contact-link" target='_blank'>
                                <GitHubSVG className="about__contact-svg"/>
                                <span className="about__contact-tagname">GitHub</span>
                            </a>
                        </li>
                    </ul>
                    <p className="about__subArticle">
                        <span>Feedback</span><br/>
                        I strive to improve my site and make it even better for you. If you have any suggestions or feedback, please contact me using one of the next methods.
                    </p>
                </div>
            </section>
        </main>
    ) : (
        <Navigate to={'../'} replace />
    )
}

export default About;