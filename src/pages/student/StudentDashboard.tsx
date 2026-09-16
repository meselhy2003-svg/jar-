import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="student-dash-page container animate-fade-in">
      <div className="dash-welcome card">
        <span className="badge-cyan">
          <img src="/student-dash-icons/Icon.png" alt="Portal" style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginInlineEnd: '6px' }} />
          Student Portal
        </span>
        <h1>Welcome back, {user?.name || 'Student'}! 👋</h1>
        <p>You have 1 upcoming session today and 2 pending assignment reviews.</p>
      </div>

      <div className="dash-main-grid">
        {/* Main Content Column */}
        <div className="dash-content-col">
          {/* Active Upcoming Session */}
          <div className="card dash-card">
            <div className="dash-card-header">
              <h3>Upcoming Live Session</h3>
              <span className="badge badge-success">Starts in 15 mins</span>
            </div>
            
            <div className="session-info-box">
              <h4>Organic Chemistry II - Reactions Mechanism</h4>
              <p>Tutor: Sarah Jenkins • 1-on-1 Explanation Session</p>
              <Link to="/session-room/101" className="btn-primary session-btn">
                🎥 Enter Live Session Room
              </Link>
            </div>
          </div>

          {/* Enrolled Courses Progress */}
          <div className="card dash-card">
            <h3 className="dash-card-title">
              <img src="/student-dash-icons/courses.png" alt="Courses" style={{ width: '1.1em', height: '1.1em', verticalAlign: 'middle', marginInlineEnd: '8px', objectFit: 'contain' }} />
              My Learning & Courses
            </h3>
            <div className="courses-list">
              <div className="course-progress-item">
                <div>
                  <h4>Advanced React & Next.js Masterclass</h4>
                  <p className="course-meta">8 / 12 Modules Completed (65%)</p>
                </div>
                <Link to="/courses/1/lesson/1" className="btn-secondary course-btn">Continue</Link>
              </div>

              <div className="course-progress-item">
                <div>
                  <h4>Data Structures & Algorithms</h4>
                  <p className="course-meta">4 / 10 Modules Completed (40%)</p>
                </div>
                <Link to="/courses/2/lesson/1" className="btn-secondary course-btn">Continue</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="dash-sidebar-col">
          <div className="card dash-card">
            <h4>Quick Actions</h4>
            <div className="quick-actions-list">
              <Link to="/book-session" className="btn-primary w-100">+ Book 1-on-1 Session</Link>
              <Link to="/orders" className="btn-secondary w-100">
                <img src="/student-dash-icons/my order.png" alt="Orders" style={{ width: '1.1em', height: '1.1em', verticalAlign: 'middle', marginInlineEnd: '6px', objectFit: 'contain' }} />
                View Order History
              </Link>
            </div>
          </div>

          <div className="card dash-card">
            <h4>Academic Tutor Support</h4>
            <p className="support-desc">Need urgent help before an upcoming exam?</p>
            <Link to="/contact" className="support-link">Contact 24/7 Support →</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
