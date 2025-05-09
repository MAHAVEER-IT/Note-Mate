import { useContext } from 'react';
import { StickyNotesContext } from '../../context/StickyNotesContext';
import './StickyNote.css';

function AddStickyNoteModal() {
  const { addNote } = useContext(StickyNotesContext);

  const handleAddNote = async () => {
    try {
      const container = document.querySelector('.sticky-note-list');
      if (!container) {
        console.warn('Sticky-note-list container not found');
        return;
      }
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const noteWidth = 200; // From StickyNote.css
      const noteHeight = 150; // From StickyNote.css
      const randomX = Math.random() * (containerWidth - noteWidth);
      const randomY = Math.random() * (containerHeight - noteHeight);

      const colors = ['yellow', 'pink', 'green', 'blue', 'purple', 'red', 'indigo'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      await addNote(randomX, randomY, randomColor);
    } catch (err) {
      console.error('Failed to add sticky note:', err);
    }
  };

  return (
    <button className="add-note-btn" onClick={handleAddNote}>
      ➕
    </button>
  );
}

export default AddStickyNoteModal;