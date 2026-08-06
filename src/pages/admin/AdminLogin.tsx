import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import JarAcademyLogo from '../../components/JarAcademyLogo';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  const [email, setEmail] = useState('admin@jaracademy.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      if (email && password) {
        setAuthUser({
          _id: 'admin-001',
          fullName: 'Admin User',
          email,
          role: 'admin',
        });
        setIsLoading(false);
        navigate('/admin', { replace: true });
      } else {
        setError('Please enter valid admin credentials.');
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="admin-login-page animate-fade-in">
      <div className="admin-login-container">
        {/* Brand & Subtag */}
        <div className="admin-login-brand text-center">
          <div className="logo-center-wrap">
            <JarAcademyLogo />
          </div>
          <span className="admin-portal-pill">👑 ADMIN DASHBOARD PORTAL</span>
        </div>

        {/* Dark Form Card */}
        <div className="admin-login-card card">
          <div className="login-head text-center">
            <h2>Admin Security Login</h2>
            <p>Authorized personnel only. Please verify your administrator credentials.</p>
          </div>

          {error && <div className="admin-error-banner">{error}</div>}

          <form onSubmit={handleAdminLogin} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="adminEmail">Administrator Email</label>
              <div className="admin-input-wrap">
                <span className="input-ico">✉️</span>
                <input 
                  type="email" 
                  id="adminEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@jaracademy.com"
                  required
                />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '1.25rem' }}>
              <label htmlFor="adminPassword">Password</label>
              <div className="admin-input-wrap">
                <span className="input-ico">🔒</span>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  id="adminPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <span 
                  className="eye-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '🔒'}
                </span>
              </div>
            </div>

            <div className="security-notice-row">
              <span className="sec-shield">🛡️</span>
              <span>256-Bit SSL Encrypted Administrative Tunnel</span>
            </div>

            <button type="submit" className="btn-primary admin-submit-btn" disabled={isLoading}>
              {isLoading ? 'Verifying Credentials...' : 'Access Admin Dashboard →'}
            </button>
          </form>

          <div className="admin-login-footer text-center">
            <span onClick={() => navigate('/login')} className="back-link">
              &larr; Switch to Student / Instructor Portal Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
