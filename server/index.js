const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// SCRIPT TO CLEAR DATABASE
// const db = require("./models");
// const Role = db.role;
// db.sequelize.sync({ force: true }).then(() => {
//   initial();
// });

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user",
//   });

//   Role.create({
//     id: 2,
//     name: "admin",
//   });
// }

// ROUTES
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/profile.routes')(app);

let server;

if (process.env.NODE_ENV !== 'test') {
  server = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

module.exports = {
  app,
  server,
};
