import Env from '@ioc:Adonis/Core/Env'
import axios from 'axios'

const TOKEN = Env.get('TELEGRAM_BOT_CLIENT_TOKEN')
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`

const clientSendText = async (chatId: number, text: string) => {
  return clientSendMessage(chatId, { text })
}

const clientSendMessage = async (chatId: number, body: { [key: string]: unknown }) => {
  return axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    ...body,
  })
}

const clientAnswerCallbackQuery = async (chatId: number, callbackQueryId: string, body: { [key: string]: unknown }) => {
  return axios.post(`${TELEGRAM_API}/answerCallbackQuery`, {
    chat_id: chatId,
    callback_query_id: callbackQueryId,
    ...body,
  })
}

export { clientSendText, clientSendMessage, clientAnswerCallbackQuery }
