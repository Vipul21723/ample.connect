const { Pool } = require("pg");

const pool = new Pool({
  // user: "postgres",
  // host: "localhost",
  // database: "app_user_post",
  // password: "Vipul@1686",
  // port: 5433,
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;
