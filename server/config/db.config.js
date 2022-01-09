module.exports = {
  development: {
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
  },
  test: {
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
  },
  production: {
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
  },
};
