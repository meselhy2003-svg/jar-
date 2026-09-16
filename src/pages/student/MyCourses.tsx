import { Link } from 'react-router-dom';
import StudentHeader from '../../components/StudentHeader';
import { useLanguage } from '../../context/LanguageContext';
import './MyCourses.css';

const MY_COURSES_DATA = [
  {
    id: 'math-101',
    titleKey: 'courses.math',
    defaultTitle: 'Mathematics',
    status: 'COMPLETED',
    statusType: 'completed',
    icon: '➗',
    typeKey: 'courses.typeVideo',
    defaultType: 'explanation by video Hourly Plan',
    modulesCount: 12
  },
  {
    id: 'physics-101',
    titleKey: 'courses.physics',
    defaultTitle: 'Physics',
    status: 'COMPLETED',
    statusType: 'completed',
    icon: '🦾',
    typeKey: 'courses.typeLive',
    defaultType: 'explanation by live Hourly Plan',
    modulesCount: 8
  },
  {
    id: 'java-101',
    titleKey: 'courses.java',
    defaultTitle: 'Java Programming',
    status: 'PROCESSING',
    statusType: 'processing',
    icon: '💻',
    typeKey: 'courses.typeVideo',
    defaultType: 'explanation by video Packaging Plan',
    modulesCount: 15
  },
  {
    id: 'ds-101',
    titleKey: 'courses.ds',
    defaultTitle: 'Data Structures',
    status: 'PROCESSING',
    statusType: 'processing',
    icon: '📊',
    typeKey: 'courses.typeVideo',
    defaultType: 'explanation by video Hourly Plan',
    modulesCount: 10
  }
];

const MyCourses = () => {
  const { t } = useLanguage();

  return (
    <div className="my-courses-wrapper">
      <StudentHeader />

      <main className="container my-courses-container animate-fade-in">
        <div className="my-courses-top">
          <Link to="/student/dashboard" className="back-link">{t('orders.back', '← Back')}</Link>
          <div className="my-courses-header-row">
            <div>
              <h1 className="page-title">{t('courses.myCourses', 'My Courses')}</h1>
              <p className="page-subtitle">{t('courses.subtitle', 'Choose a course to continue studying.')}</p>
            </div>
            <div className="semester-badge">
              📅 {t('courses.semester', 'Semester: Spring 2026')}
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
                    <h3>{t(course.titleKey, course.defaultTitle)}</h3>
                    <span className={`status-pill ${course.statusType}`}>
                      {course.status === 'COMPLETED' ? t('common.completed', 'COMPLETED') : t('common.pending', 'PROCESSING')}
                    </span>
                  </div>
                  <p className="course-desc">{t('courses.desc', 'Lecture materials and explanations for this course.')}</p>
                  <p className="course-meta">
                    {t(course.typeKey, `Type : ${course.defaultType}`)} &nbsp;•&nbsp; 📖 {course.modulesCount} {t('courses.modules', 'Modules')}
                  </p>
                </div>
              </div>

              <div className="course-card-right">
                <Link to={`/my-courses/${course.id}`} className="btn-dark enter-course-btn">
                  {t('courses.enterCourse', 'Enter Course')}
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
