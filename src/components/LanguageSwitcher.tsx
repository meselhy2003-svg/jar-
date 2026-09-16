import { useLanguage } from '../context/LanguageContext';
import './LanguageSwitcher.css';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher = ({ className = '' }: LanguageSwitcherProps) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      onClick={toggleLanguage} 
      className={`lang-switcher-btn ${className}`}
      title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
      aria-label="Toggle language"
    >
      <span className="lang-globe-icon">🌐</span>
      <span className="lang-switcher-text">
        {language === 'ar' ? 'English' : 'العربية'}
      </span>
      <span className="lang-badge-pill">
        {language === 'ar' ? 'EN' : 'AR'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
