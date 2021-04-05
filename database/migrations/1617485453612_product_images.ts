import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProductImages extends BaseSchema {
  protected tableName = 'product_images'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('url').notNullable()
      table.integer('product_id').notNullable()
      table.timestamps(true)
      table.dateTime("deleted_at").defaultTo(null);

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
