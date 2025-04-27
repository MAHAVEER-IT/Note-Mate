import React, { useState } from 'react';
import { X } from 'lucide-react';
import './Notes.css';

function AddNoteModal({ onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedColor, setSelectedColor] = useState('note-yellow');

  const colors = [
    { class: 'note-yellow', label: 'Yellow' },
    { class: 'note-blue', label: 'Blue' },
    { class: 'note-green', label: 'Green' },
    { class: 'note-pink', label: 'Pink' },
    { class: 'note-purple', label: 'Purple' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert('Note content cannot be empty!');
      return;
    }

    onSave({
      title: title.trim(),
      content: content.trim(),
      color: selectedColor,
      timestamp: new Date().toISOString()
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Add New Note</h3>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="modal-input"
            />
            <textarea
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="modal-textarea"
              rows="5"
            />
            <div className="color-picker">
              <label>Choose color:</label>
              <div className="color-options">
                {colors.map(color => (
                  <button
                    key={color.class}
                    type="button"
                    className={`color-option ${color.class} ${selectedColor === color.class ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color.class)}
                    aria-label={color.label}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="save-button">
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNoteModal;