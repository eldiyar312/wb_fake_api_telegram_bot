import Category from 'App/Moldels/Category'
import { answerCallbackQuery, sendMessage, sendText } from 'App/Services/TelegramBot'
import { getIdRegex } from '../../../util/regex'
import { DeleteCommand } from '../enums'
import { ICallbackQuery, IMessage } from '../types'

export const createCategory = async (msg: IMessage) => {
  try {
    const data = msg.text.split('\n')
    if (data.length < 1 || data.length > 2) {
      sendText(msg.chat.id, 'Недостаточно или слишком много данных')
      return false
    }

    const categoryId = parseInt(data[1]?.trim())

    if (categoryId) await Category.create({ name: data[0].trim(), categoryId })
    else await Category.create({ name: data[0].trim() })

    sendText(msg.chat.id, `Категория ${data[0].trim()} успешно создан`)
    return true
  } catch (error) {
    console.error(error)
    sendText(msg.chat.id, 'Не верные данные')
    return false
  }
}

export const viewCategories = async (msg: IMessage) => {
  try {
    const categories = await Category.query().preload('Category')
    const data = {
      'reply_markup': {
        'inline_keyboard': [
          [
            {
              'text': '🗑️',
              'callback_data': DeleteCommand.DELETE_CATEGORY,
            },
          ],
        ],
      },
    }

    categories.forEach((category) => {
      sendMessage(msg.chat.id, { text: `ID: ${category.id} \nНазвание: ${category.name} ${category.Category.name ? '\nРодитель: ' + category.Category.name : ''}`, ...data })
    })
  } catch (error) {
    return sendText(msg.chat.id, 'Не верные данные')
  }
}

export const deleteCategory = async (msg: ICallbackQuery) => {
  try {
    const id = getIdRegex(msg.message.text)
    if (!id) return sendText(msg.message.chat.id, 'Не удалось найти нужную информацию :(')

    await Category.query().where('id', id).delete()

    const data = {
      callback_query_id: msg.id,
      text: 'Категория успешно удалено :)',
    }

    return answerCallbackQuery(msg.message.chat.id, data)
  } catch (error) {
    console.error(error)
    return sendText(msg.message.chat.id, 'Не верные данные')
  }
}
