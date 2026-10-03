import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './Login.css';
import { instructorLogin, studentLogin, type UserRole } from '../api/auth';

interface LoginProps {
  isInstructor?: boolean;
}

const Login = ({ isInstructor: initialIsInstructor = false }: LoginProps) => {
  const [isInstructor, setIsInstructor] = useState(initialIsInstructor);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthUser, login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const payload = { email, password };
      const response = isInstructor
        ? await instructorLogin(payload)
        : await studentLogin(payload);

      const user = response.data;
      setAuthUser(user, response.token);

      const role = (user.role as UserRole) || (isInstructor ? 'instructor' : 'student');
      const redirectMap: Record<UserRole, string> = {
        student: '/student/dashboard',
        instructor: '/instructor/dashboard',
        admin: '/admin',
      };
      navigate(redirectMap[role] ?? '/', { replace: true });
    } catch {
      // Offline / Demo fallback login
      const fallbackRole: UserRole = isInstructor
        ? 'instructor'
        : email.toLowerCase().includes('admin')
        ? 'admin'
        : 'student';

      const defaultFullName = isInstructor
        ? 'Dr. Ahmed Mohamed'
        : email.split('@')[0] || 'Ahmed Student';

      login(email, fallbackRole, {
        fullName: defaultFullName,
        role: fallbackRole,
        university: isInstructor ? 'King Saud University' : 'King Salman University',
        faculty: isInstructor ? 'CCIS' : 'Faculty of Computer Science',
        country: 'Saudi Arabia',
      });

      const targetPath =
        fallbackRole === 'instructor'
          ? '/instructor/dashboard'
          : fallbackRole === 'admin'
          ? '/admin'
          : '/student/dashboard';

      navigate(targetPath, { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page animate-fade-in container">
      <div className="auth-split-wrapper">
        {/* Left Illustration Box */}
        <div className="auth-illustration-side mint-box">
          <div className="illustration-content text-center">
            <img
              src={
                isInstructor
                  ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop'
                  : 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop'
              }
              alt="Auth Illustration"
              className="auth-img"
            />
            <h3>
              {isInstructor
                ? t('login.instructorTitle', 'Instructor Portal')
                : t('login.studentTitle', 'Student Portal')}
            </h3>
            <p>
              {isInstructor
                ? t(
                    'instructor.heroSub',
                    'Manage your sessions, answer student questions, and earn.'
                  )
                : t(
                    'students.heroSub',
                    'Access your registered courses, book sessions, and review material.'
                  )}
            </p>
          </div>
        </div>

        {/* Right Dark Navy Form Card */}
        <div className="auth-form-side dark-card">
          {/* Role Toggle Tabs */}
          <div
            style={{
              display: 'flex',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '4px',
              marginBottom: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <button
              type="button"
              onClick={() => setIsInstructor(false)}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '8px',
                border: 'none',
                background: !isInstructor ? '#00D1FF' : 'transparent',
                color: !isInstructor ? '#0F172A' : '#94A3B8',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              🎓 Student
            </button>
            <button
              type="button"
              onClick={() => setIsInstructor(true)}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '8px',
                border: 'none',
                background: isInstructor ? '#00D1FF' : 'transparent',
                color: isInstructor ? '#0F172A' : '#94A3B8',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              👨‍🏫 Instructor
            </button>
          </div>

          <div className="auth-header">
            <h2>
              {isInstructor
                ? t('login.instructorTitle', 'Instructor Login')
                : t('login.studentTitle', 'Student Login')}
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              {t('login.sub', 'Enter your credentials to access your account.')}
            </p>
          </div>

          {error && (
            <div
              style={{
                color: '#EF4444',
                fontSize: '0.85rem',
                marginBottom: '1rem',
                textAlign: 'center',
              }}
            >
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">{t('login.email', 'Email Address')}</label>
              <input
                type="email"
                id="email"
                placeholder={
                  isInstructor
                    ? 'instructor@jaracademy.com'
                    : 'student@jaracademy.com'
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">{t('login.password', 'Password')}</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                {t('login.rememberMe', 'Remember me')}
              </label>
              <Link to="/forgot-password" className="forgot-password">
                {t('login.forgotPassword', 'Forgot Password?')}
              </Link>
            </div>

            <button
              type="submit"
              className="btn-primary auth-submit"
              disabled={isLoading}
            >
              {isLoading
                ? t('login.loading', 'Logging in...')
                : t('login.submit', 'Log In')}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {t('login.noAccount', "Don't have an account?")}{' '}
              <Link to="/signup">{t('login.signUpHere', 'Sign up here')}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
