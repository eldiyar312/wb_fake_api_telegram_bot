import { BaseModel, BelongsTo, beforeFind, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Product from './Product'
import Warehouse from './Warehouse'

export default class Stock extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public quantity: number

  @column()
  public productId: number
  @column()
  public warehouseId: number

  @belongsTo(() => Product)
  public Product: BelongsTo<typeof Product>
  @belongsTo(() => Warehouse)
  public Warehouse: BelongsTo<typeof Warehouse>

  @beforeFind()
  public static ignoreDeleted(query) {
    query.whereNull('deleted_at')
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime
}
