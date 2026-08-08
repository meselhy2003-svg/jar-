import { useState } from 'react';
import { Link } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  return (
    <div className="student-dashboard-page animate-fade-in">
      {/* 1. Dark Navy Full-Width Edge-to-Edge Hero Box */}
      <section className="student-hero-dark-wrapper">
        <div className="container student-hero-dark-inner">
          {/* Left Column: Text & CTA */}
          <div className="student-hero-text">
            <span className="academic-guarantee-badge">✦ ACADEMIC SUCCESS GUARANTEED</span>
            
            <h1 className="welcome-back-title">
              Welcome<br />
              Back!
            </h1>
            
            <p className="hero-subtext">
              Unlock your potential today. Upload your lecture, assignment, or study material and get expert help in minutes.
            </p>
            
            <div className="hero-action-row">
              <Link to="/book-session" className="btn-primary upload-cta-btn">
                ☁️ Upload Files
              </Link>
              <button 
                onClick={() => setIsPlayingVideo(true)}
                className="watch-video-hero-btn"
              >
                <span className="play-icon-circle">▶</span> Watch Video Guide
              </button>
            </div>

            <div className="social-proof-row">
              <div className="avatar-group">
                <span className="avatar-dot a1">👤</span>
                <span className="avatar-dot a2">👩‍🎓</span>
                <span className="avatar-dot a3">👨‍🎓</span>
              </div>
              <span className="proof-text">
                Joined by <strong>12,000+</strong> ambitious students
              </span>
            </div>
          </div>

          {/* Right Column: Students Photo Card with Floating Verified Badge & Play Overlay */}
          <div className="student-hero-graphic">
            <div className="student-photo-card" onClick={() => setIsPlayingVideo(true)} style={{ cursor: 'pointer' }}>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" 
                alt="Students Studying Together" 
                className="students-desk-img"
              />

              {/* Center Play Button Overlay */}
              <div className="hero-play-button-overlay">
                <div className="big-play-btn-pulse">
                  <span>▶</span>
                </div>
                <span className="play-overlay-label">How to use JAR Academy</span>
              </div>

              {/* Floating Verified Badge */}
              <div className="verified-badge-overlay">
                <div className="badge-check-circle">
                  ✓
                </div>
                <div className="badge-text-wrap">
                  <strong>Expert Verified</strong>
                  <span>A+ Standard Content</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Clean White Section Below Hero with 3 Cards */}
      <section className="student-white-section container text-center">
        <div className="student-cards-grid">
          {/* Card 1 */}
          <div className="student-white-card card">
            <div className="card-soft-icon icon-cyan">☁️</div>
            <h3>Upload Any Material</h3>
            <p>Upload your lecture notes, difficult assignments, or specific topics directly for expert review.</p>
          </div>

          {/* Card 2 */}
          <div className="student-white-card card">
            <div className="card-soft-icon icon-blue">🔍</div>
            <h3>Choose an Instructor</h3>
            <p>Select from top-rated, subject-matter expert tutors ready to guide you step-by-step.</p>
          </div>

          {/* Card 3 */}
          <div className="student-white-card card">
            <div className="card-soft-icon icon-light">📊</div>
            <h3>Get Explanation</h3>
            <p>Receive detailed live sessions or high-definition recorded videos tailored to your needs.</p>
          </div>
        </div>
      </section>

      {/* 3. Embedded "How to Use This Website" Video Section */}
      <section className="website-guide-video-section container">
        <div className="guide-video-card">
          <div className="guide-video-header text-center">
            <span className="guide-tag">TUTORIAL GUIDE</span>
            <h2>How to Use JAR Academy</h2>
            <p>Watch this quick step-by-step video to learn how to request explanations, submit assignments, and talk with expert tutors.</p>
          </div>

          <div className="guide-video-player-box">
            <video 
              controls 
              poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
              className="dashboard-explainer-video"
            >
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* 4. Fullscreen Interactive Video Modal */}
      {isPlayingVideo && (
        <div className="video-modal-backdrop" onClick={() => setIsPlayingVideo(false)}>
          <div className="video-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-video-modal-btn" onClick={() => setIsPlayingVideo(false)}>
              ✕ Close
            </button>
            <div className="video-modal-header">
              <h3>🎥 How to Use JAR Academy - Platform Overview</h3>
            </div>
            <div className="video-modal-body">
              <video controls autoPlay className="modal-video-element">
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
