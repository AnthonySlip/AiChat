import $api from "./axios.js";

export default class authService {
    static async signIn (name, email, password) {
        return $api.post('/auth/registration', {name, email, password})
    }
    static async logIn (email, password) {
        return $api.post('/auth/signIn', {email, password})
    }
    static async verify (email, verificationCode) {
        return $api.post('/auth/verify', {email, verificationCode})
    }
    static async user (email) {
        return $api.post('/auth/user', {email})
    }
    static async signOut () {
        return $api.post('/auth/signOut')
    }
    static async updateName (newName, id) {
        return $api.post('/auth/update/name', {newName, id})
    }
    static async updateEmail (newEmail, id) {
        return $api.post('/auth/update/email', {newEmail, id})
    }
    static async updatePassword (oldPassword, newPassword, id) {
        return $api.post('/auth/update/password', {oldPassword, newPassword, id})
    }
}