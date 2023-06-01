import Stock from 'App/Moldels/Stock'
import { sendMessage, sendText } from 'App/Services/TelegramBot'
import { IMessage } from '../types'

export const viewStoks = async (msg: IMessage) => {
  try {
    const stocks = await Stock.query().preload('Product').preload('Warehouse')
    if (!stocks || !stocks.length) return sendText(msg.chat.id, 'Пока нет данных :(')

    stocks.forEach((stock) => {
      sendMessage(msg.chat.id, {
        text: `ID: ${stock.id} \nТовар: ${stock.Product.name} \nОстатки: ${stock.quantity} \nСклад: ${stock.Warehouse.name}`,
      })
    })
  } catch (error) {
    console.error(error)
    return sendText(msg.chat.id, 'Не верные данные')
  }
}
