import React from 'react';
import { X, AlertCircle, Info, CheckCircle, Bell } from 'lucide-react';
import { useNotifications } from '../../context/NotificationsContext';
import './NotificationsBar.css';

function NotificationsBar() {
  const { notifications, removeNotification } = useNotifications();

  const getIcon = (type) => {
    switch (type) {
      case 'error':
        return <AlertCircle size={20} />;
      case 'success':
        return <CheckCircle size={20} />;
      case 'reminder':
        return <Bell size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="notifications-container">
      {notifications.map(notification => (
        <div 
          key={notification.id}
          className={`notification ${notification.type}`}
        >
          <div className="notification-icon">
            {getIcon(notification.type)}
          </div>
          <div className="notification-content">
            <p className="notification-message">{notification.message}</p>
            {notification.content && (
              <p className="notification-details">{notification.content}</p>
            )}
            {notification.reminder && (
              <p className="notification-time">
                {new Date(notification.reminder).toLocaleTimeString()}
              </p>
            )}
          </div>
          <button
            className="notification-close"
            onClick={() => removeNotification(notification.id)}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default NotificationsBar;