import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './LiveExplainSession.css';

interface AttachedMaterial {
  id: string;
  name: string;
}

interface ChatMessage {
  id: number;
  sender: 'instructor' | 'student';
  text: string;
  time: string;
}

interface ExplainTask {
  id: string;
  initials: string;
  studentName: string;
  postedTime: string;
  title: string;
  materials: AttachedMaterial[];
  deadline: string;
  budget: string;
}

const LiveExplainSession: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Fallback data
  const task: ExplainTask = location.state?.task || {
    id: '1',
    initials: 'OM',
    studentName: 'O.Mohamed',
    postedTime: 'Posted 2h ago',
    title: 'Need explanation for recursion and trees.',
    materials: [
      { id: 'm1', name: 'PDF 1' },
      { id: 'm2', name: 'PDF 2' },
      { id: 'm3', name: 'PDF 3' },
      { id: 'm4', name: 'PDF 4' },
      { id: 'm5', name: 'PDF 5' },
      { id: 'm6', name: 'PDF 6' },
      { id: 'm7', name: 'PDF 7' },
    ],
    deadline: '30 March 2026',
    budget: '600 EGP',
  };

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, sender: 'student', text: 'Hello! the next lesson tommorw?', time: '7:02 PM' },
    { id: 2, sender: 'instructor', text: 'Yes , But i feel the 3 pm is better', time: '7:04 PM' },
    { id: 3, sender: 'student', text: "That's good to hear.", time: '7:06 PM' },
  ]);
  const [chatInput, setChatInput] = useState('');

  const [nextDate, setNextDate] = useState('');
  const [nextTime, setNextTime] = useState('');

  const handleSend = () => {
    if (!chatInput.trim()) return;
    const msg: ChatMessage = {
      id: Date.now(),
      sender: 'instructor',
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages((prev) => [...prev, msg]);
    setChatInput('');
  };

  const handleConfirmSession = () => {
    alert(`Session confirmed for ${nextDate} at ${nextTime}`);
    // Since backend isn't connected, we can navigate back to projects or stay here
    navigate('/instructor/projects');
  };

  return (
    <div className="les-page">
      
      {/* Top Right Notification */}
      <div className="les-notification-toast">
        <div className="les-toast-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div className="les-toast-content">
          <p className="les-toast-title">THE DATE FOR THE NEXT SESSION HAS BEEN CONFIRMED.</p>
          <span className="les-toast-time">Just now</span>
        </div>
      </div>

      <div className="les-container">

        {/* Back Link & Breadcrumb */}
        <div className="les-top-nav">
          <Link to="/instructor/explain-project" className="les-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back
          </Link>
          <div className="les-breadcrumb">
            Physics <span>/</span> <strong>Modern physics Basics</strong>
          </div>
        </div>

        {/* Task Summary */}
        <div className="les-task-header">
          <div className="les-user-row">
            <div className="les-avatar">{task.initials}</div>
            <div className="les-user-meta">
              <span className="les-user-name">{task.studentName}</span>
            </div>
          </div>
          <h2 className="les-task-title">{task.title}</h2>
          
          <div className="les-materials-section">
            <span className="les-materials-label">ATTACHED MATERIALS</span>
            <div className="les-materials-list">
              {task.materials.map(mat => (
                <div className="les-mat-pill" key={mat.id}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  {mat.name}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="les-dl-icon">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </div>
              ))}
            </div>
          </div>

          <div className="les-deadline">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Deadline: {task.deadline}
          </div>
        </div>

        {/* Video & Sidebar Grid */}
        <div className="les-main-grid">
          
          {/* Left: Video Area */}
          <div className="les-video-container">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Video Call" className="les-main-video" />
            
            <div className="les-video-badge">
              <span className="les-badge-dot"></span>
              Encrypted & Secure
            </div>

            {/* PiP */}
            <div className="les-pip">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="You" />
              <div className="les-pip-label">You (Self)</div>
            </div>

            {/* Controls */}
            <div className="les-video-controls">
              <button className="les-ctrl-btn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg></button>
              <button className="les-ctrl-btn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg></button>
              <button className="les-ctrl-btn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg></button>
              <button className="les-ctrl-btn les-ctrl-end"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.32a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path></svg></button>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="les-sidebar">
            
            {/* Course Content */}
            <div className="les-course-card">
              <div className="les-course-header">
                <div>
                  <h3 className="les-course-title">Course Content</h3>
                  <span className="les-course-meta">6 Session • 2h 45m total</span>
                </div>
                <div className="les-course-pct">33%</div>
              </div>
              <div className="les-progress-bar">
                <div className="les-progress-fill" style={{width: '33%'}}></div>
              </div>
            </div>

            {/* Curriculum */}
            <div className="les-curriculum-card">
              <h4 className="les-curriculum-label">CURRICULUM</h4>
              
              <div className="les-curr-item">
                <div className="les-curr-icon les-curr-done">✓</div>
                <div className="les-curr-info">
                  <p className="les-curr-name les-strike">session 1 — Introduction</p>
                  <p className="les-curr-dur">60 MINS • COMPLETED</p>
                </div>
              </div>

              <div className="les-curr-item les-curr-active">
                <div className="les-curr-icon les-curr-play">▶</div>
                <div className="les-curr-info">
                  <p className="les-curr-name">session 2 — Basic Concepts</p>
                  <p className="les-curr-dur les-dur-active">60 MINS • CURRENTLY PLAYING</p>
                </div>
              </div>

              <div className="les-curr-item">
                <div className="les-curr-icon les-curr-lock">🔒</div>
                <div className="les-curr-info">
                  <p className="les-curr-name">session 3 — Practice Examples</p>
                  <p className="les-curr-dur">30 MINS</p>
                </div>
              </div>

              <div className="les-curr-item">
                <div className="les-curr-icon les-curr-lock">🔒</div>
                <div className="les-curr-info">
                  <p className="les-curr-name">session 4 — Advanced Limits</p>
                  <p className="les-curr-dur">30 MINS</p>
                </div>
              </div>

              <div className="les-curr-item">
                <div className="les-curr-icon les-curr-lock">🔒</div>
                <div className="les-curr-info">
                  <p className="les-curr-name">session 5 — Infinite Series</p>
                  <p className="les-curr-dur">22 MINS</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="les-chat">
          <div className="les-chat-header">Chat</div>
          <div className="les-chat-body">
            {chatMessages.map((msg, idx) => (
              <React.Fragment key={msg.id}>
                {idx === 2 && (
                  <div className="les-chat-divider">ENCRYPTED CHAT SESSION STARTED</div>
                )}
                <div className={`les-msg-wrap ${msg.sender === 'instructor' ? 'les-msg-right' : 'les-msg-left'}`}>
                  <div className={`les-bubble ${msg.sender === 'instructor' ? 'les-bubble-dark' : 'les-bubble-light'}`}>
                    {msg.text}
                  </div>
                  <span className="les-msg-time">{msg.time}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="les-chat-input-row">
            <button className="les-emoji-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
            </button>
            <input
              className="les-chat-input"
              type="text"
              placeholder="Type a message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
            />
            <button className="les-send-btn" onClick={handleSend}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </div>

        {/* Confirmation Card */}
        <div className="les-conf-card">
          <h2 className="les-conf-title">Confirmation of the session</h2>
          <div className="les-conf-box">
            <h3 className="les-conf-box-title">Offer Summary</h3>
            <div className="les-conf-inputs">
              <div className="les-conf-field">
                <label>TIME OF NEXT SESSION</label>
                <div className="les-input-wrap">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  <input type="text" placeholder="mm/dd/yyyy" value={nextDate} onChange={(e) => setNextDate(e.target.value)} />
                </div>
              </div>
              <div className="les-conf-field">
                <label>TIME DURING THE DAY</label>
                <div className="les-input-wrap">
                  <input type="text" value={nextTime} onChange={(e) => setNextTime(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="les-conf-action">
              <button className="les-conf-btn" onClick={handleConfirmSession}>
                confirm
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LiveExplainSession;
