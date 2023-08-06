import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {mainRoute} from "../utils/parth.js";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter >
        <App />
    </BrowserRouter>
)
