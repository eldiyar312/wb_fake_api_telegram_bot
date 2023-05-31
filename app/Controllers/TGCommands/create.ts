import { sendText } from 'App/Services/TelegramBot'
import { IMessage } from '../types'

export const handleCreateCommands = async (msg: IMessage) => {
  try {
    switch (msg.text) {
      case '/create_product': {
        const message = `
          Напишите по пунктам нужные данные одним сообщением с переходом в след. строку:
          - Название товара
          - Цена товара (число)
          - Валюта товара
          - Бренд товара
          - Цвет товара
          - Размер товара
          - Аудитория товара (мужской | женский)
          - ID категории (не обьязательно)
        `
        sendText(msg.chat.id, message)
        break
      }
      case '/create_warehouse':
        // createWarehouse()
        break
      case '/create_category': {
        const message = `
          Напишите по пунктам нужные данные одним сообщением с переходом в след. строку:
          - Название категории
          - ID родительской категории (не обязательно)
        `
        sendText(msg.chat.id, message)
        break
      }
      default:
        break
    }
  } catch (error) {
    return sendText(msg.chat.id, 'Ошбика при обработке запроса')
  }
}
