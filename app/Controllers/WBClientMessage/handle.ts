import { clientSendText } from 'App/Services/WBClientBot'
import { createdRows } from '../WBClientCommands/create'
import { updateSale } from '../WBClientCommands/sales'
import { CreateCommand } from '../enums'
import { IMessage } from '../types'

export const handleMessage = (msg: IMessage, chatLastCommad: string) => {
  try {
    switch (chatLastCommad) {
      case CreateCommand.CREATE_ORDER: {
        updateSale(msg, createdRows.salesId)
        break
      }
      default:
        break
    }
  } catch (error) {
    clientSendText(msg.chat.id, 'Ошибка при обработке сообщении')
  }
}
