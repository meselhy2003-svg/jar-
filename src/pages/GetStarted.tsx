import { Link } from 'react-router-dom';
import './GetStarted.css';

const GetStarted = () => {
  return (
    <div className="get-started-page container animate-fade-in">
      <div className="get-started-header text-center">
        <h1>Join JAR Academy</h1>
        <p className="section-subtitle">Select your account type to get started.</p>
      </div>

      <div className="role-cards-container">
        {/* Student Card */}
        <div className="role-card card text-center">
          <div className="role-icon-box cyan">🎓</div>
          <h2>Student</h2>
          <p>Book 1-on-1 tutoring sessions, get help with your assignments, and ace your university exams.</p>
          <div className="role-actions">
            <Link to="/signup" className="btn-primary w-100">Create Student Account</Link>
            <Link to="/login" className="btn-secondary w-100">Student Login</Link>
          </div>
        </div>

        {/* Instructor Card */}
        <div className="role-card card text-center">
          <div className="role-icon-box mint">👨‍🏫</div>
          <h2>Instructor</h2>
          <p>Teach university students, share your academic expertise, and earn money on a flexible schedule.</p>
          <div className="role-actions">
            <Link to="/instructor-login" className="btn-primary w-100" style={{ background: 'var(--dark-surface)' }}>
              Instructor Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
