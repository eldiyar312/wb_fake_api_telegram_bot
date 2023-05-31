import { handleCreateCommands } from '../TGCommands/create'
import { handleDeleteCommands } from '../TGCommands/delete'
import { handleOtherCommands } from '../TGCommands/other'
import { handleUpdateCommands } from '../TGCommands/update'
import { handleViewCommands } from '../TGCommands/view'
import { handleMessage } from '../TGMessage/handle'
import { UpdateCommand } from '../enums'
import { TBody, TChatLastCommad } from '../types'

// ^\/[a-z_]+
const chatLastCommad: TChatLastCommad = {}

const viewCommands = ['/view_products', '/view_warehouses', '/view_categories', '/view_orders', '/view_sales']

const createCommands = ['/create_product', '/create_warehouse', '/create_category']

const updateCommands: string[] = [UpdateCommand.UPDATE_PRODUCT]

const deleteCommands = ['/delete_product', '/delete_warehouse', '/delete_category']

const otherCommands = ['/start']

export const telegramQueries = async ({ request, response }) => {
  try {
    const body: TBody = request.body()

    if (body.message) {
      if (otherCommands.indexOf(body.message.text) !== -1) {
        chatLastCommad[body.message.chat.id] = body.message.text
        handleOtherCommands(body.message)
        return
      }

      if (createCommands.indexOf(body.message.text) !== -1) {
        chatLastCommad[body.message.chat.id] = body.message.text
        handleCreateCommands(body.message)
        return
      }
      if (viewCommands.indexOf(body.message.text) !== -1) {
        chatLastCommad[body.message.chat.id] = body.message.text
        handleViewCommands(body.message)
        return
      }

      chatLastCommad[body.message.chat.id] && handleMessage(body.message, chatLastCommad[body.message.chat.id])
    }

    // when reply form message
    if (body.callback_query) {
      if (deleteCommands.indexOf(body.callback_query.data) !== -1) {
        chatLastCommad[body.callback_query.message.chat.id] = body.callback_query.data
        handleDeleteCommands(body.callback_query)
        return
      }

      if (updateCommands.indexOf(body.callback_query.data) !== -1) {
        chatLastCommad[body.callback_query.message.chat.id] = body.callback_query.data
        handleUpdateCommands(body.callback_query)
        return
      }
    }
  } catch (error) {
    response.badRequest({ message: error.messages })
  }
}
