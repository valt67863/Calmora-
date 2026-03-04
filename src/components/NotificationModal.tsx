import React from 'react';
import { Folder, Sparkles } from 'lucide-react';

interface Notification {
  id: string;
  type: 'project' | 'ai' | 'system';
  title: string;
  time: string;
  unread: boolean;
}

interface Props {
  onMarkAllRead: () => void;
  onClose: () => void;
}

const NotificationModal: React.FC<Props> = ({ onMarkAllRead, onClose }) => {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'project',
      title: 'Brand Identity 2024 updated',
      time: '2h ago',
      unread: true
    },
    {
      id: '2',
      type: 'ai',
      title: 'AI generated summary ready',
      time: '5h ago',
      unread: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'project':
        return <Folder size={20} strokeWidth={1.5} />;
      case 'ai':
        return <Sparkles size={20} strokeWidth={1.5} />;
      default:
        return <Folder size={20} strokeWidth={1.5} />;
    }
  };

  return (
    <div className="notification-modal">
      
      {/* Header */}
      <div className="modal-header">
        <h3 className="modal-title">Notifications</h3>
        <button className="mark-read-btn" onClick={onMarkAllRead}>
          Mark all read
        </button>
      </div>

      {/* Content */}
      <div className="modal-content">
        
        {/* Today Section */}
        <div className="notification-section">
          <div className="section-label">TODAY</div>
          
          {notifications.map((notification) => (
            <div key={notification.id} className="notification-item">
              <div className={`notification-icon notification-${notification.type}`}>
                {getIcon(notification.type)}
              </div>
              <div className="notification-content">
                <div className="notification-title">{notification.title}</div>
                <div className="notification-time">{notification.time}</div>
              </div>
              {notification.unread && <div className="unread-dot" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
