import React from 'react';
import {aboutRoute, accountRoute, mainRoute} from "../../../utils/parth.js";
import {Link, useLocation} from "react-router-dom";
import './nav.scss';
const Nav = (props) => {

    const links = [
        {title: 'Main', link: mainRoute},
        {title: 'Account', link: accountRoute},
        {title: 'About', link: aboutRoute},
    ]

    const location = useLocation()

    return (
        <nav className="nav">
            <ul className="nav__body">
                {links.map((item ,index) =>
                    <Link key={index} to={location.pathname[location.pathname.length-1]==='/'? (item.link):('../'+item.link)} className="nav__link">{item.title}</Link>)}
            </ul>
        </nav>
    )
}

export default Nav;