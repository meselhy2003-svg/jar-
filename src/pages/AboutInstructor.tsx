import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './AboutInstructor.css';

const AboutInstructor = () => {
  const { t } = useLanguage();

  return (
    <div className="about-instructor-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-instructor-section container">
        <div className="hero-instructor-left">
          <span className="badge-network">{t('instructor.heroBadge', 'JOIN OUR TEACHING NETWORK')}</span>
          
          <h1 className="hero-instructor-title">
            {t('instructor.heroTitle1', 'Turn Your')}<br />
            <span className="highlight-cyan">{t('instructor.heroTitle2', 'Knowledge Into Impact.')}</span>
          </h1>
          
          <p className="hero-instructor-sub">
            {t('instructor.heroSub', 'Join JAR ACADEMY as an instructor and help students understand their lectures, assignments, and difficult topics with real-time support.')}
          </p>
          
          <div className="hero-instructor-btns">
            <Link to="/get-started" className="btn-primary become-tutor-btn">
              {t('instructor.becomeBtn', 'Become an Instructor')}
            </Link>
          </div>
        </div>

        {/* Hero Graphic Right */}
        <div className="hero-instructor-right">
          <div className="instructor-photo-wrapper">
            <img 
              src="/about-instructor-hero.png" 
              alt="Turn Your Knowledge Into Impact" 
              className="instructor-main-photo"
            />

            {/* Top Right Floating Badge */}
            <div className="float-badge-instructor top-right">
              <span className="badge-check-icon">✓</span>
              <span>{t('badge.newAssignment', 'New Assignment Uploaded!')}</span>
            </div>

            {/* Bottom Left Floating Badge */}
            <div className="float-badge-instructor bottom-left">
              <span className="badge-live-dot">🎥</span>
              <div>
                <strong>{t('badge.liveSessionStarted', 'Live Session Started')}</strong>
                <span className="sub-tag">{t('badge.interactionActive', 'Interaction active now')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Why Teach on JAR */}
      <section className="why-teach-section container">
        <h2>{t('instructor.whyTitle', 'Why Teach on JAR')}</h2>
        <p className="section-subtext">{t('instructor.whySub', 'Join thousands of educators making a difference')}</p>

        <div className="why-teach-grid">
          <div className="why-card card">
            <div className="why-icon-box">
              <img src="/landing-icons/Icon (2).png" alt="Flexible Teaching" className="why-icon-img" />
            </div>
            <h3>{t('instructor.flexibleTitle', 'Flexible Teaching')}</h3>
            <p>
              {t('instructor.flexibleSub', 'Explain topics anytime with live or recorded sessions. Work around your own schedule.')}
            </p>
          </div>

          <div className="why-card card">
            <div className="why-icon-box">
              <img src="/landing-icons/Icon (6).png" alt="Earn From Your Knowledge" className="why-icon-img" />
            </div>
            <h3>{t('instructor.earnTitle', 'Earn From Your Knowledge')}</h3>
            <p>
              {t('instructor.earnSub', 'Get paid for helping students understand their material. Competitive rates and fast payouts.')}
            </p>
          </div>

          <div className="why-card card">
            <div className="why-icon-box">
              <img src="/landing-icons/Icon (7).png" alt="Global Students" className="why-icon-img" />
            </div>
            <h3>{t('instructor.globalTitle', 'Global Students')}</h3>
            <p>
              {t('instructor.globalSub', 'Help students from different universities and fields around the globe from your home.')}
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: How It Works (For Instructor) */}
      <section className="how-instructor-section container">
        <div className="section-title-wrap">
          <h2 className="title-left">{t('instructor.howTitle', 'How It Works (For Instructor)')}</h2>
        </div>

        <div className="instructor-steps-grid">
          {/* Step 1 */}
          <div className="instructor-step-item">
            <div className="step-num-cyan">1</div>
            <h3>{t('instructor.step1Title', 'Create your instructor profile')}</h3>
            <p>{t('instructor.step1Sub', 'Showcase your expertise and academic background.')}</p>
          </div>

          {/* Step 2 */}
          <div className="instructor-step-item">
            <div className="step-num-cyan">2</div>
            <h3>{t('instructor.step2Title', 'Students upload material')}</h3>
            <p>{t('instructor.step2Sub', 'Review assignments or difficult topics students need help with.')}</p>
          </div>

          {/* Step 3 */}
          <div className="instructor-step-item">
            <div className="step-num-cyan">3</div>
            <h3>{t('instructor.step3Title', 'Accept and explain')}</h3>
            <p>{t('instructor.step3Sub', 'Accept requests and provide a clear, detailed explanation.')}</p>
          </div>

          {/* Step 4 */}
          <div className="instructor-step-item">
            <div className="step-num-cyan">4</div>
            <h3>{t('instructor.step4Title', 'Earn for each session')}</h3>
            <p>{t('instructor.step4Sub', 'Receive payments directly to your account per session.')}</p>
          </div>
        </div>
      </section>

      {/* Section 4: Manage Your Sessions with Ease (Dark Card) */}
      <section className="manage-section container">
        <div className="dark-card manage-dark-banner">
          <div className="manage-left-text">
            <h2>{t('instructor.manageTitle', 'Manage Your Sessions with Ease')}</h2>
            <p>
              {t('instructor.manageSub', 'Our powerful dashboard gives you all the tools to track student requests, manage uploaded PDFs, and organize your teaching schedule efficiently.')}
            </p>
          </div>

          <div className="manage-right-mockup">
            <div className="mockup-panel-box">
              <div className="panel-header">
                <strong>Recent Requests</strong>
                <span className="badge-new-cyan">3 New</span>
              </div>

              <div className="panel-requests-list">
                <div className="request-item-row">
                  <div className="req-item-left">
                    <span className="req-doc-icon">
                      <img src="/pdf-icon.png" alt="PDF" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                    </span>
                    <div>
                      <strong>Physics Assignment 3.pdf</strong>
                      <span>Student: Samer Abdo</span>
                    </div>
                  </div>
                  <button className="btn-cyan-sm">View</button>
                </div>

                <div className="request-item-row">
                  <div className="req-item-left">
                    <span className="req-doc-icon">
                      <img src="/pdf-icon.png" alt="PDF" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                    </span>
                    <div>
                      <strong>Organic Chemistry Quiz Prep</strong>
                      <span>Student: Reem K.</span>
                    </div>
                  </div>
                  <button className="btn-cyan-sm">View</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Cyan Banner CTA */}
      <section className="instructor-cta-section container">
        <div className="cyan-cta-banner text-center">
          <h2>{t('instructor.ctaTitle', 'Start Teaching Today.')}</h2>
          <p>
            {t('instructor.ctaSub', "Join a community of expert instructors and start making an impact on students' academic journeys.")}
          </p>
          <Link to="/get-started" className="btn-dark cta-dark-btn">
            {t('instructor.becomeBtn', 'Become an Instructor')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutInstructor;
