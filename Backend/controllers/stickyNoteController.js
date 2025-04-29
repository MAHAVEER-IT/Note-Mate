const StickyNote = require('../models/StickyNote');

const createStickyNote = async (req, res) => {
  const { x, y, color, content } = req.body;
  const userId = req.user._id;

  const stickyNote = await StickyNote.create({
    userId,
    x: x || 100,
    y: y || 100,
    color: color || 'yellow',
    content: content || ''
  });

  res.status(201).json(stickyNote);
}

const getStickyNotes = async (req, res) => {
  const stickyNotes = await StickyNote.find({ userId: req.user._id });
  res.json(stickyNotes);
}

const updateStickyNote = async (req, res) => {
  const stickyNote = await StickyNote.findById(req.params.id);

  if (!stickyNote) {
    res.status(404);
    throw new Error('Sticky note not found');
  }

  if (stickyNote.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this note');
  }

  const updatedNote = await StickyNote.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedNote);
};

const deleteStickyNote = async (req, res) => {
  try {
    const stickyNote = await StickyNote.findById(req.params.id);

    if (!stickyNote) {
      return res.status(404).json({ message: 'Sticky note not found' });
    }

    if (stickyNote.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this note' });
    }

    await StickyNote.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sticky note removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sticky note', error: error.message });
  }
};

module.exports = {
  createStickyNote,
  getStickyNotes,
  updateStickyNote,
  deleteStickyNote
};