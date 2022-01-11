require('dotenv').config();

const config = require('../config/db.config.js');

const envConfig = config[process.env.NODE_ENV];

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  envConfig.DB,
  envConfig.USER,
  envConfig.PASSWORD,
  {
    host: envConfig.HOST,
    dialect: envConfig.dialect,
    operatorsAliases: false,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },

    pool: {
      max: envConfig.pool.max,
      min: envConfig.pool.min,
      acquire: envConfig.pool.acquire,
      idle: envConfig.pool.idle,
    },

    logging: false,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.model.js')(sequelize, Sequelize);
db.profile = require('../models/profile.model.js')(sequelize, Sequelize);
db.role = require('../models/role.model.js')(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});
db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});

db.profile.belongsToMany(db.user, {
  through: 'user_profiles',
  foreignKey: 'profileId',
  otherKey: 'userId',
});
db.user.belongsToMany(db.profile, {
  through: 'user_profiles',
  foreignKey: 'userId',
  otherKey: 'profileId',
});

db.ROLES = ['user', 'admin'];

module.exports = db;
