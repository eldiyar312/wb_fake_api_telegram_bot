import Product from 'App/Moldels/Product'
import { answerCallbackQuery, sendMessage, sendText } from 'App/Services/TelegramBot'
import { getIdRegex } from '../../../util/regex'
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

    const product = { name: data[0], price: parseInt(data[1]) || 0, currency: data[2], brand: data[3], color: data[4], size: data[5], gender: data[6] }

    if (categoryId) await Product.create({ ...product, categoryId })
    else await Product.create(product)

    sendText(msg.chat.id, `Товар ${data[0]} успешно создан`)
    return true
  } catch (error) {
    console.error(error)
    sendText(msg.chat.id, 'Не верные данные')
    return false
  }
}

export const viewProducts = async (msg: IMessage) => {
  try {
    const products = await Product.query().preload('Category')
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

    products.forEach((product) => {
      sendMessage(msg.chat.id, {
        text: `ID: ${product.id} \nНазвание: ${product.name} \nЦена: ${product.price}\nВалюта: ${product.currency}\nБренд: ${product.brand}\nЦвет: ${product.color}\nРазмер: ${
          product.size
        }\nПол: ${product.gender} ${product.Category.name ? '\nКатегория: ' + product.Category.name : ''}`,
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

    const data = {
      callback_query_id: msg.id,
      text: 'Товар успешно удалено :)',
    }

    return answerCallbackQuery(msg.message.chat.id, data)
  } catch (error) {
    console.error(error)
    return sendText(msg.message.chat.id, 'Не верные данные')
  }
}
