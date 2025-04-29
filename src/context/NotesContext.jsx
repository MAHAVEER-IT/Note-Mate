import React, { createContext, useContext, useState, useEffect } from 'react';
import noteService from '../services/notesService';
import {getCurrentUser} from '../services/authService';

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const token = getCurrentUser()?.token; 

  const fetchNotes = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const allNotes = await noteService.getNotes(token);
      
      // Ensure unique notes by ID and get latest version
      const notesMap = new Map();
      allNotes.forEach(note => {
        if (!notesMap.has(note._id) || note.updatedAt > notesMap.get(note._id).updatedAt) {
          notesMap.set(note._id, note);
        }
      });
      
      const uniqueNotes = Array.from(notesMap.values());
      setNotes(uniqueNotes.filter(note => !note.isArchived));
      setArchivedNotes(uniqueNotes.filter(note => note.isArchived));
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
    
    // Cleanup function
    return () => {
      setNotes([]);
      setArchivedNotes([]);
    };
  }, [token]);

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

  const updateNote = async (id, updatedData) => {
    try {
      const updatedNote = await noteService.updateNote(id, updatedData, token);
      setNotes(prev => prev.map(note => 
        note._id === id ? updatedNote : note
      ));
    } catch (error) {
      console.error('Failed to update note:', error);
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
      updateNote,
      fetchNotes,
      isLoading
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
