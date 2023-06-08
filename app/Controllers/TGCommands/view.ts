import { answerCallbackQuery } from 'App/Services/TelegramBot'
import { ViewCommand } from '../enums'
import { ICallbackQuery, IMessage } from '../types'
import { viewCategories } from './categories'
import { viewOrders } from './orders'
import { viewProducts } from './products'
import { viewSales, viewSalesByDate } from './sales'
import { viewStoks } from './stoks'
import { viewWarehouses } from './warehouses'

export const handleViewCommands = async (msg: IMessage) => {
  switch (msg.text) {
    case ViewCommand.VIEW_PRODUCTS:
      viewProducts(msg)
      break
    case ViewCommand.VIEW_WAREHOUSES:
      viewWarehouses(msg)
      break
    case ViewCommand.VIEW_CATEGORIES:
      viewCategories(msg)
      break
    case ViewCommand.VIEW_ORDERS:
      viewOrders(msg)
      break
    case ViewCommand.VIEW_SALES:
      viewSales(msg)
      break
    case ViewCommand.VIEW_STOCKS:
      viewStoks(msg)
      break
    default:
      break
  }
}

export const handleCallbackViewCommands = async (msg: ICallbackQuery) => {
  switch (msg.data) {
    case ViewCommand.SALES_MONTH: {
      answerCallbackQuery(msg.message.chat.id, msg.id, {})
      viewSalesByDate(msg)
      break
    }
    case ViewCommand.SALES_2_WEEK: {
      answerCallbackQuery(msg.message.chat.id, msg.id, {})
      viewSalesByDate(msg)
      break
    }
    case ViewCommand.SALES_WEEK: {
      answerCallbackQuery(msg.message.chat.id, msg.id, {})
      viewSalesByDate(msg)
      break
    }
    default:
      break
  }
}
