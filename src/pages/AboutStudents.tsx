import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './AboutStudents.css';

const AboutStudents = () => {
  const { t } = useLanguage();

  return (
    <div className="about-students-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-students-section container">
        <div className="hero-students-left">
          <span className="section-tag-cyan">{t('students.heroTag', 'FOR STUDENTS')}</span>
          <h1 className="hero-students-title">
            {t('students.heroTitle1', 'Study Smarter.')}<br />
            <span className="highlight-cyan">{t('students.heroTitle2', 'Understand Faster.')}</span>
          </h1>
          <p className="hero-students-sub">
            {t('students.heroSub', 'Upload your lecture, assignment, or topic and get it explained by expert instructors. Personalized learning designed for your success.')}
          </p>
          <div className="hero-students-btns">
            <Link to="/get-started" className="btn-primary">
              {t('home.getStarted', 'Get Started Now →')}
            </Link>
            <Link to="/how-it-works" className="btn-secondary">
              {t('home.watchDemo', 'Watch Demo')}
            </Link>
          </div>
        </div>

        {/* Right Graphic Mint Box */}
        <div className="hero-students-right">
          <div className="mint-graphic-card">
            <img 
              src="/about-students-hero.png" 
              alt="Study Smarter" 
              className="students-hero-img" 
            />

            {/* Top Right Floating Badge */}
            <div className="float-badge top-right">
              <span className="check-badge-icon">✓</span>
              <div>
                <strong>Explanation Ready</strong>
                <span className="badge-time">5 minutes ago</span>
              </div>
            </div>

            {/* Bottom Left Floating Badge */}
            <div className="float-badge bottom-left">
              <span className="pdf-badge-icon">
                <img src="/pdf-icon.png" alt="PDF" style={{ width: '1.2em', height: '1.2em', objectFit: 'contain', verticalAlign: 'middle' }} />
              </span>
              <strong>Lecture_Notes.pdf</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Why JAR ACADEMY? */}
      <section className="challenges-section container">
        <div className="section-header">
          <span className="section-tag-cyan">{t('students.whyTag', 'THE CHALLENGES')}</span>
          <h2>{t('students.whyTitle', 'Why JAR ACADEMY?')}</h2>
        </div>

        <div className="challenges-grid">
          <div className="challenge-card card">
            <div className="icon-box-peach">🎨</div>
            <h3>{t('students.confusingTitle', 'Confusing Lectures')}</h3>
            <p>
              {t('students.confusingSub', 'Some topics are difficult to understand alone, especially when classroom environments move too fast.')}
            </p>
          </div>

          <div className="challenge-card card">
            <div className="icon-box-pink">⏰</div>
            <h3>{t('students.pressureTitle', 'Assignment Pressure')}</h3>
            <p>
              {t('students.pressureSub', 'Deadlines and complex assignments can be stressful. We help break down the problem so you can tackle it with confidence.')}
            </p>
          </div>

          <div className="challenge-card card">
            <div className="icon-box-blue">ℹ️</div>
            <h3>{t('students.noHelpTitle', 'No Direct Help')}</h3>
            <p>
              {t('students.noHelpSub', 'Sometimes there is no one available to explain properly. Our expert instructors fill that gap whenever you need them.')}
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: The Path to Clarity */}
      <section className="clarity-section container">
        <div className="section-header">
          <span className="section-tag-cyan">{t('students.pathTag', 'OUR PROCESS')}</span>
          <h2>{t('students.pathTitle', 'The Path to Clarity')}</h2>
        </div>

        <div className="clarity-steps-grid">
          {/* Step 1 */}
          <div className="clarity-step-wrap">
            <div className="step-circle-num">1</div>
            <div className="clarity-card card">
              <div className="step-icon-cyan">
                <img src="/pdf-icon.png" alt="Upload" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
              </div>
              <h3>{t('students.step1Title', 'Upload Any Material')}</h3>
              <p>
                {t('students.step1Sub', "Upload your lecture notes, difficult assignments, or just a specific topic you're struggling with.")}
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="clarity-step-wrap">
            <div className="step-circle-num">2</div>
            <div className="clarity-card card">
              <div className="step-icon-cyan">
                <img src="/student-dash-icons/Icon.png" alt="Instructor" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
              </div>
              <h3>{t('students.step2Title', 'Choose an Instructor')}</h3>
              <p>
                {t('students.step2Sub', 'Our vetted subject matter experts review your request and match with your specific learning needs.')}
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="clarity-step-wrap">
            <div className="step-circle-num">3</div>
            <div className="clarity-card card">
              <div className="step-icon-cyan">
                <img src="/pdf-icon.png" alt="PDF" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
              </div>
              <h3>{t('students.step3Title', 'Get the Explanation')}</h3>
              <p>
                {t('students.step3Sub', 'Receive a live one-on-one session or a high-quality recorded explanation tailored just for you.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Dark CTA Banner */}
      <section className="students-cta-section container">
        <div className="dark-card text-center students-cta-banner">
          <h2>{t('students.ctaTitle', 'Ready to clear your doubts?')}</h2>
          <p>
            {t('students.ctaSub', 'Join thousands of students who have transformed their learning experience with JAR ACADEMY.')}
          </p>
          <Link to="/get-started" className="btn-primary cta-cyan-pill">
            {t('students.startLearning', 'Start Learning Today')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutStudents;
