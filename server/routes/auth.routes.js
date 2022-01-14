const { verifySignUp } = require('../middleware');
const { verifyToken } = require('../middleware');
const controller = require('../controllers/auth.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // SignUp user
  app.post(
    '/api/auth/signup',
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup,
    controller.signin
  );

  // SignIn user
  app.post('/api/auth/signin', controller.signin);

  // Login user by token
  app.get('/api/auth/login', [verifyToken], controller.login);
};
