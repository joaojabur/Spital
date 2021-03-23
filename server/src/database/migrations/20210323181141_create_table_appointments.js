exports.up = function (knex) {
  return knex.schema.createTable("appointments", (table) => {
    table.integer("week_day").unique().notNullable();
    table.integer("from").unique().notNullable();
    table.integer("to").unique().notNullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("appointments");
};
