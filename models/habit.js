//creating habit schema
const mongoose = require("mongoose");
const HabitStatus = require("./habitStatus");

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: [HabitStatus.schema],
});

//method to get status of a habit
habitSchema.methods.getStatusByDate = function (date) {
  return this.status.find((s) => s.date === date);
};

//method to altering the status of a habit
habitSchema.methods.setStatus = function (date, status) {
  let habitStatus = this.getStatusByDate(date);
  if (!habitStatus) {
    habitStatus = new HabitStatus({ date, status });
    this.status.push(habitStatus);
  } else {
    habitStatus.status = status;
  }
};

const Habit = mongoose.model("Habit", habitSchema);

//exporting model
module.exports = Habit;
