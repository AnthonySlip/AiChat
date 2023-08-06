import React, {useState} from 'react';
import Chats from "../Chats/Chats.jsx";
import './burger.scss';
const Burger = (props) => {

    const [isActive, setIsActive] = useState(false)

    const toClose = () => {
        setIsActive(!isActive)
    }

    return (
        <main className="burger">
            <div className="burger__body">
                <div className="burger__burger" onClick={() => setIsActive(!isActive)}>
                    <span className={"burger__item"+' '+isActive}></span>
                    <span className={"burger__item"+' '+isActive}></span>
                    <span className={"burger__item"+' '+isActive}></span>
                    <span className={"burger__item"+' '+isActive}></span>
                </div>
                <div className={"burger__chats"+' '+isActive}>
                    <Chats toClose={toClose}/>
                </div>
            </div>
        </main>
    );
}

export default Burger;