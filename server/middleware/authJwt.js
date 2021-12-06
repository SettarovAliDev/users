const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }

    const user = await User.findByPk(decoded.id);

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    const roles = await user.getRoles();

    const profiles = await user.getProfiles();

    req.user = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        roles,
        profiles,
      },
      jwt: token,
    };

    next();
  });
};

const authJwt = {
  verifyToken,
};
module.exports = authJwt;
