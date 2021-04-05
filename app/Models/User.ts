import { DateTime } from 'luxon'
import {
  afterCreate,
  BaseModel,
  beforeFetch,
  beforeFind,
  beforeSave,
  column,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Route from '@ioc:Adonis/Core/Route'
import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import { softDelete, softDeleteQuery } from '../Services/SoftDelete'

// import { HasMany } from '@ioc:Adonis/Lucid/Relations'
import Product from 'App/Models/Product'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public email_confimed: number

  @column()
  public confirm_email_token: string

  @hasMany(() => Product)
  public products: HasMany<typeof Product>

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @afterCreate()
  public static async sendConfirmEmail(user: User) {
    const route = await Route.makeSignedUrl('AuthController.confirmEmail',
      { params: { token: user.confirm_email_token } })
    const app_url = Env.get('APP_URL', 'http://127.0.0.1:3333')
    await Mail.sendLater((message) => {
      message.from('leandromagoliveira@gmail.com')
        .to(user.email)
        .subject('email confirmation')
        .htmlView('emails/confirm_email', {
          user: user,
          url: app_url + route,
        })
    })

  }

  @beforeFind()
  public static softDeletesFind = softDeleteQuery

  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery

  public async softDelete(column?: string) {
    await softDelete(this, column)
  }
}
