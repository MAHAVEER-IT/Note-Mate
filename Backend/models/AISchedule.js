const mongoose = require('mongoose');

const scheduleItemSchema = new mongoose.Schema({
  time: String,
  activity: String
});

const aiScheduleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  prompt: {
    type: String,
    required: true
  },
  schedule: [scheduleItemSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AISchedule', aiScheduleSchema);
