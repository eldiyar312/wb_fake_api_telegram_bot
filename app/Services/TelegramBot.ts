import Env from '@ioc:Adonis/Core/Env'
import axios from 'axios'

const TOKEN = Env.get('TELEGRAM_BOT_TOKEN')
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`

const sendText = async (chatId: number, text: string) => {
  return sendMessage(chatId, { text })
}

const sendMessage = async (chatId: number, body: { [key: string]: unknown }) => {
  return axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    ...body,
  })
}

const answerCallbackQuery = async (chatId: number, body: { [key: string]: unknown }) => {
  return axios.post(`${TELEGRAM_API}/answerCallbackQuery`, {
    chat_id: chatId,
    ...body,
  })
}

export { sendText, sendMessage, answerCallbackQuery }
