import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AssignmentTasks.css';

interface AssignmentTask {
  id: string;
  initials: string;
  studentName: string;
  subject: string;
  description: string;
  budget: string;
  deadline: string;
  filename: string;
  fileMeta: string;
}

const mockAssignments: AssignmentTask[] = [
  {
    id: '1',
    initials: 'OM',
    studentName: 'O.Mohamed',
    subject: 'Database Systems',
    description: 'Need help completing SQL queries and normalization tasks for a university project.',
    budget: '600 EGP',
    deadline: '28 March 2026',
    filename: 'assignment.pdf',
    fileMeta: 'PDF Document • 2.4 MB',
  },
  {
    id: '2',
    initials: 'AA',
    studentName: 'A.Amr',
    subject: 'Operating Systems',
    description: 'Solving shell scripting problems and process scheduling algorithms implementation.',
    budget: '400 EGP',
    deadline: '02 April 2026',
    filename: 'instructions_os.pdf',
    fileMeta: 'PDF Document • 1.1 MB',
  },
  {
    id: '3',
    initials: 'SA',
    studentName: 'S.Ahmed',
    subject: 'Data Structures',
    description: 'Implementation of balanced binary search trees and complex graph traversal algorithms.',
    budget: '750 EGP',
    deadline: '15 April 2026',
    filename: 'project_spec.pdf',
    fileMeta: 'PDF Document • 3.7 MB',
  },
];

const AssignmentTasks: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentTask | null>(null);
  const [previewFile, setPreviewFile] = useState<AssignmentTask | null>(null);
  const [confirmedIds, setConfirmedIds] = useState<string[]>([]);

  const handleConfirmClick = (task: AssignmentTask) => {
    setSelectedAssignment(task);
  };

  const handleFinalConfirm = () => {
    if (selectedAssignment) {
      setConfirmedIds((prev) => [...prev, selectedAssignment.id]);
      setSelectedAssignment(null);
      navigate('/instructor/assignment-confirmed', {
        state: {
          assignment: selectedAssignment,
        },
      });
    }
  };

  const handleDownload = (filename: string) => {
    const element = document.createElement('a');
    const file = new Blob([`Sample document content for ${filename}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="assignment-tasks-page">
      <div className="assignment-tasks-container">
        {/* Back Link */}
        <Link to="/instructor/tasks" className="assignment-back-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </Link>

        {/* Section Header */}
        <div className="assignment-header">
          <h1 className="assignment-title">Assignment Tasks</h1>
          <p className="assignment-subtitle">
            Browse student assignments and submit your offer.
          </p>
        </div>

        {/* Cards Stack */}
        <div className="assignment-cards-stack">
          {mockAssignments.map((task) => {
            const isConfirmed = confirmedIds.includes(task.id);

            return (
              <div className="assignment-card" key={task.id}>
                {/* Top Row: Avatar Initials & Badge */}
                <div className="assignment-card-top">
                  <div className="student-profile-group">
                    <div className="student-avatar-circle">
                      {task.initials}
                    </div>
                    <div className="student-name-meta">
                      <h3 className="student-name-text">{task.studentName}</h3>
                      <span className="student-role-sub">Student</span>
                    </div>
                  </div>
                  <span className="assignment-badge">ASSIGNMENT</span>
                </div>

                {/* Subject & Budget Row */}
                <div className="assignment-subject-row">
                  <div className="subject-details">
                    <span className="subject-label">SUBJECT</span>
                    <h2 className="subject-title-text">{task.subject}</h2>
                  </div>

                  <div className="budget-deadline-group">
                    <span className="budget-label">Project Budget</span>
                    <span className="budget-amount">{task.budget}</span>
                    <div className="deadline-pill-badge">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>Deadline: {task.deadline}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="assignment-description-text">{task.description}</p>

                {/* Footer Action Bar */}
                <div className="assignment-card-footer">
                  {/* File Attachment Chip */}
                  <div className="resource-chip-box">
                    <div className="pdf-icon-mini">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                    </div>
                    <div className="chip-file-meta">
                      <h4 className="chip-file-name">{task.filename}</h4>
                      <span className="chip-file-sub">{task.fileMeta}</span>
                    </div>
                    <div className="chip-actions">
                      <button 
                        className="chip-icon-btn" 
                        title="View File"
                        onClick={() => setPreviewFile(task)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </button>
                      <button 
                        className="chip-icon-btn" 
                        title="Download File"
                        onClick={() => handleDownload(task.filename)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Confirm Button */}
                  <button 
                    className="btn-confirm-assignment"
                    style={{ backgroundColor: isConfirmed ? '#16a34a' : '#101928' }}
                    onClick={() => handleConfirmClick(task)}
                  >
                    {isConfirmed ? 'OFFER SUBMITTED ✓' : 'CONFIRM'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirmation Modal */}
      {selectedAssignment && (
        <div className="submission-modal-overlay" onClick={() => setSelectedAssignment(null)}>
          <div className="submission-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <div>
                <span className="assignment-badge" style={{ marginBottom: '8px', display: 'inline-block' }}>{selectedAssignment.subject}</span>
                <h2 className="trial-student-name" style={{ margin: 0 }}>Confirm Offer Submission</h2>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedAssignment(null)}>&times;</button>
            </div>

            <div style={{ margin: '1.25rem 0', color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
              <p>Are you sure you want to submit your offer of <strong>{selectedAssignment.budget}</strong> for <strong>{selectedAssignment.studentName}</strong>'s task?</p>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '10px', marginTop: '12px' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>TASK SUMMARY</span>
                <p style={{ margin: '4px 0 0 0', fontWeight: 600, color: '#0f172a' }}>{selectedAssignment.description}</p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="btn-secondary" style={{ padding: '10px 20px' }} onClick={() => setSelectedAssignment(null)}>
                Cancel
              </button>
              <button className="btn-confirm-assignment" onClick={handleFinalConfirm}>
                Submit Offer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File Preview Modal */}
      {previewFile && (
        <div className="submission-modal-overlay" onClick={() => setPreviewFile(null)}>
          <div className="submission-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px' }}>
            <div className="modal-header">
              <div>
                <span className="assignment-badge" style={{ marginBottom: '8px', display: 'inline-block' }}>{previewFile.subject}</span>
                <h2 className="trial-student-name" style={{ margin: 0 }}>{previewFile.filename}</h2>
              </div>
              <button className="modal-close-btn" onClick={() => setPreviewFile(null)}>&times;</button>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', margin: '20px 0', textAlign: 'center' }}>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="1.8" style={{ marginBottom: '10px' }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              <h4 style={{ margin: '0 0 6px 0', color: '#0f172a' }}>{previewFile.filename}</h4>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>{previewFile.fileMeta}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="btn-secondary" onClick={() => setPreviewFile(null)}>Close</button>
              <button className="btn-download-file" onClick={() => handleDownload(previewFile.filename)}>Download File</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentTasks;
