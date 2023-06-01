import { clientSendText } from 'App/Services/WBClientBot'
import { ViewCommand } from '../enums'
import { IMessage } from '../types'

export const handleOtherCommands = async (msg: IMessage) => {
  switch (msg.text) {
    case '/start':
      startBot(msg)
      break
    default:
      break
  }
}

const startBot = (msg: IMessage) => {
  const message = `
    Добро пожаловать :)
    Введите нужные комады, например: ${ViewCommand.VIEW_PRODUCTS}
  `
  return clientSendText(msg.chat.id, message)
}
