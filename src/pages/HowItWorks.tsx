import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './HowItWorks.css';

const HowItWorks = () => {
  const { t } = useLanguage();

  return (
    <div className="how-it-works-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-works-section container">
        <div className="hero-works-left">
          <span className="badge-smarter">{t('how.badge', 'SMARTER LEARNING')}</span>
          
          <h1 className="hero-works-title">
            {t('how.title1', 'How JAR Academy Works')}<br />
            <span className="highlight-cyan">{t('how.title2', 'Simple & Clear')}</span>
          </h1>
          
          <p className="hero-works-sub">
            {t('how.sub', 'A simple way to understand your lectures and complete your assignments with expert instructors.')}
          </p>
          
          <div className="hero-works-btns">
            <Link to="/get-started" className="btn-primary">
              {t('home.getStarted', 'Get Started Now')}
            </Link>
            <a href="#video-demo" className="btn-secondary">
              📺 {t('home.watchDemo', 'Watch Demo')}
            </a>
          </div>
        </div>

        {/* Right Hero Image */}
        <div className="hero-works-right">
          <img 
            src="/Online Learning Collaboration.png" 
            alt="Online Learning Collaboration" 
            className="hero-works-main-photo"
          />
        </div>
      </section>

      {/* Section 2: Get Your Material Explained */}
      <section className="material-explained-section container text-center">
        <h2>{t('how.materialTitle', 'Get Your Material Explained')}</h2>
        <div className="cyan-underline"></div>

        <div className="explained-cards-grid">
          {/* 1. Navigate */}
          <div className="explained-card card">
            <div className="exp-icon-box">🅰️</div>
            <h3>{t('how.navigateTitle', '1. Navigate')}</h3>
            <p>{t('how.navigateSub', 'Go to the explanation section on our platform dashboard.')}</p>
          </div>

          {/* 2. Choose Plan */}
          <div className="explained-card card">
            <div className="exp-icon-box">💳</div>
            <h3>{t('how.choosePlanTitle', '2. Choose Plan')}</h3>
            <p>{t('how.choosePlanSub', 'Select from flexible hourly, monthly, or term-based plans.')}</p>
          </div>

          {/* 3. Upload */}
          <div className="explained-card card">
            <div className="exp-icon-box">
              <img src="/pdf-icon.png" alt="PDF" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
            </div>
            <h3>{t('how.uploadTitle', '3. Upload')}</h3>
            <p>{t('how.uploadSub', 'Request a trial or upload your PDF, lecture notes, or specific topics directly.')}</p>
          </div>

          {/* 4. Connect (Cyan Card) */}
          <div className="explained-card cyan-highlight-card">
            <div className="exp-icon-box-white">👥</div>
            <h3>{t('how.connectTitle', '4. Connect')}</h3>
            <p>{t('how.connectSub', 'Instantly connect with an expert instructor and start your personalized session.')}</p>
          </div>
        </div>
      </section>

      {/* Section 3: Get Help With Your Assignment (Dark Navy Banner) */}
      <section className="assignment-dark-section">
        <div className="container">
          <div className="assignment-dark-header">
            <h2>{t('how.assignmentTitle', 'Get Help With Your Assignment')}</h2>
            <p>{t('how.assignmentSub', 'Fast, reliable, and expert-reviewed solutions.')}</p>
          </div>

          <div className="assignment-steps-grid">
            <div className="assignment-step-item">
              <span className="step-num-faint">01</span>
              <div className="asgn-icon-circle">☁️</div>
              <h3>{t('how.asgnStep1Title', 'Upload')}</h3>
              <p>{t('how.asgnStep1Sub', 'Securely upload your assignment files to our encrypted portal.')}</p>
            </div>

            <div className="assignment-step-item">
              <span className="step-num-faint">02</span>
              <div className="asgn-icon-circle">📝</div>
              <h3>{t('how.asgnStep2Title', 'Describe')}</h3>
              <p>{t('how.asgnStep2Sub', 'Add details and set your price offer for the task requirements.')}</p>
            </div>

            <div className="assignment-step-item">
              <span className="step-num-faint">03</span>
              <div className="asgn-icon-circle">🔄</div>
              <h3>{t('how.asgnStep3Title', 'Review')}</h3>
              <p>{t('how.asgnStep3Sub', 'Qualified instructors review and accept your specific request.')}</p>
            </div>

            <div className="assignment-step-item">
              <span className="step-num-faint">04</span>
              <div className="asgn-icon-circle">✅</div>
              <h3>{t('how.asgnStep4Title', 'Complete')}</h3>
              <p>{t('how.asgnStep4Sub', 'Receive your high-quality solution directly in your account.')}</p>
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
            <h2>{t('how.seamlessTitle', 'Seamless Platform Experience')}</h2>
            <p className="seamless-desc">
              {t('how.seamlessSub', 'Our interface is designed for speed and clarity. Optimized for your learning journey.')}
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Cyan Banner CTA */}
      <section className="works-cta-section container">
        <div className="cyan-cta-banner text-center">
          <h2>{t('students.ctaTitle', 'Start Learning Today')}</h2>
          <p>
            {t('home.ctaSub', "Join thousands of students who have improved their grades with JAR Academy's expert guidance.")}
          </p>
          <div className="cta-action-row">
            <Link to="/get-started" className="btn-dark cta-dark-btn">
              {t('nav.getStarted', 'Get Started')}
            </Link>
            <Link to="/contact" className="btn-secondary contact-sales-pill">
              {t('nav.contact', 'Contact Sales')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
