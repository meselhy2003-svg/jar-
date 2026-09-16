import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './MyAssignments.css';

interface AssignmentItem {
  id: string;
  titleKey: string;
  defaultTitle: string;
  deptKey: string;
  defaultDept: string;
  submittedDate: string;
  status: 'COMPLETED' | 'PROCESSING';
}

const ASSIGNMENTS_DATA: AssignmentItem[] = [
  {
    id: 'calc-hw-1',
    titleKey: 'assignments.calculusHw',
    defaultTitle: 'Calculus Homework',
    deptKey: 'assignments.mathDept',
    defaultDept: 'Mathematics Department',
    submittedDate: 'March 12',
    status: 'COMPLETED'
  },
  {
    id: 'physics-hw-3',
    titleKey: 'assignments.physicsAsg',
    defaultTitle: 'Physics Assignment 3',
    deptKey: 'assignments.physicsDept',
    defaultDept: 'Theoretical Physics 101',
    submittedDate: 'March 10',
    status: 'PROCESSING'
  },
  {
    id: 'chem-lab-2',
    titleKey: 'assignments.chemLab',
    defaultTitle: 'Organic Chemistry Lab',
    deptKey: 'assignments.chemDept',
    defaultDept: 'Advanced Chemistry',
    submittedDate: 'March 05',
    status: 'PROCESSING'
  },
  {
    id: 'history-essay',
    titleKey: 'assignments.historyEssay',
    defaultTitle: 'World History Essay',
    deptKey: 'assignments.humanitiesDept',
    defaultDept: 'Humanities & Arts',
    submittedDate: 'February 28',
    status: 'PROCESSING'
  },
  {
    id: 'algo-intro',
    titleKey: 'assignments.algoIntro',
    defaultTitle: 'Intro to Algorithms',
    deptKey: 'assignments.csDept',
    defaultDept: 'Computer Science',
    submittedDate: 'February 24',
    status: 'PROCESSING'
  }
];

const MyAssignments = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="my-assignments-page container animate-fade-in">
      {/* Top Header Controls */}
      <div className="assignments-header-wrapper">
        <button onClick={() => navigate('/student/dashboard')} className="back-link-btn">
          {t('orders.back', '← Back')}
        </button>

        <h1 className="assignments-main-title">{t('assignments.myAssignments', 'My Assignments')}</h1>
        <p className="assignments-subtitle">{t('assignments.subtitle', 'View and manage your completed assignments.')}</p>
      </div>

      {/* Assignments List */}
      <div className="assignments-list-container">
        {ASSIGNMENTS_DATA.map((item) => (
          <div key={item.id} className="my-assignment-card card">
            <div className="assignment-card-left">
              <div className="status-submitted-row">
                <span className={`asgn-status-pill ${item.status.toLowerCase()}`}>
                  {item.status === 'COMPLETED' ? t('common.completed', 'COMPLETED') : t('common.pending', 'PROCESSING')}
                </span>
                <span className="submitted-date-text">
                  {t('assignments.submittedOn', 'Submitted on:')} {item.submittedDate}
                </span>
              </div>

              <h2 className="assignment-item-title">{t(item.titleKey, item.defaultTitle)}</h2>
              
              <p className="department-tag">
                🏷️ {t(item.deptKey, item.defaultDept)}
              </p>
            </div>

            <div className="assignment-card-right">
              <Link 
                to={`/my-assignments/${item.id}`} 
                className={`btn-dark enter-assignment-btn ${item.status === 'PROCESSING' ? 'btn-slate' : ''}`}
              >
                {t('assignments.enterAssignment', 'Enter Assignment')}
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
