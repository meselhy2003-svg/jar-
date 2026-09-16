import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AvailableTasks.css';

const AvailableTasks: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="available-tasks-page">
      <div className="container">
        {/* Back Link */}
        <div className="back-btn-container">
          <Link to="/instructor/dashboard" className="back-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back
          </Link>
        </div>

        {/* Section Header */}
        <div className="tasks-header">
          <h1 className="tasks-title">Available Tasks</h1>
          <p className="tasks-subtitle">
            Select a task type to begin reviewing student submissions or manage direct offers.
          </p>
        </div>

        {/* Tasks 3-Card Grid */}
        <div className="tasks-grid">
          {/* Card 1: Trial */}
          <div className="task-card">
            <div className="task-icon-circle">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                <path d="M9 12l2 2 4-4"></path>
              </svg>
            </div>
            <h3 className="task-card-title">Trial</h3>
            <button className="task-action-btn" onClick={() => navigate('/instructor/trial-tasks')}>
              Explain
            </button>
          </div>

          {/* Card 2: Assignment */}
          <div className="task-card">
            <div className="task-icon-circle">
              <img src="/pdf-icon.png" alt="PDF" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            </div>
            <h3 className="task-card-title">Assignment</h3>
            <button className="task-action-btn" onClick={() => navigate('/instructor/assignment-tasks')}>
              Assignments
            </button>
          </div>

          {/* Card 3: Explain */}
          <div className="task-card">
            <div className="task-icon-circle">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
            </div>
            <h3 className="task-card-title">Explain</h3>
            <button className="task-action-btn" onClick={() => navigate('/instructor/explain-tasks')}>
              Explain
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableTasks;
