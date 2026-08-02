import { Link } from 'react-router-dom';
import JarAcademyLogo from './JarAcademyLogo';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-minimal">
      <div className="container footer-minimal-inner">
        <div className="footer-left">
          <Link to="/" className="footer-logo-link">
            <JarAcademyLogo height={36} />
          </Link>
        </div>

        <div className="footer-center-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Cookie Policy</Link>
          <Link to="/contact">Help Center</Link>
        </div>

        <div className="footer-right">
          <p>&copy; {new Date().getFullYear()} JAR ACADEMY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
