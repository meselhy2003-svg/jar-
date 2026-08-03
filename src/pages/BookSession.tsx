import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './BookSession.css';

type StepType = 
  | 'choose-start' 
  | 'direct-choice' 
  | 'form-trial' 
  | 'form-lecture' 
  | 'form-assignment' 
  | 'subscription-plan'
  | 'success-payment'
  | 'success-trial'
  | 'success-lecture'
  | 'success-assignment';

const BookSession = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<StepType>('choose-start');
  const [showToast, setShowToast] = useState(true);
  
  // Form State
  const [fileName, setFileName] = useState<string | null>(null);
  const [subjectName, setSubjectName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('100');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleStartTrial = () => {
    setStep('form-trial');
  };

  const handleOpenLectureForm = () => {
    setStep('form-lecture');
  };

  const handleOpenAssignmentForm = () => {
    setStep('form-assignment');
  };

  // Submit Handlers
  const handleSubmitTrialForm = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setStep('success-trial');
  };

  const handleSubmitLectureForm = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('subscription-plan');
  };

  const handleSubmitAssignmentForm = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setStep('success-assignment');
  };

  const handleConfirmSubscriptionPayment = () => {
    setShowToast(true);
    setStep('success-payment');
  };

  const handleGoToUploadLectureAfterPayment = () => {
    setStep('form-lecture');
  };

  return (
    <div className="upload-files-flow-page container animate-fade-in">
      {/* ========================================================================= */}
      {/* STEP 1: CHOOSE HOW YOU WANT TO START */}
      {/* ========================================================================= */}
      {step === 'choose-start' && (
        <div className="flow-step-container text-center">
          <div className="flow-top-nav">
            <button onClick={() => navigate(-1)} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <h1 className="flow-main-title">
            Choose How You Want <span className="highlight-cyan-text">to Start</span>
          </h1>
          <p className="flow-subtitle">
            You can try a trial session with an instructor or book a session directly.
          </p>

          <div className="start-cards-grid">
            {/* Card 1: Trial Session */}
            <div className="start-dark-card card">
              <div className="card-icon-box">
                ▶
              </div>
              <h2>Trial Session</h2>
              <p>
                Choose an instructor and start with a trial explanation session to see if they fit your needs.
              </p>
              <button 
                onClick={handleStartTrial}
                className="btn-primary start-card-btn"
              >
                Start Trial
              </button>
            </div>

            {/* Card 2: Direct Booking */}
            <div className="start-dark-card card">
              <div className="card-icon-box">
                📄
              </div>
              <h2>Direct Booking</h2>
              <p>
                Upload your lecture or material and book an explanation session directly with your preferred tutor.
              </p>
              <button 
                onClick={() => setStep('direct-choice')}
                className="btn-primary start-card-btn"
              >
                Book Now
              </button>
            </div>
          </div>

          <p className="support-chat-hint">
            ⚙ Not sure which one to choose? <Link to="/contact">Chat with support</Link>
          </p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: DIRECT BOOKING CHOICE */}
      {/* ========================================================================= */}
      {step === 'direct-choice' && (
        <div className="flow-step-container text-center">
          <div className="flow-top-nav">
            <button onClick={() => setStep('choose-start')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <h1 className="flow-main-title">Upload Your Files</h1>
          <p className="flow-subtitle">
            Choose what type of file you want to upload to your workspace.
          </p>

          <div className="direct-upload-grid">
            {/* Card 1: Lecture Upload (explanation by video) */}
            <div className="start-dark-card card">
              <div className="card-icon-box">
                🎬
              </div>
              <h2>Lecture Upload<br />(explantion by video)</h2>
              <p>
                Share your knowledge. Upload video lessons, PDF textbooks, or presentation slides.
              </p>
              <button 
                onClick={handleOpenLectureForm}
                className="btn-primary start-card-btn"
              >
                Get Started
              </button>
            </div>

            {/* Card 2: Lecture Upload (explanation by live) */}
            <div className="start-dark-card card">
              <div className="card-icon-box">
                🎬
              </div>
              <h2>Lecture Upload<br />(explantion by live )</h2>
              <p>
                Share your knowledge. Upload video lessons, PDF textbooks, or presentation slides.
              </p>
              <button 
                onClick={handleOpenLectureForm}
                className="btn-primary start-card-btn"
              >
                Get Started
              </button>
            </div>

            {/* Card 3: Assignment Upload */}
            <div className="start-dark-card card assignment-grid-card">
              <div className="card-icon-box">
                📝
              </div>
              <h2>Assignment Upload</h2>
              <p>
                Submit your work. Upload project documents, checklists, or research papers.
              </p>
              <button 
                onClick={handleOpenAssignmentForm}
                className="btn-primary start-card-btn"
              >
                Get started
              </button>
            </div>
          </div>

          <p className="support-formats-hint">
            ℹ Supported formats: MP4, PDF, DOCX, ZIP (Max 500MB)
          </p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FORM A: TRIAL FORM */}
      {/* ========================================================================= */}
      {step === 'form-trial' && (
        <div className="flow-step-container text-center">
          <div className="flow-top-nav">
            <button onClick={() => setStep('choose-start')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <h1 className="flow-main-title">Upload Your Trial Material</h1>
          <p className="flow-subtitle">
            Upload a small sample from the material you want explained during the trial session.
          </p>

          <div className="upload-form-card-container">
            <form onSubmit={handleSubmitTrialForm} className="subject-request-dark-card">
              <div className="card-header-row">
                <span className="doc-request-icon">📄</span>
                <h2>Subject Request</h2>
              </div>

              <div className="form-group">
                <label className="input-label-tag">MATERIALS</label>
                <div className="drag-drop-dashed-box">
                  <span className="cloud-upload-icon">☁️</span>
                  <strong>Drag-and-drop area for files</strong>
                  <p>Upload PDF, DOCX, or Images</p>

                  <input 
                    type="file" 
                    id="file-browse-input-trial" 
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="file-browse-input-trial" className="btn-primary browse-files-btn">
                    {fileName ? `Selected: ${fileName}` : 'Browse Files'}
                  </label>
                </div>
              </div>

              <div className="form-group text-left">
                <label className="input-label-tag">SUBJECT NAME</label>
                <input 
                  type="text" 
                  className="dark-input-field" 
                  placeholder="e.g., Mathematics, Physics"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group text-left">
                <label className="input-label-tag">TRIAL DEADLINE</label>
                <input 
                  type="date" 
                  className="dark-input-field"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </div>

              <div className="form-group text-left">
                <label className="input-label-tag">DESCRIPTION</label>
                <textarea 
                  className="dark-textarea-field" 
                  rows={4}
                  placeholder="What specific questions or difficult points should we cover?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
            </form>

            <button type="button" className="add-another-subject-btn">
              ⊕ Add Another Subject
            </button>

            <div className="submit-trial-row">
              <button 
                type="button" 
                onClick={handleSubmitTrialForm} 
                className="submit-trial-request-btn"
              >
                SUBMIT TRIAL REQUEST
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FORM B: LECTURE FORM (Pic 1 & 5 in previous batch) */}
      {/* ========================================================================= */}
      {step === 'form-lecture' && (
        <div className="flow-step-container text-center">
          <div className="flow-top-nav">
            <button onClick={() => setStep('direct-choice')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <h1 className="flow-main-title">Upload Your Lecture Material</h1>
          <p className="flow-subtitle">
            Upload the files related to the lecture you want explained.
          </p>

          <div className="upload-form-card-container">
            <form onSubmit={handleSubmitLectureForm} className="subject-request-dark-card">
              <div className="card-header-row">
                <span className="doc-request-icon">📄</span>
                <h2>Subject Request</h2>
              </div>

              <div className="form-group">
                <label className="input-label-tag">LECTURE FILES</label>
                <div className="drag-drop-dashed-box">
                  <span className="cloud-upload-icon">☁️</span>
                  <strong>Drag-and-drop area for files</strong>
                  <p>Upload PDF, DOCX, or Images</p>

                  <input 
                    type="file" 
                    id="file-browse-input-lecture" 
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="file-browse-input-lecture" className="btn-primary browse-files-btn">
                    {fileName ? `Selected: ${fileName}` : 'Browse Files'}
                  </label>
                </div>
              </div>

              <div className="form-group text-left">
                <label className="input-label-tag">SUBJECT NAME</label>
                <input 
                  type="text" 
                  className="dark-input-field" 
                  placeholder="e.g., Mathematics, Physics"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group text-left">
                <label className="input-label-tag">EXPLANATION DEADLINE</label>
                <input 
                  type="date" 
                  className="dark-input-field"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </div>

              <div className="form-group text-left">
                <label className="input-label-tag">DESCRIPTION</label>
                <textarea 
                  className="dark-textarea-field" 
                  rows={4}
                  placeholder="What specific questions or difficult points should we cover?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
            </form>

            <button type="button" className="add-another-subject-btn">
              ⊕ Add Another Subject
            </button>

            <div className="submit-trial-row">
              <button 
                type="button" 
                onClick={handleSubmitLectureForm} 
                className="submit-trial-request-btn"
              >
                SUBMIT BOOKING REQUEST
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FORM C: ASSIGNMENT FORM (Pic 1 in new batch) */}
      {/* ========================================================================= */}
      {step === 'form-assignment' && (
        <div className="flow-step-container text-center">
          <div className="flow-top-nav">
            <button onClick={() => setStep('direct-choice')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <h1 className="flow-main-title">Upload Assignment</h1>
          <p className="flow-subtitle">
            Upload your assignment and set your requirements for instructors. Our experts will review it promptly.
          </p>

          <div className="upload-form-card-container">
            <form onSubmit={handleSubmitAssignmentForm} className="subject-request-dark-card">
              {/* Dashed Drag & Drop Box */}
              <div className="form-group">
                <div className="drag-drop-dashed-box">
                  <span className="cloud-upload-icon">↑</span>
                  <strong>Drag & Drop your assignment file here or click to upload</strong>
                  <p>SUPPORTED: PDF, DOC, PPT, IMAGES, ZIP</p>

                  <input 
                    type="file" 
                    id="file-browse-input-asgn" 
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="file-browse-input-asgn" className="btn-primary browse-files-btn">
                    {fileName ? `Selected: ${fileName}` : 'Select File'}
                  </label>
                </div>
              </div>

              {/* Price & Deadline Row */}
              <div className="two-inputs-row">
                <div className="form-group text-left">
                  <label className="input-label-tag">SET YOUR PRICE (SAR) , (NOT LESS THAN 60 SAR)</label>
                  <div className="input-with-card-icon">
                    <span className="card-input-icon">💳</span>
                    <input 
                      type="number" 
                      className="dark-input-field card-padded-input" 
                      placeholder="e.g. 100"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      min={60}
                    />
                  </div>
                </div>

                <div className="form-group text-left">
                  <label className="input-label-tag">SELECT DEADLINE</label>
                  <input 
                    type="date" 
                    className="dark-input-field"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Assignment Description */}
              <div className="form-group text-left">
                <label className="input-label-tag">ASSIGNMENT DESCRIPTION</label>
                <textarea 
                  className="dark-textarea-field" 
                  rows={4}
                  placeholder="Describe your assignment requirements in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn-primary submit-assignment-cyan-btn"
              >
                🚀 Submit Assignment
              </button>
            </form>

            {/* 3 Bottom Feature Cards (Pic 1 in new batch) */}
            <div className="assignment-bottom-features-grid">
              <div className="asgn-feature-card">
                <span className="asgn-feat-icon">🛡️</span>
                <strong>Secure Payment</strong>
                <p>ENCRYPTED TRANSACTIONS</p>
              </div>

              <div className="asgn-feature-card">
                <span className="asgn-feat-icon">☁️</span>
                <strong>Fast Delivery</strong>
                <p>MEET EVERY DEADLINE</p>
              </div>

              <div className="asgn-feature-card">
                <span className="asgn-feat-icon">🎖️</span>
                <strong>Top Quality</strong>
                <p>VERIFIED INSTRUCTORS</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 5: EXPLANATION SUBSCRIPTION PLAN (Pic 3 in previous batch) */}
      {/* ========================================================================= */}
      {step === 'subscription-plan' && (
        <div className="flow-step-container text-left container" style={{ maxWidth: '800px' }}>
          <div className="flow-top-nav">
            <button onClick={() => setStep('form-lecture')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <h1 className="flow-main-title text-center" style={{ marginBottom: '3rem' }}>
            Explanation Subscription
          </h1>

          <div className="subscription-plan-card card">
            <span className="current-selection-badge">CURRENT SELECTION</span>
            <h2>Packaging Plan</h2>
            <div className="plan-price-row">
              <strong className="price-num">500</strong>
              <span className="price-unit">SAR / 15 Hour</span>
            </div>

            <div className="plan-feature-check">
              <span className="check-cyan-circle">✓</span>
              <p>
                You can upload lecture materials and request explanations from instructors during the subscription (15 HOURS)
              </p>
            </div>
          </div>

          <div className="subscription-actions-row">
            <button onClick={handleConfirmSubscriptionPayment} className="btn-primary payment-cyan-btn">
              Payment
            </button>
            <Link to="/contact" className="btn-secondary contact-us-outline-btn">
              Contact Us 💬
            </Link>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUCCESS SCREEN A: PAYMENT COMPLETED SUCCESSFULLY (Pic 3 in new batch) */}
      {/* ========================================================================= */}
      {step === 'success-payment' && (
        <div className="flow-step-container text-center animate-fade-in relative-toast-wrapper">
          {showToast && (
            <div className="top-right-success-toast animate-fade-in">
              <div className="toast-check-circle">✓</div>
              <div className="toast-text-content">
                <strong>500 SAR HAS BEEN WITHDRAWN FROM YOUR WALLET AND YOU ARE NOW SUBSCRIBED TO THE 15-HOUR PACKAGE.</strong>
              </div>
              <button className="toast-close-btn" onClick={() => setShowToast(false)}>✕</button>
            </div>
          )}

          <div className="flow-top-nav">
            <button onClick={() => setStep('choose-start')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="submitted-success-circle">
            ✓
          </div>

          <h1 className="submitted-success-title">
            Payment completed<br />successfully
          </h1>
          
          <p className="submitted-success-sub">
            You now have 15 hours of recorded explanations that you can use immediately. We wish you all success and excellence.
          </p>

          <div className="go-to-orders-btn-row">
            <button onClick={handleGoToUploadLectureAfterPayment} className="btn-primary go-orders-cyan-btn">
              Go to upload file &rarr;
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUCCESS SCREEN B: TRIAL REQUEST SUBMITTED (Pic 1 in previous batch) */}
      {/* ========================================================================= */}
      {step === 'success-trial' && (
        <div className="flow-step-container text-center animate-fade-in relative-toast-wrapper">
          {showToast && (
            <div className="top-right-success-toast animate-fade-in">
              <div className="toast-check-circle">✓</div>
              <div className="toast-text-content">
                <strong>Trial request uploaded successfully</strong>
                <p>Your request has been added to My Orders. It will be shown to multiple instructors. Please wait for their response.</p>
              </div>
              <button className="toast-close-btn" onClick={() => setShowToast(false)}>✕</button>
            </div>
          )}

          <div className="flow-top-nav">
            <button onClick={() => navigate('/student/dashboard')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="submitted-success-circle">
            ✓
          </div>

          <h1 className="submitted-success-title">
            Your Trial Request Has Been<br />Submitted Successfully
          </h1>
          
          <p className="submitted-success-sub">
            Your request has been added to <Link to="/my-orders" className="cyan-orders-link">My Orders</Link> and will be reviewed by multiple instructors. Please wait for instructors to respond.
          </p>

          <div className="go-to-orders-btn-row">
            <Link to="/my-orders" className="btn-primary go-orders-cyan-btn">
              Go to My Orders &rarr;
            </Link>
          </div>

          <div className="what-happens-next-card">
            <span className="info-circle-icon">ℹ</span>
            <div className="what-happens-text">
              <strong>What happens next?</strong>
              <p>Your instructor will be notified of your submission. You can track progress in the dashboard.</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUCCESS SCREEN C: LECTURE MATERIALS UPLOADED (Pic 2/4 in previous batch) */}
      {/* ========================================================================= */}
      {step === 'success-lecture' && (
        <div className="flow-step-container text-center animate-fade-in relative-toast-wrapper">
          {showToast && (
            <div className="top-right-success-toast animate-fade-in">
              <div className="toast-check-circle">✓</div>
              <div className="toast-text-content">
                <strong>LECTURE MATERIALS UPLOADED SUCCESSFULLY</strong>
                <p>Your request has been added to My Orders. It will be shown to multiple instructors. Please wait for their response.</p>
              </div>
              <button className="toast-close-btn" onClick={() => setShowToast(false)}>✕</button>
            </div>
          )}

          <div className="flow-top-nav">
            <button onClick={() => navigate('/student/dashboard')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="submitted-success-circle">
            ✓
          </div>

          <h1 className="submitted-success-title">
            Lecture Materials Uploaded<br />Successfully
          </h1>
          
          <p className="submitted-success-sub">
            Your request has been added to <Link to="/my-orders" className="cyan-orders-link">My Orders</Link>. Your lecture will be shown to multiple instructors, and you will receive their offers soon.
          </p>

          <div className="go-to-orders-btn-row">
            <Link to="/my-orders" className="btn-primary go-orders-cyan-btn">
              Go to My Orders &rarr;
            </Link>
          </div>

          <div className="what-happens-next-card">
            <span className="info-circle-icon">ℹ</span>
            <div className="what-happens-text">
              <strong>What happens next?</strong>
              <p>Your instructor will be notified of your submission. You can track progress in the dashboard.</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUCCESS SCREEN D: ASSIGNMENT UPLOADED SUCCESSFULLY (Pic 2 in new batch) */}
      {/* ========================================================================= */}
      {step === 'success-assignment' && (
        <div className="flow-step-container text-center animate-fade-in relative-toast-wrapper">
          {showToast && (
            <div className="top-right-success-toast animate-fade-in">
              <div className="toast-check-circle">✓</div>
              <div className="toast-text-content">
                <strong>ASSIGNMENT UPLOADED SUCCESSFULLY</strong>
                <p>Your assignment has been uploaded successfully and added to My Orders.</p>
                <span style={{ fontSize: '0.7rem', color: '#64748B' }}>Just now</span>
              </div>
              <button className="toast-close-btn" onClick={() => setShowToast(false)}>✕</button>
            </div>
          )}

          <div className="flow-top-nav">
            <button onClick={() => navigate('/student/dashboard')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="submitted-success-circle">
            ✓
          </div>

          <h1 className="submitted-success-title">
            Assignment Uploaded<br />Successfully
          </h1>
          
          <p className="submitted-success-sub">
            Your assignment has been uploaded and is now visible to instructors. We'll notify you once it's reviewed.
          </p>

          <div className="go-to-orders-btn-row">
            <Link to="/my-orders" className="btn-primary go-orders-cyan-btn">
              Go to My Orders &rarr;
            </Link>
          </div>

          <div className="what-happens-next-card">
            <span className="info-circle-icon">ℹ</span>
            <div className="what-happens-text">
              <strong>What happens next?</strong>
              <p>Your instructor will be notified of your submission. You can track progress in the dashboard.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSession;
