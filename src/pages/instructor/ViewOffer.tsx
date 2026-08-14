import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useInstructor } from '../../context/InstructorContext';
import './ViewOffer.css';

interface TrialOffer {
  id: string;
  status: 'pending' | 'approved';
  studentName: string;
  subject: string;
  deadline: string;
  description: string;
  filename: string;
}

const mockOffersMap: Record<string, TrialOffer> = {
  '1': {
    id: '1',
    status: 'pending',
    studentName: 'A.Amr',
    subject: 'Data Structures',
    deadline: '25 March 2026',
    description: 'Need help understanding linked lists and implementation.',
    filename: 'trial_task.pdf',
  },
  '2': {
    id: '2',
    status: 'approved',
    studentName: 'S.Ahmed',
    subject: 'Software Architecture',
    deadline: '28 March 2026',
    description:
      'Reviewing microservices architecture patterns and event-driven systems. Need a deep dive into Kafka versus RabbitMQ implementations..',
    filename: 'architecture_review_draft.pdf',
  },
  'l1': {
    id: 'l1',
    status: 'pending',
    studentName: 'A. Amr',
    subject: 'Data Structures',
    deadline: '25 March 2026',
    description: 'Need help understanding linked lists and implementation.',
    filename: 'trial_task.pdf',
  },
  'l2': {
    id: 'l2',
    status: 'approved',
    studentName: 'S.Ahmed',
    subject: 'Software Architecture',
    deadline: '28 March 2026',
    description:
      'Reviewing microservices architecture patterns and event-driven systems. Need a deep dive into Kafka versus RabbitMQ implementations..',
    filename: 'architecture_review_draft.pdf',
  },
};

interface ChatMessage {
  id: number;
  sender: 'student' | 'instructor';
  text: string;
  time: string;
}

const initialMessages: ChatMessage[] = [
  { id: 1, sender: 'student', text: 'Hello! How have you been feeling since our last session?', time: '7:02 PM' },
  { id: 2, sender: 'instructor', text: 'A bit anxious about the upcoming project, but practicing the breathing techniques.', time: '7:04 PM' },
  { id: 3, sender: 'student', text: "That's good to hear. We'll focus on workplace stress management today.", time: '7:06 PM' },
];

