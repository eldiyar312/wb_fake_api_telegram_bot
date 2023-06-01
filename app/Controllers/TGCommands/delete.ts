import { sendText } from 'App/Services/TelegramBot'
import { DeleteCommand } from '../enums'
import { ICallbackQuery } from '../types'
import { deleteCategory } from './categories'
import { deleteProduct } from './products'
import { deleteWarehouse } from './warehouses'

export const handleDeleteCommands = async (msg: ICallbackQuery) => {
  try {
    switch (msg.data) {
      case DeleteCommand.DELETE_CATEGORY: {
        deleteCategory(msg)
        break
      }
      case DeleteCommand.DELETE_PRODUCT: {
        deleteProduct(msg)
        break
      }
      case DeleteCommand.DELETE_WAREHOUSE: {
        deleteWarehouse(msg)
        break
      }
      default:
        break
    }
  } catch (error) {
    return sendText(msg.message.chat.id, 'Ошбика при обработке запроса')
  }
}
