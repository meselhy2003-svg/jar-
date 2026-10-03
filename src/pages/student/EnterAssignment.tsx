import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StudentHeader from '../../components/StudentHeader';
import { useLanguage } from '../../context/LanguageContext';
import { useRequests } from '../../context/RequestContext';
import './EnterAssignment.css';

const EnterAssignment = () => {
  const { t } = useLanguage();
  const { assignmentId } = useParams<{ assignmentId?: string }>();
  const { requests } = useRequests();

  const targetReq = requests.find((r) => r.id === assignmentId);

  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'tutor',
      text: "Hi Ahmad, how is your assignment going? Is everything clear, or is there anything you didn't understand?",
    },
    {
      sender: 'student',
      text: "Hi Doctor, it's going great overall, thank you! 🙏 But there is one part I'm still a bit confused about.",
    },
    {
      sender: 'tutor',
      text: 'Alright, which part is that?',
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setChatMessages([...chatMessages, { sender: 'student', text: inputMsg }]);
    setInputMsg('');
  };

  const handleDownloadPdf = () => {
    const solFileName =
      targetReq?.deliveredSolutionFile || 'Solved_Assignment_Calculus.pdf';
    const element = document.createElement('a');
    const file = new Blob(
      [`Official Solved Assignment Content\nCourse: ${targetReq?.subject || 'Mathematics'}\nStudent: ${targetReq?.studentName || 'Student'}\nFile: ${solFileName}`],
      { type: 'text/plain' }
    );
    element.href = URL.createObjectURL(file);
    element.download = solFileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const title = targetReq?.title || 'Assignment Explanation';
  const solvedFileName =
    targetReq?.deliveredSolutionFile || 'Solved Assignment - Calculus Homework.pdf';

  return (
    <div className="enter-assignment-wrapper">
      <StudentHeader />

      <main className="container enter-assignment-container animate-fade-in">
        <Link to="/my-assignments" className="back-link">
          {t('orders.back', '← Back')}
        </Link>

        <div className="assignment-header-wrap">
          <h1>{title}</h1>
          <p className="page-subtitle">
            Watch the explanation and download the solved assignment.
          </p>
        </div>

        {/* 1. Video Player Container */}
        <div className="video-player-card">
          <div className="video-screen-mockup">
            <div className="play-button-center">
              <span>▶</span>
            </div>
            <div className="video-controls-bottom">
              <span className="time-code">03:17</span>
              <div className="timeline-bar">
                <div className="timeline-fill" style={{ width: '30%' }}></div>
                <div className="timeline-knob" style={{ left: '30%' }}></div>
              </div>
              <span className="time-code">12:45</span>
            </div>
          </div>
        </div>

        {/* 2. Solved Assignment File Download Card */}
        <div className="solved-file-section">
          <h3>
            <img
              src="/pdf-icon.png"
              alt="PDF"
              style={{
                width: '1.1em',
                height: '1.1em',
                verticalAlign: 'middle',
                marginInlineEnd: '6px',
              }}
            />{' '}
            Solved Assignment File
          </h3>
          <div className="card solved-file-card">
            <div className="file-info-left">
              <div className="pdf-icon-box">
                <img
                  src="/pdf-icon.png"
                  alt="PDF"
                  style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                />
              </div>
              <div>
                <h4 className="file-name">{solvedFileName}</h4>
                <p className="file-meta">
                  {targetReq?.fileMeta || 'PDF Document • 3.4 MB'}
                </p>
              </div>
            </div>

            <button
              className="btn-dark download-pdf-btn"
              onClick={handleDownloadPdf}
            >
              📥 Download PDF
            </button>
          </div>
        </div>

        {/* 3. Interactive Chat Box */}
        <div className="card assignment-chat-card">
          <div className="chat-card-header">
            <h3>Chat</h3>
          </div>

          <div className="chat-messages-container">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`chat-message-row ${msg.sender}`}>
                <div className="chat-message-bubble">{msg.text}</div>
              </div>
            ))}
          </div>

          <form className="chat-input-row" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Type a message..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
            />
            <button type="submit" className="chat-send-btn">
              ➤
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EnterAssignment;
