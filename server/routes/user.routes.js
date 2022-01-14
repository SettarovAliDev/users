const controller = require('../controllers/user.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // Fetch all users
  app.get('/api/users', controller.fetchUsers);

  // Fetch single user
  app.get('/api/users/:userId', controller.fetchUser);

  // Edit user
  app.put('/api/users/:userId', controller.editUser);

  // Delete user
  app.delete('/api/users/:userId', controller.deleteUser);
};
