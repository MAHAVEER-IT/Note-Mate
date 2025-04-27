import React from 'react';
import NoteCard from './NoteCard';
import { useNotes } from '../../context/NotesContext';
import './Notes.css';

function NoteList({ isArchiveView = false }) {
  const { 
    notes, 
    archivedNotes, 
    deleteNote, 
    archiveNote, 
    unarchiveNote, 
    setReminder 
  } = useNotes();

  const displayNotes = isArchiveView ? archivedNotes : notes;

  if (displayNotes.length === 0) {
    return (
      <div className="empty-notes">
        <i className="notes-icon"></i>
        <p>{isArchiveView ? 'No archived notes' : 'No notes yet. Click the + button to add one!'}</p>
      </div>
    );
  }

  return (
    <div className="notes-grid">
      {displayNotes.map((note, index) => (
        <NoteCard
        key={note._id}
        note={note}
        onDelete={() => deleteNote(note._id, isArchiveView)}
        onArchive={() => archiveNote(note._id)}
        onUnarchive={() => unarchiveNote(note._id)}
        onSetReminder={(date) => setReminder(note._id, date, isArchiveView)}
        isArchived={isArchiveView}
      />      
      ))}
    </div>
  );
}

export default NoteList;