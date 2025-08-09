import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import './Notes.css';

function AddNoteModal({ onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedColor, setSelectedColor] = useState('note-yellow');
  const [error, setError] = useState('');
  const modalRef = useRef(null);
  const titleInputRef = useRef(null);

  const colors = [
    { class: 'note-yellow', label: 'Yellow' },
    { class: 'note-blue', label: 'Blue' },
    { class: 'note-green', label: 'Green' },
    { class: 'note-pink', label: 'Pink' },
    { class: 'note-purple', label: 'Purple' }
  ];

  // Focus on title input when modal opens
  useEffect(() => {
    if (titleInputRef.current) {
      setTimeout(() => {
        titleInputRef.current.focus();
      }, 300); // Small delay to ensure animation completes
    }
  }, []);

  // Handle mobile keyboard adjustments
  useEffect(() => {
    const handleResize = () => {
      // Adjust modal position based on viewport height if keyboard is open
      if (modalRef.current && window.innerHeight < 500) {
        modalRef.current.style.height = 'auto';
        modalRef.current.style.maxHeight = '90vh';
      } else if (modalRef.current) {
        modalRef.current.style.height = '';
        modalRef.current.style.maxHeight = '';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Note content cannot be empty!');
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
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
              placeholder="Enter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="modal-input"
              ref={titleInputRef}
            />
            <textarea
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (e.target.value.trim()) {
                  setError('');
                }
              }}
              className="modal-textarea"
              rows="5"
            />
            {error && <div className="error-message">{error}</div>}
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
            <button type="submit" className="note-save-button">
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNoteModal;