import React, { useState } from 'react';
import { Trash, Archive, Bell, Calendar, X } from 'lucide-react';
import './Notes.css';

function NoteCard({ note, onDelete, onArchive, onUnarchive, onSetReminder, isArchived }) {
  const [isSettingReminder, setIsSettingReminder] = useState(false);
  const [reminderDate, setReminderDate] = useState('');

  const handleSetReminder = () => {
    onSetReminder(new Date(reminderDate).toISOString());
    setIsSettingReminder(false);
  };

  const formatReminderDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className={`note ${note.color}`}>
      <div className="note-header">
        <h3 className="note-title">{note.title || 'Untitled Note'}</h3>
        <div className="note-actions">
          {note.reminder && (
            <div className="reminder-badge" title={formatReminderDate(note.reminder)}>
              <Bell size={16} />
            </div>
          )}
          <button 
            className="action-button"
            onClick={() => setIsSettingReminder(!isSettingReminder)}
            title="Set Reminder"
          >
            <Calendar size={18} />
          </button>
          <button 
            className="action-button"
            onClick={isArchived ? onUnarchive : onArchive}
            title={isArchived ? "Unarchive Note" : "Archive Note"}
          >
            <Archive size={18} />
          </button>
          <button className="delete-button" onClick={onDelete}>
            <Trash size={18} />
          </button>
        </div>
      </div>
      <p className="note-content">{note.content}</p>
      <div className="note-footer">
        <div className="note-timestamp">
          {new Date(note.timestamp).toLocaleString()}
        </div>
        {isSettingReminder && (
          <div className="reminder-picker">
            <input
              type="datetime-local"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
              className="reminder-input"
            />
            <div className="reminder-actions">
              <button 
                className="reminder-button set"
                onClick={handleSetReminder}
                disabled={!reminderDate}
              >
                Set
              </button>
              <button 
                className="reminder-button cancel"
                onClick={() => setIsSettingReminder(false)}
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteCard;