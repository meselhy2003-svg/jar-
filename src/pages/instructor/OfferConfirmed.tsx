import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./OfferConfirmed.css";

const OfferConfirmed = () => {
  const [showToast, setShowToast] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="offer-confirmed-page">
      {/* Back */}
      <div className="offer-back-container">
        <Link to="/instructor/trial-offers" className="offer-back-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </Link>
      </div>

      {/* Toast notification */}
      {showToast && (
        <div className="offer-toast">
          <div className="offer-toast-icon">✓</div>
          <div className="offer-toast-text">
            The offer confirmed. The offer have been moved to student and now you can start the session
          </div>
        </div>
      )}

      {/* Success section */}
      <div className="offer-success-section">
        <div className="offer-success-icon">✓</div>

        <h1 className="offer-success-title">
          Confirmed<br />Successfully
        </h1>

        <p className="offer-success-subtitle">
          The offer confirmed. The offer have been moved to student<br />
          and now you can start the session.
        </p>

        <button className="offer-primary-btn" onClick={() => navigate('/instructor/projects')}>
          Go My projects &nbsp;→
        </button>
      </div>

      {/* Feature cards */}
      <div className="offer-features">
        <div className="offer-feature-card">
          <div className="offer-feature-icon">📄</div>
          <h3>Project Files</h3>
          <p>All reference documents have been indexed and are ready.</p>
        </div>

        <div className="offer-feature-card">
          <div className="offer-feature-icon">🕒</div>
          <h3>Deadline Tracking</h3>
          <p>Automated reminders set for your upcoming milestones.</p>
        </div>

        <div className="offer-feature-card">
          <div className="offer-feature-icon">💬</div>
          <h3>Collaboration</h3>
          <p>Direct channel opened for project-specific queries.</p>
        </div>
    </div>
  );
};

export default OfferConfirmed;