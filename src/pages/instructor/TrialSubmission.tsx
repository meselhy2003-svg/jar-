import React, { useState, useRef } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useInstructor } from '../../context/InstructorContext';
import './TrialSubmission.css';

interface TrialTask {
  id: string;
  studentName: string;
  subject: string;
  deadline: string;
  description: string;
  filename: string;
}

// Fallback data mapping if accessed directly via URL
const mockTasksMap: Record<string, TrialTask> = {
  '1': {
    id: '1',
    studentName: 'A.Amr',
    subject: 'Data Structures',
    deadline: '25 March 2026',
    description: 'Need help understanding linked lists and implementation.',
    filename: 'trial_task.pdf',
  },
  '2': {
    id: '2',
    studentName: 'S.Ahmed',
    subject: 'Software Architecture',
    deadline: '28 March 2026',
    description: 'Reviewing microservices architecture patterns and event-driven systems. Need a deep dive into Kafka versus RabbitMQ implementations.',
    filename: 'architecture_review_draft.pdf',
  },
  '3': {
    id: '3',
    studentName: 'O.Mohamed',
    subject: 'Linear Algebra',
    deadline: '02 April 2026',
    description: 'Working through vector spaces and transformation matrices. Submission includes solved problems and a few remaining questions.',
    filename: 'math_problem_set_01.pdf',
  },
};

const TrialSubmission: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Retrieve task from router state or fallback to lookup by id
  const passedTask = location.state?.task as TrialTask | undefined;
  const task: TrialTask = passedTask || (id && mockTasksMap[id]) || mockTasksMap['1'];
  const fromLive = location.state?.fromLive as boolean | undefined;

  // State for video upload
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFilePreviewModal, setShowFilePreviewModal] = useState(false);
  const [submitSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedVideo(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedVideo(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const { submitNewOffer } = useInstructor();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVideo) {
      alert('Please select or drag & drop a trial video before submitting.');
      return;
    }
    setIsSubmitting(true);
    submitNewOffer({
      category: fromLive ? 'explain-live' : 'trial',
      studentName: task.studentName,
      subject: task.subject,
      description: task.description,
      deadline: task.deadline,
      filename: task.filename,
    });
    setTimeout(() => {
      setIsSubmitting(false);
      navigate(fromLive ? '/instructor/live-trial-success' : '/instructor/trial-success');
    }, 600);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([`Sample document content for ${task.filename}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = task.filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="trial-submission-page">
      <div className="trial-submission-container">
        {/* Back Link */}
        <Link to="/instructor/trial-tasks" className="submission-back-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </Link>

        {/* Header */}
        <div className="submission-header">
          <h1 className="submission-title">Trial Submission</h1>
          <p className="submission-subtitle">
            Review task requirements and upload your evaluation video.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="submission-grid">
          {/* Left Column */}
          <div className="submission-left-col">
            {/* Student Information Card */}
            <div className="student-info-card">
              <h2 className="card-section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Student Information
              </h2>

              <div className="info-two-col">
                <div className="info-group">
                  <span className="info-label">STUDENT NAME</span>
                  <p className="info-value-bold">{task.studentName}</p>
                </div>
                <div className="info-group">
                  <span className="info-label">SUBJECT</span>
                  <p className="info-value-bold">{task.subject}</p>
                </div>
              </div>

              <div className="info-description-box">
                <span className="info-label">DESCRIPTION</span>
                <p className="info-description-text">"{task.description}"</p>
              </div>

              <div className="info-deadline-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>Deadline: {task.deadline}</span>
              </div>
            </div>

            {/* Resources Box */}
            <div className="resources-box">
              <h2 className="card-section-title" style={{ marginBottom: '1.25rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                Resources
              </h2>

              <div className="resource-file-card">
                <div className="file-info-left">
                  <div className="pdf-icon-wrapper">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                  </div>
                  <div className="file-details">
                    <h4 className="file-name">{task.filename}</h4>
                    <span className="file-meta">PDF DOCUMENT &bull; 2.4 MB</span>
                  </div>
                </div>

                <div className="file-actions-right">
                  <button className="btn-view-file" onClick={() => setShowFilePreviewModal(true)}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    View File
                  </button>

                  <button className="btn-download-file" onClick={handleDownload}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Upload Trial Video */}
          <div className="submission-right-col">
            <div className="upload-video-card">
              <h3 className="upload-card-title">Upload Trial Video</h3>
              <p className="upload-card-subtitle">
                Please provide a 5-minute explanation video.
              </p>

              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="video/mp4,video/mov,video/*"
                style={{ display: 'none' }} 
              />

              <div 
                className="dropzone-area"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={handleBrowseClick}
              >
                <div className="video-clapper-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2.18" ry="2.18"></rect>
                    <line x1="7" y1="4" x2="7" y2="20"></line>
                    <line x1="17" y1="4" x2="17" y2="20"></line>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <line x1="2" y1="7" x2="7" y2="7"></line>
                    <line x1="2" y1="17" x2="7" y2="17"></line>
                    <line x1="17" y1="17" x2="22" y2="17"></line>
                    <line x1="17" y1="7" x2="22" y2="7"></line>
                  </svg>
                </div>
                <h4 className="dropzone-title">Drag & Drop Trial Video</h4>
                <p className="dropzone-subtext">
                  MP4 or MOV files supported (Max 500MB)
                </p>

                <button 
                  type="button" 
                  className="btn-browse-files"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBrowseClick();
                  }}
                >
                  Browse Files
                </button>

                {selectedVideo && (
                  <div className="file-selected-box" onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#15803d' }}>
                        {selectedVideo.name}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {(selectedVideo.size / (1024 * 1024)).toFixed(1)} MB
                    </span>
                  </div>
                )}
              </div>

              {/* Notice Banner */}
              <div className="submission-notice">
                <div className="notice-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </div>
                <p className="notice-text">
                  Ensure your audio is clear and the implementation of {task.subject.toLowerCase()} is explained effectively as per the student's request.
                </p>
              </div>

              {/* Submit Button */}
              <button 
                className="btn-submit-trial" 
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Trial'}
                {!isSubmitting && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* File Preview Modal */}
      {showFilePreviewModal && (
        <div className="submission-modal-overlay" onClick={() => setShowFilePreviewModal(false)}>
          <div className="submission-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div className="modal-header">
              <div>
                <span className="trial-badge" style={{ marginBottom: '8px', display: 'inline-block' }}>Document Preview</span>
                <h2 className="trial-student-name" style={{ margin: 0 }}>{task.filename}</h2>
              </div>
              <button className="modal-close-btn" onClick={() => setShowFilePreviewModal(false)}>&times;</button>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', margin: '20px 0', minHeight: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="1.5" style={{ marginBottom: '12px' }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              <h4 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>{task.filename}</h4>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', textAlign: 'center' }}>
                Student: <strong>{task.studentName}</strong> &bull; Subject: <strong>{task.subject}</strong>
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="btn-secondary" onClick={() => setShowFilePreviewModal(false)}>Close</button>
              <button className="btn-download-file" onClick={handleDownload}>Download PDF</button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {submitSuccess && (
        <div className="submission-modal-overlay">
          <div className="submission-modal" style={{ textAlign: 'center', maxWidth: '440px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0' }}>
              Trial Video Submitted!
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', margin: '0 0 1.5rem 0' }}>
              Your trial video for <strong>{task.studentName}</strong> has been uploaded successfully.
            </p>
            <button 
              className="trial-view-btn" 
              style={{ width: '100%', padding: '12px' }}
              onClick={() => navigate('/instructor/trial-tasks')}
            >
              Return to Trial Tasks
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrialSubmission;
