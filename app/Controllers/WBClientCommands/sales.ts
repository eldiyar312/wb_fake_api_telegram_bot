import Sale from 'App/Moldels/Sale'
import { clientSendMessage, clientSendText } from 'App/Services/WBClientBot'
import { IMessage } from '../types'

export const updateSale = async (msg: IMessage, salesId: number[]) => {
  try {
    const sales = await Sale.findMany(salesId)
    if (!sales || !sales.length) return clientSendText(msg.chat.id, 'Нам очень жаль, но продавец удалил товары :(')

    sales.forEach((sale) => sale.merge({ paymentStatus: msg.text }).save())

    clientSendMessage(msg.chat.id, { text: `Заказ успешно принят :)` })
  } catch (error) {
    console.error(error)
    return clientSendText(msg.chat.id, 'Не верные данные')
  }
}
