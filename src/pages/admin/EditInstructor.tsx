import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditInstructor.css';

const EditInstructor = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('Dr. Julianne Davies');
  const [age, setAge] = useState('32');
  const [country, setCountry] = useState('Egypt');
  const [phone, setPhone] = useState('+20 123 456 7890');
  const [email, setEmail] = useState('j.davies@jaracademy.com');
  
  const [university, setUniversity] = useState('Cairo University');
  const [faculty, setFaculty] = useState('Faculty of Computers and Artificial Intelligence');
  const [major, setMajor] = useState('Computer Science');
  const [academicStatus, setAcademicStatus] = useState<'Student' | 'Graduate'>('Graduate');
  const [subjects, setSubjects] = useState('I can teach Computer Science');

  const [password, setPassword] = useState('••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Instructor profile updated successfully!');
    navigate('/admin/instructors/julianne-davies');
  };

  return (
    <div className="instructor-edit-page animate-fade-in">
      <div className="page-header-wrap">
        <h1 className="page-title">Instructor Edit Profile</h1>
        <div className="profile-breadcrumb">
          <span onClick={() => navigate('/admin/instructors')} className="crumb-link">Instructors</span>
          <span> &gt; </span>
          <span onClick={() => navigate('/admin/instructors/julianne-davies')} className="crumb-link">Dr. Julianne Davies</span>
        </div>
      </div>

      {/* Top Photo Card */}
      <div className="edit-photo-card card text-center">
        <div className="avatar-camera-wrap">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" 
            alt="Dr. Julianne Davies"
            className="edit-avatar-img"
          />
          <button className="camera-badge-btn" type="button">📷</button>
        </div>
        <span className="change-photo-link">Change Photo</span>
      </div>

      <form onSubmit={handleSave} className="edit-profile-form-grid">
        {/* Section 1: Personal Info */}
        <div className="edit-section-card card">
          <h3 className="section-title">👤 Personal Info</h3>

          <div className="fields-grid-two">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Age</label>
              <input 
                type="text" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Country</label>
              <select value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="Egypt">Egypt 🇪🇬</option>
                <option value="Saudi Arabia">Saudi Arabia 🇸🇦</option>
                <option value="UAE">UAE 🇦🇪</option>
              </select>
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group full-width" style={{ marginTop: '1rem' }}>
            <label>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Section 2: Professional Info */}
        <div className="edit-section-card card">
          <h3 className="section-title">🎓 Professional Info</h3>

          <div className="fields-grid-two">
            <div className="form-group">
              <label>University</label>
              <input 
                type="text" 
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Faculty</label>
              <input 
                type="text" 
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Major</label>
              <input 
                type="text" 
                value={major}
                onChange={(e) => setMajor(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Academic Status</label>
              <div className="radio-options-row">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="academicStatus"
                    checked={academicStatus === 'Student'}
                    onChange={() => setAcademicStatus('Student')}
                  />
                  Student
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="academicStatus"
                    checked={academicStatus === 'Graduate'}
                    onChange={() => setAcademicStatus('Graduate')}
                  />
                  Graduate
                </label>
              </div>
            </div>
          </div>

          <div className="form-group full-width" style={{ marginTop: '1rem' }}>
            <label>Subjects You Can Teach</label>
            <input 
              type="text" 
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
            />
            <span className="field-caption">Example: Operating Systems, Machine Learning</span>
          </div>
        </div>

        {/* Section 3: Security */}
        <div className="edit-section-card card">
          <h3 className="section-title">🔒 Security</h3>

          <div className="fields-grid-two">
            <div className="form-group relative-input">
              <label>Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eye-icon">👁️</span>
            </div>

            <div className="form-group relative-input">
              <label>Confirm Password</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span className="eye-icon">👁️</span>
            </div>
          </div>
        </div>

        {/* Form Action Buttons */}
        <div className="edit-actions-row">
          <button 
            type="button" 
            onClick={() => navigate('/admin/instructors/julianne-davies')}
            className="btn-link cancel-btn"
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary save-changes-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInstructor;
