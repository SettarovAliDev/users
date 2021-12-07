const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Fetch users
  app.get("/api/users", controller.fetchUsers);

  // Fetch user
  app.get("/api/users/:userId", controller.fetchUser);
};
