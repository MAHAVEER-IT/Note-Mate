const Note = require('../models/Note');


const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const createNote = async (req, res) => {
    try {
        const { title, content, color } = req.body;
        
        const note = await Note.create({
            user: req.user._id,
            title,
            content,
            color
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ message: 'Error creating note', error: error.message });
    }
};


const updateNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedNote);
    } catch (error) {
        res.status(400).json({ message: 'Error updating note', error: error.message });
    }
};


const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await note.deleteOne();
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting note', error: error.message });
    }
};


const archiveNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        note.isArchived = true;
        const updatedNote = await note.save();

        res.json(updatedNote);
    } catch (error) {
        res.status(400).json({ message: 'Error archiving note', error: error.message });
    }
};


const unarchiveNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        note.isArchived = false;
        const updatedNote = await note.save();

        res.json(updatedNote);
    } catch (error) {
        res.status(400).json({ message: 'Error unarchiving note', error: error.message });
    }
};


const setReminder = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        note.reminder = req.body.reminder;
        const updatedNote = await note.save();

        res.json(updatedNote);
    } catch (error) {
        res.status(400).json({ message: 'Error setting reminder', error: error.message });
    }
};

module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
    archiveNote,
    unarchiveNote,
    setReminder
};