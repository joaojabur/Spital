exports.up = function (knex) {
  return knex.schema.createTable("appointments", (table) => {
    table.increments("id");

    table.text("date").notNullable();
    table.text("time").notNullable();

    table
      .integer("clientID")
      .references("clients.id")
      .notNullable()
      .onDelete("CASCADE");

    table
      .integer("scheduleID")
      .references("schedules.id")
      .notNullable()
      .onDelete("CASCADE");

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("appointments");
};
