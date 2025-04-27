
import { useContext } from 'react';
import { StickyNotesContext } from '../../context/StickyNotesContext';
import './StickyNote.css';

function AddStickyNoteModal() {
  const { addNote } = useContext(StickyNotesContext);

  const handleAddNote = () => {
    const randomX = Math.random() * window.innerWidth * 0.6;
    const randomY = Math.random() * window.innerHeight * 0.6;
    const colors = ['yellow', 'pink', 'green', 'blue', 'purple', 'red', 'indigo'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    addNote(randomX, randomY, randomColor);
  };

  return (
    <button className="add-note-btn" onClick={handleAddNote}>
      ➕
    </button>
  );
}

export default AddStickyNoteModal;
