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
      expiresIn: 2678400, // 1 month
    });

    const roles = await user.getRoles();

    const isAdmin = roles.find((role) => role.name === "admin");

    req.user = {
      userId: user.id,
      jwt: token,
      isAdmin: !!isAdmin,
    };

    next();
  });
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
