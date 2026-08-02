import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CourseDetail.css';

interface Message {
  id: string;
  sender: 'instructor' | 'you';
  text: string;
}

const CourseDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Dynamic Course Name based on param
  const courseTitle = id?.includes('physics') 
    ? 'Physics - Quantum Mechanics'
    : id?.includes('java')
    ? 'Java Programming - Core Fundamentals'
    : id?.includes('ds')
    ? 'Data Structures - Algorithms'
    : 'Mathematics - Calculus Basics';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'instructor',
      text: 'Hello! How did you find the Lesson 1 concepts?'
    },
    {
      id: '2',
      sender: 'you',
      text: 'Yes, the vectors section made sense after watching the live explanation.'
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activeLessonId, setActiveLessonId] = useState(2);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'you',
      text: inputText.trim()
    };
    setMessages([...messages, newMsg]);
    setInputText('');
  };

  return (
    <div className="course-detail-page container animate-fade-in">
      {/* Navigation Breadcrumb */}
      <div className="course-breadcrumb-nav">
        <button onClick={() => navigate('/courses')} className="back-link-btn">
          &larr; Back
        </button>
        <span className="breadcrumb-path">
          Courses &gt; {courseTitle}
        </span>
      </div>

      <h1 className="course-detail-title">{courseTitle}</h1>

      <div className="course-detail-grid">
        {/* Left Column: Live Video + Chat + Confirmation Banner */}
        <div className="course-main-column">
          {/* Live Video Classroom Card */}
          <div className="video-classroom-card">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop" 
              alt="Instructor Live Feed" 
              className="main-instructor-video"
            />

            {/* Student PIP Overlay */}
            <div className="student-pip-overlay">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop" 
                alt="You (Live)" 
              />
              <span className="pip-label">You (Live)</span>
            </div>

            {/* Bottom Call Controls Bar */}
            <div className="video-controls-bar">
              <button 
                className={`control-btn ${isMuted ? 'active-off' : ''}`}
                onClick={() => setIsMuted(!isMuted)}
                title="Mute/Unmute"
              >
                {isMuted ? '🔇' : '🎤'}
              </button>

              <button className="control-btn end-call-btn" title="End Call">
                📞
              </button>

              <button 
                className={`control-btn ${isVideoOff ? 'active-off' : ''}`}
                onClick={() => setIsVideoOff(!isVideoOff)}
                title="Camera On/Off"
              >
                {isVideoOff ? '🚫' : '📹'}
              </button>
            </div>
          </div>

          {/* Live Chat Box */}
          <div className="chat-box-container card">
            <h2 className="chat-box-title">Chat</h2>

            <div className="chat-messages-list">
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-message-row ${msg.sender}`}>
                  <div className="msg-bubble">
                    <span className="sender-tag">
                      {msg.sender === 'instructor' ? 'Instructor:' : 'You:'}
                    </span>
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="chat-input-row">
              <input 
                type="text" 
                placeholder="Type a message ..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage} className="btn-primary send-msg-btn">
                Send
              </button>
            </div>
          </div>

          {/* Session Confirmation Banner */}
          <div className="session-confirmation-dark-banner">
            <h2>Confirmation of the session</h2>
            <p>
              Your attendance and interaction in this session have been recorded. You can access the full video recording and notes anytime.
            </p>
            <button className="btn-primary confirm-session-btn">
              Confirm & Complete Session
            </button>
          </div>
        </div>

        {/* Right Column: Curriculum & Course Content Sidebar */}
        <div className="course-sidebar-column">
          <div className="curriculum-sidebar-card card">
            <div className="curriculum-header-row">
              <h2>Course Content</h2>
              <span className="progress-percent">25%</span>
            </div>

            <div className="sidebar-progress-bar">
              <div className="sidebar-progress-fill" style={{ width: '25%' }}></div>
            </div>

            <span className="curriculum-sub-label">CURRICULUM</span>

            <div className="lessons-list">
              {/* Lesson 1 */}
              <div 
                className={`lesson-item ${activeLessonId === 1 ? 'active' : 'completed'}`}
                onClick={() => setActiveLessonId(1)}
              >
                <div className="lesson-item-left">
                  <span className="lesson-icon check-green">✓</span>
                  <div>
                    <strong>Lesson 1 - Introduction</strong>
                    <span className="lesson-duration">Duration &bull; 15 Mins 12 Sec</span>
                  </div>
                </div>
              </div>

              {/* Lesson 2 (Active) */}
              <div 
                className={`lesson-item ${activeLessonId === 2 ? 'active' : ''}`}
                onClick={() => setActiveLessonId(2)}
              >
                <div className="lesson-item-left">
                  <span className="lesson-icon play-cyan">▶</span>
                  <div>
                    <strong>Lesson 2 - Basic Concepts</strong>
                    <span className="lesson-status-cyan">ACTIVE &bull; EXPLANATION LIVE</span>
                  </div>
                </div>
              </div>

              {/* Lesson 3 */}
              <div 
                className={`lesson-item ${activeLessonId === 3 ? 'active' : 'locked'}`}
                onClick={() => setActiveLessonId(3)}
              >
                <div className="lesson-item-left">
                  <span className="lesson-icon lock-icon">🔒</span>
                  <div>
                    <strong>Lesson 3 - Practice Concepts</strong>
                    <span className="lesson-duration">20 Mins</span>
                  </div>
                </div>
              </div>

              {/* Lesson 4 */}
              <div 
                className={`lesson-item ${activeLessonId === 4 ? 'active' : 'locked'}`}
                onClick={() => setActiveLessonId(4)}
              >
                <div className="lesson-item-left">
                  <span className="lesson-icon lock-icon">🔒</span>
                  <div>
                    <strong>Lesson 4 - Advanced Topics</strong>
                    <span className="lesson-duration">30 Mins</span>
                  </div>
                </div>
              </div>

              {/* Lesson 5 */}
              <div 
                className={`lesson-item ${activeLessonId === 5 ? 'active' : 'locked'}`}
                onClick={() => setActiveLessonId(5)}
              >
                <div className="lesson-item-left">
                  <span className="lesson-icon lock-icon">🔒</span>
                  <div>
                    <strong>Lesson 5 - Online Exam</strong>
                    <span className="lesson-duration">45 Mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
