import { Link, useLocation } from 'react-router-dom';
import './StudentHeader.css';

const StudentHeader = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'active' : '';

  return (
    <header className="student-navbar">
      <div className="container student-nav-container">
        <Link to="/" className="student-logo">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">JAR <span className="logo-sub">ACADEMY</span></span>
        </Link>
        
        <nav className="student-nav-links">
          <Link to="/book-session" className={`student-link ${isActive('/book-session')}`}>
            📁 Upload Files
          </Link>
          <Link to="/my-courses" className={`student-link ${isActive('/my-courses')}`}>
            📖 My Courses
          </Link>
          <Link to="/my-assignments" className={`student-link ${isActive('/my-assignments')}`}>
            📝 My Assignments
          </Link>
          <Link to="/my-orders" className={`student-link ${isActive('/my-orders')}`}>
            🛒 My Orders
          </Link>
          <Link to="/contact" className={`student-link ${isActive('/contact')}`}>
            contact us
          </Link>
        </nav>
        
        <div className="student-nav-actions">
          <button className="icon-btn bell-btn">🔔</button>
          <Link to="/student/dashboard" className="profile-pill-btn">
            👤 My Profile
          </Link>
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
