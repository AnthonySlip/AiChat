import $api from "./axios.js";
import axios from "axios";

export default class openaiService {
    static async generate (message, userId, chatId) {
        return $api.post('openai/generate/message', {message, userId, chatId})
    }
    static async generateImage () {
        return $api.get('openai/generate/image')
    }
}