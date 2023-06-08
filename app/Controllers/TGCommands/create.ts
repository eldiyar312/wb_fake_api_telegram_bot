import { sendText } from 'App/Services/TelegramBot'
import { CreateCommand } from '../enums'
import { IMessage } from '../types'

export const handleCreateCommands = async (msg: IMessage) => {
  try {
    switch (msg.text) {
      case CreateCommand.CREATE_PRODUCT: {
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
      case CreateCommand.CREATE_WAREHOUSE: {
        const message = `
          Напишите по пунктам нужные данные одним сообщением с переходом в след. строку:
          - Название склада
          - Адрес
          - Страна
          - Город
        `
        sendText(msg.chat.id, message)
        break
      }
      case CreateCommand.CREATE_CATEGORY: {
        const message = `
          Напишите по пунктам нужные данные одним сообщением с переходом в след. строку:
          - Название категории
          - ID родительской категории (не обязательно)
        `
        sendText(msg.chat.id, message)
        break
      }
      case CreateCommand.CREATE_STOCK: {
        const message = `
          Напишите по пунктам нужные данные одним сообщением с переходом в след. строку:
          - Количество
          - ID товарв
          - ID склада
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
