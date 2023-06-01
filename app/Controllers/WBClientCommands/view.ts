import { ViewCommand } from '../enums'
import { IMessage } from '../types'
import { viewOrders } from './orders'
import { viewProducts } from './products'

export const handleViewCommands = async (msg: IMessage) => {
  switch (msg.text) {
    case ViewCommand.VIEW_PRODUCTS:
      viewProducts(msg)
      break
    case ViewCommand.VIEW_ORDERS:
      viewOrders(msg)
      break
    default:
      break
  }
}
