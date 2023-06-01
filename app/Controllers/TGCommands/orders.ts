import Order from 'App/Moldels/Order'
import { sendMessage, sendText } from 'App/Services/TelegramBot'
import { IMessage } from '../types'

export const viewOrders = async (msg: IMessage) => {
  try {
    try {
      const orders = await Order.query().preload('Product')
      if (!orders || !orders.length) return sendText(msg.chat.id, 'Пока нет данных :(')

      orders.forEach((order) => {
        sendMessage(msg.chat.id, {
          text: `ID: ${order.id} \nТовар: ${order.Product.name} \nКоличество: ${order.quantity} \nСумма: ${order.totalSum} \nЦена: ${order.orderPrice} \nДата: ${order.orderDate}`,
        })
      })
    } catch (error) {
      console.error(error)
      return sendText(msg.chat.id, 'Не верные данные')
    }
  } catch (error) {
    console.error(error)
    return sendText(msg.chat.id, 'Не верные данные')
  }
}
