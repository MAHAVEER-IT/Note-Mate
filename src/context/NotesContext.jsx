import React, { createContext, useContext, useState, useEffect } from 'react';
import noteService from '../services/notesService'; 
const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  
  const token = localStorage.getItem('token'); 
  const fetchNotes = async () => {
    try {
      const allNotes = await noteService.getNotes(token);
      const activeNotes = allNotes.filter(note => !note.isArchived);
      const archiveNotes = allNotes.filter(note => note.isArchived);
      setNotes(activeNotes);
      setArchivedNotes(archiveNotes);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (newNote) => {
    try {
      const savedNote = await noteService.createNote(newNote, token);
      setNotes(prev => [savedNote, ...prev]);
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  };

  const deleteNote = async (id, isArchived = false) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await noteService.deleteNote(id, token);
        if (isArchived) {
          setArchivedNotes(prev => prev.filter(note => note._id !== id));
        } else {
          setNotes(prev => prev.filter(note => note._id !== id));
        }
      } catch (error) {
        console.error('Failed to delete note:', error);
      }
    }
  };

  const archiveNote = async (id) => {
    try {
      await noteService.archiveNote(id, token);
      fetchNotes();
    } catch (error) {
      console.error('Failed to archive note:', error);
    }
  };

  const unarchiveNote = async (id) => {
    try {
      await noteService.unarchiveNote(id, token);
      fetchNotes();
    } catch (error) {
      console.error('Failed to unarchive note:', error);
    }
  };

  const setReminder = async (id, reminderDate, isArchived = false) => {
    try {
      await noteService.setReminder(id, reminderDate, token);
      fetchNotes();
    } catch (error) {
      console.error('Failed to set reminder:', error);
    }
  };

  return (
    <NotesContext.Provider value={{ 
      notes, 
      archivedNotes, 
      addNote, 
      deleteNote, 
      archiveNote, 
      unarchiveNote, 
      setReminder,
      fetchNotes
    }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}
