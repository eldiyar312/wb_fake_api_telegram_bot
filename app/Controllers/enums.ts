export enum ViewCommand {
  VIEW_PRODUCTS = '/view_products',
  VIEW_WAREHOUSES = '/view_warehouses',
  VIEW_CATEGORIES = '/view_categories',
  VIEW_ORDERS = '/view_orders',
  VIEW_SALES = '/view_sales',
  VIEW_STOCKS = '/view_stocks',
  SALES_MONTH = '/sales_month',
  SALES_2_WEEK = '/sales_2_week',
  SALES_WEEK = '/sales_week',
}

export enum CreateCommand {
  CREATE_PRODUCT = '/create_product',
  CREATE_WAREHOUSE = '/create_warehouse',
  CREATE_CATEGORY = '/create_category',
  CREATE_ORDER = '/create_order',
  CREATE_STOCK = '/create_stock',
}

export enum DeleteCommand {
  DELETE_PRODUCT = '/delete_product',
  DELETE_WAREHOUSE = '/delete_warehouse',
  DELETE_CATEGORY = '/delete_category',
}

export enum UpdateCommand {
  UPDATE_PRODUCT = '/edit_product',
}

export enum OtherCommand {
  START = '/start',
}
