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
        <div className="sticky-notes__empty-state">
          <div className="empty-state__icon">📝</div>
          <h3 className="empty-state__title">No Sticky Notes Yet</h3>
          <p className="empty-state__description">
            Click the <span className="empty-state__highlight">+</span> button to create your first note!
          </p>
          {isMobile && (
            <p className="empty-state__tip">
              💡 Tip: Tap and drag to move notes, tap inside to edit
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