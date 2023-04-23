//setting model
const mongoose = require('mongoose');

//creating model for tracking status
const habitStatusSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['done', 'not-done', 'none'],
    required: true,
  },
});

const HabitStatus = mongoose.model('HabitStatus', habitStatusSchema);

//exporting model
module.exports = HabitStatus;
