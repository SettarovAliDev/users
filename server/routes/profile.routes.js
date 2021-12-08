const controller = require("../controllers/profile.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create profile
  app.post("/api/profiles", controller.addProfile);

  // Edit profile
  app.put("/api/profiles/:profileId", controller.editProfile);

  // Delete profile
  app.delete("/api/profiles/:profileId", controller.deleteProfile);
};
