import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("doctors", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("surname").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("phoneNumber").notNullable();
    table.string("area").notNullable();
    table.string("graduation").notNullable();
    table.string("mestrado").notNullable();
    table.string("doutorado").notNullable();
    table.string("cpf").notNullable();
    table.string("rg").notNullable();
    table.string("birthday").notNullable();
    table.string("cardName").notNullable();
    table.string("cardNumber").notNullable();
    table.string("cardDueDate").notNullable();
    table.string("cardVerificationNumber").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("doctors");
}
