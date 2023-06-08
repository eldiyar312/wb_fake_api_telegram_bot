import Stock from 'App/Moldels/Stock'
import { sendMessage, sendText } from 'App/Services/TelegramBot'
import { IMessage } from '../types'

export const viewStoks = async (msg: IMessage) => {
  try {
    const stocks = await Stock.query().preload('Product').preload('Warehouse')
    if (!stocks || !stocks.length) return sendText(msg.chat.id, 'Пока нет данных :(')

    stocks.forEach((stock) => {
      sendMessage(msg.chat.id, {
        text: `ID: ${stock.id} \nТовар: ${stock.Product.name} \nОстатки: ${stock.quantity} \nСклад: ${stock.Warehouse.name}\nГород: ${stock.Warehouse.city}\nАдрес: ${stock.Warehouse.address}`,
      })
    })
  } catch (error) {
    console.error(error)
    return sendText(msg.chat.id, 'Не верные данные')
  }
}

export const createStok = async (msg: IMessage) => {
  try {
    const data = msg.text.split('\n').map((str) => str.trim())
    if (data.length !== 3) {
      sendText(msg.chat.id, 'Недостаточно или слишком много данных')
      return false
    }

    const productId = parseInt(data[1])
    const warehouseId = parseInt(data[2])
    const quantity = parseInt(data[0])

    await Stock.create({ quantity, productId, warehouseId })

    sendText(msg.chat.id, `Остаток успешно создан`)
  } catch (error) {
    console.error(error)
    return sendText(msg.chat.id, 'Не верные данные')
  }
}
