exports.up = function (knex) {
  return knex.schema.createTable("appointments", (table) => {
    table.increments("id");
    table.integer("year").notNullable();
    table.integer("month").notNullable();
    table.integer("week_day").notNullable();
    table.integer("time").notNullable();

    table
      .integer("medicID")
      .references("medics.id")
      .notNullable()
      .onDelete("CASCADE");

    table
      .integer("clientID")
      .references("clients.id")
      .notNullable()
      .onDelete("CASCADE");

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("appointments");
};
