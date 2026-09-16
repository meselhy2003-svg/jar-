import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ExplainTasks.css';

type ExplainTaskType = 'video' | 'live';

type AttachmentItem = {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  downloadUrl: string;
  previewUrl: string;
};

type ExplainTask = {
  id: string;
  type: ExplainTaskType;
  studentName: string;
  postedAt: string;
  title: string;
  attachments: AttachmentItem[];
  deadline: string;
  estimatedHours: number;
  hourlyRate: number;
};

const mockFileBasePath = '/mock-files';

const buildMockAttachment = (
  id: string,
  fileName: string,
  fileSize: number,
  fileType: string
): AttachmentItem => {
  const normalizedPath = `${mockFileBasePath}/${fileName}`;

  return {
    id,
    fileName,
    fileSize,
    fileType,
    downloadUrl: normalizedPath,
    previewUrl: normalizedPath,
  };
};

const mockTasks: ExplainTask[] = [
  {
    id: 'video-1',
    type: 'video',
    studentName: 'A.Amr',
    postedAt: 'Posted 2 hours ago',
    title: 'Explain linked lists and recursion in C++',
    attachments: [
      buildMockAttachment('att-1', 'assignment_pdf.pdf', 156000, 'pdf'),
      buildMockAttachment('att-2', 'concept_notes.pdf', 92000, 'pdf'),
      buildMockAttachment('att-3', 'chapter_04.pdf', 138000, 'pdf'),
      buildMockAttachment('att-4', 'revision_summary.pdf', 103000, 'pdf'),
    ],
    deadline: '25 March 2026',
    estimatedHours: 4,
    hourlyRate: 150,
  },
  {
    id: 'video-2',
    type: 'video',
    studentName: 'S.Hassan',
    postedAt: 'Posted 4 hours ago',
    title: 'Explain arrays, hashing, and collision handling',
    attachments: [
      buildMockAttachment('att-5', 'data_structure_notes.pdf', 118000, 'pdf'),
      buildMockAttachment('att-6', 'practice_sheet.pdf', 87000, 'pdf'),
    ],
    deadline: '28 March 2026',
    estimatedHours: 3,
    hourlyRate: 150,
  },
  {
    id: 'live-1',
    type: 'live',
    studentName: 'M.Khaled',
    postedAt: 'Posted 6 hours ago',
    title: 'Explain software architecture patterns live',
    attachments: [
      buildMockAttachment('att-7', 'architecture_overview.pdf', 141000, 'pdf'),
      buildMockAttachment('att-8', 'diagram_reference.pdf', 98000, 'pdf'),
      buildMockAttachment('att-9', 'system_walkthrough.pdf', 132000, 'pdf'),
      buildMockAttachment('att-10', 'case_study.pdf', 110000, 'pdf'),
    ],
    deadline: '30 March 2026',
    estimatedHours: 5,
    hourlyRate: 180,
  },
  {
    id: 'live-2',
    type: 'live',
    studentName: 'R.Ali',
    postedAt: 'Posted 8 hours ago',
    title: 'Explain database normalization and indexing',
    attachments: [
      buildMockAttachment('att-11', 'db_revision.pdf', 87000, 'pdf'),
      buildMockAttachment('att-12', 'query_examples.pdf', 96000, 'pdf'),
    ],
    deadline: '02 April 2026',
    estimatedHours: 2,
    hourlyRate: 180,
  },
];

const formatFileSize = (fileSize: number) => {
  if (fileSize >= 1024 * 1024) {
    return `${(fileSize / (1024 * 1024)).toFixed(1)} MB`;
  }

  if (fileSize >= 1024) {
    return `${Math.round(fileSize / 1024)} KB`;
  }

  return `${fileSize} B`;
};

