import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InstructorWallet.css';

type WalletTab = 'history' | 'pending';

interface PendingReq {
  id: string;
  date: string;
  holder: string;
  amount: string;
  receiver: string;
  method: 'vodafone' | 'instapay';
  status: string;
}

const InstructorWallet = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<WalletTab>('history');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const [pendingList, setPendingList] = useState<PendingReq[]>([
    {
      id: 'req-1',
      date: 'Oct 24, 2023 • 14:30',
      holder: 'Aris Benjamin Mahmoud',
      amount: 'EGP 3,350.00',
      receiver: '+20 102 345 6789',
      method: 'vodafone',
      status: 'Processing'
    },
    {
      id: 'req-2',
      date: 'Oct 22, 2023 • 09:15',
      holder: 'Aris B. Mahmoud',
      amount: 'EGP 12,000.00',
      receiver: 'aris@instapay',
      method: 'instapay',
      status: 'Review Required'
    }
  ]);

  const handleApprove = (id: string) => {
    alert('Transfer Approved successfully!');
    setPendingList(prev => prev.filter(item => item.id !== id));
  };

  const handleReject = (id: string) => {
    if (confirm('Are you sure you want to reject this payout request?')) {
      setPendingList(prev => prev.filter(item => item.id !== id));
      alert('Request Rejected.');
    }
  };

  const handleUploadReceipt = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = () => alert('Transfer receipt uploaded successfully!');
    input.click();
  };

  const handleApplyFilter = () => {
    alert(`Filtered transfer history from ${fromDate || 'start'} to ${toDate || 'end'}`);
  };

  return (
    <div className="instructor-wallet-page animate-fade-in">
      {/* Header & Badges Row */}
      <div className="wallet-header-flex">
        <div>
          <h1 className="wallet-main-title">Instructor Wallet View</h1>
          <div className="wallet-breadcrumb">
            <span onClick={() => navigate('/admin/instructors')} className="crumb-link">Instructors</span>
            <span> &gt; </span>
            <span onClick={() => navigate('/admin/instructors/julianne-davies')} className="crumb-link">Dr. Julianne Davies</span>
          </div>
        </div>

        {/* Top Right Financial Stat Badges */}
        <div className="financial-stats-pills-row">
          <div className="fin-pill card">
            <span className="fin-lbl">CURRENT BALANCE</span>
            <strong className="fin-val cyan-txt">EGP 12,450</strong>
          </div>
          <div className="fin-pill card">
            <span className="fin-lbl">TOTAL EARNINGS</span>
            <strong className="fin-val">EGP 45,800</strong>
          </div>
          <div className="fin-pill card">
            <span className="fin-lbl">TOTAL WITHDRAWN</span>
            <strong className="fin-val">EGP 30,000</strong>
          </div>
          <div className="fin-pill card">
            <span className="fin-lbl">PENDING</span>
            <strong className="fin-val gold-txt">EGP 3,350</strong>
          </div>
        </div>
      </div>

      {/* Segmented Tabs (Pending Requests vs Transfer History) */}
      <div className="wallet-tabs-container">
        <div className="wallet-tabs-pill-wrap">
          <button 
            className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending Requests ({pendingList.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            Transfer History
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------
          TAB 1: Transfer History (Screenshot 4)
         ------------------------------------------------------------- */}
      {activeTab === 'history' && (
        <div className="tab-content-wrapper animate-fade-in">
          {/* Filter Date Banner */}
          <div className="date-filter-banner card">
            <div className="date-inputs-flex">
              <div className="filter-group">
                <label>FROM</label>
                <input 
                  type="text" 
                  placeholder="mm/dd/yyyy" 
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label>TO</label>
                <input 
                  type="text" 
                  placeholder="mm/dd/yyyy" 
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div>

            <button onClick={handleApplyFilter} className="btn-dark apply-filters-btn">
              ⚙ Apply Filters
            </button>
          </div>

          {/* Transfer History Table */}
          <div className="transfers-table-card card">
            <table className="transfers-table">
              <thead>
                <tr>
                  <th>TRANSFER ID</th>
                  <th>DATE</th>
                  <th>INSTRUCTOR</th>
                  <th>AMOUNT</th>
                  <th>METHOD</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-bold">TR-1045</td>
                  <td className="text-muted">18 Jun 2026</td>
                  <td>
                    <strong>Ahmed Mohamed</strong>
                    <div className="sub-id">ID: #INST-22</div>
                  </td>
                  <td className="font-bold">600 EGP</td>
                  <td><span className="dot-red">●</span> Vodafone Cash</td>
                  <td><span className="status-badge-green">COMPLETED</span></td>
                  <td><span onClick={() => alert('Transfer details for TR-1045')} className="view-details-link">View Details</span></td>
                </tr>

                <tr>
                  <td className="font-bold">TR-1044</td>
                  <td className="text-muted">17 Jun 2026</td>
                  <td>
                    <strong>Sarah Ibrahim</strong>
                    <div className="sub-id">ID: #INST-45</div>
                  </td>
                  <td className="font-bold">1,200 EGP</td>
                  <td><span className="dot-blue">●</span> InstaPay</td>
                  <td><span className="status-badge-green">COMPLETED</span></td>
                  <td><span onClick={() => alert('Transfer details for TR-1044')} className="view-details-link">View Details</span></td>
                </tr>

                <tr>
                  <td className="font-bold">TR-1043</td>
                  <td className="text-muted">16 Jun 2026</td>
                  <td>
                    <strong>Mona Zaki</strong>
                    <div className="sub-id">ID: #INST-09</div>
                  </td>
                  <td className="font-bold">4,500 EGP</td>
                  <td><span className="dot-red">●</span> Vodafone Cash</td>
                  <td><span className="status-badge-green">COMPLETED</span></td>
                  <td><span onClick={() => alert('Transfer details for TR-1043')} className="view-details-link">View Details</span></td>
                </tr>
              </tbody>
            </table>

            <div className="table-footer-row">
              <span className="rows-count">Showing 1-10 of 1,420 transfers</span>
              <div className="table-pagination">
                <span className="p-arrow">&lt;</span>
                <span className="p-num active">1</span>
                <span className="p-num">2</span>
                <span className="p-num">3</span>
                <span className="p-dots">...</span>
                <span className="p-arrow">&gt;</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 2: Pending Requests (Screenshot 5)
         ------------------------------------------------------------- */}
      {activeTab === 'pending' && (
        <div className="tab-content-wrapper animate-fade-in">
          {pendingList.length > 0 ? (
            <div className="pending-requests-list">
              {pendingList.map((req) => (
                <div key={req.id} className="pending-card card">
                  <div className="pending-main-grid">
                    <div className="pending-info-col">
                      <div>
                        <span className="p-lbl">REQUEST DATE</span>
                        <strong className="p-val-sm">{req.date}</strong>
                      </div>

                      <div style={{ marginTop: '1rem' }}>
                        <span className="p-lbl">ACCOUNT HOLDER</span>
                        <strong className="p-val-sm">{req.holder}</strong>
                      </div>
                    </div>

                    <div className="pending-info-col">
                      <div>
                        <span className="p-lbl">AMOUNT</span>
                        <strong className="p-val-lg cyan-txt">{req.amount}</strong>
                      </div>

                      <div style={{ marginTop: '1rem' }}>
                        <span className="p-lbl">RECEIVER NUMBER</span>
                        <strong className="p-val-sm">{req.receiver}</strong>
                      </div>
                    </div>

                    <div className="pending-info-col">
                      <div>
                        <span className="p-lbl">PAYMENT METHOD</span>
                        <div className={`method-logo-box ${req.method}`}>
                          <span className={req.method === 'vodafone' ? 'voda-text' : 'inst-text'}>
                            {req.method === 'vodafone' ? 'cash' : 'instapay'}
                          </span>
                        </div>
                      </div>

                      <div style={{ marginTop: '1rem' }}>
                        <span className="p-lbl">STATUS</span>
                        <span className="status-orange-pill">{req.status}</span>
                      </div>
                    </div>

                    <div className="receipt-upload-col">
                      <span className="p-lbl">TRANSFER RECEIPT</span>
                      <div className="dashed-receipt-boxes-row">
                        <div className="receipt-dash-box" onClick={handleUploadReceipt}>
                          <span>🖼️ UPLOAD IMAGE</span>
                        </div>
                        <div className="receipt-dash-box" onClick={handleUploadReceipt}>
                          <span>
                            <img src="/pdf-icon.png" alt="PDF" style={{ width: '1em', height: '1em', verticalAlign: 'middle', marginInlineEnd: '6px' }} />
                            UPLOAD PDF
                          </span>
                        </div>
                      </div>

                      <div className="action-buttons-flex">
                        <button onClick={() => handleApprove(req.id)} className="btn-primary approve-transfer-btn">
                          Approve Transfer
                        </button>
                        <button onClick={() => handleReject(req.id)} className="btn-outline reject-request-btn">
                          Reject Request
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center" style={{ padding: '3rem' }}>
              <h3>🎉 All Pending Requests Handled!</h3>
              <p style={{ color: '#64748B', margin: '8px 0 0 0' }}>There are currently no pending withdrawal requests.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InstructorWallet;
