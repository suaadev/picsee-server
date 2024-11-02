const { Pool } = require("pg");
require("dotenv").config();

const connectionString = process.env.URL_DB_POSTGRES;
const ssl = process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false;

const pool = new Pool({
  connectionString,
  ssl,
  max: 90,
  allowExitOnIdle: true,
});

module.exports = pool;
