import { Link } from 'react-router-dom';
import StudentHeader from '../../components/StudentHeader';
import './MyAssignments.css';

const ASSIGNMENTS_DATA = [
  {
    id: 'calc-hw-1',
    title: 'Calculus Homework',
    department: 'Mathematics Department',
    submittedDate: 'March 12',
    status: 'COMPLETED',
    statusType: 'completed'
  },
  {
    id: 'physics-hw-3',
    title: 'Physics Assignment 3',
    department: 'Theoretical Physics 101',
    submittedDate: 'March 10',
    status: 'PROCESSING',
    statusType: 'processing'
  },
  {
    id: 'chem-lab-2',
    title: 'Organic Chemistry Lab',
    department: 'Advanced Chemistry',
    submittedDate: 'March 05',
    status: 'PROCESSING',
    statusType: 'processing'
  },
  {
    id: 'history-essay',
    title: 'World History Essay',
    department: 'Humanities & Arts',
    submittedDate: 'February 28',
    status: 'PROCESSING',
    statusType: 'processing'
  },
  {
    id: 'algo-intro',
    title: 'Intro to Algorithms',
    department: 'Computer Science',
    submittedDate: 'February 24',
    status: 'PROCESSING',
    statusType: 'processing'
  }
];

const MyAssignments = () => {
  return (
    <div className="my-assignments-wrapper">
      <StudentHeader />

      <main className="container my-assignments-container animate-fade-in">
        <div className="my-assignments-top">
          <Link to="/student/dashboard" className="back-link">← Back</Link>
          <h1 className="page-title">My Assignments</h1>
          <p className="page-subtitle">View and manage your completed assignments.</p>
        </div>

        {/* Assignments List */}
        <div className="assignments-list">
          {ASSIGNMENTS_DATA.map((item) => (
            <div className="assignment-card card" key={item.id}>
              <div className="assignment-card-left">
                <div className="status-row">
                  <span className={`status-pill ${item.statusType}`}>{item.status}</span>
                  <span className="submitted-date">Submitted on: {item.submittedDate}</span>
                </div>
                <h3 className="assignment-title">{item.title}</h3>
                <p className="department-name">🏫 {item.department}</p>
              </div>

              <div className="assignment-card-right">
                <Link to={`/my-assignments/${item.id}`} className="btn-dark enter-assignment-btn">
                  Enter Assignment
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="assignments-pagination">
          <button className="page-btn">&lt;</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <span className="dots">..</span>
          <button className="page-btn">&gt;</button>
        </div>
      </main>
    </div>
  );
};

export default MyAssignments;
