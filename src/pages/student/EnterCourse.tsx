import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StudentHeader from '../../components/StudentHeader';
import './EnterCourse.css';

const EnterCourse = () => {
  const { courseId } = useParams();
  const [messages, setMessages] = useState([
    { sender: 'tutor', text: 'Hello! How did you find the Lesson 1 concepts?' },
    { sender: 'student', text: 'Yes, the vectors section made sense after watching the live explanation.' },
    { sender: 'tutor', text: 'Great! Let us jump into Lesson 2: Basic Forces.' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([...messages, { sender: 'student', text: newMessage }]);
    setNewMessage('');
  };

  const courseTitle = courseId?.includes('math') ? 'Mathematics - Calculus Basics' : 'Physics - Classical Mechanics';

  return (
    <div className="enter-course-wrapper">
      <StudentHeader />

      <main className="container enter-course-container animate-fade-in">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb-row">
          <Link to="/my-courses" className="back-link">← Back</Link>
          <span className="breadcrumb-path">Courses &gt; {courseTitle}</span>
        </div>

        <h1 className="course-main-title">{courseTitle}</h1>

        <div className="classroom-grid">
          {/* Left Column (Video Stream, Chat Box, Session Confirmation) */}
          <div className="left-classroom-col">
            {/* 1. Video Stream Player */}
            <div className="video-stream-card">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop" 
                alt="Tutor Video Stream" 
                className="tutor-stream-img"
              />
              
              {/* Picture-in-Picture Student Camera Overlay */}
              <div className="pip-student-overlay">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop" 
                  alt="Student PIP Camera" 
                />
                <span className="pip-label">You (Live)</span>
              </div>

              {/* Video Controls Bar */}
              <div className="video-controls-bar">
                <button className="control-circle">🎤</button>
                <button className="control-circle red-end-call">📞</button>
                <button className="control-circle">📹</button>
              </div>
            </div>

            {/* 2. Live Chat Box */}
            <div className="classroom-chat-card card">
              <div className="chat-header">
                <h3>Chat</h3>
              </div>

              <div className="chat-messages-area">
                {messages.map((msg, index) => (
                  <div key={index} className={`chat-bubble-row ${msg.sender}`}>
                    <div className="chat-bubble">
                      <strong>{msg.sender === 'tutor' ? 'Instructor:' : 'You:'}</strong>
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form className="chat-input-form" onSubmit={handleSendMessage}>
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="btn-primary send-chat-btn">Send</button>
              </form>
            </div>

            {/* 3. Confirmation of the session card */}
            <div className="dark-card session-confirm-card">
              <h3>Confirmation of the session</h3>
              <div className="offer-summary-box">
                <h4>Offer Summary</h4>
                <div className="offer-details">
                  <div>
                    <span>Type of Plan:</span>
                    <strong>Hourly Plan</strong>
                  </div>
                  <div>
                    <span>Duration:</span>
                    <strong>1 Hour Explanation</strong>
                  </div>
                  <div>
                    <span>Scheduled Time:</span>
                    <strong>Monday May 12th • 7:30 PM</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Course Content Progress & Curriculum) */}
          <div className="right-classroom-col">
            <div className="card curriculum-card">
              <div className="curriculum-header">
                <h3>Course Content</h3>
                <span className="progress-percent">25%</span>
              </div>

              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: '25%' }}></div>
              </div>

              <h4 className="curriculum-subtitle">CURRICULUM</h4>
              <div className="curriculum-lessons-list">
                <div className="lesson-item completed">
                  <span className="lesson-check">✓</span>
                  <div>
                    <span className="lesson-name">Lesson 1 - Introduction</span>
                    <span className="lesson-duration">Duration • 15 Mins 12 Sec</span>
                  </div>
                </div>

                <div className="lesson-item active">
                  <span className="lesson-check active-icon">▶</span>
                  <div>
                    <span className="lesson-name">Lesson 2 - Basic Concepts</span>
                    <span className="lesson-status-tag">ACTIVE • EXPLANATION LIVE</span>
                  </div>
                </div>

                <div className="lesson-item upcoming">
                  <span className="lesson-check lock">🔒</span>
                  <div>
                    <span className="lesson-name">Lesson 3 - Practice Concepts</span>
                    <span className="lesson-duration">20 Mins</span>
                  </div>
                </div>

                <div className="lesson-item upcoming">
                  <span className="lesson-check lock">🔒</span>
                  <div>
                    <span className="lesson-name">Lesson 4 - Advanced Topics</span>
                    <span className="lesson-duration">30 Mins</span>
                  </div>
                </div>

                <div className="lesson-item upcoming">
                  <span className="lesson-check lock">🔒</span>
                  <div>
                    <span className="lesson-name">Lesson 5 - Online Exam</span>
                    <span className="lesson-duration">45 Mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EnterCourse;
