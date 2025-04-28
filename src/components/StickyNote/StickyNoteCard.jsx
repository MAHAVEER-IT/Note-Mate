import { useContext, useRef, useEffect } from 'react';
import { StickyNotesContext } from '../../context/StickyNotesContext';
import Draggable from 'react-draggable';
import './StickyNote.css';

function StickyNoteCard({ note }) {
  const { deleteNote, updateNote } = useContext(StickyNotesContext);
  const nodeRef = useRef(null); // Ref for Draggable to avoid findDOMNode warning

  // Debug log to verify note data
  useEffect(() => {
    console.log('StickyNoteCard rendering note:', note);
    console.log('Position:', { x: note.x, y: note.y });
  }, [note]);

  const handleStop = (e, data) => {
    console.log('Drag stopped, new position:', { x: data.x, y: data.y });
    updateNote(note._id, { x: data.x, y: data.y });
  };

  const handleChangeContent = (e) => {
    updateNote(note._id, { content: e.target.value });
  };

  const handleChangeColor = () => {
    const colors = ['yellow', 'pink', 'green', 'blue', 'purple', 'red', 'indigo'];
    const currentIndex = colors.indexOf(note.color);
    const nextColor = colors[(currentIndex + 1) % colors.length];
    updateNote(note._id, { color: nextColor });
  };

  return (
    <Draggable
      bounds="parent"
      defaultPosition={{ x: note.x || 0, y: note.y || 0 }}
      onStop={handleStop}
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className={`note ${note.color || 'yellow'}`}>
        <div className="note-header">
          <span>Note #{note._id}</span>
          <div>
            <button onClick={handleChangeColor}>🎨</button>
            <button onClick={() => deleteNote(note._id)}>❌</button>
          </div>
        </div>
        <textarea
          className="note-content"
          value={note.content || ''}
          onChange={handleChangeContent}
          placeholder="Write your note here..."
        />
      </div>
    </Draggable>
  );
}

export default StickyNoteCard;