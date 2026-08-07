import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminProfile.css';

const AdminProfile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [fullName, setFullName] = useState('Admin User');
  const [role, setRole] = useState('Head of Operations');
  const [email, setEmail] = useState('admin@jaracademy.com');
  const [phone, setPhone] = useState('+20 100 123 4567');
  const [department, setDepartment] = useState('Platform Operations & Governance');
  const [location, setLocation] = useState('Cairo, Egypt');

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Admin Profile settings updated successfully!');
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="admin-profile-page animate-fade-in">
      <div className="page-header-wrap">
        <h1 className="page-title">Admin Account Profile</h1>
        <p className="page-subtitle">
          Manage your administrator credentials, system permissions, and operational settings.
        </p>
      </div>

      <div className="admin-profile-layout-grid">
        {/* Left Column: Admin Identity Card */}
        <div className="admin-identity-card card text-center">
          <div className="avatar-wrap-relative">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop" 
              alt="Admin User" 
              className="admin-profile-lg-avatar"
            />
            <span className="online-status-dot"></span>
          </div>

          <h2 className="admin-full-name">{fullName}</h2>
          <span className="admin-role-badge">{role}</span>
          <p className="admin-dept-txt">{department}</p>

          <div className="admin-meta-info-box">
            <div className="meta-info-row">
              <span className="m-lbl">SUPER ADMIN PERMISSIONS</span>
              <span className="m-val green-txt">● FULL ACCESS</span>
            </div>

            <div className="meta-info-row">
              <span className="m-lbl">SECURITY LEVEL</span>
              <span className="m-val blue-txt">TIER 1 (ENCRYPTED)</span>
            </div>
          </div>

          <button onClick={handleLogout} className="btn-outline logout-admin-btn">
            Log Out
          </button>
        </div>

        {/* Right Column: Settings & Security Form */}
        <div className="admin-settings-side">
          <form onSubmit={handleSave} className="admin-profile-form">
            {/* Box 1: Personal & Operational Information */}
            <div className="setting-card card">
              <h3>👤 Operational Information</h3>

              <div className="fields-grid-two" style={{ marginTop: '1.25rem' }}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Role / Position</label>
                  <input 
                    type="text" 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Work Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                  <label>Department</label>
                  <input 
                    type="text" 
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Base Location</label>
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Box 2: System & Security Controls */}
            <div className="setting-card card" style={{ marginTop: '1.5rem' }}>
              <h3>🔒 System Controls & Security</h3>

              <div className="toggles-list" style={{ marginTop: '1.25rem' }}>
                <div className="toggle-row">
                  <div>
                    <strong>Two-Factor Authentication (2FA)</strong>
                    <p className="toggle-sub">Require OTP code for administrative logins</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={twoFactorAuth} 
                    onChange={(e) => setTwoFactorAuth(e.target.checked)}
                    className="toggle-checkbox"
                  />
                </div>

                <div className="toggle-row">
                  <div>
                    <strong>Real-time System Notifications</strong>
                    <p className="toggle-sub">Receive instant alerts on withdrawal requests and payouts</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={notificationsEnabled} 
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                    className="toggle-checkbox"
                  />
                </div>
              </div>
            </div>

            <div className="edit-actions-row" style={{ marginTop: '1.75rem' }}>
              <button type="button" onClick={() => navigate('/admin')} className="btn-link cancel-btn">
                Cancel
              </button>
              <button type="submit" className="btn-primary save-changes-btn">
                Save Admin Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
