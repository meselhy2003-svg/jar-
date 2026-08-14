import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInstructor } from '../../context/InstructorContext';
import './AssignmentProject.css';

interface ChatMessage {
  id: number;
  sender: 'instructor' | 'student';
  text: string;
  time: string;
}

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

const AssignmentProject: React.FC = () => {
  const navigate = useNavigate();
  const [videoFiles, setVideoFiles] = useState<Record<string, File | null>>({});
  const [projectFiles, setProjectFiles] = useState<Record<string, File | null>>({});
  const [chatInputs, setChatInputs] = useState<Record<string, string>>({});
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>(
    Object.fromEntries(mockAssignments.map((a) => [a.id, []]))
  );
  const [previewFile, setPreviewFile] = useState<AssignmentTask | null>(null);

  const videoInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const projectInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleVideoSelect = (id: string, file: File) =>
    setVideoFiles((p) => ({ ...p, [id]: file }));

  const handleProjectSelect = (id: string, file: File) =>
    setProjectFiles((p) => ({ ...p, [id]: file }));

  const handleSend = (id: string) => {
    const text = chatInputs[id]?.trim();
    if (!text) return;
    const msg: ChatMessage = {
      id: Date.now(),
      sender: 'instructor',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages((p) => ({ ...p, [id]: [...(p[id] || []), msg] }));
    setChatInputs((p) => ({ ...p, [id]: '' }));
  };

  const { deliverProject } = useInstructor();

  const handleConfirm = (task: AssignmentTask) => {
    if (!videoFiles[task.id] && !projectFiles[task.id]) {
      alert('Please upload either an explanation video or a project file before confirming.');
      return;
    }
    deliverProject(task.id, {
      videoName: videoFiles[task.id]?.name,
      projectName: projectFiles[task.id]?.name,
    });
    navigate('/instructor/project-delivered', { state: { assignment: task } });
  };

  const handleDownload = (filename: string) => {
    const el = document.createElement('a');
    el.href = URL.createObjectURL(new Blob([`Content of ${filename}`], { type: 'text/plain' }));
    el.download = filename;
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
  };

  return (
    <div className="aproj-page">
      <div className="aproj-container">

        {/* Back */}
        <Link to="/instructor/projects" className="aproj-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </Link>

        {/* Page Header */}
        <div className="aproj-header">
          <h1 className="aproj-title">Assignment project</h1>
          <p className="aproj-subtitle">Upload student assignments and confirm.</p>
        </div>

        {/* Assignment Cards */}
        {mockAssignments.map((task) => (
          <div className="aproj-card" key={task.id}>

            {/* ── Student Info Row ── */}
            <div className="aproj-student-row">
              <div className="aproj-avatar">{task.initials}</div>
              <div className="aproj-student-meta">
                <span className="aproj-student-name">{task.studentName}</span>
                <span className="aproj-student-role">Student</span>
              </div>
              <span className="aproj-badge">ASSIGNMENT</span>
            </div>

            {/* ── Subject + Budget ── */}
            <div className="aproj-subject-budget">
              <div className="aproj-subject-col">
                <span className="aproj-label">SUBJECT</span>
                <h2 className="aproj-subject">{task.subject}</h2>
                <p className="aproj-description">{task.description}</p>
              </div>
              <div className="aproj-budget-col">
                <span className="aproj-label">Project Budget</span>
                <span className="aproj-budget">{task.budget}</span>
                <div className="aproj-deadline">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Deadline: {task.deadline}
                </div>
              </div>
            </div>

            {/* ── File Chip ── */}
            <div className="aproj-file-chip">
              <div className="aproj-file-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <div>
                <p className="aproj-file-name">{task.filename}</p>
                <p className="aproj-file-meta">{task.fileMeta}</p>
              </div>
              <div className="aproj-file-btns">
                <button className="aproj-icon-btn" onClick={() => setPreviewFile(task)} title="View">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
                <button className="aproj-icon-btn" onClick={() => handleDownload(task.filename)} title="Download">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
              </div>
            </div>

            {/* ── Upload Row ── */}
            <div className="aproj-upload-row">

              {/* Video upload (white card) */}
              <div
                className="aproj-upload-video"
                onClick={() => videoInputRefs.current[task.id]?.click()}
                onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleVideoSelect(task.id, f); }}
                onDragOver={(e) => e.preventDefault()}
              >
                <input
                  type="file" accept="video/*" style={{ display: 'none' }}
                  ref={(el) => { videoInputRefs.current[task.id] = el; }}
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleVideoSelect(task.id, f); }}
                />
                <div className="aproj-video-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
                {videoFiles[task.id] ? (
                  <p className="aproj-upload-title" style={{ color: '#16a34a' }}>✓ {videoFiles[task.id]!.name}</p>
                ) : (
                  <>
                    <p className="aproj-upload-title">Drag & Drop explantion Video of assignment</p>
                    <p className="aproj-upload-sub">MP4 or MOV files supported (Max 500MB)</p>
                  </>
                )}
                <button
                  type="button" className="aproj-browse-btn"
                  onClick={(e) => { e.stopPropagation(); videoInputRefs.current[task.id]?.click(); }}
                >
                  Browse Files
                </button>
              </div>

              {/* Project file upload (dark card) */}
              <div
                className="aproj-upload-project"
                onClick={() => projectInputRefs.current[task.id]?.click()}
                onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleProjectSelect(task.id, f); }}
                onDragOver={(e) => e.preventDefault()}
              >
                <input
                  type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.zip"
                  style={{ display: 'none' }}
                  ref={(el) => { projectInputRefs.current[task.id] = el; }}
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleProjectSelect(task.id, f); }}
                />
                <div className="aproj-project-arrow">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>
                </div>
                {projectFiles[task.id] ? (
                  <p className="aproj-project-title" style={{ color: '#38bdf8' }}>✓ {projectFiles[task.id]!.name}</p>
                ) : (
                  <>
                    <p className="aproj-project-title">Drag & Drop your project file here</p>
                    <p className="aproj-project-sub">SUPPORTED: PDF, DOC, PPT, IMAGES, ZIP</p>
                  </>
                )}
                <button
                  type="button" className="aproj-select-btn"
                  onClick={(e) => { e.stopPropagation(); projectInputRefs.current[task.id]?.click(); }}
                >
                  Select File
                </button>
              </div>
            </div>

            {/* ── Chat ── */}
            <div className="aproj-chat">
              <div className="aproj-chat-header">Chat</div>
              <div className="aproj-chat-body">
                {chatMessages[task.id]?.map((msg, idx) => (
                  <React.Fragment key={msg.id}>
                    {idx === 2 && (
                      <div className="aproj-chat-divider">ENCRYPTED CHAT SESSION STARTED</div>
                    )}
                    <div className={`aproj-msg-wrap ${msg.sender === 'instructor' ? 'aproj-msg-right' : 'aproj-msg-left'}`}>
                      <div className={`aproj-bubble ${msg.sender === 'instructor' ? 'aproj-bubble-dark' : 'aproj-bubble-light'}`}>
                        {msg.text}
                      </div>
                      <span className="aproj-msg-time">{msg.time}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <div className="aproj-chat-input-row">
                <button className="aproj-emoji-btn" title="Emoji">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                </button>
                <input
                  className="aproj-chat-input"
                  type="text"
                  placeholder="Type a message..."
                  value={chatInputs[task.id] || ''}
                  onChange={(e) => setChatInputs((p) => ({ ...p, [task.id]: e.target.value }))}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSend(task.id); }}
                />
                <button className="aproj-send-btn" onClick={() => handleSend(task.id)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </div>

            {/* ── Confirm ── */}
            <div className="aproj-confirm-row">
              <button className="aproj-confirm-btn" onClick={() => handleConfirm(task)}>
                CONFIRM
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* File Preview Modal */}
      {previewFile && (
        <div className="aproj-modal-overlay" onClick={() => setPreviewFile(null)}>
          <div className="aproj-modal" onClick={(e) => e.stopPropagation()}>
            <div className="aproj-modal-top">
              <h3>{previewFile.filename}</h3>
              <button onClick={() => setPreviewFile(null)}>✕</button>
            </div>
            <div className="aproj-modal-body">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              <p>{previewFile.studentName} · {previewFile.subject}</p>
              <span>{previewFile.fileMeta}</span>
            </div>
            <div className="aproj-modal-footer">
              <button className="aproj-modal-cancel" onClick={() => setPreviewFile(null)}>Close</button>
              <button className="aproj-modal-dl" onClick={() => handleDownload(previewFile.filename)}>Download</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentProject;
