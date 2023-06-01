import Warehouse from 'App/Moldels/Warehouse'
import { answerCallbackQuery, sendMessage, sendText } from 'App/Services/TelegramBot'
import { getIdRegex } from '../../../util/regex'
import { DeleteCommand } from '../enums'
import { ICallbackQuery, IMessage } from '../types'

export const createWarehouse = async (msg: IMessage) => {
  try {
    const data = msg.text.split('\n')
    if (data.length !== 4) {
      sendText(msg.chat.id, 'Недостаточно или слишком много данных')
      return false
    }

    await Warehouse.create({ name: data[0].trim(), address: data[1].trim(), country: data[2].trim(), city: data[3].trim() })

    sendText(msg.chat.id, `Склад ${data[0].trim()} успешно создан`)
    return true
  } catch (error) {
    console.error(error)
    sendText(msg.chat.id, 'Не верные данные')
    return false
  }
}

export const viewWarehouses = async (msg: IMessage) => {
  try {
    const warehouses = await Warehouse.query()
    if (!warehouses || !warehouses.length) return sendText(msg.chat.id, 'Пока нет данных :(')

    const data = {
      'reply_markup': {
        'inline_keyboard': [
          [
            {
              'text': '🗑️',
              'callback_data': DeleteCommand.DELETE_WAREHOUSE,
            },
          ],
        ],
      },
    }

    warehouses.forEach((warehouse) => {
      sendMessage(msg.chat.id, {
        text: `ID: ${warehouse.id} \nНазвание: ${warehouse.name} \n Адрес: ${warehouse.address} \nСтрана: ${warehouse.country} \nГород: ${warehouse.city}`,
        data,
      })
    })
  } catch (error) {
    return sendText(msg.chat.id, 'Не верные данные')
  }
}

export const deleteWarehouse = async (msg: ICallbackQuery) => {
  try {
    const id = getIdRegex(msg.message.text)
    if (!id) return sendText(msg.message.chat.id, 'Не удалось найти нужную информацию :(')

    await Warehouse.query().where('id', id).delete()

    return answerCallbackQuery(msg.message.chat.id, msg.id, {
      text: 'Склад успешно удален :)',
    })
  } catch (error) {
    console.error(error)
    return sendText(msg.message.chat.id, 'Не верные данные')
  }
}
