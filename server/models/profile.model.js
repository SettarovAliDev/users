module.exports = (sequelize, Sequelize) => {
  const Profile = sequelize.define("profiles", {
    name: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    birthdate: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
  });

  return Profile;
};
