import { createContext, useState, useEffect } from 'react';
import {
  fetchStickyNotes,
  createStickyNote,
  updateStickyNote,
  deleteStickyNote,
} from '../services/StickyNoteService';

export const StickyNotesContext = createContext();

export function StickyNoteProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch notes on mount
  useEffect(() => {
    const loadNotes = async () => {
      setLoading(true);
      try {
        const fetchedNotes = await fetchStickyNotes();
        setNotes(fetchedNotes);
        console.log('Initial notes fetched:', fetchedNotes); // Debug log
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadNotes();
  }, []);

  const addNote = async (x, y, color) => {
    try {
      setLoading(true);
      const newNote = await createStickyNote({ x, y, color, content: '' });
      console.log('New note from API:', newNote); // Debug log
      setNotes((prev) => {
        const updatedNotes = [...prev, { ...newNote }]; // Spread to ensure new object
        console.log('Updated notes state:', updatedNotes); // Debug log
        return updatedNotes;
      });
      setError(null);
      return newNote;
    } catch (err) {
      setError(err.message);
      console.error('Error adding note:', err); // Debug log
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    try {
      setLoading(true);
      await deleteStickyNote(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateNote = async (id, updatedFields) => {
    try {
      setLoading(true);
      const updatedNote = await updateStickyNote(id, updatedFields);
      setNotes((prev) =>
        prev.map((note) => (note._id === id ? { ...updatedNote } : note))
      );
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StickyNotesContext.Provider
      value={{ notes, addNote, deleteNote, updateNote, loading, error }}
    >
      {children}
    </StickyNotesContext.Provider>
  );
}