import { Link, useNavigate } from 'react-router-dom';
import './Courses.css';

interface CourseItem {
  id: string;
  title: string;
  icon: string;
  status: 'COMPLETED' | 'PROCESSING';
  description: string;
  type: string;
  plan: string;
  modules: number;
}

const COURSES_DATA: CourseItem[] = [
  {
    id: 'math-101',
    title: 'Mathematics',
    icon: '➗',
    status: 'COMPLETED',
    description: 'Lecture materials and explanations for this course.',
    type: 'explanation by video',
    plan: 'Hourly Plan',
    modules: 12
  },
  {
    id: 'physics-101',
    title: 'Physics',
    icon: '🔬',
    status: 'COMPLETED',
    description: 'Lecture materials and explanations for this course.',
    type: 'explanation by live',
    plan: 'Hourly Plan',
    modules: 8
  },
  {
    id: 'java-101',
    title: 'Java Programming',
    icon: '💻',
    status: 'PROCESSING',
    description: 'Lecture materials and explanations for this course.',
    type: 'explanation by video',
    plan: 'Packaging Plan',
    modules: 15
  },
  {
    id: 'ds-101',
    title: 'Data Structures',
    icon: '📊',
    status: 'PROCESSING',
    description: 'Lecture materials and explanations for this course.',
    type: 'explanation by video',
    plan: 'Packaging Plan',
    modules: 10
  }
];

const Courses = () => {
  const navigate = useNavigate();

  return (
    <div className="my-courses-page container animate-fade-in">
      {/* Top Header Row */}
      <div className="courses-header-wrapper">
        <button onClick={() => navigate('/student/dashboard')} className="back-link-btn">
          &larr; Back
        </button>

        <div className="courses-title-row">
          <div>
            <h1 className="courses-main-title">My Courses</h1>
            <p className="courses-subtitle">Choose a course to continue studying.</p>
          </div>

          <div className="semester-pill">
            🗓️ Semester: Spring 2026
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div className="courses-list-container">
        {COURSES_DATA.map((course) => (
          <div key={course.id} className="my-course-card card">
            <div className="course-card-left">
              <div className="course-icon-bg">
                {course.icon}
              </div>

              <div className="course-info">
                <div className="course-title-status-row">
                  <h2>{course.title}</h2>
                  <span className={`status-pill ${course.status.toLowerCase()}`}>
                    {course.status}
                  </span>
                </div>

                <p className="course-desc">{course.description}</p>
                
                <p className="course-meta">
                  Type : {course.type} {course.plan} &bull; 📖 {course.modules} Modules
                </p>
              </div>
            </div>

            <div className="course-card-right">
              <Link to={`/course/${course.id}`} className="btn-dark enter-course-btn">
                Enter Course
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
