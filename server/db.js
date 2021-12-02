const Pool = require("pg").Pool;

const pool = new Pool({
  user: "kmkgpofleuyijs",
  password: "4cd6b0d250aaf4aa7366016c9d07d289a06720fb848fb4378202af007a41eb46",
  host: "ec2-79-125-30-28.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "dpv2vth5n0m7a",
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
