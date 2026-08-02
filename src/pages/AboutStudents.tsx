import { Link } from 'react-router-dom';
import './AboutStudents.css';

const AboutStudents = () => {
  return (
    <div className="about-students-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-students-section container">
        <div className="hero-students-left">
          <h1 className="hero-students-title">
            Study Smarter.<br />
            <span className="highlight-cyan">Understand Faster.</span>
          </h1>
          <p className="hero-students-sub">
            Upload your lecture, assignment, or topic and get it explained by expert instructors. Personalized learning designed for your success.
          </p>
          <div className="hero-students-btns">
            <Link to="/get-started" className="btn-primary">
              Get Started Now &rarr;
            </Link>
            <Link to="/how-it-works" className="btn-secondary">
              Watch Demo
            </Link>
          </div>
        </div>

        {/* Right Graphic Mint Box */}
        <div className="hero-students-right">
          <div className="mint-graphic-card">
            <div className="computer-mockup">
              <div className="computer-screen">
                <span className="doc-icon">📄</span>
                <div className="doc-lines">
                  <div className="line l1"></div>
                  <div className="line l2"></div>
                  <div className="line l3"></div>
                </div>
              </div>
              <div className="computer-stand"></div>
            </div>

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
              <span className="pdf-badge-icon">📄</span>
              <strong>Lecture_Notes.pdf</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Why JAR ACADEMY? */}
      <section className="challenges-section container">
        <div className="section-header">
          <span className="section-tag-cyan">THE CHALLENGES</span>
          <h2>Why JAR ACADEMY?</h2>
        </div>

        <div className="challenges-grid">
          <div className="challenge-card card">
            <div className="icon-box-peach">🎨</div>
            <h3>Confusing Lectures</h3>
            <p>
              Some topics are difficult to understand alone, especially when classroom environments move too fast for individual pacing.
            </p>
          </div>

          <div className="challenge-card card">
            <div className="icon-box-pink">⏰</div>
            <h3>Assignment Pressure</h3>
            <p>
              Deadlines and complex assignments can be stressful. We help break down the problem so you can tackle it with confidence.
            </p>
          </div>

          <div className="challenge-card card">
            <div className="icon-box-blue">ℹ️</div>
            <h3>No Direct Help</h3>
            <p>
              Sometimes there is no one available to explain properly. Our expert instructors fill that gap whenever you need them.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: The Path to Clarity */}
      <section className="clarity-section container">
        <div className="section-header">
          <span className="section-tag-cyan">OUR PROCESS</span>
          <h2>The Path to Clarity</h2>
        </div>

        <div className="clarity-steps-grid">
          {/* Step 1 */}
          <div className="clarity-step-wrap">
            <div className="step-circle-num">1</div>
            <div className="clarity-card card">
              <div className="step-icon-cyan">☁️</div>
              <h3>Upload Any Material</h3>
              <p>
                Upload your lecture notes, difficult assignments, or just a specific topic you're struggling with.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="clarity-step-wrap">
            <div className="step-circle-num">2</div>
            <div className="clarity-card card">
              <div className="step-icon-cyan">👥</div>
              <h3>Choose an Instructor</h3>
              <p>
                Our vetted subject matter experts review your request and match with your specific learning needs.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="clarity-step-wrap">
            <div className="step-circle-num">3</div>
            <div className="clarity-card card">
              <div className="step-icon-cyan">📄</div>
              <h3>Get the Explanation</h3>
              <p>
                Receive a live one-on-one session or a high-quality recorded explanation tailored just for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Dark CTA Banner */}
      <section className="students-cta-section container">
        <div className="dark-card text-center students-cta-banner">
          <h2>Ready to clear your doubts?</h2>
          <p>
            Join thousands of students who have transformed their learning experience with JAR ACADEMY.
          </p>
          <Link to="/get-started" className="btn-primary cta-cyan-pill">
            Start Learning Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutStudents;
