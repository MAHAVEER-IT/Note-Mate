const mongoose = require('mongoose');

const stickyNoteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  x: {
    type: Number,
    required: true,
    default: 100
  },
  y: {
    type: Number,
    required: true,
    default: 100
  },
  color: {
    type: String,
    required: true,
    default: 'yellow',
    enum: ['yellow', 'pink', 'green', 'blue', 'purple', 'red', 'indigo']
  },
  content: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('StickyNote', stickyNoteSchema);