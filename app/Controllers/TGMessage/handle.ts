import { sendText } from 'App/Services/TelegramBot'
import { createCategory } from '../TGCommands/categories'
import { createProduct } from '../TGCommands/products'
import { CreateCommand } from '../enums'
import { ICallbackQuery, IMessage } from '../types'

export const handleMessage = (msg: IMessage, chatLastCommad: string) => {
  try {
    switch (chatLastCommad) {
      case CreateCommand.CREATE_CATEGORY: {
        createCategory(msg)
        break
      }
      case CreateCommand.CREATE_PRODUCT: {
        createProduct(msg)
        break
      }
      default:
        break
    }
  } catch (error) {
    sendText(msg.chat.id, 'Ошибка при обработке сообщении')
  }
}

export const handleCallbakQueryMessage = (msg: ICallbackQuery, chatLastCommad: string) => {
  try {
    switch (chatLastCommad) {
      case CreateCommand.CREATE_CATEGORY: {
        //
        break
      }
      default:
        break
    }
  } catch (error) {
    sendText(msg.message.chat.id, 'Ошибка при обработке сообщении')
  }
}
