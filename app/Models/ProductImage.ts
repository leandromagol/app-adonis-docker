import { DateTime } from 'luxon'
import { BaseModel, beforeFetch, beforeFind, column } from '@ioc:Adonis/Lucid/Orm'
import { softDelete, softDeleteQuery } from '../Services/SoftDelete'

export default class ProductImage extends BaseModel {
  public static table = 'product_images'

  @column({ isPrimary: true })
  public id: number

  @column()
  public productId: number

  @column()
  public url: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime

  @beforeFind()
  public static softDeletesFind = softDeleteQuery

  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery

  public async softDelete(column?: string) {
    console.log(column,'colum')
    const retorno = await softDelete(this, column)
    console.log(retorno,'colum')

  }

}
