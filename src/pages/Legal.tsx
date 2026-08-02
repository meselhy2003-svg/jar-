const Legal = () => {
  return (
    <div className="legal-page container animate-fade-in" style={{ paddingTop: '3rem', paddingBottom: '6rem', maxWidth: '900px' }}>
      <div className="section-title-wrap text-center" style={{ marginBottom: '4rem' }}>
        <h1>Terms of Service & Privacy Policy</h1>
        <p className="section-subtitle">Official platform guidelines for students and instructors.</p>
      </div>

      <div className="card" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
        <section>
          <h3 style={{ color: 'var(--text-primary)' }}>1. Platform Overview</h3>
          <p>
            JAR Academy acts as an online marketplace connecting university students with qualified independent academic instructors for 1-on-1 tutoring sessions, course explanations, and assignment support.
          </p>
        </section>

        <section>
          <h3 style={{ color: 'var(--text-primary)' }}>2. Academic Integrity</h3>
          <p>
            Students and tutors must strictly adhere to university honor codes. Sessions are intended for explanation, concept breakdown, and learning guidance. Direct ghostwriting or cheating is strictly prohibited.
          </p>
        </section>

        <section>
          <h3 style={{ color: 'var(--text-primary)' }}>3. Payment & Refund Guarantee</h3>
          <p>
            Payments are processed securely prior to session commencement. All 1-on-1 sessions are covered by our 30-Day Money-Back Guarantee if the session does not meet quality expectations.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Legal;
