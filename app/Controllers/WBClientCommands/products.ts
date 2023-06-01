import Database from '@ioc:Adonis/Lucid/Database'
import { clientSendMessage, clientSendText } from 'App/Services/WBClientBot'
import { CreateCommand } from '../enums'
import { IMessage } from '../types'

export const viewProducts = async (msg: IMessage) => {
  try {
    const { rows: products } = await Database.rawQuery(
      `SELECT 
        p.*, stocks.quantity as quantity, categories.name as category_name, warehouses.name as warehouse_name
      FROM products p
        LEFT JOIN stocks ON stocks.product_id = p.id
        LEFT JOIN categories ON categories.id = p.category_id
        LEFT JOIN warehouses ON warehouses.id = stocks.warehouse_id
      GROUP BY p.id, categories.name, stocks.quantity, warehouses.name
      ORDER BY p.created_at DESC`
    )

    if (!products || !products.length) return clientSendText(msg.chat.id, 'Пока нет данных :(')

    const data = {
      reply_markup: {
        'inline_keyboard': [
          [
            {
              'text': 'Заказать 🧺',
              'callback_data': CreateCommand.CREATE_ORDER,
            },
          ],
        ],
      },
    }

    products.forEach((product) => {
      clientSendMessage(msg.chat.id, {
        text: `ID: ${product.id} \nНазвание: ${product.name} \nЦена: ${product.price}\nВалюта: ${product.currency}\nБренд: ${product.brand}\nЦвет: ${product.color}\nРазмер: ${
          product.size
        }\nПол: ${product.gender} ${product.category_name ? '\nКатегория: ' + product.category_name : ''} \nКоличество: ${product.quantity} ${
          product?.warehouse_name ? '\nСклад: ' + product.warehouse_name : ''
        }`,
        reply_markup: product.quantity ? data.reply_markup : {},
      })
    })
  } catch (error) {
    console.error(error)
    return clientSendText(msg.chat.id, 'Не верные данные')
  }
}
