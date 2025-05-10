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

const updateSchedule = async (req, res) => {
  try {
    const { prompt, schedule } = req.body;
    const scheduleId = req.params.id;

    const updatedSchedule = await AISchedule.findOneAndUpdate(
      { _id: scheduleId, user: req.user._id },
      { prompt, schedule },
      { new: true }
    );

    if (!updatedSchedule) {
      return res.status(404).json({ message: 'Schedule not found or unauthorized' });
    }

    res.json(updatedSchedule);
  } catch (error) {
    res.status(400).json({ message: 'Error updating schedule', error: error.message });
  }
};

module.exports = {
  saveSchedule,
  getSchedules,
  updateSchedule
};
