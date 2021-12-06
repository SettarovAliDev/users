const controller = require("../controllers/profile.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/profiles", controller.addProfile);

  app.get("/api/profiles/current", controller.getUserProfiles);
};
