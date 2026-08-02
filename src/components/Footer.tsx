import { Link } from 'react-router-dom';
import JarAcademyLogo from './JarAcademyLogo';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <Link to="/" className="footer-logo-link">
            <JarAcademyLogo height={80} />
          </Link>
          <p className="footer-desc">
            Connecting university students with top tutors for personalized 1-on-1 explanation sessions, assignment support, and exam preparation.
          </p>
        </div>
        
        <div className="footer-links">
          <div className="footer-col">
            <h4>Pages</h4>
            <Link to="/">About Students</Link>
            <Link to="/instructor">About Instructor</Link>
            <Link to="/how-it-works">How It Works</Link>
            <Link to="/contact">Contact Support</Link>
          </div>
          
          <div className="footer-col">
            <h4>Student Portal</h4>
            <Link to="/courses">Browse Courses</Link>
            <Link to="/book-session">Book 1-on-1 Session</Link>
            <Link to="/my-orders">My Orders</Link>
            <Link to="/get-started">Join Platform</Link>
          </div>
          
          <div className="footer-col">
            <h4>Contact Info</h4>
            <p>📧 support@jaracademy.com</p>
            <p>📞 +961 70 123 456</p>
            <p>🌐 Beirut, Lebanon</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} JAR Academy. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
