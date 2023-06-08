import Sale from 'App/Moldels/Sale'
import { sendMessage, sendText } from 'App/Services/TelegramBot'
import { ViewCommand } from '../enums'
import { ICallbackQuery, IMessage } from '../types'

export const viewSales = async (msg: IMessage) => {
  try {
    const data = {
      'reply_markup': {
        'inline_keyboard': [
          [
            {
              'text': '1 месяц',
              'callback_data': '/sales_month',
            },
            {
              'text': '2 недели',
              'callback_data': '/sales_2_week',
            },
            {
              'text': '1 неделя',
              'callback_data': '/sales_week',
            },
          ],
        ],
      },
    }
    return sendMessage(msg.chat.id, {
      text: 'Выберите период продаж:',
      ...data,
    })
  } catch (error) {
    console.error(error)
    return sendText(msg.chat.id, 'Не верные данные')
  }
}

export const viewSalesByDate = async (msg: ICallbackQuery) => {
  try {
    const today = new Date()
    const oneWeekAgo = new Date()
    switch (msg.data) {
      case ViewCommand.SALES_2_WEEK:
        oneWeekAgo.setDate(today.getDate() - 14)
        break
      case ViewCommand.SALES_WEEK:
        oneWeekAgo.setDate(today.getDate() - 7)
        break
      case ViewCommand.SALES_MONTH:
        oneWeekAgo.setDate(today.getDate() - 30)
        break
      default:
        break
    }

    const start = oneWeekAgo.toISOString().slice(0, 10)
    const end = today.toISOString().slice(0, 10)

    const sales = await Sale.query().whereBetween('created_at', [start, end]).preload('Product')

    if (!sales.length) return sendText(msg.message.chat.id, 'За этот период пока не было продаж :(')

    const messages: string[] = sales.map((sale) => `Товар: ${sale.Product.name}\nКоличестов: ${sale.quantity}\nСумма: ${sale.totalSum}\nДата: ${sale.createdAt}`)

    messages.forEach((message) => {
      sendText(msg.message.chat.id, message)
    })
  } catch (error) {
    console.error(error)
    return sendText(msg.message.chat.id, 'Не верные данные')
  }
}
