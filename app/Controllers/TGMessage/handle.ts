import { sendText } from 'App/Services/TelegramBot'
import { createCategory } from '../TGCommands/categories'
import { createProduct, editProduct } from '../TGCommands/products'
import { createStok } from '../TGCommands/stoks'
import { createWarehouse } from '../TGCommands/warehouses'
import { CreateCommand, UpdateCommand } from '../enums'
import { IMessage } from '../types'

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
      case CreateCommand.CREATE_WAREHOUSE: {
        createWarehouse(msg)
        break
      }
      case CreateCommand.CREATE_STOCK: {
        createStok(msg)
        break
      }
      case UpdateCommand.UPDATE_PRODUCT: {
        editProduct(msg)
        break
      }
      default:
        break
    }
  } catch (error) {
    sendText(msg.chat.id, 'Ошибка при обработке сообщении')
  }
}
