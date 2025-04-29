import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  fetchStickyNotes,
  createStickyNote,
  updateStickyNote,
  deleteStickyNote,
} from '../services/StickyNoteService';

export const StickyNotesContext = createContext();

const DEBOUNCE_DELAY = 500;

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

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
      await deleteStickyNote(id);
      setNotes(prev => prev.filter(note => note._id !== id));
      setError(null);
    } catch (err) {
      console.error('Error deleting note:', err);
      setError(err.message);
    }
  };

  const updateNoteLocal = (id, updatedFields) => {
    setNotes(prev =>
      prev.map(note => 
        note._id === id 
          ? { ...note, ...updatedFields }
          : note
      )
    );
  };

  const debouncedUpdateNote = useCallback(
    debounce(async (id, updatedFields) => {
      try {
        const updatedNote = await updateStickyNote(id, updatedFields);
        console.log('Note updated on server:', updatedNote);
      } catch (err) {
        console.error('Error updating note:', err);
        setError(err.message);
      }
    }, DEBOUNCE_DELAY),
    []
  );

  const updateNote = async (id, updatedFields) => {
    // Immediately update local state
    updateNoteLocal(id, updatedFields);

    try {
      // For position updates, update silently without loading state
      if (updatedFields.x !== undefined || updatedFields.y !== undefined) {
        await updateStickyNote(id, updatedFields);
      } else {
        // For content updates, use debounce
        debouncedUpdateNote(id, updatedFields);
      }
      setError(null);
    } catch (err) {
      console.error('Error updating note:', err);
      setError(err.message);
      // Revert local state on error
      const originalNote = notes.find(note => note._id === id);
      if (originalNote) {
        updateNoteLocal(id, originalNote);
      }
    }
  };

  // Add index to notes
  const notesWithIndex = useMemo(() => {
    return notes.map((note, index) => ({
      ...note,
      displayIndex: index + 1
    }));
  }, [notes]);

  // Prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    notes: notesWithIndex,
    addNote,
    deleteNote,
    updateNote,
    loading,
    error
  }), [notesWithIndex, loading, error]);

  return (
    <StickyNotesContext.Provider value={contextValue}>
      {children}
    </StickyNotesContext.Provider>
  );
}