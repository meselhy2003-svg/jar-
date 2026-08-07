import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TrialTasks.css';

interface TrialTask {
  id: string;
  studentName: string;
  subject: string;
  deadline: string;
  description: string;
  filename: string;
}

const mockTrialTasks: TrialTask[] = [
  {
    id: '1',
    studentName: 'A.Amr',
    subject: 'Data Structures',
    deadline: '25 March 2026',
    description: 'Need help understanding linked lists and basic implementation. Specifically focusing on doubly linked lists and memory management in C++.',
    filename: 'trial_task_data_structures.pdf',
  },
  {
    id: '2',
    studentName: 'S.Ahmed',
    subject: 'Software Architecture',
    deadline: '28 March 2026',
    description: 'Reviewing microservices architecture patterns and event-driven systems. Need a deep dive into Kafka versus RabbitMQ implementations.',
    filename: 'architecture_review_draft.pdf',
  },
  {
    id: '3',
    studentName: 'O.Mohamed',
    subject: 'Linear Algebra',
    deadline: '02 April 2026',
    description: 'Working through vector spaces and transformation matrices. Submission includes solved problems and a few remaining questions.',
    filename: 'math_problem_set_01.pdf',
  },
];

const TrialTasks: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState<TrialTask | null>(null);

  const handleOpenSubmission = (task: TrialTask) => {
    navigate(`/instructor/trial-submission/${task.id}`, { state: { task } });
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  return (
    <div className="trial-tasks-page">
      <div className="trial-tasks-container">
        {/* Back Button */}
        <Link to="/instructor/tasks" className="trial-back-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </Link>

        {/* Section Header */}
        <div className="trial-header">
          <h1 className="trial-title">Trial Tasks</h1>
          <p className="trial-subtitle">
            Browse student trial requests and review their submissions.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="trial-content-grid">
          {/* Left Column: Tasks List */}
          <div className="trial-tasks-list">
            {mockTrialTasks.map((task) => (
              <div className="trial-card" key={task.id}>
                {/* Header Row */}
                <div className="trial-card-header">
                  <span className="trial-badge">TRIAL REQUEST</span>
                  <div className="trial-deadline">
                    <span className="trial-deadline-label">DEADLINE</span>
                    <span className="trial-deadline-value">{task.deadline}</span>
                  </div>
                </div>

                {/* Student Name */}
                <h2 className="trial-student-name">{task.studentName}</h2>

                {/* Subject Title */}
                <h3 className="trial-subject-title">{task.subject}</h3>

                {/* Description */}
                <p className="trial-description">{task.description}</p>

                {/* Action Bar */}
                <div className="trial-card-footer">
                  <div 
                    className="trial-attachment-chip"
                    onClick={() => handleOpenSubmission(task)}
                    title="Click to preview file"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                    <span>{task.filename}</span>
                  </div>

                  <button 
                    className="trial-view-btn" 
                    onClick={() => handleOpenSubmission(task)}
                  >
                    View Submission
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="trial-sidebar">
            <div className="priority-support-card">
              <h3 className="priority-support-title">Priority Support</h3>
              <p className="priority-support-text">
                Facing issues with a student submission? Our academic coordinators are here to help 24/7.
              </p>
              <Link to="/contact" className="priority-support-link">
                Contact Support &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Detail Modal */}
      {selectedTask && (
        <div className="submission-modal-overlay" onClick={handleCloseModal}>
          <div className="submission-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="trial-badge" style={{ marginBottom: '8px', display: 'inline-block' }}>{selectedTask.subject}</span>
                <h2 className="trial-student-name" style={{ margin: 0 }}>Submission by {selectedTask.studentName}</h2>
              </div>
              <button className="modal-close-btn" onClick={handleCloseModal}>&times;</button>
            </div>

            <div style={{ margin: '1.5rem 0', color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
              <p style={{ fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>Request Details:</p>
              <p style={{ marginTop: 0 }}>{selectedTask.description}</p>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '12px', marginTop: '16px' }}>
                <p style={{ margin: '0 0 8px 0', fontWeight: 600, color: '#0f172a' }}>Attached Document:</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    <span style={{ fontWeight: 500, color: '#0f172a' }}>{selectedTask.filename}</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>PDF &bull; 2.4 MB</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="btn-secondary" style={{ padding: '8px 20px' }} onClick={handleCloseModal}>
                Close
              </button>
              <button 
                className="trial-view-btn" 
                onClick={() => {
                  alert(`Accepting task from ${selectedTask.studentName}...`);
                  handleCloseModal();
                }}
              >
                Accept & Start Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrialTasks;
