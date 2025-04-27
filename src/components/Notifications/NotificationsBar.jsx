import React from 'react';
import { X, AlertCircle, Info, CheckCircle } from 'lucide-react';
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
          <p className="notification-message">{notification.message}</p>
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