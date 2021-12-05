const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false, // <<< Fix heroku bug
    },
  },

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.profile = require("../models/profile.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.profile.belongsToMany(db.user, {
  through: "user_profiles",
  foreignKey: "profileId",
  otherKey: "userId",
});
db.user.belongsToMany(db.profile, {
  through: "user_profiles",
  foreignKey: "userId",
  otherKey: "profileId",
});

db.ROLES = ["user", "admin"];

module.exports = db;
