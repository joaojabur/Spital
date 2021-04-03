exports.up = function (knex) {
  return knex.schema.createTable("appointments", (table) => {
    table.increments("id");
    table.integer("week_day").notNullable();
    table.integer("from").notNullable();
    table.integer("to").notNullable();
    table
      .integer("medic_id")
      .references("medics.id")
      .notNullable()
      .onDelete("CASCADE");

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("appointments");
};
