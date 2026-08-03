import { Link } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboard = () => {
  return (
    <div className="student-dashboard-page animate-fade-in">
      {/* 1. Dark Navy Full-Width Edge-to-Edge Hero Box (Matching Picture) */}
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

          {/* Right Column: Students Photo Card with Floating Verified Badge */}
          <div className="student-hero-graphic">
            <div className="student-photo-card">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" 
                alt="Students Studying Together" 
                className="students-desk-img"
              />

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
    </div>
  );
};

export default StudentDashboard;
