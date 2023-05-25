import { BaseModel, beforeFind, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Product from './Product'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public quantity: number
  @column()
  public totalSum: number
  @column()
  public orderPrice: number
  @column.dateTime({ autoCreate: true })
  public orderDate: DateTime

  @column()
  public productId: number

  @belongsTo(() => Product)
  public Product: BelongsTo<typeof Product>

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
