import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditStudent.css';

const EditStudent = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('Ahmed Mohamed');
  const [email, setEmail] = useState('jAhmed@gmail.com');
  const [phone, setPhone] = useState('+966 54722451');
  const [country, setCountry] = useState('SAUDIA ARABIA');

  const [university, setUniversity] = useState('KING SALMAN University');
  const [faculty, setFaculty] = useState('Faculty of IT');
  const [major, setMajor] = useState('Computer Science');
  const [year, setYear] = useState('Year 1');

  const [password, setPassword] = useState('••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Student profile updated successfully!');
    navigate('/admin/students/alexander-montgomery');
  };

  return (
    <div className="edit-student-page animate-fade-in">
      <div className="page-header-wrap">
        <h1 className="page-title">Edit the Student profile</h1>
      </div>

      {/* Top Photo Card */}
      <div className="edit-photo-card card text-center">
        <div className="avatar-camera-wrap">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" 
            alt="Student Avatar"
            className="edit-avatar-img"
          />
          <button className="camera-badge-btn" type="button">📷</button>
        </div>
        <span className="change-photo-link">Change Photo</span>
      </div>

      <form onSubmit={handleSave} className="edit-profile-form-grid">
        {/* Section 1: Personal Information */}
        <div className="edit-section-card card">
          <h3 className="section-title">👤 PERSONAL INFORMATION</h3>

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
              <label>Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Country</label>
              <select value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="SAUDIA ARABIA">SAUDIA ARABIA</option>
                <option value="EGYPT">EGYPT</option>
                <option value="UAE">UAE</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Academic Information */}
        <div className="edit-section-card card">
          <h3 className="section-title">🎓 ACADEMIC INFORMATION</h3>

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
              <label>Faculty / collage</label>
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
              <label>Academic Year</label>
              <select value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="Year 1">Year 1</option>
                <option value="Year 2">Year 2</option>
                <option value="Year 3">Year 3</option>
                <option value="Year 4">Year 4</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Security */}
        <div className="edit-section-card card">
          <h3 className="section-title">🔒 SECURITY</h3>

          <div className="fields-grid-two">
            <div className="form-group relative-input">
              <label>New Password</label>
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

        {/* Section 4: Drag & Drop Box */}
        <div className="dark-upload-card">
          <div className="upload-circle-icon">↑</div>
          <strong>Drag & Drop your university ID here</strong>
          <span className="file-types-supported">SUPPORTED: PDF, DOC, PPT, IMAGES, ZIP</span>
          <button type="button" className="btn-primary select-file-btn">Select File</button>
        </div>

        {/* Action Buttons */}
        <div className="edit-actions-row">
          <button 
            type="button" 
            onClick={() => navigate('/admin/students/alexander-montgomery')}
            className="btn-outline cancel-outline-btn"
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

export default EditStudent;
