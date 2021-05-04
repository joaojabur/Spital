exports.up = function (knex) {
  return knex.schema.createTable("medics", (table) => {
    table.increments("id");
    
    table.string("phoneNumber").notNullable();

    table.text("area").notNullable();
    table.text("graduation").notNullable();
    table.text("master_degree");
    table.text("doctorate_degree");

    table.text("cpf").notNullable();
    table.text("rg").notNullable();
    table.text("birth_date").notNullable();

    table
      .integer("address")
      .references("id")
      .inTable('Address')
      .notNullable()
      .onDelete("CASCADE");
    table
      .integer("userID")
      .references("id")
      .inTable('user')
      .notNullable()
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("medics");
};
