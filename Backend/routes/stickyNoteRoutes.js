const express = require('express');
const router = express.Router();
const {
  createStickyNote,
  getStickyNotes,
  updateStickyNote,
  deleteStickyNote
} = require('../controllers/stickyNoteController');

const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .post(createStickyNote)
  .get(getStickyNotes);

router.route('/:id')
  .put(updateStickyNote)
  .delete(deleteStickyNote);

module.exports = router;