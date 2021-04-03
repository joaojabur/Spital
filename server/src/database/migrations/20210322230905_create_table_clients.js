exports.up = function (knex) {
  return knex.schema.createTable("clients", (table) => {
    table.increments("id");
    table.text("first_name").notNullable();
    table.text("last_name").notNullable();
    table.text("email").unique().notNullable();
    table.text("password").notNullable();
    table.text("phoneNumber");

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("clients");
};
