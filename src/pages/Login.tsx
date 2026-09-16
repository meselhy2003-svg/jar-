import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './Login.css';
import { instructorLogin, studentLogin, type UserRole } from '../api/auth';

interface LoginProps {
  isInstructor?: boolean;
}

const Login = ({ isInstructor = false }: LoginProps) => {
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
      setAuthUser(user);

      const role = user.role as UserRole;
      const redirectMap: Record<UserRole, string> = {
        student: '/student/dashboard',
        instructor: '/instructor/dashboard',
        admin: '/admin',
      };
      navigate(redirectMap[role] ?? '/', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      // Demo fallback login
      const fallbackRole = isInstructor ? 'instructor' : email.toLowerCase().includes('admin') ? 'admin' : 'student';
      login(email, fallbackRole as UserRole);
      const targetPath = fallbackRole === 'instructor' ? '/instructor/dashboard' : fallbackRole === 'admin' ? '/admin' : '/student/dashboard';
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
              src={isInstructor
                ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop"
              }
              alt="Auth Illustration"
              className="auth-img"
            />
            <h3>{isInstructor ? t('login.instructorTitle', 'Instructor Portal') : t('login.studentTitle', 'Student Portal')}</h3>
            <p>{isInstructor ? t('instructor.heroSub', 'Manage your sessions, answer student questions, and earn.') : t('students.heroSub', 'Access your registered courses, book sessions, and review material.')}</p>
          </div>
        </div>

        {/* Right Dark Navy Form Card */}
        <div className="auth-form-side dark-card">
          <div className="auth-header">
            <h2>{isInstructor ? t('login.instructorTitle', 'Instructor Login') : t('login.studentTitle', 'Student Login')}</h2>
            <p style={{ color: 'var(--text-muted)' }}>{t('login.sub', 'Enter your credentials to access your account.')}</p>
          </div>

          {error && (
            <div style={{ color: '#EF4444', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">{t('login.email', 'Email Address')}</label>
              <input
                type="email"
                id="email"
                placeholder={isInstructor ? "instructor@jaracademy.com" : "student@jaracademy.com"}
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

            <button type="submit" className="btn-primary auth-submit" disabled={isLoading}>
              {isLoading ? t('login.loading', 'Logging in...') : t('login.submit', 'Log In')}
            </button>
          </form>

          <div className="auth-footer">
            <p>{t('login.noAccount', "Don't have an account?")} <Link to="/signup">{t('login.signUpHere', 'Sign up here')}</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