const ViewOffer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const passedOffer = location.state?.task as TrialOffer | undefined;
  const offer: TrialOffer = passedOffer || (id && mockOffersMap[id]) || mockOffersMap['1'];

  const isApproved = offer.status === 'approved';

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [chatInput, setChatInput] = useState('');

  // Proposal state
  const [numSessions, setNumSessions] = useState<number>(3);
  const [hoursPerSession, setHoursPerSession] = useState<number>(1);
  const hourlyRate = 250;
  const totalTime = Math.max(1, numSessions * hoursPerSession);
  const totalPrice = totalTime * hourlyRate;

  // Session confirmation state
  const [firstSessionDate, setFirstSessionDate] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, sender: 'instructor', text: chatInput.trim(), time },
    ]);
    setChatInput('');
  };

  const { approveOffer } = useInstructor();

  const handleConfirmOffer = () => {
    approveOffer(offer.id);
    navigate('/instructor/offer-confirmed', {
      state: {
        task: offer,
        totalPrice,
      }
    });
  };

  return (
    <div className="view-offer-page">
      <div className="view-offer-container">
        {/* Back Link */}
        <button className="view-offer-back-btn" onClick={() => navigate(-1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>

        {/* Page Title */}
        <h1 className="view-offer-title">view offers</h1>

        {/* Status Badge */}
        <span className={`view-offer-badge ${isApproved ? 'badge-approved' : 'badge-pending'}`}>
          {isApproved ? 'Approved' : 'pending'}
        </span>

        {/* Top Grid: Left Info + Right Video */}
        <div className="view-offer-top-grid">
          {/* Left Column */}
          <div className="view-offer-left">
            {/* Student Information */}
            <div className="vo-card">
              <h2 className="vo-card-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Student Information
              </h2>
              <div className="vo-two-col">
                <div>
                  <span className="vo-label">STUDENT NAME</span>
                  <p className="vo-value">{offer.studentName}</p>
                </div>
                <div>
                  <span className="vo-label">SUBJECT</span>
                  <p className="vo-value">{offer.subject}</p>
                </div>
              </div>
              <div className="vo-description-group">
                <span className="vo-label">DESCRIPTION</span>
                <p className="vo-description">"{offer.description}"</p>
              </div>
              <div className="vo-deadline">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>Deadline: {offer.deadline}</span>
              </div>
            </div>

            {/* Resources */}
            <div className="vo-card">
              <h2 className="vo-card-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Resources
              </h2>

              {isApproved ? (
                /* Approved: Multiple PDF chips */
                <div className="vo-resources-row">
                  {['PDF 1', 'PDF 2', 'PDF 3'].map((label) => (
                    <button key={label} className="vo-pdf-chip">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      {label}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </button>
                  ))}
                  <button className="vo-view-more-btn">View More</button>
                </div>
              ) : (
                /* Pending: Single file with View File + Download */
                <div className="vo-file-row">
                  <div className="vo-file-info">
                    <div className="vo-pdf-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <div>
                      <p className="vo-file-name">{offer.filename || 'trial_task.pdf'}</p>
                      <span className="vo-file-meta">PDF DOCUMENT • 2.4 MB</span>
                    </div>
                  </div>
                  <div className="vo-file-actions">
                    <button className="vo-btn-view-file">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      View File
                    </button>
                    <button className="vo-btn-download">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Trial Video */}
          <div className="view-offer-right">
            <div className="vo-card">
              <h2 className="vo-video-title">Trial Video</h2>
              <p className="vo-video-subtitle">5-minute explanation video.</p>
              <div className="vo-video-player">
                <button className="vo-play-btn" aria-label="Play video">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </button>
                <span className="vo-video-time">05:00</span>
              </div>
              <div className="vo-video-notice">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <p>
                  Ensure your audio is clear and the implementation of linked lists is explained
                  effectively as per the student's request.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ---- APPROVED ONLY: Chat + Proposal & Session Confirmation ---- */}
        {isApproved && (
          <>
            {/* Chat Section */}
            <div className="vo-chat-section">
              <h3 className="vo-chat-header">Chat</h3>
              <div className="vo-chat-messages">
                {messages.map((msg) => (
                  <React.Fragment key={msg.id}>
                    {msg.id === 3 && (
                      <div className="vo-chat-separator">ENCRYPTED CHAT SESSION STARTED</div>
                    )}
                    <div className={`vo-chat-bubble-row ${msg.sender === 'instructor' ? 'row-right' : 'row-left'}`}>
                      <div className={`vo-chat-bubble ${msg.sender === 'instructor' ? 'bubble-instructor' : 'bubble-student'}`}>
                        {msg.text}
                      </div>
                      <span className="vo-chat-time">{msg.time}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <div className="vo-chat-input-row">
                <button className="vo-chat-attach-btn" aria-label="Attach file">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                </button>
                <input
                  className="vo-chat-input"
                  type="text"
                  placeholder="Type a message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button className="vo-chat-send-btn" onClick={handleSendMessage} aria-label="Send">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Bottom 2-Column Section: Proposal (Left) + Confirmation (Right) */}
            <div className="vo-bottom-grid">
              {/* Left Column: Submit Your Proposal */}
              <div className="vo-proposal-section">
                <h3 className="vo-proposal-title">Submit Your Proposal</h3>

                <div className="vo-field-group">
                  <label className="vo-proposal-label">NUMBER OF SESSIONS</label>
                  <div className="vo-input-with-unit">
                    <input
                      type="number"
                      className="vo-number-input"
                      min={1}
                      max={50}
                      value={numSessions}
                      onChange={(e) => setNumSessions(Math.max(1, Number(e.target.value)))}
                    />
                    <span className="vo-unit-tag">sessions</span>
                  </div>
                </div>

                <div className="vo-field-group">
                  <label className="vo-proposal-label">ESTIMATED TIME PER SESSION (HOURS)</label>
                  <div className="vo-input-with-unit">
                    <input
                      type="number"
                      className="vo-number-input"
                      min={1}
                      max={24}
                      value={hoursPerSession}
                      onChange={(e) => setHoursPerSession(Math.max(1, Number(e.target.value)))}
                    />
                    <span className="vo-unit-tag">hrs</span>
                  </div>
                </div>

                <div className="vo-summary-bar">
                  <span className="vo-summary-label">Total time</span>
                  <span className="vo-summary-value">{totalTime} hrs</span>
                </div>

                <div className="vo-summary-bar">
                  <span className="vo-summary-label">Total Price</span>
                  <span className="vo-summary-value">{totalPrice.toLocaleString()} EGP</span>
                </div>

                <p className="vo-rate-note">Rate: {hourlyRate} EGP per hour</p>

                <button className="vo-confirm-offer-btn" onClick={handleConfirmOffer}>
                  Confirm Offer →
                </button>
              </div>

              {/* Right Column: Confirmation of the session */}
              <div className="vo-session-confirm-card">
                <h3 className="vo-session-confirm-title">Confirmation of the session</h3>

                <div className="vo-offer-summary-box">
                  <h4 className="vo-offer-summary-head">Offer Summary</h4>

                  <div className="vo-session-fields-row">
                    <div className="vo-session-field">
                      <label className="vo-session-label">TIME OF FIRST SESSION</label>
                      <div className="vo-session-input-wrapper">
                        <svg className="vo-session-calendar-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <input
                          type="date"
                          className="vo-session-date-input"
                          value={firstSessionDate}
                          onChange={(e) => setFirstSessionDate(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="vo-session-field">
                      <label className="vo-session-label">TIME DURING THE DAY</label>
                      <div className="vo-session-input-wrapper">
                        <input
                          type="time"
                          className="vo-session-time-input"
                          value={timeOfDay}
                          onChange={(e) => setTimeOfDay(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="vo-session-btn-wrap">
                  <button className="vo-cyan-confirm-btn" onClick={handleConfirmOffer}>
                    confirm
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewOffer;
