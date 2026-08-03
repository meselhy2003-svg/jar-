import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

interface LoginProps {
  isInstructor?: boolean;
}

const Login = ({ isInstructor = false }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const role = isInstructor ? 'instructor' : email.toLowerCase().includes('admin') ? 'admin' : 'student';
    login(email, role as any);

    const targetPath = role === 'instructor' ? '/instructor/dashboard' : role === 'admin' ? '/admin' : '/student/dashboard';
    navigate(targetPath, { replace: true });
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
            <h3>{isInstructor ? "Instructor Portal" : "Student Portal"}</h3>
            <p>{isInstructor ? "Manage your sessions, answer student questions, and earn." : "Access your registered courses, book sessions, and review material."}</p>
          </div>
        </div>

        {/* Right Dark Navy Form Card */}
        <div className="auth-form-side dark-card">
          <div className="auth-header">
            <h2>{isInstructor ? "Instructor Login" : "Student Login"}</h2>
            <p style={{ color: 'var(--text-muted)' }}>Enter your credentials to access your account.</p>
          </div>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder={isInstructor ? "instructor@jaracademy.com" : "student@jaracademy.com (or admin@...)"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
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
                Remember me
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
            
            <button type="submit" className="btn-primary auth-submit">Log In</button>
          </form>
          
          <div className="auth-footer">
            <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
