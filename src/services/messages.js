import $api from "./axios.js";

export default class messagesService {
    static async getHistory (userId, chatId) {
        return $api.post('/message/history',{userId, chatId})
    }
    static async sendToDB (role, text, userId, chatId) {
        return $api.post('/message/sendToDB',{role, text, userId, chatId})
    }
    static async deleteChat (userId, chatId) {
        return $api.post('/message/deleteChat',{userId, chatId})
    }
    static async getChats (userId) {
        return $api.post('/message/chats',{userId})
    }
   static async renameChat (userId, chatId, newName) {
        return $api.post('/message/renameChat', {userId, chatId, newName})
   }
}