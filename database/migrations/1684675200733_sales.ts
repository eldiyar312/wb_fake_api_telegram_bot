import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Sales extends BaseSchema {
  protected tableName = 'sales'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('quantity')
      table.float('sales_price')
      table.float('total_sum')
      table.float('commission')
      table.string('payment_status')
      table.timestamp('payment_date', { useTz: false })
      table.timestamp('shipment_date', { useTz: false })

      table.integer('product_id').unsigned().references('products.id').onDelete('CASCADE')
      table.integer('order_id').unsigned().references('orders.id').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: false })
      table.timestamp('updated_at', { useTz: false })
      table.timestamp('deleted_at', { useTz: false })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
