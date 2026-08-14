import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useInstructor } from '../context/InstructorContext';
import JarAcademyLogo from './JarAcademyLogo';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { unreadCount } = useInstructor();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isInstructorView = user?.role === 'instructor' || location.pathname.startsWith('/instructor/') || location.pathname === '/available-tasks' || location.pathname === '/trial-tasks';

  const logoTarget = isInstructorView
    ? '/instructor/dashboard'
    : isAuthenticated
      ? '/student/dashboard'
      : '/';

  return (
    <header className="navbar">
      <div className="container nav-container">
        <Link to={logoTarget} className="nav-logo-link" title="JAR ACADEMY Dashboard">
          <JarAcademyLogo height={48} />
        </Link>
        
        <nav className="nav-links">
          {isInstructorView ? (
            <>
              <Link to="/instructor/tasks" className={`nav-link ${isActive('/instructor/tasks')}`}>
                Available Tasks
              </Link>
              <Link to="/instructor/projects" className={`nav-link ${isActive('/instructor/projects')}`}>
                My projects
              </Link>
              <Link to="/instructor/offers" className={`nav-link ${isActive('/instructor/offers')}`}>
                Offers
              </Link>
              <Link to="/instructor/contact" className={`nav-link ${isActive('/instructor/contact')}`}>
                contact us
              </Link>
            </>
          ) : isAuthenticated ? (
            <>
              <Link to="/book-session" className={`nav-link ${isActive('/book-session')}`}>
                📄 Upload Files
              </Link>
              <Link to="/courses" className={`nav-link ${isActive('/courses')}`}>
                📖 My Courses
              </Link>
              <Link to="/my-assignments" className={`nav-link ${isActive('/my-assignments')}`}>
                📋 My Assignments
              </Link>
              <Link to="/orders" className={`nav-link ${isActive('/orders')}`}>
                🛒 My Orders
              </Link>
              <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>
                contact us
              </Link>
            </>
          ) : (
            <>
              <Link to="/about-students" className={`nav-link ${isActive('/about-students')}`}>
                About Students
              </Link>
              <Link to="/instructor" className={`nav-link ${isActive('/instructor')}`}>
                About Instructor
              </Link>
              <Link to="/how-it-works" className={`nav-link ${isActive('/how-it-works')}`}>
                How It Works
              </Link>
              <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>
                Contact
              </Link>
            </>
          )}
        </nav>
        
        <div className="nav-actions">
          {isInstructorView || isAuthenticated ? (
            <>
              {user?.role === 'admin' && (
                <Link to="/admin" className="btn-secondary admin-nav-btn">⚡ Admin Panel</Link>
              )}
              <Link
                to="/instructor/notifications"
                className={`nav-bell-btn ${location.pathname === '/instructor/notifications' || location.pathname === '/notifications' ? 'active' : ''}`}
                title="Notifications"
                style={{ position: 'relative' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
                {unreadCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      right: '-2px',
                      background: '#EF4444',
                      color: '#FFFFFF',
                      fontSize: '0.65rem',
                      fontWeight: '800',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #FFFFFF',
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </Link>
              <Link
                to={isInstructorView ? '/instructor/profile' : '/student/dashboard'}
                className={`my-profile-dark-pill ${location.pathname.startsWith('/instructor/profile') || location.pathname.startsWith('/instructor/edit-profile') ? 'active' : ''}`}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', fontSize: '0.9rem', fontWeight: '500' }}
              >
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#F8C8A0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  🧑🏻
                </div>
                My Profile
              </Link>
              <button className="btn-secondary logout-btn-sm" onClick={handleLogout}>Log Out</button>
            </>
          ) : (
            <Link to="/get-started" className="btn-primary">Get Started</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
