exports.up = function (knex) {
  return knex.schema.createTable("medics", (table) => {
    table.increments("id");
    table.text("first_name").notNullable();
    table.text("last_name").notNullable();
    table.text("email").notNullable();
    table.text("password").notNullable();
    table.text("phoneNumber").notNullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());

    table.text("area").notNullable();
    table.text("graduation").notNullable();
    table.text("master_degree");
    table.text("doctorate_degree");

    table.text("cpf").notNullable();
    table.text("rg").notNullable();
    table.text("birth_date").notNullable();

    table.text("card_name");
    table.text("card_number");
    table.text("card_expiration_date");
    table.text("card_verification_number");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("medics");
};
