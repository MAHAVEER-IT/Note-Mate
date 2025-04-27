const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        default: 'Untitled Note'
    },
    content: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: 'note-yellow'
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    reminder: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);