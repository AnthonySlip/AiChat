import React from 'react';
import { Outlet } from 'react-router-dom';
import './outletcomponent.scss';
import Nav from "../Navigation/Nav.jsx";

const OutletComponent = () => {

    //const isMobile = window.innerWidth<910? true : false

    return (
        <div className="wrapper">
            <main className="main"><Outlet/></main>
        </div>
    )
}

export default OutletComponent;