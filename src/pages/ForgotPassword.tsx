import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

type ResetStep = 'email' | 'otp' | 'new_password' | 'success';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<ResetStep>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Email Submit
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    setErrorMessage('');
    setStep('otp');
  };

  // Handle OTP Change
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Handle OTP Submit
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some(digit => !digit)) {
      setErrorMessage('Please enter the 4-digit verification code.');
      return;
    }
    setErrorMessage('');
    setStep('new_password');
  };

  // Handle Password Reset Submit
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    setErrorMessage('');
    setStep('success');
  };

  return (
    <div className="auth-page animate-fade-in container">
      <div className="auth-split-wrapper">
        {/* Left Side Visual Banner */}
        <div className="auth-illustration-side mint-box">
          <div className="illustration-content text-center">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"
              alt="Security Reset" 
              className="auth-img"
            />
            <h3>Account Security</h3>
            <p>Don't worry, we'll help you reset your password safely and regain access to your JAR Academy portal.</p>
          </div>
        </div>

        {/* Right Side Reset Form */}
        <div className="auth-form-side dark-card">
          {/* Step 1: Request Email */}
          {step === 'email' && (
            <>
              <div className="auth-header">
                <h2>Forgot Password?</h2>
                <p style={{ color: 'var(--text-muted)' }}>
                  Enter your registered email address and we'll send you a password reset verification code.
                </p>
              </div>

              {errorMessage && <div className="auth-error-alert">{errorMessage}</div>}

              <form className="auth-form" onSubmit={handleEmailSubmit}>
                <div className="form-group">
                  <label htmlFor="reset-email">Email Address</label>
                  <input 
                    type="email" 
                    id="reset-email" 
                    placeholder="e.g. student@jaracademy.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn-primary auth-submit">
                  Send Verification Code &rarr;
                </button>
              </form>

              <div className="auth-footer">
                <p>Remembered your password? <Link to="/login">Back to Login</Link></p>
              </div>
            </>
          )}

          {/* Step 2: OTP Verification */}
          {step === 'otp' && (
            <>
              <div className="auth-header">
                <h2>Verify Code</h2>
                <p style={{ color: 'var(--text-muted)' }}>
                  We've sent a 4-digit code to <strong style={{ color: '#38BDF8' }}>{email}</strong>. Please enter it below.
                </p>
              </div>

              {errorMessage && <div className="auth-error-alert">{errorMessage}</div>}

              <form className="auth-form" onSubmit={handleOtpSubmit}>
                <div className="otp-inputs-row">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      maxLength={1}
                      className="otp-single-box"
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                    />
                  ))}
                </div>

                <div className="resend-code-wrap text-center">
                  <span className="resend-code-btn" onClick={() => alert('Verification code resent!')}>
                    Didn't receive the code? Resend
                  </span>
                </div>

                <button type="submit" className="btn-primary auth-submit">
                  Verify Code & Continue
                </button>
              </form>

              <div className="auth-footer">
                <p>Need to change email? <span className="back-step-link" onClick={() => setStep('email')}>Go Back</span></p>
              </div>
            </>
          )}

          {/* Step 3: New Password */}
          {step === 'new_password' && (
            <>
              <div className="auth-header">
                <h2>Set New Password</h2>
                <p style={{ color: 'var(--text-muted)' }}>
                  Your code is verified! Create a strong new password for your account.
                </p>
              </div>

              {errorMessage && <div className="auth-error-alert">{errorMessage}</div>}

              <form className="auth-form" onSubmit={handlePasswordSubmit}>
                <div className="form-group">
                  <label htmlFor="new-pass">New Password</label>
                  <input 
                    type="password" 
                    id="new-pass" 
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirm-pass">Confirm New Password</label>
                  <input 
                    type="password" 
                    id="confirm-pass" 
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn-primary auth-submit">
                  Update Password &rarr;
                </button>
              </form>
            </>
          )}

          {/* Step 4: Success Screen */}
          {step === 'success' && (
            <div className="reset-success-center text-center">
              <div className="green-check-circle">✓</div>
              <h2 className="success-main-title white-text">Password Reset Successful!</h2>
              <p className="success-subtext light-text" style={{ margin: '1rem 0 2rem' }}>
                Your password has been successfully updated. You can now log in to your account with your new password.
              </p>

              <button 
                onClick={() => navigate('/login')} 
                className="btn-primary auth-submit"
                style={{ width: '100%' }}
              >
                Go to Login &rarr;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
