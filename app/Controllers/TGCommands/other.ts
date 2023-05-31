import { sendText } from 'App/Services/TelegramBot'
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
    Добро пожаловать
  `
  return sendText(msg.chat.id, message)
}
