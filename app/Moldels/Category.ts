import { BaseModel, beforeFind, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

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
