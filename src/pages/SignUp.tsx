import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    major: '',
    academicYear: 'Year 1',
    password: ''
  });
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData.email, 'student');
    navigate('/', { replace: true });
  };

  return (
    <div className="auth-page animate-fade-in container">
      <div className="auth-split-wrapper">
        {/* Left Illustration */}
        <div className="auth-illustration-side mint-box">
          <div className="illustration-content text-center">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop" 
              alt="Register Illustration" 
              className="auth-img"
            />
            <h3>Elevate Your Academic Journey.</h3>
            <p>Create your student account to access personalized tutoring, assignment reviews, and exam preparation.</p>
          </div>
        </div>

        {/* Right Dark Navy Form Card */}
        <div className="auth-form-side dark-card">
          <div className="auth-header">
            <h2>Create Your Account</h2>
            <p style={{ color: 'var(--text-muted)' }}>Fill in your academic details to get started.</p>
          </div>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>First Name</label>
                <input 
                  type="text" 
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input 
                  type="text" 
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="student@university.edu"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+961 70 123 456"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Academic Year</label>
                <select 
                  value={formData.academicYear}
                  onChange={(e) => setFormData({...formData, academicYear: e.target.value})}
                >
                  <option value="Year 1">Year 1 (Freshman)</option>
                  <option value="Year 2">Year 2 (Sophomore)</option>
                  <option value="Year 3">Year 3 (Junior)</option>
                  <option value="Year 4">Year 4 (Senior)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Major / Faculty</label>
              <input 
                type="text" 
                placeholder="Computer Science / Engineering"
                value={formData.major}
                onChange={(e) => setFormData({...formData, major: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            
            <button type="submit" className="btn-primary auth-submit">Create Account</button>
          </form>
          
          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Log in here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
