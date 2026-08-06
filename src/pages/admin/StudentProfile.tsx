import { useNavigate } from 'react-router-dom';
import './StudentProfile.css';

const StudentProfile = () => {
  const navigate = useNavigate();

  const handleSuspend = () => {
    if (confirm('Are you sure you want to suspend Alexander J. Montgomery?')) {
      alert('Student account suspended.');
    }
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete Alexander J. Montgomery? This action cannot be undone.')) {
      alert('Student account deleted.');
      navigate('/admin/students');
    }
  };

  return (
    <div className="student-profile-page animate-fade-in">
      {/* Header & Top Actions */}
      <div className="profile-header-row">
        <div>
          <h1 className="profile-main-title">Student Profile</h1>
          <p className="page-subtitle">
            View complete student information and activity statistics.
          </p>
        </div>

        <div className="header-action-buttons">
          <button onClick={() => navigate('/admin/students/edit')} className="btn-secondary edit-inst-btn">✏️ Edit Student</button>
          <button onClick={handleSuspend} className="btn-outline suspend-inst-btn">🚫 Suspend Student</button>
          <button onClick={handleDelete} className="btn-outline delete-inst-btn">🗑️ Delete Student</button>
        </div>
      </div>

      {/* Main Top Profile Overview Card */}
      <div className="student-main-info-card card">
        <div className="std-info-top-flex">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop" 
            alt="Alexander J. Montgomery" 
            className="std-profile-avatar"
          />

          <div className="std-info-right-details">
            <div className="std-title-badges-row">
              <h2>Alexander J. Montgomery</h2>
              <span className="active-pill">ACTIVE</span>
              <span className="registered-date">Registered: Oct 24, 2023</span>
            </div>

            <div className="std-fields-grid-three">
              <div>
                <span className="f-lbl">PHONE NUMBER</span>
                <strong className="f-val">+1 (555) 012-9843</strong>
              </div>

              <div>
                <span className="f-lbl">EMAIL ADDRESS</span>
                <strong className="f-val">a.montgomery@university.edu</strong>
              </div>

              <div>
                <span className="f-lbl">COUNTRY</span>
                <div className="country-flag-box">Egypt 🇪🇬</div>
              </div>

              <div>
                <span className="f-lbl">UNIVERSITY</span>
                <strong className="f-val">Stanford University</strong>
              </div>

              <div>
                <span className="f-lbl">FACULTY</span>
                <strong className="f-val">School of Engineering</strong>
              </div>

              <div>
                <span className="f-lbl">ACADEMIC YEAR</span>
                <strong className="f-val">Junior (Year 3)</strong>
              </div>

              <div>
                <span className="f-lbl">MAJOR</span>
                <strong className="f-val">Information technology</strong>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <button 
                onClick={() => navigate('/admin/student-wallet')} 
                className="btn-primary open-wallet-btn"
                style={{ width: '140px' }}
              >
                💳 wallet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Analytics Bar */}
      <div className="activity-filter-bar card">
        <div className="filter-left-inputs">
          <span className="filter-cal-icon">Learning Analytics</span>
          
          <div className="date-input-group">
            <label>FROM</label>
            <select defaultValue="01/01/2024">
              <option value="01/01/2024">01/01/2024</option>
            </select>
          </div>

          <div className="date-input-group">
            <label>TO</label>
            <select defaultValue="02/28/2024">
              <option value="02/28/2024">02/28/2024</option>
            </select>
          </div>
        </div>

        <button onClick={() => alert('Student analytics updated!')} className="btn-secondary update-stats-btn">
          Update Statistics
        </button>
      </div>

      {/* 4 Analytics Metric Cards */}
      <div className="four-stats-grid">
        <div className="stat-box-card card">
          <div className="stat-top-row">
            <span className="stat-ico blue-ico">⏱️</span>
            <span className="stat-pct green-pct">+12% vs last month</span>
          </div>
          <span className="stat-ttl">Trial Hours</span>
          <h2 className="stat-num">5h 30m</h2>
        </div>

        <div className="stat-box-card card">
          <div className="stat-top-row">
            <span className="stat-ico cyan-ico">📹</span>
            <span className="stat-pct grey-pct">Steady</span>
          </div>
          <span className="stat-ttl">Recorded Video Hours</span>
          <h2 className="stat-num">12h 45m</h2>
        </div>

        <div className="stat-box-card card">
          <div className="stat-top-row">
            <span className="stat-ico orange-ico">🎥</span>
            <span className="stat-pct orange-pct">+8h this week</span>
          </div>
          <span className="stat-ttl">Live Session Hours</span>
          <h2 className="stat-num">8h 20m</h2>
        </div>

        <div className="stat-box-card card">
          <div className="stat-top-row">
            <span className="stat-ico sparkle-ico">✨</span>
            <span className="stat-pct grey-pct">All Time</span>
          </div>
          <span className="stat-ttl">Total Learning Hours</span>
          <h2 className="stat-num">26h 35m</h2>
        </div>
      </div>

      {/* Activity Overview & Recent Activity */}
      <div className="chart-activity-grid">
        {/* Left: Activity Overview */}
        <div className="activity-overview-card card">
          <h3>Activity Overview</h3>

          <div className="overview-mini-stats-grid">
            <div className="mini-ov-box">
              <span className="ov-lbl">TOTAL ORDERS</span>
              <strong className="ov-val">24</strong>
            </div>

            <div className="mini-ov-box">
              <span className="ov-lbl">TOTAL COURSES</span>
              <strong className="ov-val">08</strong>
            </div>

            <div className="mini-ov-box">
              <span className="ov-lbl">ASSIGNMENTS</span>
              <strong className="ov-val">16</strong>
            </div>
          </div>

          <div className="orders-colored-cards-grid" style={{ marginTop: '1.5rem' }}>
            <div className="col-ord-card blue-bg">
              <span className="col-lbl">COMPLETED ORDERS</span>
              <h2 className="col-num">19</h2>
            </div>

            <div className="col-ord-card cyan-bg">
              <span className="col-lbl">ACTIVE ORDERS</span>
              <h2 className="col-num">03</h2>
            </div>

            <div className="col-ord-card orange-bg">
              <span className="col-lbl">PENDING ORDERS</span>
              <h2 className="col-num">02</h2>
            </div>
          </div>
        </div>

        {/* Right: Recent Activity */}
        <div className="inst-recent-activity-card card">
          <h3>Recent Activity</h3>

          <div className="inst-timeline">
            <div className="timeline-event">
              <span className="event-icon cyan-bg">➔</span>
              <div>
                <span className="event-type">LAST LOGIN</span>
                <strong>Today at 09:42 AM</strong>
                <p className="event-meta">Palo Alto, CA • IP: 192.168.1.42</p>
              </div>
            </div>

            <div className="timeline-event">
              <span className="event-icon blue-bg">👁️</span>
              <div>
                <span className="event-type">LAST COURSE VIEWED</span>
                <strong>Advanced Linear Algebra - Module 4</strong>
                <p className="event-meta">Feb 27, 2024 at 04:15 PM</p>
              </div>
            </div>

            <div className="timeline-event">
              <span className="event-icon orange-bg">🛒</span>
              <div>
                <span className="event-type">LAST ASSIGNMENT PURCHASE</span>
                <strong>Quantum Physics Research Paper</strong>
                <p className="event-meta">Feb 24, 2024 • Order #JAR-98312</p>
              </div>
            </div>

            <div className="timeline-event">
              <span className="event-icon purple-bg">🎥</span>
              <div>
                <span className="event-type">LAST LIVE SESSION</span>
                <strong>Group Mentorship with Dr. Aris</strong>
                <p className="event-meta">Feb 20, 2024 • 60 min duration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
