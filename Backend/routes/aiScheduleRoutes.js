const express = require('express');
const router = express.Router();
const { saveSchedule, getSchedules } = require('../controllers/aiScheduleController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .post(saveSchedule)
  .get(getSchedules);

module.exports = router;
