import { sendText } from 'App/Services/TelegramBot'
import { IMessage } from '../types'

export const viewOrders = async (msg: IMessage) => {
  try {
    return sendText(msg.chat.id, 'Пока нет данных :(')
  } catch (error) {
    console.error(error)
    return sendText(msg.chat.id, 'Не верные данные')
  }
}
