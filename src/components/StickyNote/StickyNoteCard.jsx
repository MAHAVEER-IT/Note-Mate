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

  useEffect(() => {
    const calculateBounds = () => {
      const navbarHeight = 60; // Height of your navbar
      const noteWidth = 200; // Width of sticky note
      const noteHeight = 150; // Height of sticky note
      
      setBounds({
        left: 0,
        top: navbarHeight,
        right: window.innerWidth - noteWidth,
        bottom: window.innerHeight - noteHeight
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
    if (e.target.tagName.toLowerCase() === 'textarea') {
      return false;
    }
    setIsDragging(true);
  };

  const handleStop = (e, data) => {
    setIsDragging(false);
    // Ensure position stays within bounds
    const x = Math.max(bounds.left, Math.min(bounds.right, data.x));
    const y = Math.max(bounds.top, Math.min(bounds.bottom, data.y));
    
    setPosition({ x, y });
    if (x !== note.x || y !== note.y) {
      updateNote(note._id, { x, y });
    }
  };

  const handleChangeContent = (e) => {
    const newContent = e.target.value;
    setLocalContent(newContent);
    updateNote(note._id, { content: newContent });
  };

  const handleChangeColor = () => {
    const colors = ['yellow', 'pink', 'green', 'blue', 'purple', 'red', 'indigo'];
    const currentIndex = colors.indexOf(note.color);
    const nextColor = colors[(currentIndex + 1) % colors.length];
    updateNote(note._id, { color: nextColor });
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
      cancel=".note-content"
    >
      <div 
        ref={nodeRef} 
        className={`note ${note.color || 'yellow'} ${isDragging ? 'dragging' : ''}`}
      >
        <div className="note-header">
          <span>Note #{note.displayIndex}</span>
          <div>
            <button onClick={handleChangeColor}>🎨</button>
            <button onClick={handleDelete}>❌</button>
          </div>
        </div>
        <textarea
          ref={textareaRef}
          className="note-content"
          value={localContent}
          onChange={handleChangeContent}
          placeholder="Write your note here..."
        />
      </div>
    </Draggable>
  );
}

export default StickyNoteCard;