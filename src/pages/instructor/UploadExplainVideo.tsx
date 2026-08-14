import React, { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useInstructor } from '../../context/InstructorContext';
import './UploadExplainVideo.css';

interface AttachedMaterial {
  id: string;
  name: string;
}

interface ChatMessage {
  id: number;
  sender: 'instructor' | 'student';
  text: string;
  time: string;
}

interface ExplainTask {
  id: string;
  initials: string;
  studentName: string;
  postedTime: string;
  title: string;
  materials: AttachedMaterial[];
  deadline: string;
  budget: string;
}

const UploadExplainVideo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Fallback data in case user navigates directly without state
  const task: ExplainTask = location.state?.task || {
    id: '1',
    initials: 'OM',
    studentName: 'O.Mohamed',
    postedTime: 'Posted 2h ago',
    title: 'Need explanation for recursion and trees.',
    materials: [
      { id: 'm1', name: 'PDF 1' },
      { id: 'm2', name: 'PDF 2' },
      { id: 'm3', name: 'PDF 3' },
      { id: 'm4', name: 'PDF 4' },
      { id: 'm5', name: 'PDF 5' },
      { id: 'm6', name: 'PDF 6' },
      { id: 'm7', name: 'PDF 7' },
    ],
    deadline: '30 March 2026',
    budget: '600 EGP',
  };

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [lessonName, setLessonName] = useState('');
  
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  const handleSend = () => {
    if (!chatInput.trim()) return;
    const msg: ChatMessage = {
      id: Date.now(),
      sender: 'instructor',
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages((prev) => [...prev, msg]);
    setChatInput('');
  };

  const { deliverProject } = useInstructor();

  const handleConfirm = () => {
    if (!videoFile) {
      alert("Please upload a video before confirming.");
      return;
    }
    deliverProject(task.id, {
      videoName: videoFile.name,
      projectName: lessonName || task.title,
    });
    navigate('/instructor/project-delivered', { state: { assignment: task } });
  };

  return (
    <div className="uev-page">
      <div className="uev-container">

        {/* Back */}
        <Link to="/instructor/explain-project" className="uev-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </Link>

        {/* Page Header */}
        <div className="uev-header">
          <h1 className="uev-title">Explain project</h1>
          <p className="uev-subtitle">Upload student explain video and confirm.</p>
        </div>

        {/* Task Summary Card */}
        <div className="uev-task-card">
          <div className="uev-user-row">
            <div className="uev-avatar">{task.initials}</div>
            <div className="uev-user-meta">
              <span className="uev-user-name">{task.studentName}</span>
              <span className="uev-user-time">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {task.postedTime}
              </span>
            </div>
          </div>

          <h2 className="uev-task-title">{task.title}</h2>

          <div className="uev-materials-section">
            <span className="uev-materials-label">ATTACHED MATERIALS</span>
            <div className="uev-materials-list">
              {task.materials.map(mat => (
                <div className="uev-mat-pill" key={mat.id}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  {mat.name}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="uev-dl-icon">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </div>
              ))}
            </div>
          </div>

          <div className="uev-deadline">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Deadline: {task.deadline}
          </div>
        </div>

        {/* Upload Area */}
        <div className="uev-upload-grid">
          {/* Dark Upload Box */}
          <div className="uev-upload-box-dark">
            <input
              type="file" accept="video/*" style={{ display: 'none' }}
              ref={videoInputRef}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) setVideoFile(f); }}
            />
            <div className="uev-upload-icon-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            
            {videoFile ? (
              <p className="uev-upload-title" style={{ color: '#38bdf8' }}>✓ {videoFile.name}</p>
            ) : (
              <>
                <p className="uev-upload-title">Drag & Drop explantion Video of assignment</p>
                <p className="uev-upload-sub">MP4 or MOV files supported (Max 500MB)</p>
              </>
            )}

            <input 
              type="text" 
              className="uev-lesson-input" 
              placeholder="e.g....enter the name of lesson" 
              value={lessonName}
              onChange={(e) => setLessonName(e.target.value)}
            />

            <button className="uev-browse-btn" onClick={() => videoInputRef.current?.click()}>
              Browse Files
            </button>
          </div>

          {/* Light Add Lesson Box */}
          <div className="uev-upload-box-light">
            <div className="uev-add-icon-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
            </div>
            <button className="uev-add-lesson-btn">
              Add lesson
            </button>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="uev-confirm-wrapper">
          <button className="uev-confirm-btn" onClick={handleConfirm}>
            confirm
          </button>
        </div>

        {/* Chat Section */}
        <div className="uev-chat">
          <div className="uev-chat-header">Chat</div>
          <div className="uev-chat-body">
            {chatMessages.length === 0 ? (
               <div className="uev-chat-empty"></div>
            ) : null}
            {chatMessages.map((msg, idx) => (
              <React.Fragment key={msg.id}>
                {idx === 0 && (
                  <div className="uev-chat-divider">ENCRYPTED CHAT SESSION STARTED</div>
                )}
                <div className={`uev-msg-wrap ${msg.sender === 'instructor' ? 'uev-msg-right' : 'uev-msg-left'}`}>
                  <div className={`uev-bubble ${msg.sender === 'instructor' ? 'uev-bubble-dark' : 'uev-bubble-light'}`}>
                    {msg.text}
                  </div>
                  <span className="uev-msg-time">{msg.time}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="uev-chat-input-row">
            <button className="uev-emoji-btn" title="Emoji">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </button>
            <input
              className="uev-chat-input"
              type="text"
              placeholder="Type a message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
            />
            <button className="uev-send-btn" onClick={handleSend}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UploadExplainVideo;
