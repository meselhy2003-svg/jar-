import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './InstructorOffers.css';

const InstructorOffers: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="offers-page">
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
        <div className="offers-header">
          <h1 className="offers-title">Offers</h1>
          <p className="offers-subtitle">
            Choose the type of offers you want to work on.
          </p>
        </div>

        {/* Offers 2-Card Grid */}
        <div className="offers-grid">
          {/* Card 1: Trial */}
          <div className="offer-card">
            <div className="offer-icon-circle">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                <path d="M9 12l2 2 4-4"></path>
              </svg>
            </div>
            <h3 className="offer-card-title">Trial</h3>
            <button className="offer-action-btn" onClick={() => navigate('/instructor/trial-offers')}>
              Explain
            </button>
          </div>

          {/* Card 2: Explain */}
          <div className="offer-card">
            <div className="offer-icon-circle">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
            </div>
            <h3 className="offer-card-title">Explain</h3>
            <button className="offer-action-btn" onClick={() => navigate('/instructor/explain-offers')}>
              Explain
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorOffers;
