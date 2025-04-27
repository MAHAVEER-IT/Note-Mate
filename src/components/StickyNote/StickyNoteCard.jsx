import { useContext } from 'react';
import { StickyNotesContext } from '../../context/StickyNotesContext';
import Draggable from 'react-draggable';
import './StickyNote.css';

function StickyNoteCard({ note }) {
  const { deleteNote, updateNote } = useContext(StickyNotesContext);

  const handleStop = (e, data) => {
    updateNote(note.id, { x: data.x, y: data.y });
  };

  const handleChangeContent = (e) => {
    updateNote(note.id, { content: e.target.value });
  };

  const handleChangeColor = () => {
    const colors = ['yellow', 'pink', 'green', 'blue', 'purple', 'red', 'indigo'];
    const currentIndex = colors.indexOf(note.color);
    const nextColor = (currentIndex + 1) % colors.length;
    updateNote(note.id, { color: colors[nextColor] });
  };

  return (
    <Draggable
      bounds="parent"
      defaultPosition={{ x: note.x, y: note.y }}
      onStop={handleStop}
    >
      <div className={`note ${note.color}`}>
        <div className="note-header">
          <span>Note #{note.id}</span>
          <div>
            <button onClick={handleChangeColor}>🎨</button>
            <button onClick={() => deleteNote(note.id)}>❌</button>
          </div>
        </div>
        <textarea
          className="note-content"
          value={note.content}
          onChange={handleChangeContent}
          placeholder="Write your note here..."
        />
      </div>
    </Draggable>
  );
}

export default StickyNoteCard;
