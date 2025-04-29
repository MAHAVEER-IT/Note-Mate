import React from 'react';
import { X } from 'lucide-react';
import { useNotes } from '../../context/NotesContext';
import './RemindersModal.css';

function RemindersModal({ isOpen, onClose }) {
  const { notes } = useNotes();

  const todayReminders = notes.filter(note => {
    if (!note.reminder) return false;
    const today = new Date();
    const reminderDate = new Date(note.reminder);
    return (
      today.getDate() === reminderDate.getDate() &&
      today.getMonth() === reminderDate.getMonth() &&
      today.getFullYear() === reminderDate.getFullYear()
    );
  });

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="reminders-modal">
        <div className="reminders-header">
          <h2>Today's Reminders</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="reminders-content">
          {todayReminders.length === 0 ? (
            <p className="no-reminders">No reminders for today</p>
          ) : (
            <div className="reminders-list">
              {todayReminders.map(note => (
                <div key={note._id} className="reminder-item">
                  <h3>{note.title || 'Untitled Note'}</h3>
                  <p className="reminder-time">
                    {new Date(note.reminder).toLocaleTimeString()}
                  </p>
                  <p className="reminder-content">{note.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default RemindersModal;