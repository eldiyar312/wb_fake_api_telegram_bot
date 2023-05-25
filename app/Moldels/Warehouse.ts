import { BaseModel, beforeFind, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Warehouse extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
  @column()
  public address: string
  @column()
  public country: string
  @column()
  public city: string

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
