import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('email').unique().notNullable()
      table.string('name').notNullable()
      table.string('password').notNullable()
      table.timestamps(true)
      table.dateTime("deleted_at").defaultTo(null);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
