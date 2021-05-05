exports.up = function (knex) {
  return knex.schema.createTable("addresses", (table) => {
    table.increments("id");
    table.string("address").notNullable();
    table.integer("number");
    table.decimal("lat").notNullable();
    table.decimal("lon").notNullable();
    
    table
      .integer("userID")
      .references("users.id")
      .notNullable()
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("addresses");
};
