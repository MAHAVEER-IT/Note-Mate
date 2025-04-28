import { useContext, useEffect } from 'react';
import { StickyNotesContext } from '../../context/StickyNotesContext';
import StickyNoteCard from './StickyNoteCard';
import './StickyNote.css';

function StickyNoteList() {
  const { notes, loading, error } = useContext(StickyNotesContext);

  useEffect(() => {
    console.log('StickyNoteList re-rendered with notes:', notes); // Debug log
  }, [notes]);

  if (loading) return <div>Loading sticky notes...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log('Rendering StickyNoteList with notes:', notes); // Debug log

  return (
    <div className="sticky-note-list">
      {notes.length === 0 ? (
        <div>No sticky notes yet. Click the + button to add one!</div>
      ) : (
        notes.map((note) => (
          <StickyNoteCard key={note._id} note={note} />
        ))
      )}
    </div>
  );
}

export default StickyNoteList;