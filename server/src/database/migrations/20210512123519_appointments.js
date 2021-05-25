exports.up = function (knex) {
  return knex.schema.createTable("appointments", (table) => {
    table.increments("id");

    table.string("title").notNullable();
    table.string("date").notNullable();
    table.string("time").notNullable();
    table.string("price").notNullable();
    table.string("card_id").notNullable();

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
