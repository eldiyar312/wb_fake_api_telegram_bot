import { answerCallbackQuery, sendText } from 'App/Services/TelegramBot'
import { UpdateCommand } from '../enums'
import { ICallbackQuery } from '../types'

export const handleUpdateCommands = (msg: ICallbackQuery) => {
  switch (msg.data) {
    case UpdateCommand.UPDATE_PRODUCT: {
      const message = `
        Напишите по пунктам нужные данные одним сообщением с переходом в след. строку:
        - ID товара (число)
        - Название товара
        - Цена товара (число)
        - Валюта товара
        - Бренд товара
        - Цвет товара
        - Размер товара
        - Аудитория товара (мужской | женский)
        - ID категории (не обьязательно)
      `

      answerCallbackQuery(msg.message.chat.id, msg.id, {})

      sendText(msg.message.chat.id, message)
      break
    }
    default:
      break
  }
}
