import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Contact.css';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="contact-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-contact-section container">
        <div className="hero-contact-left">
          <span className="badge-support">{t('contact.badge', 'SUPPORT CENTER')}</span>
          
          <h1 className="hero-contact-title">
            {t('contact.title1', 'Get In')} <span className="highlight-cyan">{t('contact.title2', 'Touch With Us')}</span>
          </h1>
          
          <p className="hero-contact-sub">
            {t('contact.sub', 'Have a question about JAR Academy? Our team of experts and educators is here to help students succeed.')}
          </p>

          <div className="support-team-status">
            <div className="avatar-stack">
              <span className="avatar-dot s1">
                <img src="/contact-icons/team1.png" alt="Team Member 1" className="avatar-img-icon" />
              </span>
              <span className="avatar-dot s2">
                <img src="/contact-icons/team2.png" alt="Team Member 2" className="avatar-img-icon" />
              </span>
              <span className="avatar-dot s3">
                <img src="/contact-icons/team3.png" alt="Team Member 3" className="avatar-img-icon" />
              </span>
            </div>
            <div>
              <strong>{t('contact.activeTeam', 'Active Support Team')}</strong>
              <span className="online-label">{t('contact.onlineNow', '● Online right now')}</span>
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
              <span className="chat-headset-icon">
                <img src="/contact-icons/Vector.png" alt="Live Chat" className="chat-img-icon" />
              </span>
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
              <img src="/contact-icons/Vector.png" alt="Call Us" className="custom-card-img-icon" />
            </div>
            <span className="card-tag">{t('contact.callUs', 'CALL US')}</span>
            <h2>+966 5XXXXXXXX</h2>
          </div>

          {/* Card 2: Availability */}
          <div className="contact-dark-card">
            <div className="contact-icon-circle green-icon">
              <img src="/contact-icons/Vector 2.png" alt="Availability" className="custom-card-img-icon" />
            </div>
            <span className="card-tag">{t('contact.availability', 'AVAILABILITY')}</span>
            <h2>{t('contact.support247', '24/7 Support')}</h2>
          </div>
        </div>
      </section>

      {/* Section 3: Connect With Us (Social Media Grid) */}
      <section className="connect-social-section container text-center">
        <h2>{t('contact.connectWithUs', 'Connect With Us')}</h2>
        <div className="cyan-underline"></div>

        <div className="social-grid-card card">
          <div className="social-items-container">
            <a href="#" className="social-item">
              <img src="/contact-icons/WhatsApp.png" alt="WhatsApp" className="custom-social-img-icon" />
              <div>
                <strong className="soc-name">WhatsApp</strong>
                <span className="soc-handle">@JarAcademy</span>
              </div>
            </a>

            <a href="#" className="social-item">
              <img src="/contact-icons/Telegram.png" alt="Telegram" className="custom-social-img-icon" />
              <div>
                <strong className="soc-name">Telegram</strong>
                <span className="soc-handle">@JarAcademy</span>
              </div>
            </a>

            <a href="#" className="social-item">
              <img src="/contact-icons/Instagram.png" alt="Instagram" className="custom-social-img-icon" />
              <div>
                <strong className="soc-name">Instagram</strong>
                <span className="soc-handle">@JarAcademy</span>
              </div>
            </a>

            <a href="#" className="social-item">
              <img src="/contact-icons/Facebook.png" alt="Facebook" className="custom-social-img-icon" />
              <div>
                <strong className="soc-name">Facebook</strong>
                <span className="soc-handle">@JarAcademy</span>
              </div>
            </a>

            <a href="#" className="social-item">
              <img src="/contact-icons/TikTok.png" alt="TikTok" className="custom-social-img-icon" />
              <div>
                <strong className="soc-name">TikTok</strong>
                <span className="soc-handle">@JarAcademy</span>
              </div>
            </a>

            <a href="#" className="social-item">
              <img src="/contact-icons/Snapchat.png" alt="Snapchat" className="custom-social-img-icon" />
              <div>
                <strong className="soc-name">Snapchat</strong>
                <span className="soc-handle">@JarAcademy</span>
              </div>
            </a>

            <a href="#" className="social-item">
              <img src="/contact-icons/LinkedIn.png" alt="LinkedIn" className="custom-social-img-icon" />
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
        <h2>{t('contact.faqTitle', 'Frequently Asked Questions')}</h2>
        <p className="faq-subtext">Quick answers to the most common questions</p>

        <div className="faq-cards-grid">
          <div className="faq-card card">
            <div className="faq-icon-box">
              <img src="/contact-icons/Vector.png" alt="Instructor Icon" className="custom-faq-img-icon" />
            </div>
            <h3>How do I become an instructor?</h3>
            <p>
              Apply through our recruitment portal with your credentials and a sample lesson plan.
            </p>
          </div>

          <div className="faq-card card">
            <div className="faq-icon-box">
              <img src="/contact-icons/Vector 2.png" alt="Assignment Icon" className="custom-faq-img-icon" />
            </div>
            <h3>How can I upload my assignment?</h3>
            <p>
              Navigate to your dashboard, select the specific course, and use the 'Submit' button under the active module.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Start Your Journey Today (Dark Banner CTA) */}
      <section className="contact-cta-section container">
        <div className="dark-card contact-cta-banner text-center">
          <h2>{t('contact.startJourney', 'Start Your Journey Today')}</h2>
          <p>
            Join over 50,000+ students and world-class instructors in our digital ecosystem.
          </p>
          <Link to="/get-started" className="btn-primary cta-cyan-btn">
            {t('nav.getStarted', 'Get Started')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Contact;
