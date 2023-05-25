import { BaseModel, beforeFind, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Category from './Category'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
  @column()
  public price: number
  @column()
  public currency: string
  @column()
  public brand: string
  @column()
  public color: string
  @column()
  public size: string
  @column()
  public gender: string

  @column()
  public categoryId: number

  @belongsTo(() => Category)
  public Category: BelongsTo<typeof Category>

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
