import { clientAnswerCallbackQuery, clientSendText } from 'App/Services/WBClientBot'
import { CreateCommand } from '../enums'
import { ICallbackQuery } from '../types'
import { createOrder } from './orders'

export const handleCreateCallbackCommands = async (msg: ICallbackQuery) => {
  try {
    switch (msg.data) {
      case CreateCommand.CREATE_ORDER:
        clientAnswerCallbackQuery(msg.message.chat.id, msg.id, {})
        createOrder(msg)
        break
      default:
        break
    }
  } catch (error) {
    return clientSendText(msg.message.chat.id, 'Ошбика при обработке запроса')
  }
}
