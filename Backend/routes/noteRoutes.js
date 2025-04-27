const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { 
    getNotes, 
    createNote, 
    updateNote, 
    deleteNote,
    archiveNote,
    unarchiveNote,
    setReminder
} = require('../controllers/noteController');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getNotes)
    .post(createNote);

router.route('/:id')
    .put(updateNote)
    .delete(deleteNote);

router.put('/:id/archive', archiveNote);
router.put('/:id/unarchive', unarchiveNote);
router.put('/:id/reminder', setReminder);

module.exports = router;