import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './GetStarted.css';

const GetStarted = () => {
  const { t } = useLanguage();

  return (
    <div className="get-started-page container animate-fade-in">
      <div className="get-started-header text-center">
        <h1>{t('getStarted.title', 'Join JAR Academy')}</h1>
        <p className="section-subtitle">{t('getStarted.sub', 'Select your account type to get started.')}</p>
      </div>

      <div className="role-cards-container">
        {/* Student Card */}
        <div className="role-card card text-center">
          <div className="role-icon-box cyan">
            <img src="/student-role-icon.png" alt="Student" className="role-icon-img" />
          </div>
          <h2>{t('getStarted.student', 'Student')}</h2>
          <p>{t('getStarted.studentDesc', 'Book 1-on-1 tutoring sessions, get help with your assignments, and ace your university exams.')}</p>
          <div className="role-actions">
            <Link to="/signup" className="btn-primary w-100">
              {t('getStarted.createStudent', 'Create Student Account')}
            </Link>
            <Link to="/login" className="btn-secondary w-100">
              {t('getStarted.studentLogin', 'Student Login')}
            </Link>
          </div>
        </div>

        {/* Instructor Card */}
        <div className="role-card card text-center">
          <div className="role-icon-box mint">
            <img src="/instructor-role-icon.png" alt="Instructor" className="role-icon-img" />
          </div>
          <h2>{t('getStarted.instructor', 'Instructor')}</h2>
          <p>{t('getStarted.instructorDesc', 'Teach university students, share your academic expertise, and earn money on a flexible schedule.')}</p>
          <div className="role-actions">
            <Link to="/instructor-login" className="btn-primary w-100" style={{ background: 'var(--dark-surface)' }}>
              {t('getStarted.instructorLogin', 'Instructor Login')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
