export enum ViewCommand {
  VIEW_PRODUCTS = '/view_products',
  VIEW_WAREHOUSES = '/view_warehouses',
  VIEW_CATEGORIES = '/view_categories',
  VIEW_ORDERS = '/view_orders',
  VIEW_SALES = '/view_sales',
}

export enum CreateCommand {
  CREATE_PRODUCT = '/create_product',
  CREATE_WAREHOUSE = '/create_warehouse',
  CREATE_CATEGORY = '/create_category',
}

export enum DeleteCommand {
  DELETE_PRODUCT = '/delete_product',
  DELETE_WAREHOUSE = '/delete_warehouse',
  DELETE_CATEGORY = '/delete_category',
}

export enum UpdateCommand {
  UPDATE_PRODUCT = '/edit_product',
}
