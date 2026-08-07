import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageInstructors.css';

interface InstructorItem {
  id: string;
  name: string;
  major: string;
  academicStatus: 'Graduate' | 'Student';
  avatar: string;
}

const ManageInstructors = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('All Major');

  const instructorsList: InstructorItem[] = [
    {
      id: 'julianne-davies',
      name: 'Dr. Julianne Davies',
      major: 'computer science',
      academicStatus: 'Graduate',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 'marcus-sterling',
      name: 'Marcus Sterling',
      major: 'Digital Ethnomusicology',
      academicStatus: 'Student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 'elena-rodriguez',
      name: 'Elena Rodriguez',
      major: 'Comparative Literature',
      academicStatus: 'Graduate',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 'kofi-lawson',
      name: 'Kofi Lawson',
      major: 'Software Engineering Systems',
      academicStatus: 'Student',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
    }
  ];

  const filteredList = instructorsList.filter((inst) => {
    const matchesSearch = inst.name.toLowerCase().includes(searchQuery.toLowerCase()) || inst.major.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMajor = selectedMajor === 'All Major' || inst.major.toLowerCase().includes(selectedMajor.toLowerCase());
    return matchesSearch && matchesMajor;
  });

  return (
    <div className="manage-instructors-page animate-fade-in">
      <div className="page-header-wrap">
        <h1 className="page-title">Manage Instructors</h1>
        <p className="page-subtitle">
          View and manage all registered instructors on the platform.
        </p>
      </div>

      {/* Top Metric Cards Row */}
      <div className="instructors-metrics-row">
        <div className="inst-metric-card card">
          <span className="inst-metric-label">TOTAL INSTRUCTORS</span>
          <h2 className="inst-metric-val">1,284</h2>
          <span className="inst-metric-sub green-txt">📈 +12% from last month</span>
        </div>

        <div className="inst-metric-card card">
          <span className="inst-metric-label">ACTIVE INSTRUCTORS</span>
          <h2 className="inst-metric-val">942</h2>
          <span className="inst-metric-sub">👁️ Currently lecturing</span>
        </div>
      </div>

      {/* Filter Row */}
      <div className="instructors-filter-banner card">
        <div className="filter-search-box">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search by instructor name or major..."
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
            <option value="Literature">Literature</option>
            <option value="Software">Software Engineering</option>
          </select>
        </div>
      </div>

      {/* Instructors List */}
      <div className="instructors-cards-list">
        {filteredList.length > 0 ? (
          filteredList.map((inst) => (
            <div key={inst.id} className="instructor-row-card card">
              <div className="inst-left-info">
                <img src={inst.avatar} alt={inst.name} className="inst-row-avatar" />
                <div>
                  <h3 className="inst-row-name">{inst.name}</h3>
                  <span className="inst-row-major">{inst.major}</span>
                </div>
              </div>

              <div className="inst-center-status text-center">
                <span className="status-label">ACADEMIC STATUS</span>
                <div className={`status-pill ${inst.academicStatus.toLowerCase()}`}>
                  {inst.academicStatus}
                </div>
              </div>

              <div className="inst-right-action">
                <button 
                  onClick={() => navigate(`/admin/instructors/${inst.id}`)}
                  className="btn-primary view-profile-btn"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="card text-center" style={{ padding: '3rem' }}>
            <h3>No instructors match your search.</h3>
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

        <button onClick={() => navigate('/admin/instructors/register')} className="floating-add-btn" title="Add Instructor">
          👤+
        </button>
      </div>
    </div>
  );
};

export default ManageInstructors;
