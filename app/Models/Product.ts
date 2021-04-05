import { DateTime } from 'luxon'
import { BaseModel, beforeFetch, beforeFind, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ProductImage from 'App/Models/ProductImage'
import { softDelete, softDeleteQuery } from '../Services/SoftDelete'


export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public priece: number

  @column.dateTime()
  public published_at: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime

  @hasMany(() => ProductImage)
  public images: HasMany<typeof ProductImage>

  @beforeFind()
  public static softDeletesFind = softDeleteQuery

  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery

  public async softDelete(column?: string) {
    await softDelete(this, column)
  }

}
