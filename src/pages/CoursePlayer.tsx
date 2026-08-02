import { Link, useParams } from 'react-router-dom';

const CoursePlayer = () => {
  const { courseId, lessonId } = useParams();

  return (
    <div className="course-player-page container animate-fade-in" style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to={`/courses/${courseId || 1}`} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>← Back to Course Details</Link>
        <h2 style={{ margin: '0.5rem 0 0 0' }}>Module {lessonId || 1}: Advanced State Management Patterns</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1.2fr', gap: '2rem' }}>
        {/* Video Player Container */}
        <div>
          <div className="dark-card" style={{ height: '450px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '4rem', marginBottom: '1rem' }}>▶️</span>
            <h3>HD Video Lesson Player</h3>
            <p style={{ color: 'var(--text-muted)' }}>Lesson {lessonId} • 18 mins duration</p>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <h3>Lesson Notes & Downloads</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              In this module, we explore Context API optimization, custom hooks, and state selector patterns to keep your components fast and maintainable.
            </p>
            <button className="btn-secondary" style={{ marginTop: '1rem' }}>📥 Download Lecture PDF Slides</button>
          </div>
        </div>

        {/* Course Playlist Sidebar */}
        <div className="card" style={{ padding: '1.5rem', height: 'fit-content' }}>
          <h4 style={{ margin: '0 0 1rem 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>Course Modules</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link to="/courses/1/lesson/1" style={{ padding: '10px 12px', background: lessonId === '1' ? 'var(--primary-light)' : 'transparent', color: lessonId === '1' ? 'var(--primary-color)' : 'var(--text-primary)', borderRadius: '8px', fontWeight: lessonId === '1' ? '700' : '500', fontSize: '0.9rem' }}>
              1. Introduction & Setup ✓
            </Link>
            <Link to="/courses/1/lesson/2" style={{ padding: '10px 12px', background: lessonId === '2' ? 'var(--primary-light)' : 'transparent', color: lessonId === '2' ? 'var(--primary-color)' : 'var(--text-primary)', borderRadius: '8px', fontWeight: lessonId === '2' ? '700' : '500', fontSize: '0.9rem' }}>
              2. Advanced Hooks Deep Dive
            </Link>
            <Link to="/courses/1/lesson/3" style={{ padding: '10px 12px', background: lessonId === '3' ? 'var(--primary-light)' : 'transparent', color: lessonId === '3' ? 'var(--primary-color)' : 'var(--text-primary)', borderRadius: '8px', fontWeight: lessonId === '3' ? '700' : '500', fontSize: '0.9rem' }}>
              3. Custom Redux & Zustand Setup
            </Link>
            <Link to="/courses/1/lesson/4" style={{ padding: '10px 12px', background: lessonId === '4' ? 'var(--primary-light)' : 'transparent', color: lessonId === '4' ? 'var(--primary-color)' : 'var(--text-primary)', borderRadius: '8px', fontWeight: lessonId === '4' ? '700' : '500', fontSize: '0.9rem' }}>
              4. Fullstack Next.js Integration
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
