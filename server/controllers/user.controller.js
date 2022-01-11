const { user } = require('../models');
const db = require('../models');

const User = db.user;
const Profile = db.profile;
const Role = db.role;

const Op = db.Sequelize.Op;

exports.fetchUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: [Role, Profile] });

    if (!users) throw new Error();

    res.status(200).send(users);
  } catch (error) {
    res.status(404).send({ message: error.message });
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

    if (!user) throw new Error();

    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

exports.editUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: [Role, Profile],
    });

    const roles = await Role.findAll({
      where: {
        name: {
          [Op.or]: req.body.roles,
        },
      },
    });

    user.set({
      username: req.body.username,
      email: req.body.email,
    });

    await user.save();
    await user.setRoles(roles);

    const newUser = await User.findOne({
      where: {
        id: userId,
      },
      include: [Role, Profile],
    });

    res.status(200).send(newUser);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    const profiles = await user.getProfiles();
    const profileIds = profiles.map((profile) => profile.id);

    await Profile.destroy({ where: { id: profileIds } });

    await user.destroy();

    res.status(200).send({ userId });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
