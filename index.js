//setting up derver
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
//getting coltrollers
const {
  getHabits,
  getHabitById,
  createHabit,
  updateHabit,
  deleteHabit,
} = require("./controllers/habitController");

const app = express();
//setting up template engine
app.set("view engine", "ejs");

//setting up public directory
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

//setting mongodb connection
const db = require("./utils/mongodb");

// Get all habits
app.get("/", getHabits);

// Get a habit by id
app.get("/habit/:id", getHabitById);

// Create a new habit
app.post("/", createHabit);

// Update a habit status
app.post("/habit/:id", updateHabit);

// Delete a habit
app.post("/:id", deleteHabit);

app.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});
