const AISchedule = require('../models/AISchedule');

const saveSchedule = async (req, res) => {
  try {
    const { prompt, schedule } = req.body;
    const aiSchedule = await AISchedule.create({
      user: req.user._id,
      prompt,
      schedule
    });
    res.status(201).json(aiSchedule);
  } catch (error) {
    res.status(400).json({ message: 'Error saving schedule', error: error.message });
  }
};

const getSchedules = async (req, res) => {
  try {
    const schedules = await AISchedule.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(schedules);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching schedules', error: error.message });
  }
};

module.exports = {
  saveSchedule,
  getSchedules
};
