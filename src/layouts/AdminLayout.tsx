import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path ? 'active' : '';

  return (
    <div className="admin-layout">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar glass-panel">
        <div className="admin-brand">
          <Link to="/">JAR <span className="highlight">Academy</span></Link>
          <div className="admin-badge">Admin Panel</div>
        </div>
        
        <nav className="admin-nav">
          <Link to="/admin" className={`admin-link ${isActive('/admin')}`}>
            📊 Dashboard
          </Link>
          <Link to="/admin/courses" className={`admin-link ${isActive('/admin/courses')}`}>
            📚 Manage Courses
          </Link>
          <Link to="/admin/users" className={`admin-link ${isActive('/admin/users')}`}>
            👥 Manage Users
          </Link>
          <Link to="/admin/settings" className={`admin-link ${isActive('/admin/settings')}`}>
            ⚙️ Settings
          </Link>
        </nav>
        
        <div className="admin-footer">
          <div className="admin-user">
            <div className="user-avatar">{user?.name.charAt(0).toUpperCase()}</div>
            <div className="user-info">
              <div className="user-name">{user?.name}</div>
              <div className="user-role">{user?.role}</div>
            </div>
          </div>
          <button className="btn-secondary logout-btn" onClick={handleLogout}>Log Out</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <header className="admin-header glass-panel">
          <div className="header-search">
            <input type="text" placeholder="Search admin..." />
          </div>
          <div className="header-actions">
            <button className="icon-btn">🔔</button>
            <Link to="/" className="btn-primary">View Site</Link>
          </div>
        </header>
        
        <div className="admin-content animate-fade-in">
          {/* This will render the specific admin page (Dashboard, etc.) */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
