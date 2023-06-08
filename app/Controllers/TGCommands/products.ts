import Database from '@ioc:Adonis/Lucid/Database'
import Product from 'App/Moldels/Product'
import Stock from 'App/Moldels/Stock'
import { answerCallbackQuery, sendMessage, sendText } from 'App/Services/TelegramBot'
import { getIdInStart, getIdRegex } from '../../../util/regex'
import { DeleteCommand, UpdateCommand } from '../enums'
import { ICallbackQuery, IMessage } from '../types'

export const createProduct = async (msg: IMessage) => {
  try {
    const data = msg.text.split('\n').map((str) => str.trim())
    if (data.length < 7 || data.length > 8) {
      sendText(msg.chat.id, 'Недостаточно или слишком много данных')
      return false
    }

    const categoryId = parseInt(data[7])
    const productData = { name: data[0], price: parseInt(data[1]) || 0, currency: data[2], brand: data[3], color: data[4], size: data[5], gender: data[6] }

    if (categoryId) productData['category_id'] = categoryId
    await Product.create(productData)

    sendText(msg.chat.id, `Товар ${productData.name} успешно создан`)
    return true
  } catch (error) {
    console.error(error)
    sendText(msg.chat.id, 'Не верные данные')
    return false
  }
}

export const viewProducts = async (msg: IMessage) => {
  try {
    const { rows: products } = await Database.rawQuery(
      `SELECT 
        p.*, categories.name as category_name,
        jsonb_agg(jsonb_build_object('quantity', stocks.quantity, 'warehouse_name', warehouses.name)) as stocks
      FROM products p
        LEFT JOIN stocks ON stocks.product_id = p.id
        LEFT JOIN categories ON categories.id = p.category_id
        LEFT JOIN warehouses ON warehouses.id = stocks.warehouse_id
      GROUP BY p.id, categories.name
      ORDER BY p.created_at DESC`
    )

    if (!products || !products.length) return sendText(msg.chat.id, 'Пока нет данных :(')

    const data = {
      'reply_markup': {
        'inline_keyboard': [
          [
            {
              'text': '🗑️',
              'callback_data': DeleteCommand.DELETE_PRODUCT,
            },
            {
              'text': '✍️',
              'callback_data': UpdateCommand.UPDATE_PRODUCT,
            },
          ],
        ],
      },
    }

    const messages: string[] = products.map((product) => {
      let quantity = 0
      let warehouses = ''

      product.stocks &&
        product.stocks.forEach((stock) => {
          quantity += stock.quantity
          stock.warehouse_name && (warehouses += `${stock.warehouse_name} `)
        })

      return `ID: ${product.id}\nНазвание: ${product.name}\nЦена: ${product.price}\nВалюта: ${product.currency}\nБренд: ${product.brand}\nЦвет: ${product.color}\nРазмер: ${
        product.size
      }\nПол: ${product.gender}${product.category_name ? '\nКатегория: ' + product.category_name : ''}\nОстаток: ${quantity}${warehouses ? `\nСклады: ${warehouses}` : ''}`
    })

    messages.forEach((message) => {
      sendMessage(msg.chat.id, {
        text: message,
        ...data,
      })
    })
  } catch (error) {
    console.error(error)
    return sendText(msg.chat.id, 'Не верные данные')
  }
}

export const deleteProduct = async (msg: ICallbackQuery) => {
  try {
    const id = getIdRegex(msg.message.text)
    if (!id) return sendText(msg.message.chat.id, 'Не удалось найти нужную информацию :(')

    await Product.query().where('id', id).delete()

    return answerCallbackQuery(msg.message.chat.id, msg.id, {
      text: 'Товар успешно удален :)',
    })
  } catch (error) {
    console.error(error)
    return sendText(msg.message.chat.id, 'Не верные данные')
  }
}

export const editProduct = async (msg: IMessage) => {
  try {
    const id = getIdInStart(msg.text)
    if (!id) return sendText(msg.chat.id, 'Не удалось найти нужную информацию :(')

    const data = msg.text.split('\n').map((str) => str.trim())
    if (data.length < 8 || data.length > 10) {
      sendText(msg.chat.id, 'Недостаточно или слишком много данных')
      return false
    }

    const quantity = parseInt(data[8])
    const categoryId = parseInt(data[9])

    const product = { name: data[1], price: parseInt(data[2]) || 0, currency: data[3], brand: data[4], color: data[5], size: data[6], gender: data[7] }

    if (categoryId) await Product.updateOrCreate({ id }, { ...product, categoryId })
    else await Product.updateOrCreate({ id }, product)

    const stock = await Stock.findBy('productId', id)
    stock && quantity && (await stock.merge({ quantity }).save())

    sendText(msg.chat.id, 'Товар успешно изменён :)')
    return true
  } catch (error) {
    sendText(msg.chat.id, 'Не верные данные')
    return false
  }
}
