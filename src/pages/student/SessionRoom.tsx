import { Link } from 'react-router-dom';

const SessionRoom = () => {
  return (
    <div className="session-room-page container animate-fade-in" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <Link to="/student/dashboard" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>← Back to Dashboard</Link>
          <h2 style={{ margin: '0.5rem 0 0 0' }}>Live Interactive Session: Organic Chemistry II</h2>
        </div>
        <div className="badge" style={{ background: '#DCFCE7', color: '#15803D', fontSize: '0.9rem', padding: '8px 16px' }}>
          ● Session Active (Instructor: Sarah Jenkins)
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '1.5rem', height: '600px' }}>
        {/* Main Video & Screen Share Mockup */}
        <div className="dark-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '16px' }}>
          <div style={{ flexGrow: 1, background: '#1E293B', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>
            <span style={{ fontSize: '4rem', marginBottom: '1rem' }}>📺</span>
            <h3>Instructor Screen Sharing (Lecture Slides & Whiteboard)</h3>
            <p>1-on-1 HD Live Stream Active</p>
          </div>

          {/* Call Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
            <button className="btn-secondary" style={{ borderRadius: '50%', width: '50px', height: '50px', padding: 0 }}>🎤</button>
            <button className="btn-secondary" style={{ borderRadius: '50%', width: '50px', height: '50px', padding: 0 }}>📹</button>
            <button className="btn-secondary" style={{ borderRadius: '50%', width: '50px', height: '50px', padding: 0 }}>✋</button>
            <button className="btn-primary" style={{ background: '#EF4444', border: 'none', padding: '0 24px' }}>End Session</button>
          </div>
        </div>

        {/* Live Chat & Doubt Panel */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <h4 style={{ margin: '0 0 1rem 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>Live Chat & Notes</h4>
          
          <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
            <div style={{ background: '#F1F5F9', padding: '10px', borderRadius: '8px' }}>
              <strong>Sarah Jenkins (Tutor):</strong> Welcome! Feel free to ask any questions about page 4 of the slides.
            </div>
            <div style={{ background: 'var(--primary-light)', padding: '10px', borderRadius: '8px', alignSelf: 'flex-end', color: 'var(--primary-color)' }}>
              <strong>You:</strong> Could we review equation 3 again?
            </div>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
            <input type="text" placeholder="Type your doubt..." style={{ flexGrow: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
            <button className="btn-primary" style={{ padding: '10px 16px' }}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionRoom;
