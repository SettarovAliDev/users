const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "itop1000",
  host: "localhost",
  port: 5432,
  database: "itop1000",
});

module.exports = pool;
