import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import JarAcademyLogo from './JarAcademyLogo';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer-minimal">
      <div className="container footer-minimal-inner">
        <div className="footer-left">
          <Link to="/" className="footer-logo-link">
            <JarAcademyLogo height={36} />
          </Link>
        </div>

        <div className="footer-center-links">
          <Link to="/privacy">{t('footer.privacy', 'Privacy Policy')}</Link>
          <Link to="/terms">{t('footer.terms', 'Terms of Service')}</Link>
          <Link to="/privacy">{t('footer.cookies', 'Cookie Policy')}</Link>
          <Link to="/contact">{t('footer.help', 'Help Center')}</Link>
        </div>

        <div className="footer-right">
          <p>&copy; {new Date().getFullYear()} {t('footer.rights', 'JAR ACADEMY. All rights reserved.')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
