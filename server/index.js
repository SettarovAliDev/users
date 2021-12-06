const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
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
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/profile.routes")(app);

// Create user
// app.post("/api/users", async (req, res) => {
//   try {
//     const { username, email, password, isAdmin } = req.body;
//     const isAdminBit = Number(isAdmin);
//     const newUser = await pool.query(
//       "INSERT INTO users (username, email, password, isAdmin) VALUES($1, $2, $3, $4) RETURNING *",
//       [username, email, password, isAdminBit]
//     );
//     res.json(newUser.rows[0]);
//   } catch (error) {
//     console.error(error.message);
//     res.json(error.message);
//   }
// });

// Get user
// app.get("/api/users/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
//     res.json(user.rows[0]);
//   } catch (error) {
//     console.error(error.message);
//   }
// });

// Update user
// app.put("/api/users/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { username } = req.body;
//     const updateUser = await pool.query(
//       "UPDATE users SET username = $1 WHERE id = $2",
//       [username, id]
//     );
//     res.json(`User ${id} was updated`);
//   } catch (error) {
//     console.error(error.message);
//   }
// });

// Delete user
// app.delete("/api/users/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [
//       id,
//     ]);
//     res.json(`User ${id} was deleted`);
//   } catch (error) {
//     console.error(error.message);
//   }
// });

if (process.env.NODE_ENV === "production") {
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`App listening on port ${port}`);
});
