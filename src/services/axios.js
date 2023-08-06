import axios from 'axios';

export const API_URL = 'https://aichat-server.vercel.app/api/'

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization =  `Bearer ${localStorage.getItem('token')}`
    return config;
})
$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config
    if (error.request.status===401 && error.config && !error.config.isRetry401) {
        originalRequest.isRetry401 = true
        try {
            const res = await axios.get(`${API_URL}auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', res.data.accessToken)
            return $api.request(originalRequest)
        } catch (err) {
            console.error(err)
        }
    }
    if (error.request.status===401 && error.config && error.config.isRetry401) {
        throw error
    }
    if (error.request.status!==401) {
        throw error
    }
})


export default $api;