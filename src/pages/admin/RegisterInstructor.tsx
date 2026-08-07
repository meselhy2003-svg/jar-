import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterInstructor.css';

const RegisterInstructor = () => {
  const navigate = useNavigate();
  const [isCreated, setIsCreated] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('Jonathan Smith');
  const [countryCode, setCountryCode] = useState('+1 (USA)');
  const [phone, setPhone] = useState('555-0123');
  const [email, setEmail] = useState('j.smith@jaracademy.com');
  const [password, setPassword] = useState('••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••');
  const [fieldOfStudy, setFieldOfStudy] = useState('Theoretical Physics');
  const [subjects, setSubjects] = useState('');
  const [academicStatus, setAcademicStatus] = useState<'Student' | 'Graduate'>('Graduate');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreated(true);
  };

  return (
    <div className="register-instructor-page animate-fade-in">
      {!isCreated ? (
        <>
          <h1 className="page-title" style={{ marginBottom: '2rem' }}>Register The Instructor</h1>

          <div className="register-split-grid">
            {/* Left Column: Visual Banner & Value Cards */}
            <div className="register-left-col">
              <div className="instructor-photo-card">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" 
                  alt="Teaching at JAR ACADEMY" 
                  className="inst-hero-photo"
                />

                <div className="quote-overlay-box">
                  <p>
                    "Teaching at JAR ACADEMY allowed me to reach thousands of students globally and refine my own technical skills."
                  </p>
                  <span>- Dr. Sarah Chen, Senior Instructor</span>
                </div>
              </div>

              <div className="value-props-two-grid">
                <div className="value-prop-card card">
                  <span className="v-icon">💳</span>
                  <strong>Competitive Pay</strong>
                  <p>Earn more for high-quality content.</p>
                </div>

                <div className="value-prop-card card">
                  <span className="v-icon">🕒</span>
                  <strong>Flexible Hours</strong>
                  <p>Teach whenever it fits your schedule.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Dark Navy Registration Form Card */}
            <div className="register-dark-card">
              <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Johnathan Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required 
                  />
                </div>

                <div className="fields-grid-two">
                  <div className="form-group">
                    <label>Code</label>
                    <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                      <option value="+1 (USA)">+1 (USA)</option>
                      <option value="+20 (EGY)">+20 (EGY)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="text" 
                      placeholder="555-0123"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>

                <div className="fields-grid-two">
                  <div className="form-group">
                    <label>Password</label>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Field of Study</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Theoretical Physics"
                    value={fieldOfStudy}
                    onChange={(e) => setFieldOfStudy(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Subjects You Can Teach</label>
                  <textarea 
                    rows={3} 
                    placeholder="Hold Ctrl/Cmd to select multiple subjects."
                    value={subjects}
                    onChange={(e) => setSubjects(e.target.value)}
                  />
                  <span className="ctrl-note">Hold Ctrl/Cmd to select multiple subjects.</span>
                </div>

                <div className="form-group">
                  <label>Academic Status</label>
                  <div className="radio-options-row">
                    <label className="radio-label white-txt">
                      <input 
                        type="radio" 
                        name="regStatus" 
                        checked={academicStatus === 'Student'}
                        onChange={() => setAcademicStatus('Student')}
                      />
                      Student
                    </label>

                    <label className="radio-label white-txt">
                      <input 
                        type="radio" 
                        name="regStatus" 
                        checked={academicStatus === 'Graduate'}
                        onChange={() => setAcademicStatus('Graduate')}
                      />
                      Graduate
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn-primary create-account-btn">
                  Create Instructor Account
                </button>
              </form>
            </div>
          </div>
        </>
      ) : (
        /* SCREENSHOT 3: Account Created Successfully */
        <div className="account-created-success-container animate-fade-in text-center">
          <div className="green-check-circle margin-auto">✓</div>
          <h1 className="success-main-title dark-text">Account Created Successfully</h1>
          <p className="success-subtext text-center margin-auto" style={{ maxWidth: '540px' }}>
            The instructor account for Jonathan Smith has been successfully provisioned within the academy system.
          </p>

          <div className="created-cards-two-grid text-left">
            {/* Left Card: Access Credentials */}
            <div className="credentials-card card">
              <div className="card-head-row">
                <h3>🔑 Access Credentials</h3>
                <span className="secure-badge">SECURE ENTRY</span>
              </div>

              <div className="cred-input-field">
                <label>EMAIL ADDRESS</label>
                <div className="input-icon-flex">
                  <span className="ic">✉️</span>
                  <input type="text" readOnly value="j.smith@jaracademy.com" />
                  <span className="ic copy-ic">📋</span>
                </div>
              </div>

              <div className="cred-input-field" style={{ marginTop: '1.25rem' }}>
                <label>TEMPORARY PASSWORD</label>
                <div className="input-icon-flex">
                  <span className="ic">🔒</span>
                  <input type="text" readOnly value="JAR-Smt-2024!" />
                  <span className="ic">👁️</span>
                  <span className="ic copy-ic">📋</span>
                </div>
              </div>

              <div className="warning-note-box">
                <span className="warn-ic">⚠️</span>
                <p>
                  Make sure to save these credentials safely. For security reasons, the password will not be displayed again after you leave this page.
                </p>
              </div>
            </div>

            {/* Right Card: Instructor Summary */}
            <div className="instructor-summary-card card">
              <h3>🪪 Instructor Summary</h3>

              <div className="summary-avatar-name-row">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" 
                  alt="Jonathan Smith" 
                  className="sum-avatar"
                />
                <div>
                  <h4>Jonathan Smith</h4>
                  <span className="status-green-pill">● Status: Active</span>
                </div>
              </div>

              <div className="summary-meta-list">
                <div className="sum-item">
                  <span className="s-lbl">Full Name</span>
                  <strong className="s-val">Jonathan Smith</strong>
                </div>

                <div className="sum-item">
                  <span className="s-lbl">Phone Number</span>
                  <strong className="s-val">+1 (555) 012-3456</strong>
                </div>

                <div className="sum-item">
                  <span className="s-lbl">Assigned Role</span>
                  <strong className="s-val">Instructor</strong>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2.5rem' }}>
            <button 
              onClick={() => navigate('/admin/instructors')}
              className="btn-primary"
              style={{ padding: '12px 32px', borderRadius: '12px' }}
            >
              Go to Manage Instructors &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterInstructor;
