//setting up controllers
const Habit = require("../models/habit");
const { formatDate, getDatesArray } = require("../utils/dateUtils");
const NUM_DAYS = 7;

//creating habit
exports.createHabit = async (req, res) => {
  const { name } = req.body;
  const habit = new Habit({ name });
  try {
    await habit.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

//getting all habits
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find();
    res.render("index", { habits });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

//getting single habit using id
exports.getHabitById = async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  const today = formatDate(new Date());
  const dates = getDatesArray(7);
  const statuses = dates.map((date) => {
    const status = habit.getStatusByDate(date);
    return status ? status.status : "none";
  });
  res.render("habit", { habit, dates, statuses, today });
};

//updating status of a habit
exports.updateHabit = async (req, res) => {
  const { status, date } = req.body;
  try {
    const habit = await Habit.findById(req.params.id);
    habit.setStatus(date, status);
    await habit.save();
    res.redirect(`/habit/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

//deleting a habit
exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (habit) {
      await Habit.findByIdAndDelete(req.params.id);
      res.redirect("/");
    } else {
      res.status(400).json({ message: "Habit not exists" });
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};
