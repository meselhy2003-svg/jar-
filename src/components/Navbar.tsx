import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useInstructor } from '../context/InstructorContext';
import { useLanguage } from '../context/LanguageContext';
import JarAcademyLogo from './JarAcademyLogo';
import LanguageSwitcher from './LanguageSwitcher';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { unreadCount: instructorUnreadCount } = useInstructor();
  const { t } = useLanguage();

  const [showNotifPopup, setShowNotifPopup] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      icon: '/pdf-icon.png',
      title: 'Assignment Explanation Ready',
      desc: 'Calculus II Homework explanation file is uploaded.',
      time: '10 mins ago',
      unread: true,
    },
    {
      id: '2',
      icon: '/student-dash-icons/Icon (17).png',
      title: 'Upcoming Live Session',
      desc: 'Organic Chemistry II session starts in 15 mins.',
      time: '25 mins ago',
      unread: true,
    },
    {
      id: '3',
      icon: '/student-dash-icons/my order.png',
      title: 'Payment Confirmed',
      desc: 'Receipt #84210 confirmed successfully.',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: '4',
      icon: '/student-dash-icons/Icon (14).png',
      title: 'New Offer Received',
      desc: 'Eng. Markus accepted your Python request.',
      time: '5 hours ago',
      unread: false,
    },
  ]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (showNotifPopup && !target.closest('.nav-bell-btn-wrap')) {
        setShowNotifPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifPopup]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    setUnreadCount(0);
  };

  const toggleNotifPopup = () => {
    setShowNotifPopup(prev => !prev);
  };

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
                <img src="/pdf-icon.png" alt="PDF" className="pdf-custom-icon" style={{ marginInlineEnd: '6px' }} />
                {t('nav.uploadFiles', 'Upload Files')}
              </Link>
              <Link to="/courses" className={`nav-link ${isActive('/courses')}`}>
                <img src="/student-dash-icons/courses.png" alt="Courses" style={{ width: '1.15em', height: '1.15em', verticalAlign: 'middle', marginInlineEnd: '6px', objectFit: 'contain' }} />
                {t('nav.myCourses', 'My Courses')}
              </Link>
              <Link to="/my-assignments" className={`nav-link ${isActive('/my-assignments')}`}>
                <img src="/student-dash-icons/My Assignments.png" alt="Assignments" style={{ width: '1.1em', height: '1.1em', verticalAlign: 'middle', marginInlineEnd: '6px', objectFit: 'contain' }} />
                {t('nav.myAssignments', 'My Assignments')}
              </Link>
              <Link to="/orders" className={`nav-link ${isActive('/orders')}`}>
                <img src="/student-dash-icons/my order.png" alt="Orders" style={{ width: '1.15em', height: '1.15em', verticalAlign: 'middle', marginInlineEnd: '6px', objectFit: 'contain' }} />
                {t('nav.myOrders', 'My Orders')}
              </Link>
              <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>
                {t('nav.contactUs', 'Contact Us')}
              </Link>
            </>
          ) : (
            <>
              <Link to="/about-students" className={`nav-link ${isActive('/about-students')}`}>
                {t('nav.aboutStudents', 'About Students')}
              </Link>
              <Link to="/instructor" className={`nav-link ${isActive('/instructor')}`}>
                {t('nav.aboutInstructor', 'About Instructor')}
              </Link>
              <Link to="/how-it-works" className={`nav-link ${isActive('/how-it-works')}`}>
                {t('nav.howItWorks', 'How It Works')}
              </Link>
              <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>
                {t('nav.contact', 'Contact')}
              </Link>
            </>
          )}
        </nav>
        
        <div className="nav-actions">
          <LanguageSwitcher />

          {isInstructorView || isAuthenticated ? (
            <>
              {user?.role === 'admin' && (
                <Link to="/admin" className="btn-secondary admin-nav-btn">
                  {t('nav.adminPanel', '⚡ Admin Panel')}
                </Link>
              )}

              {isInstructorView ? (
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
                  {instructorUnreadCount > 0 && (
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
                      {instructorUnreadCount}
                    </span>
                  )}
                </Link>
              ) : (
                <div className="nav-bell-btn-wrap">
                  <button 
                    className="nav-bell-btn" 
                    title="Notifications"
                    onClick={toggleNotifPopup}
                  >
                    <img src="/student-dash-icons/Icon (15).png" alt="Notifications" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                    {unreadCount > 0 && <span className="nav-bell-badge">{unreadCount}</span>}
                  </button>

                  {showNotifPopup && (
                    <div className="notifications-popup">
                      <div className="notif-popup-header">
                        <div className="notif-title-row">
                          <h3>{t('notif.title', 'Notifications')}</h3>
                          {unreadCount > 0 && <span className="notif-count-badge">{unreadCount} New</span>}
                        </div>
                        {unreadCount > 0 && (
                          <button onClick={handleMarkAllRead} className="notif-mark-read-btn">
                            {t('notif.markRead', 'Mark all read')}
                          </button>
                        )}
                      </div>

                      <div className="notif-popup-body">
                        {notifications.map(notif => (
                          <div key={notif.id} className={`notif-item ${notif.unread ? 'unread' : ''}`}>
                            <div className="notif-icon-circle">
                              <img src={notif.icon} alt={notif.title} style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
                            </div>
                            <div className="notif-content">
                              <strong>{notif.title}</strong>
                              <p>{notif.desc}</p>
                              <span className="notif-time">{notif.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="notif-popup-footer">
                        <Link to="/orders" onClick={() => setShowNotifPopup(false)} className="notif-footer-link">
                          {t('notif.viewAll', 'View All Activity →')}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <Link
                to={isInstructorView ? '/instructor/profile' : '/student/dashboard'}
                className={`my-profile-dark-pill ${location.pathname.startsWith('/instructor/profile') || location.pathname.startsWith('/instructor/edit-profile') ? 'active' : ''}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginInlineEnd: '6px', flexShrink: 0 }}>
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                {t('nav.myProfile', 'My Profile')}
              </Link>
              <button className="btn-secondary logout-btn-sm" onClick={handleLogout}>
                {t('nav.logOut', 'Log Out')}
              </button>
            </>
          ) : (
            <Link to="/get-started" className="btn-primary">
              {t('nav.getStarted', 'Get Started')}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
