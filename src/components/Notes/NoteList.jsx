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
    setReminder,
    isLoading
  } = useNotes();

  // Ensure we're getting fresh references for each note
  const currentNotes = isArchiveView ? archivedNotes : notes;
  const displayNotes = currentNotes.reduce((unique, note) => {
    if (!unique.some(item => item._id === note._id)) {
      unique.push(note);
    }
    return unique;
  }, []);

  if (isLoading) {
    return <div className="empty-notes">Loading...</div>;
  }

  if (!displayNotes.length) {
    return (
      <div className="empty-notes">
        <i className="notes-icon"></i>
        <p>{isArchiveView ? 'No archived notes' : 'No notes yet. Click the + button to add one!'}</p>
      </div>
    );
  }


  return (
    <div className="notes-grid">
      {displayNotes.map((note) => (
        <div key={`note-wrapper-${note._id}`} className="note-wrapper">
          <NoteCard
            key={`note-${note._id}`}
            note={note}
            onDelete={() => deleteNote(note._id, isArchiveView)}
            onArchive={() => archiveNote(note._id)}
            onUnarchive={() => unarchiveNote(note._id)}
            onSetReminder={(date) => setReminder(note._id, date, isArchiveView)}
            isArchived={isArchiveView}
          />      
        </div>
      ))}
    </div>
  );
}

export default NoteList;