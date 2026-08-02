import { useAuth } from '../../context/AuthContext';

const InstructorDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="instructor-dash-page container animate-fade-in" style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
      <div className="dash-welcome card" style={{ padding: '2.5rem', marginBottom: '3rem', background: 'var(--primary-color)', color: '#ffffff' }}>
        <span style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '4px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '700' }}>Instructor Portal</span>
        <h1 style={{ color: '#ffffff', fontSize: '2.5rem', margin: '0.5rem 0' }}>Welcome, Instructor {user?.name || 'Partner'}! 👨‍🏫</h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', margin: 0 }}>You have 3 new student requests pending review and $420 earned this week.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <p style={{ color: 'var(--text-secondary)', margin: '0 0 0.5rem 0' }}>Pending Requests</p>
          <h2 style={{ margin: 0, fontSize: '2.2rem', color: 'var(--primary-color)' }}>3 Requests</h2>
        </div>
        <div className="card" style={{ padding: '1.5rem' }}>
          <p style={{ color: 'var(--text-secondary)', margin: '0 0 0.5rem 0' }}>Total Students Taught</p>
          <h2 style={{ margin: 0, fontSize: '2.2rem' }}>148 Students</h2>
        </div>
        <div className="card" style={{ padding: '1.5rem' }}>
          <p style={{ color: 'var(--text-secondary)', margin: '0 0 0.5rem 0' }}>Monthly Earnings</p>
          <h2 style={{ margin: 0, fontSize: '2.2rem', color: 'var(--mint-accent)' }}>$1,850.00</h2>
        </div>
      </div>

      {/* Pending Student Requests */}
      <div className="card" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Incoming Student Session Requests</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge" style={{ background: '#FEF3C7', color: '#D97706', marginBottom: '0.5rem' }}>Needs Response</span>
              <h4 style={{ margin: '0.25rem 0' }}>Student: Alex Johnson • Subject: Calculus II Integration</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Requested Time: Tomorrow at 2:00 PM (1-Hour Session)</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn-primary" style={{ padding: '8px 20px' }}>Accept Request</button>
              <button className="btn-secondary" style={{ padding: '8px 20px' }}>Decline</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
