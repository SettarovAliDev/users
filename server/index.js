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

// DATABASE
// const db = require("./models");
// const Role = db.role;

// DELETE TABLES AND CREATE NEW
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync Database with { force: true }");
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

if (process.env.NODE_ENV === 'production') {
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

const start = () => {
  try {
    if (process.env.NODE_ENV !== 'test') {
      app.listen(port, (error) => {
        if (error) throw error;
        console.log(`App listening on port ${port}`);
      });
    }
  } catch (e) {
    console.error(e);
  }
};

start();

module.exports = app;
