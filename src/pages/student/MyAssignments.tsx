import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './MyAssignments.css';

interface AssignmentItem {
  id: string;
  title: string;
  department: string;
  submittedDate: string;
  status: 'COMPLETED' | 'PROCESSING';
}

const ASSIGNMENTS_DATA: AssignmentItem[] = [
  {
    id: 'calc-hw-1',
    title: 'Calculus Homework',
    department: 'Mathematics Department',
    submittedDate: 'March 12',
    status: 'COMPLETED'
  },
  {
    id: 'physics-hw-3',
    title: 'Physics Assignment 3',
    department: 'Theoretical Physics 101',
    submittedDate: 'March 10',
    status: 'PROCESSING'
  },
  {
    id: 'chem-lab-2',
    title: 'Organic Chemistry Lab',
    department: 'Advanced Chemistry',
    submittedDate: 'March 05',
    status: 'PROCESSING'
  },
  {
    id: 'history-essay',
    title: 'World History Essay',
    department: 'Humanities & Arts',
    submittedDate: 'February 28',
    status: 'PROCESSING'
  },
  {
    id: 'algo-intro',
    title: 'Intro to Algorithms',
    department: 'Computer Science',
    submittedDate: 'February 24',
    status: 'PROCESSING'
  }
];

const MyAssignments = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="my-assignments-page container animate-fade-in">
      {/* Top Header Controls */}
      <div className="assignments-header-wrapper">
        <button onClick={() => navigate('/student/dashboard')} className="back-link-btn">
          &larr; Back
        </button>

        <h1 className="assignments-main-title">My Assignments</h1>
        <p className="assignments-subtitle">View and manage your completed assignments.</p>
      </div>

      {/* Assignments List */}
      <div className="assignments-list-container">
        {ASSIGNMENTS_DATA.map((item) => (
          <div key={item.id} className="my-assignment-card card">
            <div className="assignment-card-left">
              <div className="status-submitted-row">
                <span className={`asgn-status-pill ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
                <span className="submitted-date-text">
                  Submitted on: {item.submittedDate}
                </span>
              </div>

              <h2 className="assignment-item-title">{item.title}</h2>
              
              <p className="department-tag">
                🏷️ {item.department}
              </p>
            </div>

            <div className="assignment-card-right">
              <Link 
                to={`/my-assignments/${item.id}`} 
                className={`btn-dark enter-assignment-btn ${item.status === 'PROCESSING' ? 'btn-slate' : ''}`}
              >
                Enter Assignment
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Row */}
      <div className="assignments-pagination-row">
        <button className="pg-arrow-btn">&lt;</button>
        <button 
          className={`pg-num-btn ${currentPage === 1 ? 'active' : ''}`}
          onClick={() => setCurrentPage(1)}
        >
          1
        </button>
        <button 
          className={`pg-num-btn ${currentPage === 2 ? 'active' : ''}`}
          onClick={() => setCurrentPage(2)}
        >
          2
        </button>
        <button 
          className={`pg-num-btn ${currentPage === 3 ? 'active' : ''}`}
          onClick={() => setCurrentPage(3)}
        >
          3
        </button>
        <span className="pg-dots">..</span>
        <button className="pg-arrow-btn">&gt;</button>
      </div>
    </div>
  );
};

export default MyAssignments;
