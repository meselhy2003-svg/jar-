import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInstructor } from '../../context/InstructorContext';
import './WithdrawEarnings.css';

const WithdrawEarnings: React.FC = () => {
  const navigate = useNavigate();
  const { profile, withdrawFunds, addNotification } = useInstructor();

  const [selectedMethod, setSelectedMethod] = useState<'vodafone' | 'instapay'>('vodafone');
  const [fullName, setFullName] = useState(profile.fullName || '');
  const [accountNumber, setAccountNumber] = useState(profile.phone || '');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const balance = profile.walletBalanceEGP || 1200;

  const handleRequestWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !accountNumber.trim()) {
      alert('Please enter your full name and account/phone number.');
      return;
    }
    if (balance <= 0) {
      alert('Your balance is 0 EGP.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setHasSubmitted(true);
      withdrawFunds(balance, 'EGP');
      addNotification({
        type: 'payment',
        title: 'Withdrawal Request Submitted',
        description: `Your payout request of ${balance} EGP via ${selectedMethod === 'vodafone' ? 'Vodafone Cash' : 'InstaPay'} has been submitted.`,
        isNew: true,
      });
    }, 500);
  };

  const handleDownloadReceipt = () => {
    const element = document.createElement('a');
    const content = `JAR ACADEMY TRANSFER RECEIPT\n---------------------------------\nInstructor: ${fullName}\nPayout Method: ${selectedMethod === 'vodafone' ? 'Vodafone Cash' : 'InstaPay'}\nAccount: ${accountNumber}\nAmount: ${balance} EGP\nStatus: Processing\nDate: ${new Date().toLocaleDateString()}`;
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'receipt.pdf';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="withdraw-page">
      <div className="withdraw-container">
        {/* Back Link */}
        <button className="withdraw-back-btn" onClick={() => navigate(-1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>

        {/* Page Title Header */}
        <div className="withdraw-header">
          <h1 className="withdraw-title">Withdraw Earnings</h1>
          <p className="withdraw-subtitle">Request your payout and receive your transfer receipt.</p>
        </div>

        {/* Main 2-Column Grid */}
        <div className="withdraw-grid">
          {/* Left Column */}
          <div className="withdraw-left-col">
            {/* Top Available Funds Card */}
            <div className="withdraw-funds-card">
              <div className="funds-info">
                <span className="funds-label">AVAILABLE FUNDS</span>
                <h2 className="funds-amount">Your Balance: {balance} EGP</h2>
              </div>
              <div className="funds-icon-badge">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
            </div>

            {/* Select Payout Method Card */}
            <div className="withdraw-form-card">
              <h3 className="form-card-title">Select Payout Method</h3>

              <div className="payout-methods-row">
                {/* Vodafone Cash */}
                <div
                  className={`payout-method-option ${selectedMethod === 'vodafone' ? 'active' : ''}`}
                  onClick={() => setSelectedMethod('vodafone')}
                >
                  {selectedMethod === 'vodafone' && (
                    <div className="method-check-badge">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                  <div className="method-logo-circle vf-logo">
                    <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="16" fill="#E60000" />
                      <path d="M16 8C11.58 8 8 11.58 8 16c0 3.31 2.01 6.16 4.9 7.37L16 16V8z" fill="#FFFFFF" />
                      <circle cx="16" cy="16" r="4" fill="#E60000" />
                    </svg>
                  </div>
                  <div className="method-texts">
                    <strong className="method-name">Vodafone Cash</strong>
                    <span className="method-desc">Instant Mobile Wallet</span>
                  </div>
                </div>

                {/* InstaPay */}
                <div
                  className={`payout-method-option ${selectedMethod === 'instapay' ? 'active' : ''}`}
                  onClick={() => setSelectedMethod('instapay')}
                >
                  {selectedMethod === 'instapay' && (
                    <div className="method-check-badge">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                  <div className="method-logo-circle ip-logo">
                    <span className="ip-text">instapay</span>
                  </div>
                  <div className="method-texts">
                    <strong className="method-name">InstaPay</strong>
                    <span className="method-desc">Direct Bank Transfer</span>
                  </div>
                </div>
              </div>

              {/* Form Input Fields */}
              <form onSubmit={handleRequestWithdrawal} className="withdraw-input-form">
                <div className="withdraw-fields-row">
                  <div className="withdraw-input-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="As per ID or Bank Account"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div className="withdraw-input-group">
                    <label>{selectedMethod === 'vodafone' ? 'Phone Number' : 'Account / IPA Number'}</label>
                    <input
                      type="text"
                      placeholder="01X XXXX XXXX"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="withdraw-submit-btn"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : (
                    <>
                      Request Withdrawal <span>→</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Transfer Receipt Section */}
          <div className="withdraw-right-col">
            <div className="receipt-section-card">
              <h3 className="receipt-section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Transfer Receipt
              </h3>

              {!hasSubmitted ? (
                /* Empty state box */
                <div className="receipt-empty-box">
                  <div className="receipt-empty-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  </div>
                  <h4 className="receipt-empty-title">No receipt uploaded yet</h4>
                  <p className="receipt-empty-subtitle">Receipts appear here after processing.</p>
                </div>
              ) : null}

              {/* Ready for download item */}
              <div className="receipt-download-box">
                <div className="receipt-file-left">
                  <div className="receipt-doc-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div>
                    <strong className="receipt-file-name">receipt.pdf</strong>
                    <span className="receipt-file-status">READY FOR DOWNLOAD</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="receipt-download-btn"
                  onClick={handleDownloadReceipt}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download
                </button>
              </div>

              {/* Dark Submission Status Alert */}
              {hasSubmitted && (
                <div className="receipt-status-banner">
                  <div className="status-check-circle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="16 10 11 15 8 12" />
                    </svg>
                  </div>
                  <div className="status-text">
                    <strong>Your withdrawal request has been submitted.</strong>
                    <p>You will receive your receipt shortly.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Support Text */}
        <p className="withdraw-footer-note">
          Processing may take up to 24 hours. For support,{' '}
          <Link to="/instructor/contact" className="withdraw-support-link">
            Contact Us
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default WithdrawEarnings;
