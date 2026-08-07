import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageStudents.css';

interface StudentItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

const ManageStudents = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('All Major');

  const studentsList: StudentItem[] = [
    {
      id: 'alexander-montgomery',
      name: 'Alex Rivers',
      email: 'a.rivers@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 'elena-vance',
      name: 'Elena Vance',
      email: 'e.vance@academy.edu',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 'marcus-thorne',
      name: 'Marcus Thorne',
      email: 'm.thorne@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
    }
  ];

  const filteredList = studentsList.filter((std) => {
    const matchesSearch = std.name.toLowerCase().includes(searchQuery.toLowerCase()) || std.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="manage-students-page animate-fade-in">
      <div className="page-header-wrap">
        <h1 className="page-title">Manage Students</h1>
        <p className="page-subtitle">
          View and manage all registered students on the platform.
        </p>
      </div>

      {/* Top Metric Cards Row */}
      <div className="students-metrics-row">
        <div className="std-metric-card card">
          <span className="std-metric-label">TOTAL STUDENTS</span>
          <h2 className="std-metric-val">1,284</h2>
          <span className="std-metric-sub green-txt">📈 +12% from last month</span>
        </div>

        <div className="std-metric-card card">
          <span className="std-metric-label">ACTIVE STUDENTS</span>
          <h2 className="std-metric-val">942</h2>
          <span className="std-metric-sub">👁️ Currently lecturing</span>
        </div>
      </div>

      {/* Filter Row */}
      <div className="students-filter-banner card">
        <div className="filter-search-box">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search by students name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-dropdown-box">
          <select 
            value={selectedMajor} 
            onChange={(e) => setSelectedMajor(e.target.value)}
          >
            <option value="All Major">All Major</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Engineering">Engineering</option>
          </select>
        </div>
      </div>

      {/* Students List */}
      <div className="students-cards-list">
        {filteredList.length > 0 ? (
          filteredList.map((std) => (
            <div key={std.id} className="student-row-card card">
              <div className="std-left-info">
                <img src={std.avatar} alt={std.name} className="std-row-avatar" />
                <div>
                  <h3 className="std-row-name">{std.name}</h3>
                  <span className="std-row-email">{std.email}</span>
                </div>
              </div>

              <div className="std-right-action">
                <button 
                  onClick={() => navigate(`/admin/students/${std.id}`)}
                  className="btn-primary view-profile-btn"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="card text-center" style={{ padding: '3rem' }}>
            <h3>No students match your search.</h3>
          </div>
        )}
      </div>

      {/* Pagination & Floating Add */}
      <div className="pagination-row">
        <div className="pages-list">
          <span className="page-nav-link">Previous</span>
          <span className="page-num active">1</span>
          <span className="page-num">2</span>
          <span className="page-num">3</span>
          <span className="page-nav-link">Next</span>
        </div>

        <button onClick={() => navigate('/admin/students/register')} className="floating-add-btn" title="Add Student">
          👤+
        </button>
      </div>
    </div>
  );
};

export default ManageStudents;
