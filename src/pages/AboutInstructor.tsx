import { Link } from 'react-router-dom';
import './AboutInstructor.css';

const AboutInstructor = () => {
  return (
    <div className="about-instructor-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-instructor-section container">
        <div className="hero-instructor-left">
          <span className="badge-network">JOIN OUR TEACHING NETWORK</span>
          
          <h1 className="hero-instructor-title">
            Turn Your<br />
            Knowledge Into<br />
            Impact.
          </h1>
          
          <p className="hero-instructor-sub">
            Join JAR ACADEMY as an instructor and help students understand their lectures, assignments, and difficult topics with real-time support.
          </p>
          
          <div className="hero-instructor-btns">
            <Link to="/get-started" className="btn-primary become-tutor-btn">
              Become an Instructor
            </Link>
          </div>
        </div>

        {/* Hero Graphic Right */}
        <div className="hero-instructor-right">
          <div className="instructor-photo-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" 
              alt="Instructors Collaborating" 
              className="instructor-main-photo"
            />

            {/* Top Right Floating Badge */}
            <div className="float-badge-instructor top-right">
              <span className="badge-check-icon">✓</span>
              <span>New Assignment Uploaded!</span>
            </div>

            {/* Bottom Left Floating Badge */}
            <div className="float-badge-instructor bottom-left">
              <span className="badge-live-dot">🎥</span>
              <div>
                <strong>Live Session Started</strong>
                <span className="sub-tag">Interaction active now</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Why Teach on JAR */}
      <section className="why-teach-section container">
        <h2>Why Teach on JAR</h2>
        <p className="section-subtext">Join thousands of educators making a difference</p>

        <div className="why-teach-grid">
          <div className="why-card card">
            <div className="why-icon-box">⏰</div>
            <h3>Flexible Teaching</h3>
            <p>
              Explain topics anytime with live or recorded sessions. Work around your own schedule.
            </p>
          </div>

          <div className="why-card card">
            <div className="why-icon-box">💬</div>
            <h3>Earn From Your Knowledge</h3>
            <p>
              Get paid for helping students understand their material. Competitive rates and fast payouts.
            </p>
          </div>

          <div className="why-card card">
            <div className="why-icon-box">🌍</div>
            <h3>Global Students</h3>
            <p>
              Help students from different universities and fields around the globe from your home.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: How It Works (For Instructor) - Strict Left Alignment */}
      <section className="how-instructor-section container">
        <div className="section-title-wrap">
          <h2 className="title-left">How It Works (For Instructor)</h2>
        </div>

        <div className="instructor-steps-grid">
          {/* Step 1 */}
          <div className="instructor-step-item">
            <div className="step-num-cyan">1</div>
            <h3>Create your instructor profile</h3>
            <p>Showcase your expertise and academic background.</p>
          </div>

          {/* Step 2 */}
          <div className="instructor-step-item">
            <div className="step-num-cyan">2</div>
            <h3>Students upload material</h3>
            <p>Review assignments or difficult topics students need help with.</p>
          </div>

          {/* Step 3 */}
          <div className="instructor-step-item">
            <div className="step-num-cyan">3</div>
            <h3>Accept and explain</h3>
            <p>Accept requests and provide a clear, detailed explanation.</p>
          </div>

          {/* Step 4 */}
          <div className="instructor-step-item">
            <div className="step-num-cyan">4</div>
            <h3>Earn for each session</h3>
            <p>Receive payments directly to your account per session.</p>
          </div>
        </div>
      </section>

      {/* Section 4: Manage Your Sessions with Ease (Dark Card) */}
      <section className="manage-section container">
        <div className="dark-card manage-dark-banner">
          <div className="manage-left-text">
            <h2>Manage Your Sessions with Ease</h2>
            <p>
              Our powerful dashboard gives you all the tools to track student requests, manage uploaded PDFs, and organize your teaching schedule efficiently.
            </p>
            <ul className="check-feature-list">
              <li><span className="check-box-icon">☑</span> Real-time request notifications</li>
              <li><span className="check-box-icon">☑</span> Built-in PDF viewer for assignments</li>
              <li><span className="check-box-icon">☑</span> Detailed earning reports</li>
            </ul>
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
                    <span className="req-doc-icon">📄</span>
                    <div>
                      <strong>Physics Assignment 3.pdf</strong>
                      <span>Student: Samer Abdo</span>
                    </div>
                  </div>
                  <button className="btn-cyan-sm">View</button>
                </div>

                <div className="request-item-row">
                  <div className="req-item-left">
                    <span className="req-doc-icon">📄</span>
                    <div>
                      <strong>Organic Chemistry Quiz Prep</strong>
                      <span>Student: Reem K.</span>
                    </div>
                  </div>
                  <button className="btn-cyan-sm">View</button>
                </div>

                <div className="request-item-row">
                  <div className="req-item-left">
                    <span className="req-doc-icon">📄</span>
                    <div>
                      <strong>Economics Essay Review</strong>
                      <span>Student: Rami Tarek</span>
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
          <h2>Start Teaching Today.</h2>
          <p>
            Join a community of expert instructors and start making an impact on students' academic journeys while growing your own professional profile.
          </p>
          <Link to="/get-started" className="btn-dark cta-dark-btn">
            Become an Instructor
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutInstructor;
