const { user } = require("../models");
const db = require("../models");

const User = db.user;
const Profile = db.profile;
const Role = db.role;

exports.fetchUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: [Role, Profile] });

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.fetchUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: [Role, Profile],
    });

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
