import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInstructor } from '../../context/InstructorContext';
import './InstructorProfile.css';

const InstructorProfile: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useInstructor();

  return (
    <div className="instructor-profile-page">
      <div className="instructor-profile-container">
        {/* Back Link */}
        <button className="inst-prof-back-btn" onClick={() => navigate(-1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>

        {/* Header */}
        <div className="inst-prof-header">
          <h1 className="inst-prof-title">My Profile</h1>
          <p className="inst-prof-subtitle">Manage your account and wallet.</p>
        </div>

        {/* Card 1: User Profile Card */}
        <div className="inst-prof-card">
          <div className="inst-prof-user-left">
            <div className="inst-prof-avatar-circle">
              <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
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

            <div className="inst-prof-details">
              <h2 className="inst-prof-name">{profile.fullName}</h2>
              <p className="inst-prof-email">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {profile.email}
              </p>
              <p className="inst-prof-location">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {profile.country}
              </p>
            </div>
          </div>

          <button
            className="inst-prof-edit-btn"
            onClick={() => navigate('/instructor/edit-profile')}
          >
            Edit Profile
          </button>
        </div>

        {/* Card 2: My Wallet Card */}
        <div className="inst-prof-wallet-card">
          <div className="inst-prof-wallet-header">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            <span>My Wallet</span>
          </div>

          <div className="inst-prof-balance-box">
            <div className="inst-prof-balance-left">
              <span className="inst-prof-balance-label">CURRENT BALANCE</span>
              <div className="inst-prof-amount-row">
                <span className="inst-prof-amount">{profile.walletBalanceSAR}</span>
                <span className="inst-prof-currency">SAR</span>
              </div>
              <p className="inst-prof-balance-sub">
                Use your wallet to pay for sessions and assignments instantly.
              </p>
            </div>

            <button
              className="inst-prof-withdraw-btn"
              onClick={() => navigate('/instructor/withdraw')}
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;