const ExplainTasks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ExplainTaskType>('video');
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({});
  const [taskHours, setTaskHours] = useState<Record<string, number>>(() =>
    mockTasks.reduce<Record<string, number>>((acc, task) => {
      acc[task.id] = task.estimatedHours;
      return acc;
    }, {})
  );

  const navigate = useNavigate();
  const hourlyRate = 200;

  const filteredTasks = useMemo(
    () => mockTasks.filter((task) => task.type === activeTab),
    [activeTab]
  );

  const toggleAttachments = (taskId: string) => {
    setExpandedTasks((current) => ({
      ...current,
      [taskId]: !current[taskId],
    }));
  };

  const updateHours = (taskId: string, value: string) => {
    const nextValue = Number(value);

    setTaskHours((current) => ({
      ...current,
      [taskId]: Number.isNaN(nextValue) ? 0 : nextValue,
    }));
  };

  return (
    <div className="explain-tasks-page">
      <div className="explain-tasks-container">
        <div className="back-btn-container">
          <Link to="/instructor/tasks" className="assignment-back-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back
          </Link>
        </div>

        <div className="explain-tasks-header">
          <h1 className="explain-tasks-title">Explain Tasks</h1>
          <p className="explain-tasks-subtitle">
            Select the explanation format you want to continue with.
          </p>
        </div>

        <div className="explain-tasks-tabs" aria-label="Explanation options">
          <button
            className={`explain-task-tab ${activeTab === 'video' ? 'active' : ''}`}
            type="button"
            aria-pressed={activeTab === 'video'}
            onClick={() => setActiveTab('video')}
          >
            Explanation by video
            <span className="tab-check">✓</span>
            
          </button>
          <button
    className="live-explain-tab"
    onClick={() => navigate("/instructor/live-explain-tasks")}
>
    Explanation by live
</button>
        </div>

        <div className="explain-tasks-content">
          {filteredTasks.map((task) => {
            const totalPrice = taskHours[task.id] * hourlyRate;
            const hasMoreAttachments = task.attachments.length > 3;
            const visibleAttachments = expandedTasks[task.id] || !hasMoreAttachments
              ? task.attachments
              : task.attachments.slice(0, 3);

            return (
              <div className="explain-task-card" key={task.id}>
                <div className="explain-task-left">
                  <div className="explain-task-header-row">
                    <div className="student-avatar-circle">
                      {task.studentName
                        .split('.')
                        .map((part) => part[0])
                        .join('')}
                    </div>
                    <div className="student-meta-block">
                      <h2 className="student-name-text">{task.studentName}</h2>
                      <span className="student-posted-time">{task.postedAt}</span>
                    </div>
                  </div>

                  <div className="explain-task-title-block">
                    <h3 className="explain-task-title">{task.title}</h3>
                  </div>

                  <div className="explain-materials-box">
                    <div className="explain-materials-head">
                      <span>Attached Materials</span>
                    </div>

                    <div className="explain-material-chips">
                      {visibleAttachments.map((attachment) => (
                        <div className="pdf-chip" key={attachment.id}>
                          <div className="pdf-icon-mini">
                            <img src="/pdf-icon.png" alt="PDF" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
                          </div>
                          <span className="chip-text">{attachment.fileName}</span>
                          <span className="chip-meta">{formatFileSize(attachment.fileSize)}</span>

                          <div className="pdf-chip-actions">
                            <a
                              className="pdf-chip-action"
                              href={attachment.previewUrl}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`Preview ${attachment.fileName}`}
                              title="Preview"
                            >
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                            </a>
                            <a
                              className="pdf-chip-action"
                              href={attachment.downloadUrl}
                              download={attachment.fileName}
                              aria-label={`Download ${attachment.fileName}`}
                              title="Download"
                            >
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                              </svg>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>

                    {hasMoreAttachments && (
                      <button className="explain-view-more-link" type="button" onClick={() => toggleAttachments(task.id)}>
                        View More
                      </button>
                    )}
                  </div>

                  <div className="deadline-row">
                    <span className="deadline-label">Deadline</span>
                    <span className="deadline-value">{task.deadline}</span>
                  </div>
                </div>

                <div className="explain-task-right">
                  <div className="proposal-card">
                    <h3 className="proposal-title">Submit Your Proposal</h3>

                    <div className="proposal-field-row">
                      <label className="proposal-label">Estimated Time</label>
                      <div className="proposal-input-wrap">
                        <input
                          className="proposal-input"
                          type="number"
                          min="1"
                          value={taskHours[task.id]}
                          onChange={(event) => updateHours(task.id, event.target.value)}
                        />
                        <span className="proposal-suffix">Hours</span>
                      </div>
                    </div>

                    <div className="proposal-total-box">
                      <div className="proposal-total-row">
                        <span className="proposal-total-label">Total Price</span>
                        <span className="proposal-total-price">{totalPrice} EGP</span>
                      </div>
                      <p className="proposal-rate-text">Rate: {hourlyRate} EGP / hour</p>
                    </div>

                    <button
    className="proposal-confirm-btn"
    type="button"
    onClick={() =>
        navigate("/instructor/offer-confirmed", {
            state: {
                task,
                estimatedHours: taskHours[task.id],
                totalPrice,
                hourlyRate,
                showToast: true,
            },
        })
    }
>
    Confirm Offer
</button>
</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExplainTasks;
