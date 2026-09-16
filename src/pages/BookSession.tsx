import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './BookSession.css';

type FlowStep = 
  | 'start_choice'            // Step 1: Choose How You Want to Start
  | 'trial_material'          // Step 2: Upload Your Trial Material
  | 'direct_options'          // Upload Your Files (2 top, 1 bottom centered - Screenshot 2)
  | 'plan_selection'          // Choose Your Explanation Plan
  | 'subscription_details'    // Explanation Subscription (500 SAR / 15 Hr)
  | 'payment_success'         // Payment completed successfully
  | 'live_explanation_form'   // Upload Your Trial Material For Explanation By Live
  | 'lecture_material_form'   // Upload Your Lecture Material
  | 'assignment_upload_form'  // Upload Assignment Form
  | 'assignment_success'      // Assignment Uploaded Successfully
  | 'trial_success'           // Your Trial Request Has Been Submitted Successfully
  | 'lecture_success';         // Lecture Materials Uploaded Successfully

const BookSession = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [step, setStep] = useState<FlowStep>('start_choice');
  const [showToast, setShowToast] = useState(true);

  // Form State
  const [fileName, setFileName] = useState<string | null>(null);
  const [subjectName, setSubjectName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleTrialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setStep('trial_success');
  };

  const handleLectureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setStep('lecture_success');
  };

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setStep('assignment_success');
  };

  const handlePayment = () => {
    setShowToast(true);
    setStep('payment_success');
  };

  return (
    <div className="upload-flow-page container animate-fade-in">
      {/* -------------------------------------------------------------
          STEP 1: Choose How You Want to Start
         ------------------------------------------------------------- */}
      {step === 'start_choice' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => navigate('/student/dashboard')} className="back-link-btn">
              {t('orders.back', '← Back')}
            </button>
          </div>

          <div className="flow-title-wrap text-center">
            <h1 className="flow-main-title">
              Choose How You Want <br />
              <span className="cyan-highlight-text">to Start</span>
            </h1>
            <p className="flow-subtitle">
              You can try a trial session with an instructor or book a session directly.
            </p>
          </div>

          <div className="flow-cards-two-grid">
            {/* Card 1: Trial Session */}
            <div className="flow-dark-choice-card">
              <div className="dark-card-icon-box">
                <span className="card-icon-symbol">▶</span>
              </div>
              <h2>Trial Session</h2>
              <p>
                Choose an instructor and start with a trial explanation session to see if they fit your needs.
              </p>
              <button 
                onClick={() => setStep('trial_material')} 
                className="btn-primary choice-cta-btn"
              >
                Start Trial
              </button>
            </div>

            {/* Card 2: Direct Booking */}
            <div className="flow-dark-choice-card">
              <div className="dark-card-icon-box">
                <span className="card-icon-symbol">
                  <img src="/pdf-icon.png" alt="PDF" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                </span>
              </div>
              <h2>Direct Booking</h2>
              <p>
                Upload your lecture or material and book an explanation session directly with your preferred tutor.
              </p>
              <button 
                onClick={() => setStep('direct_options')} 
                className="btn-primary choice-cta-btn"
              >
                Book Now
              </button>
            </div>
          </div>

          <p className="flow-bottom-help text-center">
            ⚙️ Not sure which one to choose? <span className="help-link" onClick={() => navigate('/contact')}>Chat with support</span>
          </p>
        </div>
      )}

      {/* -------------------------------------------------------------
          STEP 2: Upload Your Trial Material
         ------------------------------------------------------------- */}
      {step === 'trial_material' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => setStep('start_choice')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="flow-title-wrap text-center">
            <h1 className="flow-main-title">Upload Your Trial Material</h1>
            <p className="flow-subtitle">
              Upload a small sample from the material you want explained during the trial session.
            </p>
          </div>

          <div className="flow-form-card-container">
            <form onSubmit={handleTrialSubmit} className="subject-request-form">
              <div className="form-card-header">
                <span className="header-doc-icon">
                  <img src="/pdf-icon.png" alt="PDF" style={{ width: '24px', height: '24px', objectFit: 'contain', verticalAlign: 'middle' }} />
                </span>
                <h2>Subject Request</h2>
              </div>

              {/* Dashed Drag & Drop Box */}
              <div className="materials-upload-group">
                <label className="input-group-label">MATERIALS</label>
                <div className="dashed-dropzone">
                  <span className="drop-cloud-icon">
                    <img src="/pdf-icon.png" alt="Upload" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                  </span>
                  <strong>Drag-and-drop area for files</strong>
                  <span className="drop-subtext">Upload PDF, DOC/DOCX, or Images</span>

                  <input 
                    type="file" 
                    id="trial-file-input" 
                    onChange={handleFileSelect} 
                    style={{ display: 'none' }} 
                  />
                  <label htmlFor="trial-file-input" className="btn-primary browse-files-btn">
                    {fileName ? `Selected: ${fileName}` : 'Browse Files'}
                  </label>
                </div>
              </div>

              {/* Subject Name Input */}
              <div className="form-input-group">
                <label className="input-group-label">SUBJECT NAME</label>
                <input 
                  type="text" 
                  placeholder="e.g., Mathematics, Physics"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  required
                />
              </div>

              {/* Trial Deadline Input */}
              <div className="form-input-group">
                <label className="input-group-label">TRIAL DEADLINE</label>
                <input 
                  type="date" 
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </div>

              {/* Description Input */}
              <div className="form-input-group">
                <label className="input-group-label">DESCRIPTION</label>
                <textarea 
                  rows={4}
                  placeholder="What specific questions or difficult points should we cover?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Add Another Subject Button */}
              <button type="button" className="add-another-subject-btn">
                ⊕ Add Another Subject
              </button>

              {/* Submit Button */}
              <button type="submit" className="btn-dark submit-trial-btn">
                SUBMIT TRIAL REQUEST
              </button>

              <p className="terms-caption text-center">
                By submitting, you agree to our terms of service regarding trial sessions.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          STEP 3: Upload Your Files (Exact Pic 2 Layout: 2 top, 1 bottom)
         ------------------------------------------------------------- */}
      {step === 'direct_options' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => setStep('start_choice')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="flow-title-wrap text-center">
            <h1 className="flow-main-title">Upload Your Files</h1>
            <p className="flow-subtitle">
              Choose what type of file you want to upload to your workspace.
            </p>
          </div>

          <div className="direct-booking-layout">
            {/* Top Row: 2 Cards */}
            <div className="top-two-cards-row">
              {/* Card 1: Lecture Upload (explanation by video) */}
              <div className="flow-dark-choice-card direct-rect-card">
                <div className="dark-card-icon-box rect-icon-box">
                  <span className="card-icon-symbol">📹</span>
                </div>
                <h2>Lecture Upload <br />(explantion by video)</h2>
                <p>
                  Share your knowledge. Upload video lessons, PDF textbooks, or presentation slides.
                </p>
                <button 
                  onClick={() => setStep('plan_selection')} 
                  className="btn-primary choice-rect-btn"
                >
                  Get Started
                </button>
              </div>

              {/* Card 2: Lecture Upload (explanation by live) */}
              <div className="flow-dark-choice-card direct-rect-card">
                <div className="dark-card-icon-box rect-icon-box">
                  <span className="card-icon-symbol">📹</span>
                </div>
                <h2>Lecture Upload <br />(explantion by live )</h2>
                <p>
                  Share your knowledge. Upload video lessons, PDF textbooks, or presentation slides.
                </p>
                <button 
                  onClick={() => setStep('live_explanation_form')} 
                  className="btn-primary choice-rect-btn"
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Bottom Row: 1 Card Centered */}
            <div className="bottom-one-card-row">
              <div className="flow-dark-choice-card direct-rect-card">
                <div className="dark-card-icon-box rect-icon-box">
                  <span className="card-icon-symbol">📋</span>
                </div>
                <h2>Assignment Upload</h2>
                <p>
                  Submit your work. Upload project documents, checklists, or research papers.
                </p>
                <button 
                  onClick={() => setStep('assignment_upload_form')} 
                  className="btn-primary choice-rect-btn"
                >
                  Get started
                </button>
              </div>
            </div>
          </div>

          <p className="flow-bottom-help text-center" style={{ marginTop: '3rem' }}>
            ⚙️ Supported formats: MP4, PDF, DOCX, ZIP (Max 500MB)
          </p>
        </div>
      )}

      {/* -------------------------------------------------------------
          Upload Assignment Form
         ------------------------------------------------------------- */}
      {step === 'assignment_upload_form' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => setStep('direct_options')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="flow-title-wrap text-center">
            <h1 className="flow-main-title">Upload Assignment</h1>
            <p className="flow-subtitle">
              Upload your assignment and set your requirements for instructors. Our experts will review it promptly.
            </p>
          </div>

          <div className="flow-form-card-container">
            <form onSubmit={handleAssignmentSubmit} className="subject-request-form">
              {/* Dashed Drag & Drop Box */}
              <div className="materials-upload-group">
                <div className="dashed-dropzone assignment-dropzone">
                  <span className="drop-cloud-icon">↑</span>
                  <strong>Drag & Drop your assignment file here or click to upload</strong>
                  <span className="drop-subtext">SUPPORTED: PDF, DOC, PPT, IMAGES, ZIP</span>

                  <input 
                    type="file" 
                    id="asgn-file-input" 
                    onChange={handleFileSelect} 
                    style={{ display: 'none' }} 
                  />
                  <label htmlFor="asgn-file-input" className="btn-primary browse-files-btn">
                    {fileName ? `Selected: ${fileName}` : 'Select File'}
                  </label>
                </div>
              </div>

              {/* Price & Deadline 2-Column Grid */}
              <div className="form-two-cols-grid">
                <div className="form-input-group">
                  <label className="input-group-label">SET YOUR PRICE (SAR) , (NOT LESS THAN 60 SAR)</label>
                  <input 
                    type="number" 
                    min="60"
                    placeholder="💵 e.g. 100"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="form-input-group">
                  <label className="input-group-label">SELECT DEADLINE</label>
                  <input 
                    type="date" 
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Description Input */}
              <div className="form-input-group">
                <label className="input-group-label">ASSIGNMENT DESCRIPTION</label>
                <textarea 
                  rows={4}
                  placeholder="Describe your assignment requirements in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Submit Assignment Button */}
              <button type="submit" className="btn-primary submit-asgn-cyan-btn">
                🚀 Submit Assignment
              </button>
            </form>
          </div>

          {/* 3 Bottom Feature Cards */}
          <div className="three-features-grid text-center">
            <div className="feature-dark-card">
              <span className="feat-icon">🛡️</span>
              <h3>Secure Payment</h3>
              <p>ENCRYPTED TRANSACTIONS</p>
            </div>
            <div className="feature-dark-card">
              <span className="feat-icon">⚡</span>
              <h3>Fast Delivery</h3>
              <p>MEET EVERY DEADLINE</p>
            </div>
            <div className="feature-dark-card">
              <span className="feat-icon">🎖️</span>
              <h3>Top Quality</h3>
              <p>VERIFIED INSTRUCTORS</p>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          Assignment Uploaded Successfully
         ------------------------------------------------------------- */}
      {step === 'assignment_success' && (
        <div className="flow-step-container relative-container animate-fade-in" style={{ padding: '3rem 1rem' }}>
          {showToast && (
            <div className="top-right-toast-card">
              <div className="toast-header-row">
                <span className="toast-check-icon">✓</span>
                <strong className="toast-caps-title">ASSIGNMENT UPLOADED SUCCESSFULLY</strong>
                <button onClick={() => setShowToast(false)} className="toast-close-btn">&times;</button>
              </div>
              <p className="toast-body-text">
                Your assignment has been uploaded successfully and added to My Orders.
              </p>
              <span className="toast-timestamp">Just now</span>
            </div>
          )}

          <div className="trial-success-center text-center">
            <div className="success-cyan-circle-icon">
              <span className="cyan-check">✓</span>
            </div>

            <h1 className="success-main-title">
              Assignment Uploaded <br />
              Successfully
            </h1>

            <p className="success-subtext">
              Your assignment has been uploaded and is now visible to instructors. We'll notify you once it's reviewed.
            </p>

            <button 
              onClick={() => navigate('/orders')} 
              className="btn-primary go-to-orders-btn"
            >
              Go to My Orders &rarr;
            </button>

            <div className="dark-next-steps-banner">
              <span className="info-circle-icon">ℹ️</span>
              <div className="banner-text-wrap">
                <strong>What happens next?</strong>
                <p>Your instructor will be notified of your submission. You can track progress in the dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          Choose Your Explanation Plan
         ------------------------------------------------------------- */}
      {step === 'plan_selection' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => setStep('direct_options')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="flow-title-wrap text-center">
            <h1 className="flow-main-title">Choose Your Explanation Plan</h1>
            <p className="flow-subtitle">
              Select how you want your lecture to be explained. We offer flexible options to suit your academic needs.
            </p>
          </div>

          <div className="flow-cards-two-grid">
            {/* Plan 1: Hourly Explanation */}
            <div className="flow-dark-choice-card">
              <div className="dark-card-icon-box">
                <span className="card-icon-symbol">🕒</span>
              </div>
              <h2>Hourly Explanation</h2>
              <p>
                Get your lecture explained and pay by the hour. Perfect for quick clarifications or specific topic deep-dives.
              </p>
              <button 
                onClick={() => setStep('lecture_material_form')} 
                className="btn-primary choice-cta-btn"
              >
                Choose Plan
              </button>
            </div>

            {/* Plan 2: Package 15-Hour */}
            <div className="flow-dark-choice-card relative-card">
              <span className="most-popular-badge">MOST POPULAR</span>
              <div className="dark-card-icon-box">
                <span className="card-icon-symbol">📅</span>
              </div>
              <h2>package <br />(15-hour by 500 SAR)</h2>
              <p>
                Get continuous help with your lectures during the whole package. Ideal for consistent academic support.
              </p>
              <button 
                onClick={() => setStep('subscription_details')} 
                className="btn-primary choice-cta-btn"
              >
                Choose Plan
              </button>
            </div>
          </div>

          {/* Bottom Trust Badges */}
          <div className="trust-badges-row text-center">
            <span>✓ Expert Tutors</span>
            <span>🛡️ Secure Payment</span>
            <span>🎧 24/7 Support</span>
            <span>🔄 Recorded Sessions</span>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          Explanation Subscription (Packaging Plan Details & Payment)
         ------------------------------------------------------------- */}
      {step === 'subscription_details' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => setStep('plan_selection')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="flow-title-wrap text-center" style={{ marginBottom: '3rem' }}>
            <h1 className="flow-main-title">Explanation Subscription</h1>
          </div>

          <div className="subscription-card-box">
            <span className="current-sel-tag">CURRENT SELECTION</span>
            <h2>Packaging Plan</h2>
            <div className="sub-price-row">
              <span className="price-num">500</span>
              <span className="price-unit">SAR / 15 Hour</span>
            </div>
            <p className="sub-check-desc">
              ✓ You can upload lecture materials and request explanations from instructors during the subscription (15 HOURS)
            </p>
          </div>

          <div className="subscription-actions-row">
            <button onClick={handlePayment} className="btn-primary pay-now-btn">
              Payment
            </button>
            <button onClick={() => navigate('/contact')} className="btn-outline-white contact-us-sub-btn">
              Contact Us 💬
            </button>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          Payment Completed Successfully
         ------------------------------------------------------------- */}
      {step === 'payment_success' && (
        <div className="flow-step-container relative-container animate-fade-in" style={{ padding: '3rem 1rem' }}>
          {showToast && (
            <div className="top-right-toast-card wide-toast">
              <div className="toast-header-row">
                <span className="toast-check-icon">✓</span>
                <strong className="toast-caps-title">
                  500 SAR HAS BEEN WITHDRAWN FROM YOUR WALLET AND YOU ARE NOW SUBSCRIBED TO THE 15-HOUR PACKAGE.
                </strong>
                <button onClick={() => setShowToast(false)} className="toast-close-btn">&times;</button>
              </div>
            </div>
          )}

          <div className="trial-success-center text-center">
            <div className="success-cyan-circle-icon">
              <span className="cyan-check">✓</span>
            </div>

            <h1 className="success-main-title">
              Payment completed <br />
              successfully
            </h1>

            <p className="success-subtext">
              You now have 15 hours of recorded explanations that you can use immediately. We wish you all success and excellence.
            </p>

            <button 
              onClick={() => setStep('lecture_material_form')} 
              className="btn-primary go-to-orders-btn"
            >
              Go to upload file &rarr;
            </button>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          Upload Your Trial Material For Explanation By Live
         ------------------------------------------------------------- */}
      {step === 'live_explanation_form' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => setStep('direct_options')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="flow-title-wrap text-center">
            <h1 className="flow-main-title">
              Upload Your Trial Material For <br />
              <span className="cyan-highlight-text">Explaintion By Live</span>
            </h1>
            <p className="flow-subtitle">
              Upload a small sample from the material you want explained during the trial session.
            </p>
          </div>

          <div className="flow-form-card-container">
            <form onSubmit={handleTrialSubmit} className="subject-request-form">
              <div className="form-card-header">
                <span className="header-doc-icon">
                  <img src="/pdf-icon.png" alt="PDF" style={{ width: '24px', height: '24px', objectFit: 'contain', verticalAlign: 'middle' }} />
                </span>
                <h2>Subject Request</h2>
              </div>

              {/* Dashed Drag & Drop Box */}
              <div className="materials-upload-group">
                <label className="input-group-label">MATERIALS</label>
                <div className="dashed-dropzone">
                  <span className="drop-cloud-icon">
                    <img src="/pdf-icon.png" alt="Upload" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                  </span>
                  <strong>Drag-and-drop area for files</strong>
                  <span className="drop-subtext">Upload PDF, DOC/DOCX, or Images</span>

                  <input 
                    type="file" 
                    id="live-file-input" 
                    onChange={handleFileSelect} 
                    style={{ display: 'none' }} 
                  />
                  <label htmlFor="live-file-input" className="btn-primary browse-files-btn">
                    {fileName ? `Selected: ${fileName}` : 'Browse Files'}
                  </label>
                </div>
              </div>

              {/* Subject Name Input */}
              <div className="form-input-group">
                <label className="input-group-label">SUBJECT NAME</label>
                <input 
                  type="text" 
                  placeholder="e.g., Mathematics, Physics"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  required
                />
              </div>

              {/* Trial Deadline Input */}
              <div className="form-input-group">
                <label className="input-group-label">TRIAL DEADLINE</label>
                <input 
                  type="date" 
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </div>

              {/* Description Input */}
              <div className="form-input-group">
                <label className="input-group-label">DESCRIPTION</label>
                <textarea 
                  rows={4}
                  placeholder="What specific questions or difficult points should we cover?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Add Another Subject Button */}
              <button type="button" className="add-another-subject-btn">
                ⊕ Add Another Subject
              </button>

              {/* Submit Button */}
              <button type="submit" className="btn-dark submit-trial-btn">
                SUBMIT TRIAL REQUEST
              </button>

              <p className="terms-caption text-center">
                By submitting, you agree to our terms of service regarding trial sessions.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          Upload Your Lecture Material
         ------------------------------------------------------------- */}
      {step === 'lecture_material_form' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => setStep('direct_options')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="flow-title-wrap text-center">
            <h1 className="flow-main-title">Upload Your Lecture Material</h1>
            <p className="flow-subtitle">
              Upload the files related to the lecture you want explained.
            </p>
          </div>

          <div className="flow-form-card-container">
            <form onSubmit={handleLectureSubmit} className="subject-request-form">
              <div className="form-card-header">
                <span className="header-doc-icon">
                  <img src="/pdf-icon.png" alt="PDF" style={{ width: '24px', height: '24px', objectFit: 'contain', verticalAlign: 'middle' }} />
                </span>
                <h2>Subject Request</h2>
              </div>

              {/* Dashed Drag & Drop Box */}
              <div className="materials-upload-group">
                <label className="input-group-label">LECTURE FILES</label>
                <div className="dashed-dropzone">
                  <span className="drop-cloud-icon">
                    <img src="/pdf-icon.png" alt="Upload" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                  </span>
                  <strong>Drag-and-drop area for files</strong>
                  <span className="drop-subtext">Upload PDF, DOC/DOCX, or Images</span>

                  <input 
                    type="file" 
                    id="lecture-file-input" 
                    onChange={handleFileSelect} 
                    style={{ display: 'none' }} 
                  />
                  <label htmlFor="lecture-file-input" className="btn-primary browse-files-btn">
                    {fileName ? `Selected: ${fileName}` : 'Browse Files'}
                  </label>
                </div>
              </div>

              {/* Subject Name Input */}
              <div className="form-input-group">
                <label className="input-group-label">SUBJECT NAME</label>
                <input 
                  type="text" 
                  placeholder="e.g., Mathematics, Physics"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  required
                />
              </div>

              {/* Explanation Deadline Input */}
              <div className="form-input-group">
                <label className="input-group-label">EXPLANATION DEADLINE</label>
                <input 
                  type="date" 
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </div>

              {/* Description Input */}
              <div className="form-input-group">
                <label className="input-group-label">DESCRIPTION</label>
                <textarea 
                  rows={4}
                  placeholder="What specific questions or difficult points should we cover?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Add Another Subject Button */}
              <button type="button" className="add-another-subject-btn">
                ⊕ Add Another Subject
              </button>

              {/* Submit Button */}
              <button type="submit" className="btn-dark submit-trial-btn">
                SUBMIT BOOKING REQUEST
              </button>

              <p className="terms-caption text-center">
                By submitting, you agree to our terms of service regarding trial sessions.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          Trial Request Submitted Successfully
         ------------------------------------------------------------- */}
      {step === 'trial_success' && (
        <div className="flow-step-container relative-container animate-fade-in" style={{ padding: '3rem 1rem' }}>
          {showToast && (
            <div className="top-right-toast-card">
              <div className="toast-header-row">
                <span className="toast-check-icon">✓</span>
                <strong>Trial request uploaded successfully</strong>
                <button onClick={() => setShowToast(false)} className="toast-close-btn">&times;</button>
              </div>
              <p className="toast-body-text">
                Your request has been added to My Orders. It will be shown to multiple instructors. Please wait for their response.
              </p>
            </div>
          )}

          <div className="trial-success-center text-center">
            <div className="success-cyan-circle-icon">
              <span className="cyan-check">✓</span>
            </div>

            <h1 className="success-main-title">
              Your Trial Request Has Been <br />
              Submitted Successfully
            </h1>

            <p className="success-subtext">
              Your request has been added to <Link to="/orders" className="cyan-orders-link">My Orders</Link> and will be reviewed by multiple instructors. Please wait for instructors to respond.
            </p>

            <button 
              onClick={() => navigate('/orders')} 
              className="btn-primary go-to-orders-btn"
            >
              Go to My Orders &rarr;
            </button>

            <div className="dark-next-steps-banner">
              <span className="info-circle-icon">ℹ️</span>
              <div className="banner-text-wrap">
                <strong>What happens next?</strong>
                <p>Your instructor will be notified of your submission. You can track progress in the dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          Lecture Materials Uploaded Successfully
         ------------------------------------------------------------- */}
      {step === 'lecture_success' && (
        <div className="flow-step-container relative-container animate-fade-in" style={{ padding: '3rem 1rem' }}>
          {showToast && (
            <div className="top-right-toast-card">
              <div className="toast-header-row">
                <span className="toast-check-icon">✓</span>
                <strong className="toast-caps-title">LECTURE MATERIALS UPLOADED SUCCESSFULLY</strong>
                <button onClick={() => setShowToast(false)} className="toast-close-btn">&times;</button>
              </div>
              <p className="toast-body-text">
                Your request has been added to My Orders. It will be shown to multiple instructors. Please wait for their response.
              </p>
            </div>
          )}

          <div className="trial-success-center text-center">
            <div className="success-cyan-circle-icon">
              <span className="cyan-check">✓</span>
            </div>

            <h1 className="success-main-title">
              Lecture Materials Uploaded <br />
              Successfully
            </h1>

            <p className="success-subtext">
              Your request has been added to <Link to="/orders" className="cyan-orders-link">My Orders</Link>. Your lecture will be shown to multiple instructors, and you will receive their offers soon.
            </p>

            <button 
              onClick={() => navigate('/orders')} 
              className="btn-primary go-to-orders-btn"
            >
              Go to My Orders &rarr;
            </button>

            <div className="dark-next-steps-banner">
              <span className="info-circle-icon">ℹ️</span>
              <div className="banner-text-wrap">
                <strong>What happens next?</strong>
                <p>Your instructor will be notified of your submission. You can track progress in the dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSession;
