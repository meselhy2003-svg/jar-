import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import JarAcademyLogo from '../components/JarAcademyLogo';
import './AdminLayout.css';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to log out?')) {
      logout();
      navigate('/login');
    }
  };

  const isActive = (path: string) => {
    if (path === '/admin' && (location.pathname === '/admin' || location.pathname === '/admin/')) return 'active';
    if (path !== '/admin' && location.pathname.startsWith(path)) return 'active';
    return '';
  };

  return (
    <div className="admin-layout animate-fade-in">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="admin-brand" onClick={() => navigate('/admin')} style={{ cursor: 'pointer' }}>
          <JarAcademyLogo />
          <span className="admin-sub-tag">ADMIN DASHBOARD</span>
        </div>
        
        <nav className="admin-nav">
          <Link to="/admin" className={`admin-link ${isActive('/admin')}`}>
            <span className="nav-icon">⊞</span> Overview
          </Link>
          <Link to="/admin/students" className={`admin-link ${isActive('/admin/students')}`}>
            <span className="nav-icon">👥</span> Students
          </Link>
          <Link to="/admin/instructors" className={`admin-link ${isActive('/admin/instructors')}`}>
            <span className="nav-icon">🎓</span> Instructors
          </Link>
          <Link to="/admin/orders" className={`admin-link ${isActive('/admin/orders')}`}>
            <span className="nav-icon">🛒</span> Orders
          </Link>
          <Link to="/admin/financials" className={`admin-link ${isActive('/admin/financials')}`}>
            <span className="nav-icon">💵</span> Financials
          </Link>
        </nav>
      </aside>

      {/* Main Right Content Area */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-search">
            <span className="search-lens-icon">🔍</span>
            <input type="text" placeholder="Search platform analytics..." />
          </div>
          
          <div className="header-actions">
            <button className="icon-btn notif-bell-btn" title="Notifications" onClick={() => alert('All 12 platform alerts are up to date.')}>
              🔔<span className="notif-red-dot"></span>
            </button>
            
            {/* Click Admin Profile -> Navigates to /admin/profile */}
            <div 
              className="admin-user-profile" 
              onClick={() => navigate('/admin/profile')} 
              title="Click to view Admin Profile"
            >
              <div className="user-text-col text-right">
                <span className="user-name">Admin User</span>
                <span className="user-role">Head of Operations</span>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" 
                alt="Admin Avatar" 
                className="admin-avatar-img"
              />
            </div>

            <button className="logout-text-btn" onClick={handleLogout} title="Log Out">
              Log Out
            </button>
          </div>
        </header>
        
        <div className="admin-content-area">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
