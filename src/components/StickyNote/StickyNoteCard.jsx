import { useContext, useRef, useEffect, useState } from 'react';
import { StickyNotesContext } from '../../context/StickyNotesContext';
import Draggable from 'react-draggable';
import './StickyNote.css';

function StickyNoteCard({ note }) {
  const { deleteNote, updateNote } = useContext(StickyNotesContext);
  const nodeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [bounds, setBounds] = useState({});
  const textareaRef = useRef(null);
  const [localContent, setLocalContent] = useState(note.content || '');
  const [position, setPosition] = useState({ x: note.x || 0, y: note.y || 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isPinned, setIsPinned] = useState(note.pinned || false);

  useEffect(() => {
    // Check if device is mobile or touch-based
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const calculateBounds = () => {
      const navbarHeight = 60; // Height of your navbar
      // Dynamically get note dimensions based on CSS media queries
      let noteWidth = 200; // Default width
      let noteHeight = 150; // Default height
      
      // Adjust dimensions based on screen width
      if (window.innerWidth <= 360) {
        noteWidth = 110;
        noteHeight = 90;
      } else if (window.innerWidth <= 480) {
        noteWidth = 130;
        noteHeight = 100;
      } else if (window.innerWidth <= 576) {
        noteWidth = 140;
        noteHeight = 110;
      } else if (window.innerWidth <= 768) {
        noteWidth = 160;
        noteHeight = 120;
      } else if (window.innerWidth <= 1024) {
        noteWidth = 180;
        noteHeight = 130;
      }
      
      // Calculate safe boundaries
      const rightBoundary = window.innerWidth - noteWidth - 5; // Add small margin
      const bottomBoundary = window.innerHeight - noteHeight - 5;
      
      setBounds({
        left: 5, // Small margin from left
        top: navbarHeight,
        right: Math.max(rightBoundary, 10), // Ensure minimum space even on small screens
        bottom: Math.max(bottomBoundary, navbarHeight + 10)
      });
    };

    calculateBounds();
    window.addEventListener('resize', calculateBounds);
    return () => window.removeEventListener('resize', calculateBounds);
  }, []);

  useEffect(() => {
    setPosition({ x: note.x || 0, y: note.y || 0 });
  }, [note.x, note.y]);

  const handleStart = (e) => {
    // Prevent dragging when interacting with textarea
    if (e.target.tagName.toLowerCase() === 'textarea' || 
        e.target.tagName.toLowerCase() === 'button') {
      return false;
    }
    
    // On mobile, make sure we're really trying to drag (avoid accidental drags)
    if (isMobile && e.type === 'touchstart') {
      const touchStart = e.touches[0].clientY;
      const touchThreshold = 10; // Pixels to move before considering it a drag
      
      const handleTouchMove = (moveEvent) => {
        const touchMove = moveEvent.touches[0].clientY;
        if (Math.abs(touchMove - touchStart) > touchThreshold) {
          setIsDragging(true);
          document.removeEventListener('touchmove', handleTouchMove);
        }
      };
      
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
      document.addEventListener('touchend', () => {
        document.removeEventListener('touchmove', handleTouchMove);
      }, { once: true });
    } else {
      setIsDragging(true);
    }
  };

  const handleStop = (e, data) => {
    setIsDragging(false);
    
    // Calculate the new position within bounds
    const x = Math.max(bounds.left, Math.min(bounds.right, data.x));
    const y = Math.max(bounds.top, Math.min(bounds.bottom, data.y));
    
    setPosition({ x, y });
    
    // Only update if position actually changed
    if (x !== note.x || y !== note.y) {
      updateNote(note._id, { x, y });
    }
  };

  const handleChangeContent = (e) => {
    const newContent = e.target.value;
    setLocalContent(newContent);
    
    // Debounce updates on mobile to improve performance
    if (isMobile) {
      clearTimeout(textareaRef.current.timeout);
      textareaRef.current.timeout = setTimeout(() => {
        updateNote(note._id, { content: newContent });
      }, 500);
    } else {
      updateNote(note._id, { content: newContent });
    }
  };

  const handleChangeColor = () => {
    const colors = ['yellow', 'pink', 'green', 'blue', 'purple', 'red', 'indigo'];
    const currentIndex = colors.indexOf(note.color || 'yellow');
    const nextColor = colors[(currentIndex + 1) % colors.length];
    updateNote(note._id, { color: nextColor });
  };

  const handleTogglePin = () => {
    const newPinnedState = !isPinned;
    setIsPinned(newPinnedState);
    updateNote(note._id, { pinned: newPinnedState });
  };

  const handleDelete = async () => {
    try {
      await deleteNote(note._id);
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  return (
    <Draggable
      bounds={bounds}
      position={position}
      onStart={handleStart}
      onStop={handleStop}
      nodeRef={nodeRef}
      cancel=".sticky-note__content, .sticky-note__btn"
      grid={isMobile ? [10, 10] : [1, 1]}
      disabled={isPinned}
    >
      <div 
        ref={nodeRef} 
        className={`sticky-note sticky-note--${note.color || 'yellow'} ${isDragging ? 'sticky-note--dragging' : ''} ${isPinned ? 'sticky-note--pinned' : ''}`}
        aria-label={`Sticky note ${note.displayIndex}`}
      >
        <div className="sticky-note__header">
          <span>
            📌 Note #{note.displayIndex}
          </span>
          <div className="sticky-note__buttons">
            <button 
              onClick={handleTogglePin} 
              aria-label={isPinned ? "Unpin note" : "Pin note"}
              title={isPinned ? "Unpin note" : "Pin note"}
              className={`sticky-note__btn sticky-note__btn--pin ${isPinned ? 'pinned' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={isPinned ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 17v5"></path>
                <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1v3.76Z"></path>
              </svg>
            </button>
            <button 
              onClick={handleChangeColor} 
              aria-label="Change color"
              title="Change color"
              className="sticky-note__btn sticky-note__btn--color"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7Z"></path>
              </svg>
            </button>
            <button 
              onClick={handleDelete} 
              aria-label="Delete note"
              title="Delete note"
              className="sticky-note__btn sticky-note__btn--delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
        <textarea
          ref={textareaRef}
          className="sticky-note__content"
          value={localContent}
          onChange={handleChangeContent}
          placeholder="Write your note here..."
          aria-label="Note content"
        />
      </div>
    </Draggable>
  );
}

export default StickyNoteCard;