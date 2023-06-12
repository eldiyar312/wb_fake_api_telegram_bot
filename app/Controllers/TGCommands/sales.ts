import Database from '@ioc:Adonis/Lucid/Database'
import { sendMessage, sendText } from 'App/Services/TelegramBot'
import { DateTime } from 'luxon'
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
    const end = DateTime.now().plus({ day: 1 }).toFormat('yyyy-MM-dd')
    let start = DateTime.now().minus({ month: 1 }).toFormat('yyyy-MM-dd')

    switch (msg.data) {
      case ViewCommand.SALES_2_WEEK:
        start = DateTime.now().minus({ week: 2 }).toFormat('yyyy-MM-dd')
        break
      case ViewCommand.SALES_WEEK:
        start = DateTime.now().minus({ week: 1 }).toFormat('yyyy-MM-dd')
        break
      case ViewCommand.SALES_MONTH:
        start = DateTime.now().minus({ month: 1 }).toFormat('yyyy-MM-dd')
        break
      default:
        break
    }

    const { rows: sales } = await Database.rawQuery(
      `select SUM(quantity) as quantity, payment_status from sales 
      where created_at >= '${start}' and created_at <= '${end}' 
      group by payment_status`
    )

    if (!sales.length) return sendText(msg.message.chat.id, 'За этот период пока не было продаж :(')

    const messages: string[] = sales.map((sale) => `Количестов: ${sale.quantity}\nАдрес: ${sale.payment_status}`)

    messages.forEach((message) => {
      sendText(msg.message.chat.id, message)
    })
  } catch (error) {
    console.error(error)
    return sendText(msg.message.chat.id, 'Не верные данные')
  }
}
