import { Link } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboard = () => {
  return (
    <div className="student-dashboard-page animate-fade-in">
      {/* 1. Full-Width Edge-to-Edge Hero Dark Box */}
      <section className="student-hero-dark-wrapper">
        <div className="student-hero-dark-box">
          <div className="container student-hero-dark-inner">
            <div className="student-hero-text">
              <span className="guarantee-badge">● ACADEMIC SUCCESS GUARANTEED</span>
              <h1>Welcome<br />Back!</h1>
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
                <span className="proof-text">Joined by <strong>12,000+</strong> ambitious students</span>
              </div>
            </div>

            <div className="student-hero-graphic">
              <div className="student-photo-card">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" 
                  alt="Student Studying on Laptop" 
                />
                <div className="verified-badge-overlay">
                  <span className="check-icon">✓</span>
                  <div>
                    <strong>Expert Verified</strong>
                    <span>A+ Standard Content</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three Dark Navy Feature Cards */}
      <section className="student-features-section container">
        <div className="features-grid">
          <div className="feature-dark-card card">
            <div className="feature-icon-circle">
              ☁️
            </div>
            <h3>Upload Material</h3>
            <p>Securely share your lectures, assignments, or study guides in any common file format.</p>
          </div>

          <div className="feature-dark-card card">
            <div className="feature-icon-circle">
              🔍
            </div>
            <h3>Expert Review</h3>
            <p>Our top-tier instructors analyze your material to provide personalized learning insights.</p>
          </div>

          <div className="feature-dark-card card">
            <div className="feature-icon-circle">
              📈
            </div>
            <h3>Boost Grades</h3>
            <p>Receive detailed feedback and study plans designed to help you excel in your courses.</p>
          </div>
        </div>
      </section>

      {/* 3. Bright Cyan CTA Banner */}
      <section className="student-cyan-cta-wrapper container">
        <div className="student-cyan-cta-box">
          <div className="cyan-cta-text">
            <h2>Ready to boost your grades?</h2>
            <p>Join thousands of students who have improved their GPA with JAR Academy resources.</p>
          </div>
          <div className="cyan-cta-actions">
            <Link to="/get-started" className="btn-dark">Get Started</Link>
            <Link to="/contact" className="btn-secondary contact-sales-btn">Contact Sales</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
