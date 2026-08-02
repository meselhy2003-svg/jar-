import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="student-dash-page container animate-fade-in" style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
      <div className="dash-welcome card" style={{ padding: '2.5rem', marginBottom: '3rem', background: 'linear-gradient(135deg, var(--dark-surface), var(--dark-surface-card))', color: '#ffffff' }}>
        <span className="badge-cyan" style={{ marginBottom: '1rem', display: 'inline-block' }}>Student Portal</span>
        <h1 style={{ color: '#ffffff', fontSize: '2.5rem', margin: '0.5rem 0' }}>Welcome back, {user?.name || 'Student'}! 👋</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: 0 }}>You have 1 upcoming session today and 2 pending assignment reviews.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Active Upcoming Session */}
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0 }}>Upcoming Live Session</h3>
              <span className="badge" style={{ background: '#DCFCE7', color: '#15803D' }}>Starts in 15 mins</span>
            </div>
            
            <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>Organic Chemistry II - Reactions Mechanism</h4>
              <p style={{ color: 'var(--text-secondary)', margin: '0 0 1rem 0' }}>Tutor: Sarah Jenkins • 1-on-1 Explanation Session</p>
              <Link to="/session-room/101" className="btn-primary" style={{ padding: '10px 20px' }}>🎥 Enter Live Session Room</Link>
            </div>
          </div>

          {/* Enrolled Courses Progress */}
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>My Learning & Courses</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0' }}>Advanced React & Next.js Masterclass</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>8 / 12 Modules Completed (65%)</p>
                </div>
                <Link to="/courses/1/lesson/1" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Continue</Link>
              </div>

              <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0' }}>Data Structures & Algorithms</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>4 / 10 Modules Completed (40%)</p>
                </div>
                <Link to="/courses/2/lesson/1" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Continue</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h4>Quick Actions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
              <Link to="/book-session" className="btn-primary w-100" style={{ fontSize: '0.9rem' }}>+ Book 1-on-1 Session</Link>
              <Link to="/my-orders" className="btn-secondary w-100" style={{ fontSize: '0.9rem' }}>View Order History</Link>
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <h4>Academic Tutor Support</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>Need urgent help before an upcoming exam?</p>
            <Link to="/contact" style={{ fontWeight: '600', fontSize: '0.9rem' }}>Contact 24/7 Support →</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
