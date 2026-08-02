import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-contact-section container">
        <div className="hero-contact-left">
          <span className="badge-support">SUPPORT CENTER</span>
          
          <h1 className="hero-contact-title">
            Get In <span className="highlight-cyan">Touch</span> With Us
          </h1>
          
          <p className="hero-contact-sub">
            Have a question about JAR Academy? Our team of experts and educators is here to help students succeed and instructors thrive on our platform.
          </p>

          <div className="support-team-status">
            <div className="avatar-stack">
              <span className="avatar-dot s1">🎧</span>
              <span className="avatar-dot s2">👨‍🏫</span>
              <span className="avatar-dot s3">💬</span>
            </div>
            <div>
              <strong>Active Support Team</strong>
              <span className="online-label">● Online right now</span>
            </div>
          </div>
        </div>

        {/* Right Desk Workspace Graphic */}
        <div className="hero-contact-right">
          <div className="desk-photo-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=800&auto=format&fit=crop" 
              alt="Clean Desk Workstation" 
              className="desk-main-photo"
            />

            {/* Bottom Left Floating Badge */}
            <div className="float-live-chat-badge">
              <span className="chat-headset-icon">🎧</span>
              <div>
                <strong className="badge-small-title">LIVE CHAT</strong>
                <span className="badge-resp-time">Avg. Response 5m</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Two Dark Contact Cards */}
      <section className="two-cards-section container">
        <div className="two-cards-grid">
          {/* Card 1: Call Us */}
          <div className="contact-dark-card">
            <div className="contact-icon-circle cyan-icon">
              📞
            </div>
            <span className="card-tag">CALL US</span>
            <h2>+966 5XXXXXXXX</h2>
          </div>

          {/* Card 2: Availability */}
          <div className="contact-dark-card">
            <div className="contact-icon-circle green-icon">
              🎧
            </div>
            <span className="card-tag">AVAILABILITY</span>
            <h2>24/7 Support</h2>
          </div>
        </div>
      </section>

      {/* Section 3: Connect With Us (Social Media Grid) */}
      <section className="connect-social-section container text-center">
        <h2>Connect With Us</h2>
        <div className="cyan-underline"></div>

        <div className="social-grid-card card">
          <div className="social-items-container">
            <a href="#" className="social-item">
              <span className="soc-icon wa">💬</span>
              <div>
                <strong className="soc-name">WhatsApp</strong>
                <span className="soc-handle">@JarAcademy</span>
              </div>
            </a>

            <a href="#" className="social-item">
              <span className="soc-icon tg">✈️</span>
              <div>
                <strong className="soc-name">Telegram</strong>
                <span className="soc-handle">@JarAcademy</span>
              </div>
            </a>

            <a href="#" className="social-item">
              <span className="soc-icon ig">📸</span>
              <div>
                <strong className="soc-name">Instagram</strong>
                <span className="soc-handle">@JarAcademy</span>
              </div>
            </a>

            <a href="#" className="social-item">
              <span className="soc-icon fb">👍</span>
              <div>
                <strong className="soc-name">Facebook</strong>
                <span className="soc-handle">@JarAcademy</span>
              </div>
            </a>

            <a href="#" className="social-item">
              <span className="soc-icon tt">🎵</span>
              <div>
                <strong className="soc-name">TikTok</strong>
                <span className="soc-handle">@JarAcademy</span>
              </div>
            </a>

            <a href="#" className="social-item">
              <span className="soc-icon sc">👻</span>
              <div>
                <strong className="soc-name">Snapchat</strong>
                <span className="soc-handle">@JarAcademy</span>
              </div>
            </a>

            <a href="#" className="social-item">
              <span className="soc-icon li">💼</span>
              <div>
                <strong className="soc-name">LinkedIn</strong>
                <span className="soc-handle">@JarAcademy</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Section 4: Frequently Asked Questions */}
      <section className="contact-faq-section container text-center">
        <h2>Frequently Asked Questions</h2>
        <p className="faq-subtext">Quick answers to the most common questions</p>

        <div className="faq-cards-grid">
          <div className="faq-card card">
            <div className="faq-icon-box">👤</div>
            <h3>How do I become an instructor?</h3>
            <p>
              Apply through our recruitment portal with your credentials and a sample lesson plan.
            </p>
          </div>

          <div className="faq-card card">
            <div className="faq-icon-box">☁️</div>
            <h3>How can I upload my assignment?</h3>
            <p>
              Navigate to your dashboard, select the specific course, and use the 'Submit' button under the active module.
            </p>
          </div>

          <div className="faq-card card">
            <div className="faq-icon-box">💬</div>
            <h3>How do explanation sessions work?</h3>
            <p>
              Live Q&A sessions occur weekly via our integrated video classroom. Schedule them from your calendar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Start Your Journey Today (Dark Banner CTA) */}
      <section className="contact-cta-section container">
        <div className="dark-card contact-cta-banner text-center">
          <h2>Start Your Journey Today</h2>
          <p>
            Join over 50,000+ students and world-class instructors in our digital ecosystem.
          </p>
          <Link to="/get-started" className="btn-primary cta-cyan-btn">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Contact;
