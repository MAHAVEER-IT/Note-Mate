// components/StickyNoteList.jsx
import { useContext } from 'react';
import { StickyNotesContext } from '../../context/StickyNotesContext';
import StickyNoteCard from './StickyNoteCard';

function StickyNoteList() {
  const { notes } = useContext(StickyNotesContext);

  return (
    <div className="notes-container">
      {notes.map(note => (
        <StickyNoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}

export default StickyNoteList;
