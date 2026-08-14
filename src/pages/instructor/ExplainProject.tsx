import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './ExplainProject.css';

interface AttachedMaterial {
  id: string;
  name: string;
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

const mockExplainTasks: ExplainTask[] = [
  {
    id: '1',
    initials: 'OM',
    studentName: 'O.Mohamed',
    postedTime: 'Posted 2h ago',
    title: 'Need explanation for recursion and trees.',
    materials: [
      { id: 'm1', name: 'PDF 1' },
      { id: 'm2', name: 'PDF 2' },
      { id: 'm3', name: 'PDF 3' },
    ],
    deadline: '30 March 2026',
    budget: '600 EGP',
  },
  {
    id: '2',
    initials: 'AS',
    studentName: 'A.Saeed',
    postedTime: 'Posted 5h ago',
    title: 'Object Oriented Programming (Java) session.',
    materials: [
      { id: 'm4', name: 'PDF 1' },
      { id: 'm5', name: 'PDF 2' },
      { id: 'm6', name: 'PDF 3' },
    ],
    deadline: '2 April 2026',
    budget: '800 EGP',
  },
];

const ExplainProject: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialTab = (location.state as any)?.tab ?? 'video';
  const [activeTab, setActiveTab] = useState<'video' | 'live'>(initialTab);

  const handleUploadVideo = (task: ExplainTask) => {
    navigate('/instructor/upload-explain-video', { state: { task } });
  };

  return (
    <div className="exproj-page">
      <div className="exproj-container">
        
        {/* Back Link */}
        <Link to="/instructor/projects" className="exproj-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </Link>

        {/* Page Header */}
        <div className="exproj-header">
          <h1 className="exproj-title">Explain project</h1>
        </div>

        {/* Tabs */}
        <div className="exproj-tabs-wrapper">
          <div 
            className={`exproj-tab ${activeTab === 'video' ? 'exproj-tab-active' : ''}`}
            onClick={() => setActiveTab('video')}
          >
            Explaintion by video
            {activeTab === 'video' && (
              <div className="exproj-tab-check">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            )}
          </div>
          <div 
            className={`exproj-tab ${activeTab === 'live' ? 'exproj-tab-active' : ''}`}
            onClick={() => setActiveTab('live')}
          >
            Explaintion by live
            {activeTab === 'live' && (
              <div className="exproj-tab-check">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Cards */}
        <div className="exproj-cards">
          {mockExplainTasks.map(task => (
            <div className="exproj-card" key={task.id}>
              
              <div className="exproj-card-main">
                
                {/* Left Column */}
                <div className="exproj-left">
                  <div className="exproj-user-row">
                    <div className="exproj-avatar">{task.initials}</div>
                    <div className="exproj-user-meta">
                      <span className="exproj-user-name">{task.studentName}</span>
                      <span className="exproj-user-time">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        {task.postedTime}
                      </span>
                    </div>
                  </div>

                  <h2 className="exproj-task-title">{task.title}</h2>

                  <div className="exproj-materials-section">
                    <span className="exproj-materials-label">ATTACHED MATERIALS</span>
                    <div className="exproj-materials-list">
                      {task.materials.map(mat => (
                        <div className="exproj-mat-pill" key={mat.id}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                          </svg>
                          {mat.name}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="exproj-dl-icon">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                          </svg>
                        </div>
                      ))}
                      <span className="exproj-view-more">View More</span>
                    </div>
                  </div>

                  <div className="exproj-deadline">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    Deadline: {task.deadline}
                  </div>
                </div>

                {/* Right Column */}
                <div className="exproj-right">
                  <div className="exproj-budget-box">
                    <span className="exproj-budget-label">Project Budget</span>
                    <span className="exproj-budget-val">{task.budget}</span>
                    {activeTab === 'video' ? (
                      <button className="exproj-upload-btn" onClick={() => handleUploadVideo(task)}>
                        upload video <span className="arrow">→</span>
                      </button>
                    ) : (
                      <button className="exproj-upload-btn" onClick={() => navigate('/instructor/live-explain-session', { state: { task } })}>
                        Enter the session <span className="arrow">→</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ExplainProject;
