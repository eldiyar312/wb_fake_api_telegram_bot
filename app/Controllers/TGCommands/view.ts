import { IMessage } from '../types'
import { viewCategories } from './categories'
import { viewProducts } from './products'

export const handleViewCommands = async (msg: IMessage) => {
  switch (msg.text) {
    case '/view_products':
      viewProducts(msg)
      break
    case '/view_warehouses':
      // viewWarehouses()
      break
    case '/view_categories':
      viewCategories(msg)
      break
    case '/view_orders':
      // viewOrders()
      break
    case '/view_sales':
      // viewSales()
      break
    default:
      break
  }
}
