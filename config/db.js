const knex = require("knex");

const db = knex({
  client: "pg",
  connection:
    // {
    //   connectionString: process.env.DATABASE_URL,
    //   ssl: {
    //     rejectUnauthorized: false
    //   }
    // }
    {
      host: "127.0.0.1",
      database: "agfst",
      user: "seun",
      password: "0030335"
    }
});

module.exports = db;
