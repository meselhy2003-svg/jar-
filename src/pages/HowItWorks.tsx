import { Link } from 'react-router-dom';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <div className="how-it-works-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-works-section container">
        <div className="hero-works-left">
          <span className="badge-smarter">SMARTER LEARNING</span>
          
          <h1 className="hero-works-title">
            How JAR<br />
            Academy <span className="highlight-cyan">Works</span>
          </h1>
          
          <p className="hero-works-sub">
            A simple way to understand your lectures and complete your assignments with expert instructors. We bridge the gap between classroom teaching and individual success.
          </p>
          
          <div className="hero-works-btns">
            <Link to="/get-started" className="btn-primary">
              Get Started Now
            </Link>
            <a href="#video-demo" className="btn-secondary">
              📺 Watch Demo
            </a>
          </div>
        </div>

        {/* Right Hero Image */}
        <div className="hero-works-right">
          <img 
            src="/how-it-works-hero.png" 
            alt="How JAR Academy Works - Online Learning" 
            className="hero-works-main-photo"
          />
        </div>
      </section>

      {/* Section 2: Get Your Material Explained */}
      <section className="material-explained-section container text-center">
        <h2>Get Your Material Explained</h2>
        <div className="cyan-underline"></div>

        <div className="explained-cards-grid">
          {/* 1. Navigate */}
          <div className="explained-card card">
            <div className="exp-icon-box">🅰️</div>
            <h3>1. Navigate</h3>
            <p>Go to the explanation section on our platform dashboard.</p>
          </div>

          {/* 2. Choose Plan */}
          <div className="explained-card card">
            <div className="exp-icon-box">💳</div>
            <h3>2. Choose Plan</h3>
            <p>Select from flexible hourly, monthly, or term-based plans that fit your budget.</p>
          </div>

          {/* 3. Upload */}
          <div className="explained-card card">
            <div className="exp-icon-box">📄</div>
            <h3>3. Upload</h3>
            <p>Request a trial or upload your PDF, lecture notes, or specific topics directly.</p>
          </div>

          {/* 4. Connect (Cyan Card) */}
          <div className="explained-card cyan-highlight-card">
            <div className="exp-icon-box-white">👥</div>
            <h3>4. Connect</h3>
            <p>Instantly connect with an expert instructor and start your personalized session.</p>
          </div>
        </div>
      </section>

      {/* Section 3: Get Help With Your Assignment (Dark Navy Banner) */}
      <section className="assignment-dark-section">
        <div className="container">
          <div className="assignment-dark-header">
            <h2>Get Help With Your Assignment</h2>
            <p>Fast, reliable, and expert-reviewed solutions.</p>
          </div>

          <div className="assignment-steps-grid">
            <div className="assignment-step-item">
              <span className="step-num-faint">01</span>
              <div className="asgn-icon-circle">☁️</div>
              <h3>Upload</h3>
              <p>Securely upload your assignment files to our encrypted portal.</p>
            </div>

            <div className="assignment-step-item">
              <span className="step-num-faint">02</span>
              <div className="asgn-icon-circle">📝</div>
              <h3>Describe</h3>
              <p>Add details and set your price offer for the task requirements.</p>
            </div>

            <div className="assignment-step-item">
              <span className="step-num-faint">03</span>
              <div className="asgn-icon-circle">🔄</div>
              <h3>Review</h3>
              <p>Qualified instructors review and accept your specific request.</p>
            </div>

            <div className="assignment-step-item">
              <span className="step-num-faint">04</span>
              <div className="asgn-icon-circle">✅</div>
              <h3>Complete</h3>
              <p>Receive your high-quality solution directly in your account.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Seamless Platform Experience */}
      <section className="seamless-section container">
        <div className="seamless-grid">
          {/* Left Mockup UI Elements */}
          <div className="seamless-left-mockup">
            <div className="mockup-ui-card top-ui card">
              <span className="badge-cyan-sm">STUDENT SUBMISSIONS</span>
              <div className="bar-placeholder"></div>
            </div>

            <div className="mockup-ui-card middle-ui dark-card">
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#94A3B8' }}>INSTRUCTOR ACTION</p>
              <button className="btn-primary-sm">ACCEPT REQUEST</button>
            </div>

            <div className="mockup-ui-card bottom-ui cyan-card">
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'white' }}>EXPLANATION REQUEST</p>
              <strong>"Solved Derivatives of Mathematics..."</strong>
            </div>
          </div>

          {/* Right Text Content */}
          <div className="seamless-right-text">
            <h2>Seamless Platform <span className="highlight-cyan">Experience</span></h2>
            <p className="seamless-desc">
              Our interface is designed for speed and clarity. From the moment you upload a file to the second you receive your expert feedback, every step is optimized for your learning journey.
            </p>

            <ul className="seamless-feature-list">
              <li>
                <span className="feature-bullet-icon">🪄</span>
                <div>
                  <strong>AI-Powered Matching for Instructors</strong>
                </div>
              </li>
              <li>
                <span className="feature-bullet-icon">🛡️</span>
                <div>
                  <strong>Secure File Encrypted Transfers</strong>
                </div>
              </li>
              <li>
                <span className="feature-bullet-icon">🔔</span>
                <div>
                  <strong>Real-Time Program Notifications</strong>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 5: Cyan Banner CTA */}
      <section className="works-cta-section container">
        <div className="cyan-cta-banner text-center">
          <h2>Start Learning Smarter Today</h2>
          <p>
            Join thousands of students who have improved their grades and understanding with JAR Academy's expert guidance.
          </p>
          <div className="cta-action-row">
            <Link to="/get-started" className="btn-dark cta-dark-btn">
              Get Started
            </Link>
            <Link to="/contact" className="btn-secondary contact-sales-pill">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
