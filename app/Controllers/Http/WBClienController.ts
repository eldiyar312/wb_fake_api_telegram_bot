import { handleCreateCallbackCommands } from '../WBClientCommands/create'
import { handleOtherCommands } from '../WBClientCommands/other'
import { handleViewCommands } from '../WBClientCommands/view'
import { handleMessage } from '../WBClientMessage/handle'
import { CreateCommand, OtherCommand, ViewCommand } from '../enums'
import { TBody, TChatLastCommad } from '../types'

// ^\/[a-z_]+
const chatLastCommad: TChatLastCommad = {}

const viewCommands: string[] = [ViewCommand.VIEW_PRODUCTS, ViewCommand.VIEW_ORDERS]

const createCommands: string[] = [CreateCommand.CREATE_ORDER]

const otherCommands: string[] = [OtherCommand.START]

export const telegramWBClientQueries = async ({ request, response }) => {
  try {
    const body: TBody = request.body()

    if (body.message) {
      if (otherCommands.indexOf(body.message.text) !== -1) {
        chatLastCommad[body.message.chat.id] = body.message.text
        handleOtherCommands(body.message)
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
      if (createCommands.indexOf(body.callback_query.data) !== -1) {
        chatLastCommad[body.callback_query.message.chat.id] = body.callback_query.data
        handleCreateCallbackCommands(body.callback_query)
        return
      }
    }
  } catch (error) {
    response.badRequest({ message: error.messages })
  }
}
