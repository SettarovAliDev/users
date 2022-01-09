const db = require('../models');
const config = require('../config/auth.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const sendUserData = async (user, res) => {
  const token = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 2678400, // 1 month
  });

  const roles = await user.getRoles();

  const isAdmin = roles.find((role) => role.name === 'admin');

  res.status(200).send({
    userId: user.id,
    jwt: token,
    isAdmin: !!isAdmin,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    const roles = await Role.findAll({
      where: {
        name: {
          [Op.or]: req.body.roles,
        },
      },
    });

    await newUser.setRoles(roles);

    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res
        .status(404)
        .send({ message: `User ${req.body.email} not found` });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid password',
      });
    }

    sendUserData(user, res);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);

    sendUserData(user, res);
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};
