import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TrialSuccess.css';

const TrialSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(true);

  // Auto-hide toast notification after 6 seconds (or keep visible)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(true); // Keep visible as in reference screenshot
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="trial-success-page">
      {/* Toast Notification (Top Right) */}
      {showToast && (
        <div className="toast-notification">
          <div className="toast-check-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <p className="toast-text">
            Your trial video has been submitted successfully and is under review by the student.
          </p>
        </div>
      )}

      <div className="trial-success-container">
        {/* Back Link */}
        <Link to="/instructor/trial-tasks" className="success-back-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </Link>

        {/* Hero Section */}
        <div className="success-hero-content">
          {/* Checkmark Icon Box */}
          <div className="success-icon-badge">
            <div className="check-icon-inner">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>

          {/* Title & Subtitle */}
          <h1 className="success-title">Trial Submitted Successfully</h1>
          <p className="success-subtitle">
            Your trial video has been uploaded and is now waiting for student approval.
          </p>

          {/* Center Light Blue Box */}
          <div className="success-info-card">
            <div className="info-row-box">
              <div className="info-circle-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <p className="info-notice-text">
                You will be notified once the student reviews your trial and makes a decision. This usually takes 24-48 hours.
              </p>
            </div>

            {/* Go to Offers Button */}
            <button className="btn-go-offers" onClick={() => navigate('/instructor/offers')}>
              <span>Go to Offers</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          {/* Status Badges */}
          <div className="success-status-badges">
            <div className="status-badge-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>PENDING REVIEW</span>
            </div>

            <div className="status-badge-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>SECURE UPLOAD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialSuccess;
