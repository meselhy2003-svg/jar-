import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MyProjects.css';

const MyProjects: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="my-projects-page">
      <div className="container">

        {/* Back Link */}
        <div className="mp-back-container">
          <Link to="/instructor/dashboard" className="mp-back-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back
          </Link>
        </div>

        {/* Header */}
        <div className="mp-header">
          <h1 className="mp-title">My projects</h1>
          <p className="mp-subtitle">Choose the type of project you want to work on.</p>
        </div>

        {/* Two-card grid */}
        <div className="mp-grid">

          {/* Assignment Card */}
          <div className="mp-card">
            <div className="mp-icon-circle">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
            </div>

            <h3 className="mp-card-title">Assignment</h3>

            <p className="mp-card-description">
              Work on student assignments and submit your offer. Review requirements, deadlines, and project scopes.
            </p>

            <button
              className="mp-action-btn"
              onClick={() => navigate('/instructor/assignment-project')}
            >
              Assignments
            </button>
          </div>

          {/* Explain Card */}
          <div className="mp-card">
            <div className="mp-icon-circle">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
            </div>

            <h3 className="mp-card-title">Explain</h3>

            <p className="mp-card-description">
              Provide explanation sessions for students based on their needs. Host live tutoring or deep-dive concept reviews.
            </p>

            <button
              className="mp-action-btn"
              onClick={() => navigate('/instructor/explain-project')}
            >
              Explain
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyProjects;
