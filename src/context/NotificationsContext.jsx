import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNotes } from './NotesContext';

const NotificationsContext = createContext();

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const { notes } = useNotes();

  // Check for today's reminders
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayReminders = notes.filter(note => {
      if (!note.reminder) return false;
      const reminderDate = new Date(note.reminder);
      reminderDate.setHours(0, 0, 0, 0);
      return reminderDate.getTime() === today.getTime();
    });

    // Create notifications for today's reminders
    const reminderNotifications = todayReminders.map(note => ({
      id: `reminder-${note._id}`,
      message: `Reminder: ${note.title || 'Untitled Note'}`,
      type: 'info'
    }));

    setNotifications(reminderNotifications);
  }, [notes]);

  const addNotification = useCallback((message, type = 'info') => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications(prev => [notification, ...prev]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
}