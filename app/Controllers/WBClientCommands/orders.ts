import Order from 'App/Moldels/Order'
import Product from 'App/Moldels/Product'
import Sale from 'App/Moldels/Sale'
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
    const commission = 5

    const order = await Order.create({ orderPrice: product.price, totalSum: product.price + (product.price / 100) * commission, quantity: 1, productId: product.id })

    const stock = await Stock.findBy('productId', product.id)
    if (!stock) return clientSendText(msg.message.chat.id, 'В остатках товара ничего не осталось :(')

    await stock.merge({ quantity: stock.quantity ? stock.quantity - 1 : 0 }).save()

    const sale = await Sale.create({
      productId: product.id,
      orderId: order.id,
      quantity: order.quantity,
      commission,
      totalSum: order.totalSum,
      salesPrice: product.price,
    })

    clientSendText(msg.message.chat.id, 'Напишите адрес/город доставки')

    const admins = [762978963, 318129300]
    admins.forEach((n) =>
      sendText(
        n,
        `${msg.from.first_name.slice(0, msg.from.first_name.length / 2) + '...'} заказал\nТовар: ${product.name} \nКоличество: 1 \nСумма с доставкой: ${order.totalSum} ${
          product.currency
        }`
      )
    )

    return sale.id
  } catch (error) {
    console.error(error)
    return clientSendText(msg.message.chat.id, 'Не верные данные')
  }
}
