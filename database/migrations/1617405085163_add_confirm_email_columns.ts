import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.boolean('email_confimed')
      table.string('confirm_email_token').defaultTo(0);
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('email_confimed')
      table.dropColumn('confirm_email_token')
    })
  }
}
