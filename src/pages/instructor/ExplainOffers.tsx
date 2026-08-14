import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInstructor } from '../../context/InstructorContext';
import './ExplainOffers.css';

type TabType = 'video' | 'live';

const ExplainOffers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('video');
  const navigate = useNavigate();
  const { offers } = useInstructor();

  const videoOffers = offers.filter((o) => o.category === 'explain-video');
  const liveOffers = offers.filter((o) => o.category === 'explain-live');

  return (
    <div className="explain-offers-page">
      <div className="explain-offers-container">
        {/* Back */}
        <Link to="/instructor/offers" className="eo-back-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </Link>

        {/* Title */}
        <h1 className="eo-title">offers</h1>

        {/* Tabs */}
        <div className="eo-tabs">
          <button
            className={`eo-tab ${activeTab === 'video' ? 'eo-tab--active' : ''}`}
            onClick={() => setActiveTab('video')}
          >
            Explaintion by video
            {activeTab === 'video' && <span className="eo-tab-dot" />}
          </button>
          <button
            className={`eo-tab ${activeTab === 'live' ? 'eo-tab--active' : ''}`}
            onClick={() => setActiveTab('live')}
          >
            Explaintion by live
            {activeTab === 'live' && <span className="eo-tab-dot" />}
          </button>
        </div>

        {/* ── VIDEO TAB ── */}
        {activeTab === 'video' && (
          <div className="eo-list">
            {videoOffers.map((offer) => (
              <div className="eo-video-card" key={offer.id}>
                {/* Status badge */}
                <span className={`eo-badge ${offer.status === 'approved' ? 'eo-badge--approved' : 'eo-badge--pending'}`}>
                  {offer.status}
                </span>

                {/* Student row */}
                <div className="eo-student-row">
                  <div className="eo-avatar">{offer.initials}</div>
                  <div>
                    <p className="eo-student-name">{offer.studentName}</p>
                    <p className="eo-posted-time">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {offer.postedAt}
                    </p>
                  </div>
                </div>

                {/* Title */}
                <p className="eo-offer-title">{offer.title}</p>

                {/* Attached materials */}
                <p className="eo-materials-label">ATTACHED MATERIALS</p>
                <div className="eo-pdf-chips-row">
                  {(offer.pdfs || ['PDF 1', 'PDF 2', 'PDF 3']).map((pdf) => (
                    <button key={pdf} className="eo-pdf-chip">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      {pdf}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </button>
                  ))}
                  <button className="eo-view-more">View More</button>
                </div>

                {/* Deadline */}
                <p className="eo-deadline-row">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Deadline: {offer.deadline}
                </p>

                <div className="eo-cta-row">
                  <button
                    className={`eo-go-btn ${offer.status === 'approved' ? 'eo-go-btn--active' : 'eo-go-btn--pending'}`}
                    onClick={() =>
                      offer.status === 'approved' &&
                      navigate('/instructor/explain-project', { state: { tab: 'video' } })
                    }
                  >
                    GO TO MY PROJECT
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── LIVE TAB ── */}
        {activeTab === 'live' && (
          <div className="eo-list">
            {liveOffers.map((offer) => (
              <div className="eo-live-card" key={offer.id}>
                {/* Header: badge + deadline */}
                <div className="eo-live-card-header">
                  <span className={`eo-badge ${offer.status === 'approved' ? 'eo-badge--approved' : 'eo-badge--pending'}`}>
                    {offer.status}
                  </span>
                  <div className="eo-live-deadline">
                    <span className="eo-live-deadline-label">DEADLINE</span>
                    <span className="eo-live-deadline-value">{offer.deadline}</span>
                  </div>
                </div>

                {/* Student name */}
                <h2 className="eo-live-student">{offer.studentName}</h2>

                {/* Subject */}
                <h3 className="eo-live-subject">{offer.subject}</h3>

                {/* Description */}
                <p className="eo-live-description">{offer.description}</p>

                {/* Footer: file chip + View button */}
                <div className="eo-live-footer">
                  <div className="eo-live-attachment">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                    <span>{offer.filename}</span>
                  </div>
                  <button
                    className="eo-live-view-btn"
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
        )}
      </div>
    </div>
  );
};

export default ExplainOffers;
