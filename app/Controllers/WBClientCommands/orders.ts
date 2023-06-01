import Order from 'App/Moldels/Order'
import Product from 'App/Moldels/Product'
import Stock from 'App/Moldels/Stock'
import { sendText } from 'App/Services/TelegramBot'
import { clientSendMessage, clientSendText } from 'App/Services/WBClientBot'
import { getIdInStart } from '../../../util/regex'
import { ICallbackQuery, IMessage } from '../types'

export const viewOrders = async (msg: IMessage) => {
  try {
    const orders = await Order.query().preload('Product')
    if (!orders || !orders.length) return clientSendText(msg.chat.id, 'Пока нет данных :(')

    orders.forEach((order) => {
      clientSendMessage(msg.chat.id, {
        text: `ID: ${order.id} \nТовар: ${order.Product.name} \nКоличество: ${order.quantity} \nСумма: ${order.totalSum} \nЦена: ${order.orderPrice} \nДата: ${order.orderDate}`,
      })
    })
  } catch (error) {
    console.error(error)
    return clientSendText(msg.chat.id, 'Не верные данные')
  }
}

export const createOrder = async (msg: ICallbackQuery) => {
  try {
    const id = getIdInStart(msg.message.text)
    if (!id) return clientSendText(msg.message.chat.id, 'Не удалось найти нужную информацию :(')

    const product = await Product.find(id)
    if (!product?.id) return clientSendText(msg.message.chat.id, 'Не удалось найти нужную информацию :(')

    const order = await Order.create({ orderPrice: product.price, totalSum: product.price + (product.price / 100) * 5, quantity: 1, productId: product.id })

    const stock = await Stock.findBy('productId', product.id)
    stock && (await stock.merge({ quantity: stock.quantity ? stock.quantity - 1 : 0 }).save())

    clientSendText(msg.message.chat.id, 'Заказ принят :)')
    sendText(msg.message.chat.id, `${msg.from.first_name} заказал товар: ${product.name} \nКоличество: 1 \n Сумма с доставкой: ${order.totalSum} ${product.currency}`)
    return true
  } catch (error) {
    console.error(error)
    return clientSendText(msg.message.chat.id, 'Не верные данные')
  }
}
