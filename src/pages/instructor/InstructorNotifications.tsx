import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInstructor } from '../../context/InstructorContext';
import type { NotificationItem } from '../../context/InstructorContext';
import './InstructorNotifications.css';

const olderNotificationsMock: NotificationItem[] = [
  {
    id: 'old-1',
    type: 'payment',
    title: 'Payout Completed',
    description: '1,500 EGP has been transferred to your bank account.',
    time: '1 week ago',
    read: true,
  },
  {
    id: 'old-2',
    type: 'project-assigned',
    title: 'New Assignment Review',
    description: 'A student requested a review for Data Structures assignment.',
    time: '2 weeks ago',
    read: true,
  },
];

const InstructorNotifications: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, markAllNotificationsRead } = useInstructor();
  const [showOlder, setShowOlder] = useState(false);

  // Mark all as read when opening notifications page
  useEffect(() => {
    markAllNotificationsRead();
  }, []);

  const displayList = showOlder
    ? [...notifications, ...olderNotificationsMock]
    : notifications;

  const renderIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'payment':
        return (
          <div className="notif-icon-wrap icon-cyan">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="6" width="20" height="12" rx="2" />
              <circle cx="12" cy="12" r="2" />
              <path d="M6 12h.01M18 12h.01" />
            </svg>
          </div>
        );
      case 'offer-accepted':
        return (
          <div className="notif-icon-wrap icon-navy">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="16 9 10 15 7 12" />
            </svg>
          </div>
        );
      case 'offer-submitted':
        return (
          <div className="notif-icon-wrap icon-blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9" />
              <polyline points="22,6 12,13 2,6" />
              <path d="m19 16 3 3-3 3" />
              <path d="M22 19h-6" />
            </svg>
          </div>
        );
      case 'project-assigned':
        return (
          <div className="notif-icon-wrap icon-folder">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
              <line x1="12" y1="11" x2="12" y2="17" />
              <line x1="9" y1="14" x2="15" y2="14" />
            </svg>
          </div>
        );
      case 'verified':
        return (
          <div className="notif-icon-wrap icon-shield">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="instructor-notifications-page">
      <div className="instructor-notifications-container">
        {/* Back Link */}
        <button className="notif-back-btn" onClick={() => navigate(-1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>

        {/* Header */}
        <div className="notif-header">
          <h1 className="notif-title">Notifications</h1>
          <p className="notif-subtitle">Stay updated with your tasks and earnings.</p>
        </div>

        {/* Notifications List */}
        <div className="notif-list">
          {displayList.map((item) => (
            <div
              key={item.id}
              className={`notif-card ${item.isNew ? 'notif-card-new' : ''}`}
            >
              <div className="notif-card-left">
                {renderIcon(item.type)}
                <div className="notif-content">
                  <div className="notif-title-row">
                    <h3 className="notif-item-title">{item.title}</h3>
                    {item.isNew && <span className="notif-new-badge">New</span>}
                  </div>
                  <p className="notif-item-desc">{item.description}</p>
                  <span className="notif-item-time">{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Older Notifications Button */}
        <div className="notif-footer-action">
          <button
            className="notif-view-older-btn"
            onClick={() => setShowOlder((prev) => !prev)}
          >
            {showOlder ? 'Show Less' : 'View Older Notifications'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorNotifications;
