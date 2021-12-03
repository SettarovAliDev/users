// HEROKU DATABASE
module.exports = {
  HOST: "ec2-79-125-30-28.eu-west-1.compute.amazonaws.com",
  USER: "kmkgpofleuyijs",
  PASSWORD: "4cd6b0d250aaf4aa7366016c9d07d289a06720fb848fb4378202af007a41eb46",
  DB: "dpv2vth5n0m7a",
  dialect: "postgres",
  ssl: {
    rejectUnauthorized: false,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// LOCAL DATABASE
// module.exports = {
//   HOST: "localhost",
//   USER: "postgres",
//   PASSWORD: "itop1000",
//   DB: "testdb",
//   dialect: "postgres",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };
