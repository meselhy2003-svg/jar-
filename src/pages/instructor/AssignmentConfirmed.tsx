import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AssignmentConfirmed.css';

type FeatureCard = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const featureCards: FeatureCard[] = [
  {
    title: 'Project Files',
    description: 'Access and manage all files related to this assignment.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
      </svg>
    ),
  },
  {
    title: 'Deadline Tracking',
    description: 'Keep track of milestones and submission deadlines.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
  },
  {
    title: 'Collaboration',
    description: 'Communicate with instructors and teammates efficiently.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        <path d="M8 10h8"></path>
        <path d="M8 14h5"></path>
      </svg>
    ),
  },
];

const AssignmentConfirmed: React.FC = () => {
  const location = useLocation();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fromAssignmentTasks = location.state?.assignment;

    if (fromAssignmentTasks) {
      setShowNotification(true);

      const timeout = window.setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      return () => window.clearTimeout(timeout);
    }
  }, [location.state]);

  return (
    <div className="assignment-tasks-page assignment-confirmed-page">
      <div className="assignment-tasks-container assignment-confirmed-container">
        <Link to="/instructor/assignment-tasks" className="assignment-back-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </Link>

        {showNotification && (
          <div className="confirmation-notification-banner">
            <div className="confirmation-notification-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <span>Project fee is pending and will be confirmed after review.</span>
          </div>
        )}

        <section className="confirmation-success-card">
          <div className="confirmation-success-icon" aria-hidden="true">
            <div className="confirmation-success-icon-inner">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>

          <h1 className="confirmation-title">Assignment Confirmed Successfully</h1>
          <p className="confirmation-subtitle">
            Your submission has been received and is now ready for the next stage of the project workflow.
          </p>

          <button className="btn-confirm-assignment confirmation-primary-button" type="button">
            <span>Go to My Project</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </section>

        <section className="confirmation-feature-grid" aria-label="Assignment confirmation features">
          {featureCards.map((card) => (
            <article className="confirmation-feature-card" key={card.title}>
              <div className="confirmation-feature-icon">{card.icon}</div>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};

export default AssignmentConfirmed;
