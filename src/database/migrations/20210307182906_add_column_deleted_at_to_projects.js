
exports.up = knex => {
  return knex.schema.alterTable('projects', table => {
    table.timestamp('deleted_at');
  })
};

exports.down = knex => {
  return knex.schema.alterTable('projects', table => {
    table.dropColumn('deleted_at');
  })
};
