// context/StickyNotesContext.jsx
import { createContext, useState } from 'react';

export const StickyNotesContext = createContext();

export function StickyNoteProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [noteCount, setNoteCount] = useState(0);

  const addNote = (x = 100, y = 100, color = 'yellow') => {
    const newNote = {
      id: noteCount + 1,
      x,
      y,
      color,
      content: ''
    };
    setNotes(prev => [...prev, newNote]);
    setNoteCount(prev => prev + 1);
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const updateNote = (id, updatedFields) => {
    setNotes(prev =>
      prev.map(note => (note.id === id ? { ...note, ...updatedFields } : note))
    );
  };

  return (
    <StickyNotesContext.Provider value={{ notes, addNote, deleteNote, updateNote }}>
      {children}
    </StickyNotesContext.Provider>
  );
}
