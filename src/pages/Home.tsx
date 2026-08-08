import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="landing-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-landing-section container">
        <div className="hero-landing-left">
          <span className="badge-edtech">&lt; THE FUTURE OF EDTECH</span>
          
          <h1 className="landing-title">
            Upload Anything.<br />
            <span className="highlight-cyan">Understand Everything.</span>
          </h1>
          
          <p className="landing-subtitle">
            Upload your lecture, assignment, or topic and get it explained by expert instructors via live sessions or recorded video.
          </p>
          
          <div className="landing-actions">
            <Link to="/get-started" className="btn-primary landing-btn-primary">
              Get Started Now &rarr;
            </Link>
            <Link to="/how-it-works" className="btn-secondary landing-btn-secondary">
              Watch Demo
            </Link>
          </div>

          <div className="landing-social-proof">
            <div className="landing-avatar-stack">
              <span className="avatar-circle a1">🎓</span>
              <span className="avatar-circle a2">👩‍🎓</span>
            </div>
            <span className="proof-label">Joined by <strong>10,000+</strong> students this month</span>
          </div>
        </div>

        {/* Hero 3D Graphic Layout */}
        <div className="hero-landing-right">
          <div className="graphic-3d-container">
            {/* Main Blue Card */}
            <div className="main-3d-card">
              <span className="grad-cap-icon">🎓</span>
            </div>

            {/* Top Right Floating Card */}
            <div className="floating-card top-right-float card">
              <div className="float-icon-bg green-bg">📄</div>
              <div className="float-text">
                <strong>Lecture_Notes.pdf</strong>
                <div className="float-progress-bar">
                  <div className="float-progress-fill" style={{ width: '95%' }}></div>
                </div>
              </div>
              <span className="float-percent">95%</span>
            </div>

            {/* Bottom Left Floating Card */}
            <div className="floating-card bottom-left-float card">
              <div className="float-icon-bg blue-bg">▶</div>
              <div>
                <strong>Live Session</strong>
                <span className="status-ongoing-tag">ON GOING</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section: Three Simple Steps to Mastery */}
      <section className="process-section container">
        <div className="process-header">
          <span className="process-tag">PROCESS</span>
          <h2>Three Simple Steps to Mastery</h2>
          <p className="process-sub">
            Our streamlined process connects you with expert knowledge instantly through our high-end digital platform.
          </p>
        </div>

        <div className="steps-grid">
          {/* Step 01 */}
          <div className="step-mastery-card card">
            <span className="big-step-num">01</span>
            <div className="step-icon-wrapper">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M12 12v9" />
                <path d="m16 16-4-4-4 4" />
              </svg>
            </div>
            <h3>Upload Content</h3>
            <p>
              Simply upload your lecture notes, assignments, or any complex topic to our secure platform. We support all major formats.
            </p>
          </div>

          {/* Step 02 */}
          <div className="step-mastery-card card">
            <span className="big-step-num">02</span>
            <div className="step-icon-wrapper">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <h3>Expert Review</h3>
            <p>
              Our network of top-tier instructors reviews your specific request to prepare a custom, high-impact explanation tailored to your learning style.
            </p>
          </div>

          {/* Step 03 */}
          <div className="step-mastery-card card">
            <span className="big-step-num">03</span>
            <div className="step-icon-wrapper">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
              </svg>
            </div>
            <h3>Instant Mastery</h3>
            <p>
              Receive your explanation through a high-definition recorded video or a live 1-on-1 session with interactive whiteboards.
            </p>
          </div>
        </div>
      </section>

      {/* Dark CTA Banner Section */}
      <section className="landing-cta-section container">
        <div className="dark-landing-banner">
          <h2>Ready to transform your learning experience?</h2>
          <p>
            Join JAR ACADEMY today and get expert help on any topic. Start your journey towards academic excellence.
          </p>
          <div className="banner-actions">
            <Link to="/get-started" className="btn-primary cta-cyan-btn">
              Get Started Now
            </Link>
            <Link to="/contact" className="btn-secondary cta-advisor-btn">
              Speak to an Advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
