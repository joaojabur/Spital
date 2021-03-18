import knex from "knex";

const db = knex({
  client: "sqlite3",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "spital",
  },
  useNullAsDefault: true,
});

export default db;
