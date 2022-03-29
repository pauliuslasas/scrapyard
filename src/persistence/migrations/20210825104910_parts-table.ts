import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('ScrapParts', (tbl) => {
    tbl.increments('id');
    tbl.text('name');
    tbl.text('type');
    tbl.integer('age');
    tbl.integer('rustiness', 100);
    tbl.integer('quality', 100);
    tbl.integer('price', 200);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists('ScrapParts');
}
