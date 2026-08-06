import { useState } from 'react';
import './SystemHealthOrders.css';

const SystemHealthOrders = () => {
  const [fromDate, setFromDate] = useState('01/02/2024');
  const [toDate, setToDate] = useState('12/31/2024');

  const handleUpdate = () => {
    alert(`Order statistics updated for period: ${fromDate} to ${toDate}`);
  };

  return (
    <div className="system-health-orders-page animate-fade-in">
      <div className="page-header-wrap">
        <h1 className="page-title">System Health Overview</h1>
        <p className="page-subtitle">
          High-level overview of system orders and completion health.
        </p>
      </div>

      {/* Filter Activity Period Bar */}
      <div className="activity-filter-bar card">
        <div className="filter-left-inputs">
          <span className="filter-cal-icon">📅 Filter Activity Period:</span>
          
          <div className="date-input-group">
            <label>FROM</label>
            <select value={fromDate} onChange={(e) => setFromDate(e.target.value)}>
              <option value="01/02/2024">01/02/2024</option>
              <option value="06/01/2024">06/01/2024</option>
              <option value="01/01/2025">01/01/2025</option>
            </select>
          </div>

          <div className="date-input-group">
            <label>TO</label>
            <select value={toDate} onChange={(e) => setToDate(e.target.value)}>
              <option value="12/31/2024">12/31/2024</option>
              <option value="06/30/2025">06/30/2025</option>
              <option value="12/31/2025">12/31/2025</option>
            </select>
          </div>
        </div>

        <button onClick={handleUpdate} className="btn-secondary update-stats-btn">
          🔄 Update Statistics
        </button>
      </div>

      {/* Overall Orders Section */}
      <div className="overall-orders-section">
        <div className="section-head-row">
          <h2 className="section-title">Overall Orders</h2>
          <span className="system-wide-badge">SYSTEM WIDE</span>
        </div>

        <div className="three-overall-grid">
          {/* Card 1: Total Orders */}
          <div className="overall-stat-card card">
            <div className="card-top-head">
              <span className="ico-box blue-ico">📊</span>
              <span className="scope-lbl">Global Scope</span>
            </div>
            <span className="card-lbl">Total Orders</span>
            <h1 className="card-num">1,284</h1>
          </div>

          {/* Card 2: Completed Orders */}
          <div className="overall-stat-card card featured-completed">
            <div className="card-top-head">
              <span className="ico-box green-ico">✓</span>
              <span className="pct-completion-green">66.3% Completion</span>
            </div>
            <span className="card-lbl">Completed</span>
            <h1 className="card-num">852</h1>
            <div className="net-profit-row">
              <span className="np-lbl">Net profit of JAR</span>
              <strong className="np-val">160 $</strong>
            </div>
          </div>

          {/* Card 3: Remaining Orders */}
          <div className="overall-stat-card card">
            <div className="card-top-head">
              <span className="ico-box orange-ico">📋</span>
              <span className="action-required-orange">Action Required</span>
            </div>
            <span className="card-lbl">Remaining</span>
            <h1 className="card-num">432</h1>
          </div>
        </div>
      </div>

      {/* Categories Detailed Grid (2 Columns, 4 Light Blue Boxes) */}
      <div className="categories-two-grid">
        {/* Box 1: Recorded Video Orders */}
        <div className="category-detail-card card">
          <div className="cat-card-header">
            <span className="cat-ico">📹</span>
            <h3>Recorded Video Orders</h3>
          </div>

          <div className="cat-stats-three-cols">
            <div className="mini-stat-white card">
              <span className="m-lbl">TOTAL</span>
              <strong className="m-val blue-txt">2,410</strong>
            </div>

            <div className="mini-stat-white card">
              <span className="m-lbl">COMPLETED</span>
              <strong className="m-val green-txt">1,800</strong>
              <div className="m-profit">
                <span>Net profit</span>
                <strong className="p-num green-txt">100 $</strong>
              </div>
            </div>

            <div className="mini-stat-white card">
              <span className="m-lbl">REMAINING</span>
              <strong className="m-val orange-txt">610</strong>
            </div>
          </div>
        </div>

        {/* Box 2: Live Session Orders */}
        <div className="category-detail-card card">
          <div className="cat-card-header">
            <span className="cat-ico">🎙️</span>
            <h3>Live Session Orders</h3>
          </div>

          <div className="cat-stats-three-cols">
            <div className="mini-stat-white card">
              <span className="m-lbl">TOTAL</span>
              <strong className="m-val blue-txt">156</strong>
            </div>

            <div className="mini-stat-white card">
              <span className="m-lbl">COMPLETED</span>
              <strong className="m-val green-txt">98</strong>
              <div className="m-profit">
                <span>Net profit</span>
                <strong className="p-num green-txt">20 $</strong>
              </div>
            </div>

            <div className="mini-stat-white card">
              <span className="m-lbl">REMAINING</span>
              <strong className="m-val orange-txt">58</strong>
            </div>
          </div>
        </div>

        {/* Box 3: Trial Orders */}
        <div className="category-detail-card card">
          <div className="cat-card-header">
            <span className="cat-ico">🧪</span>
            <h3>Trial Orders</h3>
          </div>

          <div className="cat-stats-three-cols">
            <div className="mini-stat-white card">
              <span className="m-lbl">TOTAL</span>
              <strong className="m-val blue-txt">64</strong>
            </div>

            <div className="mini-stat-white card">
              <span className="m-lbl">COMPLETED</span>
              <strong className="m-val green-txt">42</strong>
            </div>

            <div className="mini-stat-white card">
              <span className="m-lbl">REMAINING</span>
              <strong className="m-val orange-txt">22</strong>
            </div>
          </div>
        </div>

        {/* Box 4: Assignment Orders */}
        <div className="category-detail-card card">
          <div className="cat-card-header">
            <span className="cat-ico">📋</span>
            <h3>Assignment Orders</h3>
          </div>

          <div className="cat-stats-three-cols">
            <div className="mini-stat-white card">
              <span className="m-lbl">TOTAL</span>
              <strong className="m-val blue-txt">512</strong>
            </div>

            <div className="mini-stat-white card">
              <span className="m-lbl">COMPLETED</span>
              <strong className="m-val green-txt">398</strong>
              <div className="m-profit">
                <span>Net profit</span>
                <strong className="p-num green-txt">40 $</strong>
              </div>
            </div>

            <div className="mini-stat-white card">
              <span className="m-lbl">REMAINING</span>
              <strong className="m-val orange-txt">114</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthOrders;
