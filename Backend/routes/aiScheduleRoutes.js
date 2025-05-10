const express = require('express');
const router = express.Router();
const { saveSchedule, getSchedules, updateSchedule } = require('../controllers/aiScheduleController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .post(saveSchedule)
  .get(getSchedules);

router.route('/:id')
  .put(updateSchedule);

module.exports = router;
