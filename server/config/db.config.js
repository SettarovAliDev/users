const realDatabase = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: 'postgres',
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

const testDatabase = {
  HOST: process.env.TEST_DB_HOST,
  USER: process.env.TEST_DB_USER,
  PASSWORD: process.env.TEST_DB_PASSWORD,
  DB: process.env.TEST_DB_NAME,
  dialect: 'postgres',
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

module.exports = {
  development: realDatabase,
  production: realDatabase,
  test: testDatabase,
};
