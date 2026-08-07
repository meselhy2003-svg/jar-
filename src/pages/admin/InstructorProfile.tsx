import { useNavigate } from 'react-router-dom';
import './InstructorProfile.css';

const InstructorProfile = () => {
  const navigate = useNavigate();

  const handleSuspend = () => {
    if (confirm('Are you sure you want to suspend Dr. Julianne Davies?')) {
      alert('Instructor Dr. Julianne Davies has been suspended.');
    }
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to permanently delete Dr. Julianne Davies? This action cannot be undone.')) {
      alert('Instructor profile deleted.');
      navigate('/admin/instructors');
    }
  };

  return (
    <div className="instructor-profile-page animate-fade-in">
      {/* Header & Top Actions */}
      <div className="profile-header-row">
        <div>
          <h1 className="profile-main-title">Instructor Profile View</h1>
          <div className="profile-breadcrumb">
            <span onClick={() => navigate('/admin/instructors')} className="crumb-link">Instructors</span>
            <span> &gt; </span>
            <span className="crumb-active">Dr. Julianne Davies</span>
          </div>
        </div>

        <div className="header-action-buttons">
          <button onClick={() => navigate('/admin/instructors/edit')} className="btn-secondary edit-inst-btn">✏️ Edit Instructor</button>
          <button onClick={handleSuspend} className="btn-outline suspend-inst-btn">🚫 Suspend Instructor</button>
          <button onClick={handleDelete} className="btn-outline delete-inst-btn">🗑️ Delete Instructor</button>
        </div>
      </div>

      {/* Profile Overview Row (2 Columns) */}
      <div className="profile-columns-grid">
        {/* Left Card: Basic Info & Wallet button */}
        <div className="profile-identity-card card text-center">
          <div className="avatar-relative-wrap">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop" 
              alt="Dr. Julianne Davies" 
              className="profile-avatar-large"
            />
            <span className="online-green-dot"></span>
          </div>

          <h2 className="inst-profile-name">Dr. Julianne Davies</h2>
          <p className="inst-profile-role">Lead Physics Instructor</p>

          <div className="inst-badges-box">
            <div className="badge-item">
              <span className="b-lbl">COUNTRY</span>
              <strong className="b-val">Egypt 🇪🇬</strong>
            </div>
            <div className="badge-item">
              <span className="b-lbl">RATING</span>
              <strong className="b-val yellow-txt">★ 4.9/5.0</strong>
            </div>
          </div>

          <div className="member-degrees-row">
            <div>
              <span className="meta-lbl">Member Since</span>
              <strong className="meta-val">Aug 2022</strong>
            </div>
            <div>
              <span className="meta-lbl">Verified Degrees</span>
              <span className="degree-pill">PHD & MSC</span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/admin/instructor-wallet')} 
            className="btn-primary open-wallet-btn"
          >
            💳 wallet
          </button>
        </div>

        {/* Right Card: Academic & Contact Information */}
        <div className="academic-contact-card card">
          <h3>Academic & Contact Information</h3>

          <div className="info-fields-grid-three">
            <div>
              <span className="field-lbl">FULL NAME</span>
              <strong className="field-val">Julianne Davies</strong>
            </div>
            <div>
              <span className="field-lbl">AGE</span>
              <strong className="field-val">32 Years</strong>
            </div>
            <div>
              <span className="field-lbl">PHONE</span>
              <strong className="field-val">+20 123 456 7890</strong>
            </div>

            <div>
              <span className="field-lbl">EMAIL ADDRESS</span>
              <strong className="field-val">j.davies@jaracademy.com</strong>
            </div>
            <div>
              <span className="field-lbl">UNIVERSITY</span>
              <strong className="field-val">Cairo University</strong>
            </div>
            <div>
              <span className="field-lbl">COLLEGE</span>
              <strong className="field-val">Faculty of Computer Science</strong>
            </div>

            <div>
              <span className="field-lbl">MAJOR</span>
              <strong className="field-val">computrer science</strong>
            </div>
            <div>
              <span className="field-lbl">ACADEMIC STATUS</span>
              <strong className="field-val">Graduated (PHD)</strong>
            </div>
          </div>

          <div className="can-teach-section">
            <span className="field-lbl">SUBJECTS YOU CAN TEACH</span>
            <div className="can-teach-pill">I can teach Computer Science</div>
          </div>
        </div>
      </div>

      {/* Filter Activity Period Bar */}
      <div className="activity-filter-bar card">
        <div className="filter-left-inputs">
          <span className="filter-cal-icon">📅 Filter Activity Period:</span>
          
          <div className="date-input-group">
            <label>FROM</label>
            <select defaultValue="01/02/2024">
              <option value="01/02/2024">01/02/2024</option>
            </select>
          </div>

          <div className="date-input-group">
            <label>TO</label>
            <select defaultValue="12/31/2024">
              <option value="12/31/2024">12/31/2024</option>
            </select>
          </div>
        </div>

        <button onClick={() => alert('Instructor statistics updated!')} className="btn-secondary update-stats-btn">
          🔄 Update Statistics
        </button>
      </div>

      {/* 4 Metric Cards Row */}
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
          </div>
          <span className="stat-ttl">Total Number of Assignments</span>
          <h2 className="stat-num">15</h2>
        </div>
      </div>

      {/* Monthly Teaching Hours Chart & Recent Activity */}
      <div className="chart-activity-grid">
        {/* Left Bar Chart */}
        <div className="monthly-chart-card card">
          <div className="card-header-flex">
            <div>
              <h3>Monthly Teaching Hours</h3>
              <span className="chart-sub-label">Session distribution over current fiscal year</span>
            </div>
            <span className="dots-menu">--</span>
          </div>

          <div className="months-bar-chart">
            <div className="m-bar-col"><div className="m-bar" style={{ height: '35%' }}></div><span>JAN</span></div>
            <div className="m-bar-col"><div className="m-bar" style={{ height: '50%' }}></div><span>FEB</span></div>
            <div className="m-bar-col"><div className="m-bar" style={{ height: '40%' }}></div><span>MAR</span></div>
            <div className="m-bar-col"><div className="m-bar high-bar" style={{ height: '75%' }}></div><span>APR</span></div>
            <div className="m-bar-col"><div className="m-bar" style={{ height: '60%' }}></div><span>MAY</span></div>
            <div className="m-bar-col"><div className="m-bar" style={{ height: '55%' }}></div><span>JUN</span></div>
            <div className="m-bar-col"><div className="m-bar high-bar" style={{ height: '85%' }}></div><span>JUL</span></div>
            <div className="m-bar-col"><div className="m-bar" style={{ height: '65%' }}></div><span>AUG</span></div>
            <div className="m-bar-col"><div className="m-bar" style={{ height: '50%' }}></div><span>SEP</span></div>
            <div className="m-bar-col"><div className="m-bar" style={{ height: '70%' }}></div><span>OCT</span></div>
            <div className="m-bar-col"><div className="m-bar" style={{ height: '45%' }}></div><span>NOV</span></div>
            <div className="m-bar-col"><div className="m-bar" style={{ height: '60%' }}></div><span>DEC</span></div>
          </div>
        </div>

        {/* Right Recent Activity List */}
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

export default InstructorProfile;
