// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "spital",
      user: "postgres",
      password: "9090",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/src/database/migrations`,
    },
  },
};
