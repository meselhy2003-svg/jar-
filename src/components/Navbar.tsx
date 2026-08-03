import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import JarAcademyLogo from './JarAcademyLogo';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const logoTarget = isAuthenticated 
    ? (user?.role === 'instructor' ? '/instructor/dashboard' : '/student/dashboard')
    : '/';

  return (
    <header className="navbar">
      <div className="container nav-container">
        <Link to={logoTarget} className="nav-logo-link" title="JAR ACADEMY Dashboard">
          <JarAcademyLogo height={48} />
        </Link>
        
        <nav className="nav-links">
          {isAuthenticated ? (
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
          {isAuthenticated ? (
            <>
              {user?.role === 'admin' && (
                <Link to="/admin" className="btn-secondary admin-nav-btn">⚡ Admin Panel</Link>
              )}
              <button className="nav-bell-btn" title="Notifications">
                🔔
              </button>
              <Link to="/student/dashboard" className="my-profile-dark-pill">
                👤 My Profile
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
