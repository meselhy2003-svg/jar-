import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentWallet.css';

type WalletTab = 'requests' | 'history' | 'transactions';

const StudentWallet = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<WalletTab>('requests');
  const [newBalance, setNewBalance] = useState('1000');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleApprove = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="student-wallet-page animate-fade-in">
      {!isSuccess ? (
        <>
          <div className="page-header-wrap">
            <h1 className="page-title">Student Wallet Management</h1>
            <p className="page-subtitle">
              Manage student wallet balances, recharge requests, and transaction history.
            </p>
          </div>

          {/* Current Wallet Balance Card */}
          <div className="std-balance-top-card card">
            <span className="wallet-ico-box">👛</span>
            <div>
              <span className="b-lbl">Current Wallet Balance</span>
              <h2 className="b-val-lg">350 EGP</h2>
            </div>
          </div>

          {/* Main Tabbed Container */}
          <div className="std-tabs-card card">
            <div className="std-tabs-header">
              <div className="std-tab-buttons">
                <button 
                  className={`tab-link ${activeTab === 'requests' ? 'active' : ''}`}
                  onClick={() => setActiveTab('requests')}
                >
                  Recharge Requests
                </button>

                <button 
                  className={`tab-link ${activeTab === 'history' ? 'active' : ''}`}
                  onClick={() => setActiveTab('history')}
                >
                  Recharge History
                </button>

                <button 
                  className={`tab-link ${activeTab === 'transactions' ? 'active' : ''}`}
                  onClick={() => setActiveTab('transactions')}
                >
                  Wallet Transactions
                </button>
              </div>

              <div className="date-filter-dd">
                <span>📅 Date Range: Last 30 Days ⌄</span>
              </div>
            </div>

            {/* TAB 1: Recharge Requests (Screenshot 3) */}
            {activeTab === 'requests' && (
              <div className="requests-cards-two-grid animate-fade-in">
                {/* Request Card 1 */}
                <div className="recharge-request-card card">
                  <div className="req-card-main-flex">
                    <div className="req-left-text">
                      <div className="req-name-pill">
                        <h3>Alexander Montgomery</h3>
                        <span className="transfer-pill">Bank Transfer</span>
                      </div>
                      <span className="req-email">alex.montgomery@scholarly.edu</span>

                      <div className="req-date-box" style={{ marginTop: '1.25rem' }}>
                        <span className="d-lbl">REQUEST DATE</span>
                        <strong className="d-val">Oct 24, 2024</strong>
                      </div>
                    </div>

                    <div className="req-right-receipt">
                      <span className="r-lbl">TRANSACTION RECEIPT</span>
                      <img 
                        src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=200&auto=format&fit=crop" 
                        alt="Receipt" 
                        className="receipt-thumb"
                      />
                    </div>
                  </div>

                  <div className="req-actions-bar">
                    <button onClick={() => setActiveTab('transactions')} className="btn-primary view-req-btn">
                      ✓ view
                    </button>
                    <span className="dl-receipt-link">📥 Download Receipt</span>
                  </div>
                </div>

                {/* Request Card 2 */}
                <div className="recharge-request-card card">
                  <div className="req-card-main-flex">
                    <div className="req-left-text">
                      <div className="req-name-pill">
                        <h3>Sophia Richardson</h3>
                        <span className="transfer-pill">Bank Transfer</span>
                      </div>
                      <span className="req-email">s.richardson@scholarly.edu</span>

                      <div className="req-date-box" style={{ marginTop: '1.25rem' }}>
                        <span className="d-lbl">REQUEST DATE</span>
                        <strong className="d-val">Oct 25, 2024</strong>
                      </div>
                    </div>

                    <div className="req-right-receipt">
                      <span className="r-lbl">TRANSACTION RECEIPT</span>
                      <img 
                        src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=200&auto=format&fit=crop" 
                        alt="Receipt" 
                        className="receipt-thumb"
                      />
                    </div>
                  </div>

                  <div className="req-actions-bar">
                    <button onClick={() => setActiveTab('transactions')} className="btn-primary view-req-btn">
                      ✓ view
                    </button>
                    <span className="dl-receipt-link">📥 Download Receipt</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Recharge History (Screenshot 1) */}
            {activeTab === 'history' && (
              <div className="recharge-history-table-wrapper animate-fade-in">
                <table className="recharge-history-table">
                  <thead>
                    <tr>
                      <th>STUDENT & TRANSACTION</th>
                      <th>DATE & TIME</th>
                      <th>AMOUNT</th>
                      <th>TYPE</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="student-cell-flex">
                        <img 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop" 
                          alt="Ahmed El-Sayed" 
                          className="std-h-avatar"
                        />
                        <div>
                          <strong className="h-name">Ahmed El-Sayed</strong>
                          <span className="h-id">ID: JAR-2026-0891</span>
                        </div>
                      </td>
                      <td className="text-muted font-medium">23 Jun 2026 | 14:30</td>
                      <td className="font-bold green-txt-bold">+1,000 EGP</td>
                      <td><span className="type-pill">Wallet Recharge</span></td>
                      <td><span className="status-badge-green">● Successful</span></td>
                    </tr>

                    <tr>
                      <td className="student-cell-flex">
                        <img 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop" 
                          alt="Ahmed El-Sayed" 
                          className="std-h-avatar"
                        />
                        <div>
                          <strong className="h-name">Ahmed El-Sayed</strong>
                          <span className="h-id">ID: JAR-2026-0891</span>
                        </div>
                      </td>
                      <td className="text-muted font-medium">23 Jun 2026 | 12:15</td>
                      <td className="font-bold green-txt-bold">+500 EGP</td>
                      <td><span className="type-pill">Wallet Recharge</span></td>
                      <td><span className="status-badge-green">● Successful</span></td>
                    </tr>

                    <tr>
                      <td className="student-cell-flex">
                        <img 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop" 
                          alt="Ahmed El-Sayed" 
                          className="std-h-avatar"
                        />
                        <div>
                          <strong className="h-name">Ahmed El-Sayed</strong>
                          <span className="h-id">ID: JAR-2026-0891</span>
                        </div>
                      </td>
                      <td className="text-muted font-medium">22 Jun 2026 | 09:45</td>
                      <td className="font-bold green-txt-bold">+2,500 EGP</td>
                      <td><span className="type-pill">Wallet Recharge</span></td>
                      <td><span className="status-badge-green">● Successful</span></td>
                    </tr>

                    <tr>
                      <td className="student-cell-flex">
                        <img 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop" 
                          alt="Ahmed El-Sayed" 
                          className="std-h-avatar"
                        />
                        <div>
                          <strong className="h-name">Ahmed El-Sayed</strong>
                          <span className="h-id">ID: JAR-2026-0891</span>
                        </div>
                      </td>
                      <td className="text-muted font-medium">22 Jun 2026 | 08:20</td>
                      <td className="font-bold green-txt-bold">+150 EGP</td>
                      <td><span className="type-pill">Wallet Recharge</span></td>
                      <td><span className="status-badge-green">● Successful</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 3: Wallet Transactions (Screenshot 4) */}
            {activeTab === 'transactions' && (
              <form onSubmit={handleApprove} className="update-details-box card animate-fade-in">
                <div className="upd-title-row">
                  <span className="pencil-ic">✏️</span>
                  <h3>Update Details</h3>
                </div>

                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label>New Wallet Balance (SAR)</label>
                  <input 
                    type="text" 
                    value={newBalance}
                    onChange={(e) => setNewBalance(e.target.value)}
                    className="balance-big-input"
                  />
                </div>

                <div className="current-new-info-row">
                  <span>Current Balance: <strong>350 SAR</strong></span>
                  <span>New Balance: <strong className="cyan-txt">{newBalance} SAR</strong></span>
                </div>

                <div className="upd-actions-center text-center">
                  <button type="submit" className="btn-primary approve-balance-btn">
                    Approve & Update Balance
                  </button>
                  <span className="btn-link cancel-txt">Cancel</span>
                </div>
              </form>
            )}
          </div>
        </>
      ) : (
        /* SCREENSHOT 5: Transaction Successful */
        <div className="transaction-success-page animate-fade-in text-center">
          <div className="green-check-circle margin-auto">✓</div>
          <h1 className="success-main-title dark-text">Transaction Successful</h1>
          <p className="success-subtext text-center margin-auto">
            The wallet has been updated successfully
          </p>

          <div className="created-cards-two-grid text-left">
            {/* Left Card */}
            <div className="tx-details-card card">
              <div className="card-head-row">
                <span className="status-blue-pill">STATUS: SUCCESSFUL</span>
                <span className="timestamp-txt">Timestamp: Today, 11:45 AM</span>
              </div>

              <div className="tx-type-section" style={{ marginTop: '1rem' }}>
                <span className="t-lbl">Transaction Type</span>
                <strong className="t-val">Wallet Top-Up</strong>
              </div>

              <div className="tx-big-amount-section" style={{ marginTop: '1.5rem' }}>
                <span className="t-lbl">new Balance</span>
                <h1 className="big-amount-num">{newBalance} EGP</h1>
              </div>

              <div className="tx-ref-row" style={{ marginTop: '2rem' }}>
                <span className="ref-ic">
                  <img src="/pdf-icon.png" alt="PDF" style={{ width: '1em', height: '1em', verticalAlign: 'middle' }} />
                </span>
                <span>Reference ID: <strong>TXN-00293847-JAR</strong></span>
              </div>
            </div>

            {/* Right Card */}
            <div className="tx-summary-card card">
              <div className="summary-avatar-name-row">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" 
                  alt="Alexander Montgomery" 
                  className="sum-avatar"
                />
                <div>
                  <h4>Alexander Montgomery</h4>
                  <span className="std-id-txt">Student ID: #STU-9928</span>
                </div>
              </div>

              <div className="balance-before-after-box">
                <div className="bal-white-row">
                  <span>Current Balance</span>
                  <strong>350 EGP</strong>
                </div>

                <div className="arrow-down-blue">↓</div>

                <div className="bal-cyan-row">
                  <span>New Balance</span>
                  <strong>{newBalance} EGP</strong>
                </div>
              </div>

              <div className="financial-info-note">
                <span className="info-ic">ℹ️</span>
                <div>
                  <strong>Financial Note</strong>
                  <p>
                    The student will receive an automated SMS and email confirmation of this deposit within 5 minutes. No further action is required from the administrator.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2.5rem' }}>
            <button 
              onClick={() => navigate('/admin/students')}
              className="btn-primary"
              style={{ padding: '12px 32px', borderRadius: '12px' }}
            >
              Go to Manage Students &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentWallet;
