import { useContext, useEffect, useState } from 'react';
import { StickyNotesContext } from '../../context/StickyNotesContext';
import StickyNoteCard from './StickyNoteCard';
import './StickyNote.css';

function StickyNoteList() {
  const { notes, loading, error } = useContext(StickyNotesContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    console.log('StickyNoteList re-rendered with notes:', notes); // Debug log
  }, [notes]);

  if (loading) return <div className="sticky-note-loading">Loading sticky notes...</div>;
  if (error) return <div className="sticky-note-error">Error: {error}</div>;

  return (
    <div className="sticky-notes__list">
      {notes.length === 0 ? (
        <div className="sticky-notes__empty-state" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: isMobile ? '80%' : '60%',
          padding: '1rem',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '8px'
        }}>
          <p>No sticky notes yet. Click the + button to add one!</p>
          {isMobile && (
            <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
              Tap and drag to move notes. Tap inside to edit text.
            </p>
          )}
        </div>
      ) : (
        notes.map((note) => (
          <StickyNoteCard key={note._id} note={note} />
        ))
      )}
    </div>
  );
}

export default StickyNoteList;