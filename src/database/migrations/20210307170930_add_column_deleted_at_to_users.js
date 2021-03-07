
exports.up = knex => {
  return knex.schema.alterTable('users', table => {
    table.timestamp('deleted_at');
  })
};

exports.down = knex => {
  return knex.schema.alterTable('users', table => {
    table.dropColumn('deleted_at');
  })
};
