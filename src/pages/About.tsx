import './About.css';

const About = () => {
  return (
    <div className="about-page animate-fade-in">
      <div className="container">
        <header className="about-header">
          <h1>About <span className="highlight">JAR Academy</span></h1>
          <p className="subtitle">
            Our mission is to democratize high-quality tech education and empower individuals worldwide to achieve their dreams.
          </p>
        </header>

        <div className="about-content">
          <section className="about-section glass-panel">
            <div className="text-content">
              <h2>Our Story</h2>
              <p>
                Founded in 2026, JAR Academy started with a simple idea: that top-tier education shouldn't be locked behind expensive university tuition. We brought together industry veterans from top tech companies to create curriculum that actually matters in the real world.
              </p>
              <p>
                Today, we've grown into a massive platform supporting over 100+ unique learning paths, 50,000+ active students, and a community that thrives on collaboration and continuous growth.
              </p>
            </div>
            <div className="image-content">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" alt="Team collaborating" />
            </div>
          </section>

          <section className="values-section">
            <h2 className="text-center">Our Core Values</h2>
            <div className="values-grid">
              <div className="value-card glass-panel">
                <div className="icon">🚀</div>
                <h3>Innovation First</h3>
                <p>We teach the technologies of tomorrow, ensuring our students are always ahead of the curve.</p>
              </div>
              <div className="value-card glass-panel">
                <div className="icon">🤝</div>
                <h3>Community Driven</h3>
                <p>Learning is better together. We foster a supportive, inclusive environment for all.</p>
              </div>
              <div className="value-card glass-panel">
                <div className="icon">💎</div>
                <h3>Premium Quality</h3>
                <p>From our platform design to our course content, we settle for nothing less than excellence.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
