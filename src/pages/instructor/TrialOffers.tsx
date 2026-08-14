import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInstructor } from '../../context/InstructorContext';
import './TrialOffers.css';

const TrialOffers: React.FC = () => {
  const navigate = useNavigate();
  const { offers } = useInstructor();

  const trialOffers = offers.filter((o) => o.category === 'trial' || !o.category);

  return (
    <div className="trial-offers-page">
      <div className="trial-offers-container">
        {/* Back Link */}
        <Link to="/instructor/offers" className="trial-offers-back-link">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </Link>

        {/* Page Title */}
        <h1 className="trial-offers-title">Trial offers</h1>

        {/* Offer Cards */}
        <div className="trial-offers-list">
          {trialOffers.map((offer) => (
            <div className="trial-offer-card" key={offer.id}>
              {/* Header Row */}
              <div className="trial-offer-card-header">
                <span
                  className={`trial-offer-status-badge ${
                    offer.status === 'approved'
                      ? 'badge-approved'
                      : 'badge-pending'
                  }`}
                >
                  {offer.status}
                </span>
                <div className="trial-offer-deadline">
                  <span className="deadline-label">DEADLINE</span>
                  <span className="deadline-value">{offer.deadline}</span>
                </div>
              </div>

              {/* Student Name */}
              <h2 className="trial-offer-student-name">{offer.studentName}</h2>

              {/* Subject */}
              <h3 className="trial-offer-subject">{offer.subject}</h3>

              {/* Description */}
              <p className="trial-offer-description">{offer.description}</p>

              {/* Footer: Attachment + View Button */}
              <div className="trial-offer-card-footer">
                <div className="trial-offer-attachment-chip">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  <span>{offer.filename}</span>
                </div>

                <button
                  className="trial-offer-view-btn"
                  onClick={() =>
                    navigate(`/instructor/view-offer/${offer.id}`, {
                      state: { task: offer },
                    })
                  }
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrialOffers;
