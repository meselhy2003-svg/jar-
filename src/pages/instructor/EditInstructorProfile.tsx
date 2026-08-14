import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInstructor } from '../../context/InstructorContext';
import './EditInstructorProfile.css';

const EditInstructorProfile: React.FC = () => {
  const navigate = useNavigate();
  const { profile, updateProfile, addNotification } = useInstructor();

  // Form State
  const [fullName, setFullName] = useState(profile.fullName);
  const [age, setAge] = useState(profile.age);
  const [country, setCountry] = useState(profile.country);
  const [phoneNumber, setPhoneNumber] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);

  const [university, setUniversity] = useState(profile.university);
  const [faculty, setFaculty] = useState(profile.faculty);
  const [major, setMajor] = useState(profile.major);
  const [academicStatus, setAcademicStatus] = useState<'Student' | 'Graduate'>(profile.academicStatus);
  const [subjects, setSubjects] = useState(profile.subjects);

  const [password, setPassword] = useState('••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName,
      age,
      country,
      phone: phoneNumber,
      email,
      university,
      faculty,
      major,
      academicStatus,
      subjects,
    });
    addNotification({
      type: 'verified',
      title: 'Profile Updated',
      description: 'Your instructor profile information has been saved successfully.',
      isNew: true,
    });
    alert('Profile updated successfully!');
    navigate('/instructor/profile');
  };

  return (
    <div className="edit-inst-profile-page">
      <div className="edit-inst-profile-container">
        {/* Back Link */}
        <button className="edit-inst-back-btn" onClick={() => navigate(-1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>

        {/* Header */}
        <div className="edit-inst-header">
          <h1 className="edit-inst-title">Edit Profile</h1>
          <p className="edit-inst-subtitle">Update your personal and academic information.</p>
        </div>

        {/* Top Card: Photo Card */}
        <div className="edit-inst-photo-card">
          <div className="edit-inst-avatar-wrapper">
            <div className="edit-inst-avatar">
              <svg width="100" height="100" viewBox="0 0 84 84" fill="none">
                <circle cx="42" cy="42" r="42" fill="#F8C8A0" />
                <path d="M42 48c-9.941 0-18 8.059-18 18v2h36v-2c0-9.941-8.059-18-18-18z" fill="#1E293B" />
                <circle cx="42" cy="33" r="14" fill="#D49A70" />
                <path d="M28 29c0-8 6-14 14-14s14 6 14 14c0 2-1 4-2 5-1-6-5-9-12-9s-11 3-12 9c-1-1-2-3-2-5z" fill="#0F172A" />
                <path d="M32 34c0 7 4.5 11 10 11s10-4 10-11c-2 3-5 5-10 5s-8-2-10-5z" fill="#0F172A" />
                <path d="M35 27h4M45 27h4" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="37" cy="31" r="1.5" fill="#0F172A" />
                <circle cx="47" cy="31" r="1.5" fill="#0F172A" />
                <path d="M42 32v3" stroke="#B87B52" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M39 39c1 1 5 1 6 0" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <button className="edit-inst-camera-badge" type="button" aria-label="Change avatar">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </button>
          </div>
          <button className="edit-inst-change-photo-btn" type="button">
            Change Photo
          </button>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="edit-inst-form">
          {/* Section 1: Personal Info */}
          <div className="edit-inst-section-card">
            <h2 className="edit-inst-section-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Personal Info
            </h2>

            <div className="edit-inst-fields-grid">
              <div className="edit-inst-field">
                <label>Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="edit-inst-field">
                <label>Age</label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="edit-inst-field">
                <label>Country</label>
                <select value={country} onChange={(e) => setCountry(e.target.value)}>
                  <option value="Egypt">Egypt 🇪🇬</option>
                  <option value="Saudi Arabia">Saudi Arabia 🇸🇦</option>
                  <option value="UAE">UAE 🇦🇪</option>
                </select>
              </div>

              <div className="edit-inst-field">
                <label>Phone Number</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="edit-inst-field full-width">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Section 2: Professional Info */}
          <div className="edit-inst-section-card">
            <h2 className="edit-inst-section-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              Professional Info
            </h2>

            <div className="edit-inst-fields-grid">
              <div className="edit-inst-field">
                <label>University</label>
                <input
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                />
              </div>

              <div className="edit-inst-field">
                <label>Faculty</label>
                <input
                  type="text"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                />
              </div>

              <div className="edit-inst-field">
                <label>Major</label>
                <input
                  type="text"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                />
              </div>

              <div className="edit-inst-field">
                <label>Academic Status</label>
                <div className="edit-inst-radio-row">
                  <label className="edit-inst-radio-label">
                    <input
                      type="radio"
                      name="academicStatus"
                      checked={academicStatus === 'Student'}
                      onChange={() => setAcademicStatus('Student')}
                    />
                    <span>Student</span>
                  </label>
                  <label className="edit-inst-radio-label">
                    <input
                      type="radio"
                      name="academicStatus"
                      checked={academicStatus === 'Graduate'}
                      onChange={() => setAcademicStatus('Graduate')}
                    />
                    <span>Graduate</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="edit-inst-field full-width">
              <label>Subjects You Can Teach</label>
              <input
                type="text"
                placeholder="Add subject..."
                value={subjects}
                onChange={(e) => setSubjects(e.target.value)}
              />
              <span className="edit-inst-caption">Example: Operating Systems, Machine Learning</span>
            </div>
          </div>

          {/* Section 3: Security */}
          <div className="edit-inst-section-card">
            <h2 className="edit-inst-section-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Security
            </h2>

            <div className="edit-inst-fields-grid">
              <div className="edit-inst-field input-relative">
                <label>Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="edit-inst-eye-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>

              <div className="edit-inst-field input-relative">
                <label>Confirm Password</label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="edit-inst-eye-btn"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="edit-inst-actions-row">
            <button
              type="button"
              className="edit-inst-cancel-btn"
              onClick={() => navigate('/instructor/profile')}
            >
              Cancel
            </button>
            <button type="submit" className="edit-inst-save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInstructorProfile;
