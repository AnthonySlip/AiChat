import React from 'react';
import './loading.scss'
const Loading = (props) => {
    return (
        <main className="loading">
            <div className="lds-facebook">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </main>
    )
}

export default Loading;