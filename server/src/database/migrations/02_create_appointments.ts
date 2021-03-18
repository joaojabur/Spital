import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("appointments", (table) => {
    table.increments("id").primary();

    table.integer("week_day").notNullable();
    table
      .integer("appointment_area")
      .notNullable()
      .references("area")
      .inTable("doctors")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.integer("cost").notNullable();

    table
      .integer("doctor_id")
      .notNullable()
      .references("id")
      .inTable("doctors")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("appointments");
}
