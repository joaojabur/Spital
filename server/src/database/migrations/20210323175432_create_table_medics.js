exports.up = function (knex) {
  return knex.schema.createTable("medics", (table) => {
    table.increments("id");
    table.text("first_name").unique().notNullable();
    table.text("last_name").unique().notNullable();
    table.text("email").unique().notNullable();
    table.text("password").unique().notNullable();
    table.text("phoneNumber").unique().notNullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());

    table.text("area").unique().notNullable();
    table.text("graduation").unique().notNullable();
    table.text("master_degree").unique().notNullable();
    table.text("doctorate_degree").unique().notNullable();

    table.text("cpf").unique().notNullable();
    table.text("rg").unique().notNullable();
    table.text("birth_date").unique().notNullable();

    table.text("card_name").unique().notNullable();
    table.text("card_number").unique().notNullable();
    table.text("card_expiration_date").unique().notNullable();
    table.text("card_verification_number").unique().notNullable();

    table.integer("week_day").unique().notNullable();
    table.integer("from").unique().notNullable();
    table.integer("to").unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.createTable("medics");
};
