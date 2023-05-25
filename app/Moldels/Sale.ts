import { BaseModel, beforeFind, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Order from './Order'
import Product from './Product'

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public quantity: number
  @column()
  public salesPrice: number
  @column()
  public totalSum: number
  @column()
  public commission: number
  @column()
  public paymentStatus: string
  @column.dateTime({ autoCreate: true })
  public paymentDate: DateTime
  @column.dateTime({ autoCreate: true })
  public shipmentDate: DateTime

  @column()
  public productId: number
  @column()
  public orderId: number

  @belongsTo(() => Product)
  public Product: BelongsTo<typeof Product>
  @belongsTo(() => Order)
  public Order: BelongsTo<typeof Order>

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
