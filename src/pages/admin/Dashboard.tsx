import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p className="subtitle">Welcome back, here's what's happening today.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card glass-panel">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>Total Users</h3>
            <p className="stat-value">54,321</p>
            <span className="stat-change positive">↑ 12% this month</span>
          </div>
        </div>
        
        <div className="stat-card glass-panel">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>Active Courses</h3>
            <p className="stat-value">245</p>
            <span className="stat-change positive">↑ 4 new this week</span>
          </div>
        </div>
        
        <div className="stat-card glass-panel">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Total Revenue</h3>
            <p className="stat-value">$1.2M</p>
            <span className="stat-change positive">↑ 8% this month</span>
          </div>
        </div>
        
        <div className="stat-card glass-panel">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <h3>Avg Rating</h3>
            <p className="stat-value">4.8</p>
            <span className="stat-change neutral">→ Same as last week</span>
          </div>
        </div>
      </div>

      <div className="dashboard-tables">
        <div className="recent-activity glass-panel">
          <h3>Recent Enrollments</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alice Johnson</td>
                <td>Advanced React</td>
                <td>2 mins ago</td>
                <td><span className="status-badge success">Active</span></td>
              </tr>
              <tr>
                <td>Bob Smith</td>
                <td>Python Data Science</td>
                <td>15 mins ago</td>
                <td><span className="status-badge success">Active</span></td>
              </tr>
              <tr>
                <td>Charlie Davis</td>
                <td>UI/UX Design</td>
                <td>1 hour ago</td>
                <td><span className="status-badge warning">Pending</span></td>
              </tr>
              <tr>
                <td>Diana Prince</td>
                <td>Node.js Backend</td>
                <td>2 hours ago</td>
                <td><span className="status-badge success">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
