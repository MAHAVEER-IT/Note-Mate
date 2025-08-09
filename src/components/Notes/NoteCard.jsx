import React, { useState, useRef, useEffect } from 'react';
import { Trash, Archive, Bell, Calendar, X, Edit2, Check, CornerUpLeft, MoreVertical } from 'lucide-react';
import { useNotes } from '../../context/NotesContext';
import './Notes.css';

function NoteCard({ note, onDelete, onArchive, onUnarchive, onSetReminder, isArchived }) {
  const [isSettingReminder, setIsSettingReminder] = useState(false);
  const [reminderDate, setReminderDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const [showActions, setShowActions] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef(null);
  const longPressTimer = useRef(null);
  const { updateNote } = useNotes();
  
  // Detect if on mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleSetReminder = () => {
    onSetReminder(new Date(reminderDate).toISOString());
    setIsSettingReminder(false);
  };

  const handleSaveEdit = async () => {
    await updateNote(note._id, {
      title: editedTitle,
      content: editedContent
    });
    setIsEditing(false);
  };

  const formatReminderDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Handle long press
  const handleTouchStart = (e) => {
    // Don't trigger long press if user is interacting with scrollable content
    if (!isMobile || e.target.closest('.note-content')) return;
    
    longPressTimer.current = setTimeout(() => {
      setShowActions(true);
    }, 500); // 500ms for long press
  };
  
  const handleTouchEnd = () => {
    if (!isMobile) return;
    
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };
  
  const handleTouchMove = () => {
    if (!isMobile) return;
    
    // Cancel long press if user moves finger
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };
  
  // Close actions menu when clicking outside
  const handleClickOutside = (e) => {
    if (isMobile && showActions && !e.target.closest('.note-actions') && !e.target.closest('.more-options-button')) {
      setShowActions(false);
    }
  };
  
  // Handle click outside
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showActions, isMobile]);

  if (isEditing) {
    return (
      <div className={`note ${note.color}`}>
        <div className="note-header">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="edit-title-input"
            placeholder="Note Title"
            autoFocus
          />
          <div className="note-actions edit-actions">
            <button className="action-button save-edit" onClick={handleSaveEdit} title="Save Changes">
              <Check size={18} />
            </button>
            <button className="action-button cancel-edit" onClick={() => setIsEditing(false)} title="Cancel Editing">
              <X size={18} />
            </button>
          </div>
        </div>
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="edit-content-textarea"
          placeholder="Note content..."
        />
      </div>
    );
  }

  return (
    <div 
      className={`note ${note.color} ${showActions ? 'showing-actions' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchCancel={handleTouchEnd}
    >
      <div className="note-header">
        <h3 className="note-title">{note.title || 'Untitled Note'}</h3>
        {isMobile && !showActions && (
          <button className="more-options-button" onClick={() => setShowActions(true)}>
            <MoreVertical size={18} />
          </button>
        )}
      </div>
      <div className="note-content-container">
        <p ref={contentRef} className="note-content scrollable">{note.content}</p>
      </div>
      <div className="note-footer">
        <div className="note-timestamp">
          {new Date(note.createdAt).toLocaleString(undefined, { 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
        {(!isMobile || showActions) && (
          <div className="note-actions">
            {note.reminder && (
              <div className="reminder-badge" title={formatReminderDate(note.reminder)}>
                <Bell size={16} />
              </div>
            )}
            <button 
              className="action-button"
              onClick={() => {
                setIsEditing(true);
                setShowActions(false);
              }}
              title="Edit Note"
            >
              <Edit2 size={18} />
            </button>
            <button 
              className="action-button"
              onClick={() => {
                setIsSettingReminder(!isSettingReminder);
                if (isMobile) setShowActions(false);
              }}
              title="Set Reminder"
            >
              <Calendar size={18} />
            </button>
            <button 
              className="action-button"
              onClick={() => {
                isArchived ? onUnarchive() : onArchive();
                if (isMobile) setShowActions(false);
              }}
              title={isArchived ? "Unarchive Note" : "Archive Note"}
            >
              {isArchived ? <CornerUpLeft size={18} /> : <Archive size={18} />}
            </button>
            <button 
              className="delete-button" 
              onClick={() => {
                onDelete();
                if (isMobile) setShowActions(false);
              }} 
              title="Delete Note"
            >
              <Trash size={18} />
            </button>
          </div>
        )}
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