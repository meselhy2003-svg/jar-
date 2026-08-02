import { Link } from 'react-router-dom';
import StudentHeader from '../../components/StudentHeader';
import './MyCourses.css';

const MY_COURSES_DATA = [
  {
    id: 'math-101',
    title: 'Mathematics',
    status: 'COMPLETED',
    statusType: 'completed',
    icon: '➗',
    description: 'Lecture materials and explanations for this course.',
    type: 'explanation by video Hourly Plan',
    modulesCount: 12
  },
  {
    id: 'physics-101',
    title: 'Physics',
    status: 'COMPLETED',
    statusType: 'completed',
    icon: '🦾',
    description: 'Lecture materials and explanations for this course.',
    type: 'explanation by live Hourly Plan',
    modulesCount: 8
  },
  {
    id: 'java-101',
    title: 'Java Programming',
    status: 'PROCESSING',
    statusType: 'processing',
    icon: '💻',
    description: 'Lecture materials and explanations for this course.',
    type: 'explanation by video Packaging Plan',
    modulesCount: 15
  },
  {
    id: 'ds-101',
    title: 'Data Structures',
    status: 'PROCESSING',
    statusType: 'processing',
    icon: '📊',
    description: 'Lecture materials and explanations for this course.',
    type: 'explanation by video Hourly Plan',
    modulesCount: 10
  }
];

const MyCourses = () => {
  return (
    <div className="my-courses-wrapper">
      <StudentHeader />

      <main className="container my-courses-container animate-fade-in">
        <div className="my-courses-top">
          <Link to="/student/dashboard" className="back-link">← Back</Link>
          <div className="my-courses-header-row">
            <div>
              <h1 className="page-title">My Courses</h1>
              <p className="page-subtitle">Choose a course to continue studying.</p>
            </div>
            <div className="semester-badge">
              📅 Semester: Spring 2026
            </div>
          </div>
        </div>

        {/* Courses List */}
        <div className="courses-list">
          {MY_COURSES_DATA.map((course) => (
            <div className="my-course-card card" key={course.id}>
              <div className="course-card-left">
                <div className="course-icon-box">
                  <span className="icon-emoji">{course.icon}</span>
                </div>
                <div className="course-card-details">
                  <div className="title-row">
                    <h3>{course.title}</h3>
                    <span className={`status-pill ${course.statusType}`}>{course.status}</span>
                  </div>
                  <p className="course-desc">{course.description}</p>
                  <p className="course-meta">
                    Type : {course.type} &nbsp;•&nbsp; 📖 {course.modulesCount} Modules
                  </p>
                </div>
              </div>

              <div className="course-card-right">
                <Link to={`/my-courses/${course.id}`} className="btn-dark enter-course-btn">
                  Enter Course
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="courses-pagination">
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">&gt;</button>
        </div>
      </main>
    </div>
  );
};

export default MyCourses;
