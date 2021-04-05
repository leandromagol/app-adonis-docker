import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    //name, description, price e published_at;
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.decimal('priece',10,2).notNullable()
      table.dateTime('published_at').notNullable()
      table.timestamps(true)
      table.dateTime("deleted_at").defaultTo(null);

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
