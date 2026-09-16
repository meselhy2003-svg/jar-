import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Courses.css';

interface CourseItem {
  id: string;
  titleKey: string;
  defaultTitle: string;
  icon: string;
  status: 'COMPLETED' | 'PROCESSING';
  typeKey: string;
  defaultType: string;
  planKey: string;
  defaultPlan: string;
  modules: number;
}

const COURSES_DATA: CourseItem[] = [
  {
    id: 'math-101',
    titleKey: 'courses.math',
    defaultTitle: 'Mathematics',
    icon: '➗',
    status: 'COMPLETED',
    typeKey: 'courses.typeVideo',
    defaultType: 'explanation by video',
    planKey: 'courses.hourlyPlan',
    defaultPlan: 'Hourly Plan',
    modules: 12
  },
  {
    id: 'physics-101',
    titleKey: 'courses.physics',
    defaultTitle: 'Physics',
    icon: '🔬',
    status: 'COMPLETED',
    typeKey: 'courses.typeLive',
    defaultType: 'explanation by live',
    planKey: 'courses.hourlyPlan',
    defaultPlan: 'Hourly Plan',
    modules: 8
  },
  {
    id: 'java-101',
    titleKey: 'courses.java',
    defaultTitle: 'Java Programming',
    icon: '💻',
    status: 'PROCESSING',
    typeKey: 'courses.typeVideo',
    defaultType: 'explanation by video',
    planKey: 'courses.packagePlan',
    defaultPlan: 'Packaging Plan',
    modules: 15
  },
  {
    id: 'ds-101',
    titleKey: 'courses.ds',
    defaultTitle: 'Data Structures',
    icon: '📊',
    status: 'PROCESSING',
    typeKey: 'courses.typeVideo',
    defaultType: 'explanation by video',
    planKey: 'courses.packagePlan',
    defaultPlan: 'Packaging Plan',
    modules: 10
  }
];

const Courses = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="my-courses-page container animate-fade-in">
      {/* Top Header Row */}
      <div className="courses-header-wrapper">
        <button onClick={() => navigate('/student/dashboard')} className="back-link-btn">
          {t('orders.back', '← Back')}
        </button>

        <div className="courses-title-row">
          <div>
            <h1 className="courses-main-title">{t('courses.myCourses', 'My Courses')}</h1>
            <p className="courses-subtitle">{t('courses.subtitle', 'Choose a course to continue studying.')}</p>
          </div>

          <div className="semester-pill">
            🗓️ {t('courses.semester', 'Semester: Spring 2026')}
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
                  <h2>{t(course.titleKey, course.defaultTitle)}</h2>
                  <span className={`status-pill ${course.status.toLowerCase()}`}>
                    {course.status === 'COMPLETED' ? t('common.completed', 'COMPLETED') : t('common.pending', 'PROCESSING')}
                  </span>
                </div>

                <p className="course-desc">{t('courses.desc', 'Lecture materials and explanations for this course.')}</p>
                
                <p className="course-meta">
                  {t(course.typeKey, `Type : ${course.defaultType}`)} • {t(course.planKey, course.defaultPlan)} &bull; 📖 {course.modules} {t('courses.modules', 'Modules')}
                </p>
              </div>
            </div>

            <div className="course-card-right">
              <Link to={`/course/${course.id}`} className="btn-dark enter-course-btn">
                {t('courses.enterCourse', 'Enter Course')}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
