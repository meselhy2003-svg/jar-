import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InstructorDashboard.css';

const InstructorDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="instructor-landing-page">
      {/* Hero Section */}
      <section className="instructor-hero">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4rem' }}>
            <div className="hero-content">
              <span className="hero-badge">JOIN OUR TEACHING NETWORK</span>
              <h1 className="hero-title">
                Turn Your<br />Knowledge Into<br />Impact.
              </h1>
              <p className="hero-subtitle">
                Join JAR ACADEMY as an instructor and help students<br />
                understand their lectures, assignments, and difficult topics<br />
                with real-time support.
              </p>
              <button className="hero-btn" onClick={() => navigate('/instructor/tasks')}>Available Task</button>
            </div>

            <div className="hero-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                alt="Instructor helping student"
                className="hero-image"
              />

              {/* New Assignment Uploaded Floating Card (Floating slowly up to down) */}
              <div className="floating-card-1">
                <div style={{ background: '#DCFCE7', color: '#16A34A', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(22, 163, 74, 0.2)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>New Assignment Uploaded</span>
              </div>

              {/* Live Session Started Floating Card */}
              <div className="floating-card-2">
                <div style={{ background: '#E0F2FE', color: '#0284C7', padding: '12px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 7l-7 5 7 5V7z"></path>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="live-badge-dot" title="Live Now"></span>
                    <span style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem' }}>Live Session Started</span>
                  </div>
                  <div style={{ color: '#64748B', fontSize: '0.8rem', marginTop: '2px' }}>Calculus II Explanation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">Why Teach on JAR</h2>
          <p className="section-subtitle">Join thousands of educators making a difference</p>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="benefit-title">Flexible Teaching</h3>
              <p className="benefit-text">
                Explain topics anytime with live or recorded sessions. Work around your <i>own schedule</i>.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M6 12h.01M18 12h.01"></path>
                </svg>
              </div>
              <h3 className="benefit-title">Earn From Your Knowledge</h3>
              <p className="benefit-text">
                Get paid for helping students understand their material. Competitive rates and fast payouts.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <h3 className="benefit-title">Global Students</h3>
              <p className="benefit-text">
                Help students from different universities and fields around the globe from your <i>home</i>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">How It Works (For Instructor)</h2>
          <div style={{ height: '2.5rem' }}></div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h4 className="step-title">Create your instructor profile</h4>
              <p className="step-text">Showcase your expertise and academic background.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h4 className="step-title">Students upload material</h4>
              <p className="step-text">Review assignments or difficult topics students need help with.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h4 className="step-title">Accept and explain</h4>
              <p className="step-text">Accept requests and provide a clear, detailed explanation.</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h4 className="step-title">Earn for each session</h4>
              <p className="step-text">Receive payments directly to your account per session.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Manage Sessions Section */}
      <section className="manage-sessions-section">
        <div className="container">
          <div className="manage-sessions-container">
            <div className="manage-content">
              <h2 className="manage-title">Manage Your<br />Sessions with Ease</h2>
              <p className="manage-text">
                Our powerful dashboard gives you all the tools to track<br />
                student requests, manage uploaded PDFs, and organize<br />
                your teaching schedule efficiently.
              </p>

              <ul className="manage-list">
                <li>
                  <div className="manage-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10"></line>
                      <line x1="12" y1="20" x2="12" y2="4"></line>
                      <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                  </div>
                  <span>Real-time request notifications</span>
                </li>
                <li>
                  <div className="manage-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                  </div>
                  <span>Built-in PDF viewer for assignments</span>
                </li>
                <li>
                  <div className="manage-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  </div>
                  <span>Detailed earning reports</span>
                </li>
              </ul>
            </div>

            <div className="manage-dashboard-mock">
              <div className="mock-header">
                <span>Recent Requests</span>
                <span className="mock-badge">3 New</span>
              </div>

              <div className="mock-request-card">
                <div className="mock-request-info">
                  <div className="mock-icon mock-icon-pdf">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                  </div>
                  <div>
                    <div className="mock-request-title">Physics Assignment 3.pdf</div>
                    <div className="mock-request-student">Student: Sarah Jenkins</div>
                  </div>
                </div>
                <button className="mock-btn">View</button>
              </div>

              <div className="mock-request-card">
                <div className="mock-request-info">
                  <div className="mock-icon mock-icon-folder">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="mock-request-title">Organic Chemistry Quiz Prep</div>
                    <div className="mock-request-student">Student: Marcus Liao</div>
                  </div>
                </div>
                <button className="mock-btn">View</button>
              </div>

              <div className="mock-request-card">
                <div className="mock-request-info">
                  <div className="mock-icon mock-icon-doc">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="mock-request-title">Economics Essay Review</div>
                    <div className="mock-request-student">Student: Alex Turner</div>
                  </div>
                </div>
                <button className="mock-btn">View</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstructorDashboard;
