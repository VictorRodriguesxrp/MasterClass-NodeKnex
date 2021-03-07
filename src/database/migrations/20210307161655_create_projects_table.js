const { onUpdateTrigger } = require('../../../knexfile')

exports.up = async (knex) => {
  return knex.schema.createTable('projects', (table) => {
    table.increments('id');
    table.text('title').notNullable();

    //relationship -> 1 usuário -> n Projetos
    table.integer('user_id')
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE')

    // table.timestamp('created_at').defaultTo(knex.fn.now());
    // table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamps(true, true)
  }).then(() => knex.raw(onUpdateTrigger('projects'))) 
};

exports.down = async (knex) => {
  return knex.schema.dropTable('projects');
};
