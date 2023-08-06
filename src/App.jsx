import React, {useEffect, useState} from 'react'
import {Routes, Route, Navigate, useLocation, useNavigate, useRouteError} from 'react-router-dom'
import {aboutRoute, accountRoute, mainRoute} from "../utils/parth.js";
import Chat from "./Pages/Chat/Chat.jsx";
import Account from "./Pages/Account/Account.jsx";
import About from "./Pages/About/About.jsx";
import OutletComponent from "./Components/Outlet/OutletComponent.jsx";
import {useUserStore} from "./store/user.js";
import {useLoadingStore} from "./store/loading.js";
const App = () => {

    const isAuth = useUserStore(state => state.isAuth)
    const isLoading = useLoadingStore(state => state.isLoading)

    return isLoading && !isAuth? (
        <h3>Loading</h3>
    ) : (
            <Routes>
                <Route path={mainRoute} element={<OutletComponent/>}>
                    <Route index element={<Chat />} errorElement={<h2>Error</h2>}/>
                    <Route path={aboutRoute} element={<About />}/>
                    <Route path={accountRoute} element={<Account />}/>
                </Route>
                <Route path='*' element={<Navigate to={mainRoute} replace />}/>
            </Routes>
    )
}

export default App
