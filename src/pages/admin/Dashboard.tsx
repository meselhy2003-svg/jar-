import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '1Y'>('7D');

  const handleGenerateReport = () => {
    alert('Generating Financial & Executive Report... The report PDF has been queued for download.');
  };

  return (
    <div className="admin-overview-page animate-fade-in">
      {/* 1. PLATFORM PULSE HERO CARD */}
      <div className="platform-pulse-hero">
        <div className="hero-left-content">
          <span className="pulse-tag">PLATFORM PULSE</span>
          <h1 className="hero-title">Welcome Back, Admin</h1>
          <p className="hero-subtext">
            Everything is running smoothly. Student enrollment is up by 12% this week, and instructor payout cycles are successfully completed. What's our next move?
          </p>

          <div className="hero-badges-row">
            <div className="hero-badge-pill">
              <span className="badge-label">SYSTEM STATUS</span>
              <strong className="badge-value green-dot">● Optimal</strong>
            </div>
            <div className="hero-badge-pill">
              <span className="badge-label">DATE TODAY</span>
              <strong className="badge-value">Sunday, June 14, 2026</strong>
            </div>
          </div>
        </div>

        <div className="hero-target-revenue-card">
          <div className="target-icon-box">📈</div>
          <div>
            <span className="target-label">Target Revenue</span>
            <div className="target-val-row">
              <strong>$1.2M</strong>
              <span className="target-pct">+4%</span>
            </div>
          </div>
          <div className="target-progress-bar">
            <div className="target-progress-fill" style={{ width: '84%' }}></div>
          </div>
        </div>
      </div>

      {/* 2. TOP METRIC CARDS ROW */}
      <div className="top-metrics-grid">
        <div className="metric-card card clickable-card" onClick={() => navigate('/admin/students')}>
          <div className="metric-header-row">
            <div className="metric-icon-box blue-soft">👥</div>
            <span className="pct-badge green-badge">+12.5%</span>
          </div>
          <span className="metric-label">Total Students</span>
          <h2 className="metric-val">24,512</h2>
        </div>

        <div className="metric-card card clickable-card" onClick={() => navigate('/admin/instructors')}>
          <div className="metric-header-row">
            <div className="metric-icon-box cyan-soft">🎓</div>
            <span className="pct-badge green-badge">+3.2%</span>
          </div>
          <span className="metric-label">Total Instructors</span>
          <h2 className="metric-val">1,104</h2>
        </div>
      </div>

      {/* 3. BUSINESS OVERVIEW & FINANCIAL SUMMARY */}
      <div className="overview-financial-grid">
        {/* Left: Business Overview */}
        <div className="business-overview-card card">
          <div className="card-top-row">
            <h3>Business Overview</h3>
            <div className="time-filter-toggle">
              <button 
                className={`time-btn ${timeRange === '7D' ? 'active' : ''}`}
                onClick={() => setTimeRange('7D')}
              >
                7D
              </button>
              <button 
                className={`time-btn ${timeRange === '30D' ? 'active' : ''}`}
                onClick={() => setTimeRange('30D')}
              >
                30D
              </button>
              <button 
                className={`time-btn ${timeRange === '1Y' ? 'active' : ''}`}
                onClick={() => setTimeRange('1Y')}
              >
                1Y
              </button>
            </div>
          </div>

          <div className="chart-subtitles-row">
            <span>Revenue Growth ($)</span>
            <span>User Acquisition</span>
          </div>

          {/* Bar Chart Visual Mockup */}
          <div className="bars-chart-graphic">
            <div className="bar-col"><div className="bar-fill" style={{ height: timeRange === '7D' ? '40%' : '60%' }}></div><span>MON</span></div>
            <div className="bar-col"><div className="bar-fill" style={{ height: timeRange === '7D' ? '55%' : '75%' }}></div><span>TUE</span></div>
            <div className="bar-col"><div className="bar-fill" style={{ height: timeRange === '7D' ? '45%' : '65%' }}></div><span>WED</span></div>
            <div className="bar-col"><div className="bar-fill" style={{ height: timeRange === '7D' ? '70%' : '80%' }}></div><span>THU</span></div>
            <div className="bar-col"><div className="bar-fill" style={{ height: timeRange === '7D' ? '60%' : '85%' }}></div><span>FRI</span></div>
            <div className="bar-col"><div className="bar-fill" style={{ height: timeRange === '7D' ? '80%' : '90%' }}></div><span>SAT</span></div>
            <div className="bar-col"><div className="bar-fill highlight-bar" style={{ height: timeRange === '7D' ? '95%' : '100%' }}></div><span>SUN</span></div>
          </div>

          <div className="chart-legend-row text-center">
            <span>● Students</span>
            <span>● Instructors</span>
          </div>
        </div>

        {/* Right: Financial Summary Dark Card */}
        <div className="financial-summary-dark-card">
          <h3>Financial Summary</h3>
          <span className="comp-bal-label">COMPANY BALANCE</span>
          <h1 className="comp-bal-val">$142,509<span className="bal-cents">.22</span></h1>

          <div className="fin-stats-row">
            <div>
              <span className="fin-sub-label">PENDING</span>
              <strong className="fin-sub-val">$12,401</strong>
            </div>
            <div>
              <span className="fin-sub-label">PROFIT (WTD)</span>
              <strong className="fin-sub-val cyan-text">+$24,192</strong>
            </div>
          </div>

          <button onClick={handleGenerateReport} className="btn-primary generate-report-btn">
            📄 Generate Report
          </button>
        </div>
      </div>

      {/* 4. PLATFORM HEALTH & SYSTEM STATUS & RECENT ACTIVITY */}
      <div className="health-status-activity-grid">
        {/* Left: Platform Health & Engagement */}
        <div className="platform-health-card card">
          <h3>Platform Health & Engagement</h3>

          <div className="health-progress-list">
            <div className="health-item">
              <div className="health-label-row">
                <span>Student Satisfaction</span>
                <strong>98%</strong>
              </div>
              <div className="progress-bar-bg"><div className="progress-fill cyan-fill" style={{ width: '98%' }}></div></div>
            </div>

            <div className="health-item">
              <div className="health-label-row">
                <span>Instructor Satisfaction</span>
                <strong>94%</strong>
              </div>
              <div className="progress-bar-bg"><div className="progress-fill cyan-fill" style={{ width: '94%' }}></div></div>
            </div>

            <div className="health-item">
              <div className="health-label-row">
                <span>Course Completion</span>
                <strong>78%</strong>
              </div>
              <div className="progress-bar-bg"><div className="progress-fill dark-fill" style={{ width: '78%' }}></div></div>
            </div>

            <div className="health-item">
              <div className="health-label-row">
                <span>Assignment Completion</span>
                <strong>92%</strong>
              </div>
              <div className="progress-bar-bg"><div className="progress-fill dark-fill" style={{ width: '92%' }}></div></div>
            </div>

            <div className="health-item">
              <div className="health-label-row">
                <span>Trial to Paid Conversion</span>
                <strong>42%</strong>
              </div>
              <div className="progress-bar-bg"><div className="progress-fill brown-fill" style={{ width: '42%' }}></div></div>
            </div>
          </div>
        </div>

        {/* Right Column: System Status & Recent Activity */}
        <div className="right-status-col">
          <div className="system-status-card card">
            <h3>System Status</h3>
            <div className="system-status-list">
              <div className="status-row">
                <span><span className="green-dot">●</span> Main Server Cluster</span>
                <strong>99.9% uptime</strong>
              </div>
              <div className="status-row">
                <span><span className="green-dot">●</span> Database Node A/B</span>
                <strong>12ms latency</strong>
              </div>
              <div className="status-row">
                <span><span className="orange-dot">●</span> Storage Usage</span>
                <strong>64% Full</strong>
              </div>
              <div className="status-row">
                <span><span className="green-dot">●</span> Video CDN</span>
                <strong>Active</strong>
              </div>
            </div>
          </div>

          <div className="recent-activity-card card">
            <div className="card-top-row">
              <h3>Recent Activity</h3>
              <span onClick={() => navigate('/admin/orders')} className="view-all-link" style={{ cursor: 'pointer' }}>View All</span>
            </div>

            <div className="activity-timeline-list">
              <div className="activity-item">
                <span className="act-dot blue-dot">●</span>
                <div>
                  <strong>New Student Registration</strong>
                  <p>Alex Rivers joined Advanced UI Design</p>
                  <span className="act-time">2 MINUTES AGO</span>
                </div>
              </div>

              <div className="activity-item">
                <span className="act-dot green-dot">●</span>
                <div>
                  <strong>Payment Received</strong>
                  <p>Order #84210 - $199.00 processed</p>
                  <span className="act-time">14 MINUTES AGO</span>
                </div>
              </div>

              <div className="activity-item">
                <span className="act-dot orange-dot">●</span>
                <div>
                  <strong>Instructor Onboarded</strong>
                  <p>Dr. Sarah Jenkins approved as verified partner</p>
                  <span className="act-time">1 HOUR AGO</span>
                </div>
              </div>

              <div className="activity-item">
                <span className="act-dot red-dot">●</span>
                <div>
                  <strong>Withdrawal Request</strong>
                  <p>Markus T. requested $1,450.00 payout</p>
                  <span className="act-time">2 HOURS AGO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. QUICK MANAGEMENT SHORTCUTS GRID (8 TILES) */}
      <div className="quick-management-section">
        <h3>Quick Management Shortcuts</h3>

        <div className="shortcuts-eight-grid">
          <div className="shortcut-tile card" onClick={() => navigate('/admin/students')}>
            <span className="tile-icon">👥</span>
            <span>Manage Students</span>
          </div>

          <div className="shortcut-tile card" onClick={() => navigate('/admin/instructors')}>
            <span className="tile-icon">🎓</span>
            <span>Manage Instructors</span>
          </div>

          <div className="shortcut-tile card" onClick={() => navigate('/admin/orders')}>
            <span className="tile-icon">📄</span>
            <span>Manage Orders</span>
          </div>

          <div className="shortcut-tile card" onClick={() => navigate('/admin/courses')}>
            <span className="tile-icon">📖</span>
            <span>Manage Courses</span>
          </div>

          <div className="shortcut-tile card" onClick={() => navigate('/admin/financials')}>
            <span className="tile-icon">📋</span>
            <span>Manage Pricing</span>
          </div>

          <div className="shortcut-tile card" onClick={() => navigate('/admin/instructor-wallet')}>
            <span className="tile-icon">💳</span>
            <span>Instructor Wallet</span>
          </div>

          <div className="shortcut-tile card" onClick={() => navigate('/admin/student-wallet')}>
            <span className="tile-icon">💸</span>
            <span>Student Wallet</span>
          </div>

          <div className="shortcut-tile card" onClick={() => alert('Notifications Hub: All 12 platform alerts are up to date.')}>
            <span className="tile-icon">🔔</span>
            <span>Notification Hub</span>
          </div>
        </div>
      </div>

      {/* 6. BOTTOM SUMMARY STATS BAR */}
      <div className="bottom-summary-stats-bar">
        <div>
          <span className="sum-lbl">TOTAL STUDENTS</span>
          <strong className="sum-val">42,810</strong>
        </div>
        <div>
          <span className="sum-lbl">CERTIFICATES ISSUED</span>
          <strong className="sum-val">18,521</strong>
        </div>
        <div>
          <span className="sum-lbl">GLOBAL COURSES</span>
          <strong className="sum-val">1,204</strong>
        </div>
        <div>
          <span className="sum-lbl">INSTRUCTOR PAYOUTS</span>
          <strong className="sum-val">$3.2M</strong>
        </div>
        <div>
          <span className="sum-lbl">AVERAGE RATING</span>
          <strong className="sum-val">4.9/5.0</strong>
        </div>
      </div>

      <div className="admin-footer-copyright text-center">
        © 2026 JAR ACADEMY Inc. All administrative rights reserved. Platform Version 4.2.0-stable
      </div>
    </div>
  );
};

export default Dashboard;
