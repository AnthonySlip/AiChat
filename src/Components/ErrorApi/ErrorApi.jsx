import React from 'react';
import './errorapi.scss';
const ErrorApi = (props) => {

    const urlImg = new URL('../../assets/error.png', import.meta.url)

    const errorMessage = props.error?.response?.statusText || 'Unexpected error'
    const errorStatus = props.error?.response?.status || '500'

    return (
        <main className="errorApi">
            <div className="errorApi__body">
                <h2 className="errorApi__title">Error...</h2>
                <img src={urlImg} alt="error-api-img" className="errorApi__img"/>
                <p className="errorApi__error">
                    Error Code: {errorMessage} {errorStatus}
                </p>
                <p className="errorApi__error" onClick={() => window.location.reload()}>
                    Try Again
                </p>
            </div>
        </main>
    )
}

export default ErrorApi;