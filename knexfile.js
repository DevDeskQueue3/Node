module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      database: "devdesk",
      user: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
    },
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  testing: {
    client: "pg",
    connection: {
      host: "localhost",
      database: "devdesk-test",
      user: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
    },
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};
