exports.up = function (knex) {
  return knex.schema.createTable("clients", (table) => {
    table.increments("id");

    table.string("phoneNumber");
    table
      .integer("userID")
      .references("id")
      .inTable('user')
      .notNullable()
      .onDelete("CASCADE");
    
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("clients");
};
