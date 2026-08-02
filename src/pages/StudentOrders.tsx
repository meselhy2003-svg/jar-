import { useState } from 'react';
import { Link } from 'react-router-dom';

const StudentOrders = () => {
  const [activeTab, setActiveTab] = useState<'hourly' | 'package'>('hourly');

  return (
    <div className="orders-page container animate-fade-in" style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
      <div className="section-title-wrap" style={{ marginBottom: '2.5rem' }}>
        <h1>My Orders & Sessions</h1>
        <p className="section-subtitle">Track your trial requests, hourly sessions, and course packages.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <button 
          className={activeTab === 'hourly' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setActiveTab('hourly')}
          style={{ padding: '10px 24px' }}
        >
          Hourly Sessions
        </button>
        <button 
          className={activeTab === 'package' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setActiveTab('package')}
          style={{ padding: '10px 24px' }}
        >
          Package Trials
        </button>
      </div>

      {/* Orders List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge" style={{ marginBottom: '0.5rem' }}>Active Session</span>
            <h3 style={{ margin: '0.5rem 0' }}>Hourly Trial Explanation: Organic Chemistry II</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Instructor: Sarah Jenkins • Scheduled: Tomorrow at 4:00 PM</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontWeight: '700', fontSize: '1.2rem', color: 'var(--primary-color)' }}>$35.00</span>
            <button className="btn-primary">Join Live Session</button>
          </div>
        </div>

        <div className="card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge" style={{ background: '#F1F5F9', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Completed</span>
            <h3 style={{ margin: '0.5rem 0' }}>Assignment Review: Data Structures & Algorithms</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Instructor: Alex Rivera • Completed yesterday</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontWeight: '700', fontSize: '1.2rem', color: 'var(--text-primary)' }}>$50.00</span>
            <button className="btn-secondary">View Solution Notes</button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <Link to="/book-session" className="btn-primary">+ Book New Session</Link>
      </div>
    </div>
  );
};

export default StudentOrders;
