import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProjectDelivered.css';

const ProjectDelivered: React.FC = () => {
  const [showToast, setShowToast] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Hide toast after some time (optional, based on screenshot it might just stay, but let's make it dismissable or auto-hide)
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 6000); // 6 seconds for this longer message

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pd-page">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="pd-toast">
          <div className="pd-toast-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <p className="pd-toast-text">
            Your project has been delivered successfully and is now 600 Egyptian pounds have been added to your account. You can withdraw them at any time.
          </p>
        </div>
      )}

      {/* Back Button */}
      <div className="pd-back-container">
        <Link to="/instructor/projects" className="pd-back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </Link>
      </div>

      {/* Main Card */}
      <div className="pd-card-wrapper">
        <div className="pd-card">
          
          <div className="pd-icon-box">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>

          <h1 className="pd-title">Project Delivered Successfully</h1>
          
          <p className="pd-subtitle">
            Your project has been submitted and delivered to the student.
          </p>
          
          <p className="pd-desc">
            The student will review your work and you will be notified once it is approved.
          </p>

          <button 
            className="pd-btn"
            onClick={() => navigate('/instructor/projects')}
          >
            Back to My Projects
          </button>
          
        </div>
      </div>

    </div>
  );
};

export default ProjectDelivered;
