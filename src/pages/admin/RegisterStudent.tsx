import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterStudent.css';

const RegisterStudent = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('John Doe');
  const [university, setUniversity] = useState('');
  const [faculty, setFaculty] = useState('');
  const [major, setMajor] = useState('');
  const [academicYear, setAcademicYear] = useState('Year 1');
  const [country, setCountry] = useState('Saudi Arabia');
  const [phoneCode, setPhoneCode] = useState('+966');
  const [phone, setPhone] = useState('50 123 4567');
  const [email, setEmail] = useState('student@university.edu');
  const [password, setPassword] = useState('••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••');
  const [agreed, setAgreed] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Student account created successfully!');
    navigate('/admin/students');
  };

  return (
    <div className="register-student-page animate-fade-in">
      <h1 className="page-title" style={{ marginBottom: '2rem' }}>Register the Students</h1>

      <div className="register-student-center-wrap margin-auto">
        <div className="register-student-dark-card">
          <div className="card-head-center text-center">
            <h2>Create Your Student Account</h2>
            <p>Please fill in the details below to get started.</p>
          </div>

          <form onSubmit={handleSubmit} className="register-student-form">
            <div className="fields-grid-two">
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-with-ico">
                  <span className="inp-ic">👤</span>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>University</label>
                <div className="input-with-ico">
                  <span className="inp-ic">🏛️</span>
                  <input 
                    type="text" 
                    placeholder="Enter University Name"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Faculty / College</label>
                <input 
                  type="text" 
                  placeholder="e.g. Engineering"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Major / Specialization</label>
                <input 
                  type="text" 
                  placeholder="e.g. Computer Science"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Academic Year</label>
                <select value={academicYear} onChange={(e) => setAcademicYear(e.target.value)}>
                  <option value="Year 1">Year 1</option>
                  <option value="Year 2">Year 2</option>
                  <option value="Year 3">Year 3</option>
                  <option value="Year 4">Year 4</option>
                </select>
              </div>

              <div className="form-group">
                <label>Country</label>
                <select value={country} onChange={(e) => setCountry(e.target.value)}>
                  <option value="Saudi Arabia">Saudi Arabia 🇸🇦</option>
                  <option value="Egypt">Egypt 🇪🇬</option>
                  <option value="UAE">UAE 🇦🇪</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '0.5rem' }}>
              <label>Phone Number</label>
              <div className="phone-code-input-flex">
                <select value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)} style={{ width: '110px' }}>
                  <option value="+966">+966</option>
                  <option value="+20">+20</option>
                </select>
                <input 
                  type="text" 
                  placeholder="50 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '0.5rem' }}>
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="student@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="fields-grid-two" style={{ marginTop: '0.5rem' }}>
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

            {/* University ID Drag & Drop Box */}
            <div className="dark-upload-card" style={{ marginTop: '1.25rem', background: '#1E293B' }}>
              <div className="upload-circle-icon">↑</div>
              <strong>Drag & Drop your university ID here</strong>
              <span className="file-types-supported">SUPPORTED: PDF, DOC, PPT, IMAGES, ZIP</span>
              <button type="button" className="btn-primary select-file-btn">Select File</button>
            </div>

            <div className="terms-checkbox-flex" style={{ marginTop: '1.25rem' }}>
              <input 
                type="checkbox" 
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                id="termsCheck"
              />
              <label htmlFor="termsCheck" className="terms-txt">
                By creating an account, you agree to the JAR Academy <span className="blue-link">Terms of Service</span> and <span className="blue-link">Privacy Policy</span>.
              </label>
            </div>

            <button type="submit" className="btn-primary create-account-btn" style={{ marginTop: '1.5rem' }}>
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;
