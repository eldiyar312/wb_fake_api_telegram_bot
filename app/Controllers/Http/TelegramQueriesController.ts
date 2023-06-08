import { handleCreateCommands } from '../TGCommands/create'
import { handleDeleteCommands } from '../TGCommands/delete'
import { handleOtherCommands } from '../TGCommands/other'
import { handleUpdateCommands } from '../TGCommands/update'
import { handleCallbackViewCommands, handleViewCommands } from '../TGCommands/view'
import { handleMessage } from '../TGMessage/handle'
import { CreateCommand, DeleteCommand, OtherCommand, UpdateCommand, ViewCommand } from '../enums'
import { TBody, TChatLastCommad } from '../types'

// ^\/[a-z_]+
const chatLastCommad: TChatLastCommad = {}

const viewCommands: string[] = [
  ViewCommand.VIEW_CATEGORIES,
  ViewCommand.VIEW_WAREHOUSES,
  ViewCommand.VIEW_PRODUCTS,
  ViewCommand.VIEW_ORDERS,
  ViewCommand.VIEW_SALES,
  ViewCommand.VIEW_STOCKS,
]

const viewCallbackCommands: string[] = [ViewCommand.SALES_2_WEEK, ViewCommand.SALES_MONTH, ViewCommand.SALES_WEEK]

const createCommands: string[] = [CreateCommand.CREATE_PRODUCT, CreateCommand.CREATE_WAREHOUSE, CreateCommand.CREATE_CATEGORY, CreateCommand.CREATE_STOCK]

const updateCommands: string[] = [UpdateCommand.UPDATE_PRODUCT]

const deleteCommands: string[] = [DeleteCommand.DELETE_PRODUCT, DeleteCommand.DELETE_WAREHOUSE, DeleteCommand.DELETE_CATEGORY]

const otherCommands: string[] = [OtherCommand.START]

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
      if (viewCallbackCommands.indexOf(body.callback_query.data) !== -1) {
        chatLastCommad[body.callback_query.message.chat.id] = body.callback_query.data
        handleCallbackViewCommands(body.callback_query)
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
