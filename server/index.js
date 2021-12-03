const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const pool = require("./db");

const app = express();
const port = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// ROUTES
// Create user
app.post("/users", async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;
    const isAdminBit = Number(isAdmin);
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password, isAdmin) VALUES($1, $2, $3, $4) RETURNING *",
      [username, email, password, isAdminBit]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

// Login user
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
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

// Get all users
app.get("/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Get user
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Update user
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    const updateUser = await pool.query(
      "UPDATE users SET username = $1 WHERE user_id = $2",
      [username, id]
    );
    res.json(`User ${id} was updated`);
  } catch (error) {
    console.error(error.message);
  }
});

// Delete user
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query(
      "DELETE FROM users WHERE user_id = $1",
      [id]
    );
    res.json(`User ${id} was deleted`);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});
