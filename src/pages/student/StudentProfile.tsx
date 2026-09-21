import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import './StudentProfile.css';

type ProfileViewMode = 'main' | 'edit' | 'recharge' | 'recharge_submitted';

const StudentProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user, setAuthUser } = useAuth();
  const { t } = useLanguage();

  // Active sub-view state
  const [viewMode, setViewMode] = useState<ProfileViewMode>('main');

  // Wallet Balance
  const [balance, setBalance] = useState<number>(200);

  // Profile Form State (Defaults matching mockup Image 1 & 2)
  const [fullName, setFullName] = useState<string>(user?.fullName || 'Ahmed Mohamed');
  const [email, setEmail] = useState<string>(user?.email || 'jAhmed@gmail.com');
  const [phone, setPhone] = useState<string>('+966 54722451');
  const [country, setCountry] = useState<string>('Saudi Arabia');
  const [university, setUniversity] = useState<string>('KING SALMAN University');
  const [faculty, setFaculty] = useState<string>('Faculty of IT');
  const [major, setMajor] = useState<string>('Computer Science');
  const [academicYear, setAcademicYear] = useState<string>('Year 1');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  // Password Visibility Toggles
  const [showNewPass, setShowNewPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);

  // Uploaded Files State
  const [avatarSrc, setAvatarSrc] = useState<string>(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
  );
  const [uniIdFileName, setUniIdFileName] = useState<string | null>(null);
  const [receiptFileName, setReceiptFileName] = useState<string | null>(null);

  // Copy Feedback
  const [copiedIban, setCopiedIban] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const ibanCode = 'SA00 0000 0000 0000 0000';

  // Handle Copy IBAN
  const handleCopyIban = () => {
    navigator.clipboard.writeText('SA00000000000000000000');
    setCopiedIban(true);
    setTimeout(() => setCopiedIban(false), 2500);
  };

  // Handle Avatar Change
  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarSrc(URL.createObjectURL(file));
    }
  };

  // Handle University ID Upload
  const handleUniIdSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUniIdFileName(e.target.files[0].name);
    }
  };

  // Handle Payment Receipt Upload
  const handleReceiptSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFileName(e.target.files[0].name);
    }
  };

  // Handle Save Edit Profile
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && setAuthUser) {
      setAuthUser({
        ...user,
        fullName,
        email,
      });
    }
    setToastMessage(t('profile.updatedSuccess', 'Profile updated successfully!'));
    setTimeout(() => setToastMessage(null), 3000);
    setViewMode('main');
  };

  // Handle Submit Payment Proof
  const handleSubmitPaymentProof = (e: React.FormEvent) => {
    e.preventDefault();
    setBalance(prev => prev); // Preserve balance state
    setViewMode('recharge_submitted');
  };

  return (
    <div className="student-profile-page animate-fade-in">
      {toastMessage && (
        <div className="top-right-toast-banner" style={{ top: '20px', zIndex: 1000 }}>
          <span className="toast-info-icon">✓</span>
          <span className="toast-banner-text">{toastMessage}</span>
        </div>
      )}
      <div className="student-profile-container container">
        {/* =========================================================
            SCREEN 1: MY PROFILE MAIN VIEW (Image 1)
           ========================================================= */}
        {viewMode === 'main' && (
          <div className="animate-fade-in">
            <div className="profile-header-nav">
              <button onClick={() => navigate('/student/dashboard')} className="back-link-btn">
                {t('orders.back', '← Back')}
              </button>
            </div>

            <div className="profile-title-section">
              <h1 className="profile-main-title">{t('profile.myProfile', 'My Profile')}</h1>
              <p className="profile-subtitle">
                {t('profile.myProfileSub', 'Manage your account and wallet.')}
              </p>
            </div>

            {/* Profile Info Summary Card */}
            <div className="profile-white-card profile-info-header-card">
              <div className="profile-user-row">
                <div className="profile-avatar-wrapper">
                  <img src={avatarSrc} alt={fullName} className="profile-avatar-img" />
                </div>
                <div className="profile-user-details">
                  <h2>{fullName}</h2>
                  <div className="user-meta-item">
                    <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <span>{email}</span>
                  </div>
                  <div className="user-meta-item">
                    <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>{country}</span>
                  </div>
                </div>
              </div>

              <button onClick={() => setViewMode('edit')} className="btn-edit-profile">
                {t('profile.editProfile', 'Edit Profile')}
              </button>
            </div>

            {/* My Wallet Card */}
            <div className="profile-white-card">
              <div className="wallet-card-header">
                <span className="wallet-icon-box">
                  <img src="/profile-icons/SVG (2).png" alt="Wallet" className="profile-icon-img" />
                </span>
                <h3>{t('profile.myWallet', 'My Wallet')}</h3>
              </div>

              <div className="wallet-inner-bg-box">
                <div className="wallet-balance-info">
                  <span className="wallet-balance-label">
                    {t('profile.currentBalance', 'CURRENT BALANCE')}
                  </span>
                  <div className="wallet-balance-amount">
                    {balance} <span>SAR</span>
                  </div>
                  <p className="wallet-subtext">
                    {t('profile.walletSubtext', 'Use your wallet to pay for sessions and assignments instantly.')}
                  </p>
                </div>

                <button onClick={() => setViewMode('recharge')} className="btn-recharge-wallet">
                  {t('profile.rechargeWallet', 'Recharge Wallet')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            SCREEN 2: EDIT PROFILE VIEW (Image 2)
           ========================================================= */}
        {viewMode === 'edit' && (
          <div className="animate-fade-in">
            <div className="profile-header-nav">
              <button onClick={() => setViewMode('main')} className="back-link-btn">
                {t('orders.back', '← Back')}
              </button>
            </div>

            <div className="profile-title-section">
              <h1 className="profile-main-title">{t('profile.editProfile', 'Edit Profile')}</h1>
              <p className="profile-subtitle">
                {t('profile.editProfileSub', 'Update your personal and academic information.')}
              </p>
            </div>

            <form onSubmit={handleSaveProfile}>
              {/* Avatar Change Card */}
              <div className="profile-white-card avatar-edit-card">
                <div className="avatar-edit-photo-wrap">
                  <img src={avatarSrc} alt="Avatar" className="avatar-edit-img" />
                  <label htmlFor="avatar-file-input" className="camera-badge-btn" title="Change Photo">
                    <img src="/profile-icons/SVG (1).png" alt="Camera" className="camera-badge-icon-img" />
                  </label>
                  <input
                    type="file"
                    id="avatar-file-input"
                    accept="image/*"
                    onChange={handleAvatarSelect}
                    style={{ display: 'none' }}
                  />
                </div>
                <label htmlFor="avatar-file-input" className="change-photo-btn">
                  {t('profile.changePhoto', 'Change Photo')}
                </label>
              </div>

              {/* Personal Information Card */}
              <div className="profile-white-card">
                <div className="form-section-title">
                  <span className="section-icon">
                    <img src="/profile-icons/SVG (5).png" alt="Personal Info" className="section-header-icon-img" />
                  </span>
                  <span>{t('profile.personalInfo', 'PERSONAL INFORMATION')}</span>
                </div>

                <div className="edit-profile-grid">
                  <div className="form-field-group">
                    <label>{t('profile.fullName', 'Full Name')}</label>
                    <input
                      type="text"
                      className="form-input-styled"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field-group">
                    <label>{t('profile.email', 'Email Address')}</label>
                    <input
                      type="email"
                      className="form-input-styled"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field-group">
                    <label>{t('profile.phone', 'Phone Number')}</label>
                    <input
                      type="text"
                      className="form-input-styled"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field-group">
                    <label>{t('profile.country', 'Country')}</label>
                    <select
                      className="form-select-styled"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option value="Saudi Arabia">SAUDIA ARABIA</option>
                      <option value="United Arab Emirates">UNITED ARAB EMIRATES</option>
                      <option value="Egypt">EGYPT</option>
                      <option value="Kuwait">KUWAIT</option>
                      <option value="Qatar">QATAR</option>
                      <option value="Oman">OMAN</option>
                      <option value="Bahrain">BAHRAIN</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Academic Information Card */}
              <div className="profile-white-card">
                <div className="form-section-title">
                  <span className="section-icon">
                    <img src="/profile-icons/SVG (3).png" alt="Academic Info" className="section-header-icon-img" />
                  </span>
                  <span>{t('profile.academicInfo', 'ACADEMIC INFORMATION')}</span>
                </div>

                <div className="edit-profile-grid">
                  <div className="form-field-group">
                    <label>{t('profile.university', 'University')}</label>
                    <input
                      type="text"
                      className="form-input-styled"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field-group">
                    <label>{t('profile.faculty', 'Faculty / college')}</label>
                    <input
                      type="text"
                      className="form-input-styled"
                      value={faculty}
                      onChange={(e) => setFaculty(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field-group">
                    <label>{t('profile.major', 'Major')}</label>
                    <input
                      type="text"
                      className="form-input-styled"
                      value={major}
                      onChange={(e) => setMajor(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field-group">
                    <label>{t('profile.academicYear', 'Academic Year')}</label>
                    <select
                      className="form-select-styled"
                      value={academicYear}
                      onChange={(e) => setAcademicYear(e.target.value)}
                    >
                      <option value="Year 1">Year 1</option>
                      <option value="Year 2">Year 2</option>
                      <option value="Year 3">Year 3</option>
                      <option value="Year 4">Year 4</option>
                      <option value="Master's">Master's</option>
                      <option value="PhD">PhD</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Security Card */}
              <div className="profile-white-card">
                <div className="form-section-title">
                  <span className="section-icon">
                    <img src="/profile-icons/SVG (4).png" alt="Security" className="section-header-icon-img" />
                  </span>
                  <span>{t('profile.security', 'SECURITY')}</span>
                </div>

                <div className="edit-profile-grid">
                  <div className="form-field-group">
                    <label>{t('profile.newPassword', 'New Password')}</label>
                    <div className="password-input-wrap">
                      <input
                        type={showNewPass ? 'text' : 'password'}
                        className="form-input-styled"
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="password-eye-btn"
                        onClick={() => setShowNewPass(!showNewPass)}
                      >
                        <img src="/profile-icons/SVG.png" alt="Toggle Password" className="password-eye-icon-img" />
                      </button>
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label>{t('profile.confirmPassword', 'Confirm Password')}</label>
                    <div className="password-input-wrap">
                      <input
                        type={showConfirmPass ? 'text' : 'password'}
                        className="form-input-styled"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="password-eye-btn"
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                      >
                        <img src="/profile-icons/SVG.png" alt="Toggle Password" className="password-eye-icon-img" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* University ID Upload Dropzone */}
              <div className="uni-id-dropzone-box">
                <div className="uni-id-circle-icon">↑</div>
                <strong>{t('profile.dragDropId', 'Drag & Drop your university ID here')}</strong>
                <span className="drop-types-text">
                  {t('profile.supportedTypes', 'SUPPORTED: PDF, DOC, PPT, IMAGES, ZIP')}
                </span>

                <input
                  type="file"
                  id="uni-id-file-input"
                  onChange={handleUniIdSelect}
                  style={{ display: 'none' }}
                />
                <label htmlFor="uni-id-file-input" className="btn-select-file-cyan">
                  {uniIdFileName ? `Selected: ${uniIdFileName}` : t('profile.selectFile', 'Select File')}
                </label>
              </div>

              {/* Bottom Action Buttons */}
              <div className="edit-form-actions-row">
                <button
                  type="button"
                  onClick={() => setViewMode('main')}
                  className="btn-cancel-grey"
                >
                  {t('profile.cancel', 'Cancel')}
                </button>
                <button type="submit" className="btn-save-changes-cyan">
                  {t('profile.saveChanges', 'Save Changes')}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* =========================================================
            SCREEN 3: RECHARGE WALLET VIEW (Image 3)
           ========================================================= */}
        {viewMode === 'recharge' && (
          <div className="animate-fade-in">
            <div className="profile-header-nav">
              <button onClick={() => setViewMode('main')} className="back-link-btn">
                {t('orders.back', '← Back')}
              </button>
            </div>

            <div className="profile-title-section">
              <h1 className="profile-main-title">{t('profile.rechargeWalletTitle', 'Recharge Wallet')}</h1>
              <p className="profile-subtitle">
                {t('profile.rechargeWalletSub', 'Transfer funds to your wallet and upload payment proof.')}
              </p>
            </div>

            {/* Current Balance Card */}
            <div className="recharge-balance-card">
              <div className="label">{t('profile.yourCurrentBalance', 'YOUR CURRENT BALANCE')}</div>
              <div className="amount">
                {balance} <span>SAR</span>
              </div>
            </div>

            {/* Transfer Details Card */}
            <div className="profile-white-card">
              <div className="transfer-card-header">
                <span className="wallet-icon-box">
                  <img src="/profile-icons/Vector (2).png" alt="Transfer Details" className="profile-icon-img" />
                </span>
                <h3>{t('profile.transferDetails', 'Transfer Details')}</h3>
              </div>

              <div className="transfer-grid-row">
                <div className="transfer-info-item">
                  <div className="item-label">{t('profile.accountName', 'Account Name')}</div>
                  <div className="item-val">JAR ACADEMY</div>
                </div>
                <div className="transfer-info-item">
                  <div className="item-label">{t('profile.accountNumber', 'Account Number')}</div>
                  <div className="item-val">123456789</div>
                </div>
              </div>

              <div className="iban-box-row">
                <div className="item-label">IBAN</div>
                <div className="iban-input-copy-container">
                  <span className="iban-code-text">{ibanCode}</span>
                  <button type="button" onClick={handleCopyIban} className="btn-copy-iban">
                    {copiedIban ? t('profile.copied', 'Copied! ✓') : t('profile.copy', 'Copy')}
                  </button>
                </div>
              </div>

              <div className="transfer-notice-box">
                <span className="notice-icon-clock">
                  <img src="/profile-icons/SVG_margin.png" alt="Notice" className="notice-clock-icon-img" />
                </span>
                <span>
                  {t(
                    'profile.transferNotice',
                    'Please transfer the amount using your banking app, then upload the payment receipt below for verification.'
                  )}
                </span>
              </div>
            </div>

            {/* Upload Payment Receipt Card */}
            <form onSubmit={handleSubmitPaymentProof}>
              <div className="profile-white-card">
                <div className="transfer-card-header" style={{ marginBottom: '1.25rem' }}>
                  <h3>{t('profile.uploadPaymentReceipt', 'Upload Payment Receipt')}</h3>
                </div>

                <label htmlFor="receipt-file-input" className="receipt-dropzone-dark">
                  <div className="receipt-cloud-circle">
                    <img src="/profile-icons/Vector (1).png" alt="Upload Cloud" className="drop-cloud-icon-img" />
                  </div>
                  <strong>
                    {receiptFileName
                      ? `Selected: ${receiptFileName}`
                      : t('profile.dragDropReceipt', 'Drag & Drop or Upload File box')}
                  </strong>
                  <span className="accept-types-text">
                    {t('profile.acceptedReceiptTypes', 'Accepted formats: JPG, PNG, PDF')}
                  </span>

                  <input
                    type="file"
                    id="receipt-file-input"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleReceiptSelect}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>

              <button type="submit" className="btn-submit-proof-full">
                {t('profile.submitPaymentProof', 'Submit Payment Proof')}
              </button>
            </form>
          </div>
        )}

        {/* =========================================================
            SCREEN 4: PAYMENT RECEIPT SUBMITTED VIEW (Image 4)
           ========================================================= */}
        {viewMode === 'recharge_submitted' && (
          <div className="submitted-page-wrapper animate-fade-in">
            {/* Top Right Toast Banner */}
            <div className="top-right-toast-banner">
              <span className="toast-info-icon">ℹ️</span>
              <span className="toast-banner-text">
                {t(
                  'profile.receiptSuccessToast',
                  'Payment receipt received successfully. Your request is under review.'
                )}
              </span>
            </div>

            {/* Dark Navy Center Box */}
            <div className="submitted-dark-card">
              <div className="submitted-clock-circle">
                <img src="/profile-icons/SVG_margin.png" alt="Clock" className="submitted-clock-icon-img" />
              </div>
              <h2 className="submitted-main-title">
                {t('profile.receiptSubmittedTitle', 'Payment Receipt Submitted')}
              </h2>
              <p className="submitted-subtext">
                {t(
                  'profile.receiptSubmittedSub',
                  'Your payment receipt has been successfully uploaded...'
                )}
              </p>

              <div className="submitted-divider"></div>

              <div className="submitted-time-notice">
                <span className="shield-icon">🛡️</span>
                <span>
                  {t(
                    'profile.reviewNotice',
                    'The review process typically takes 24-48 hours. You will be notified once confirmed.'
                  )}
                </span>
              </div>

              <button
                onClick={() => setViewMode('main')}
                className="btn-back-to-profile-cyan"
              >
                {t('profile.backToProfile', 'Back to Profile')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
