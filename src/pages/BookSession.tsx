import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './BookSession.css';

type FlowStep = 
  | 'start_choice'            // Step 1: Choose How You Want to Start
  | 'trial_material'          // Step 2: Upload Your Trial Material
  | 'direct_options'          // Upload Your Files (2 top, 1 bottom centered)
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
              {t('book.chooseStartTitle1', 'Choose How You Want')} <br />
              <span className="cyan-highlight-text">{t('book.chooseStartTitle2', 'to Start')}</span>
            </h1>
            <p className="flow-subtitle">
              {t('book.chooseStartSub', 'You can try a trial session with an instructor or book a session directly.')}
            </p>
          </div>

          <div className="flow-cards-two-grid">
            {/* Card 1: Trial Session */}
            <div className="flow-dark-choice-card">
              <div className="dark-card-icon-box">
                <span className="card-icon-symbol">
                  <img src="/landing-icons/Icon (2).png" className="book-card-icon-img" alt="Trial Session" />
                </span>
              </div>
              <h2>{t('book.trialSession', 'Trial Session')}</h2>
              <p>
                {t('book.trialDesc', 'Choose an instructor and start with a trial explanation session to see if they fit your needs.')}
              </p>
              <button 
                onClick={() => setStep('trial_material')} 
                className="btn-primary choice-cta-btn"
              >
                {t('book.startTrial', 'Start Trial')}
              </button>
            </div>

            {/* Card 2: Direct Booking */}
            <div className="flow-dark-choice-card">
              <div className="dark-card-icon-box">
                <span className="card-icon-symbol">
                  <img src="/landing-icons/Icon (5).png" className="book-card-icon-img" alt="Direct Booking" />
                </span>
              </div>
              <h2>{t('book.directBooking', 'Direct Booking')}</h2>
              <p>
                {t('book.directDesc', 'Upload your lecture or material and book an explanation session directly with your preferred tutor.')}
              </p>
              <button 
                onClick={() => setStep('direct_options')} 
                className="btn-primary choice-cta-btn"
              >
                {t('book.bookNow', 'Book Now')}
              </button>
            </div>
          </div>

          <p className="flow-bottom-help text-center">
            {t('book.notSure', '⚙️ Not sure which one to choose?')} <span className="help-link" onClick={() => navigate('/contact')}>{t('book.chatSupport', 'Chat with support')}</span>
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
              {t('orders.back', '← Back')}
            </button>
          </div>

          <div className="flow-title-wrap text-center">
            <h1 className="flow-main-title">{t('book.uploadTrialMaterial', 'Upload Your Trial Material')}</h1>
            <p className="flow-subtitle">
              {t('book.uploadTrialSub', 'Upload a small sample from the material you want explained during the trial session.')}
            </p>
          </div>

          <div className="flow-form-card-container">
            <form onSubmit={handleTrialSubmit} className="subject-request-form">
              <div className="form-card-header">
                <span className="header-doc-icon">
                  <img src="/landing-icons/Icon (5).png" className="book-header-icon-img" alt="Document" />
                </span>
                <h2>{t('book.subjectRequest', 'Subject Request')}</h2>
              </div>

              {/* Dashed Drag & Drop Box */}
              <div className="materials-upload-group">
                <label className="input-group-label">{t('book.materials', 'MATERIALS')}</label>
                <div className="dashed-dropzone">
                  <span className="drop-cloud-icon">
                    <img src="/landing-icons/Icon (9).png" className="book-drop-icon-img" alt="Upload" />
                  </span>
                  <strong>{t('book.dragDropFiles', 'Drag-and-drop area for files')}</strong>
                  <span className="drop-subtext">{t('book.uploadSupportTypes', 'Upload PDF, DOC/DOCX, or Images')}</span>

                  <input 
                    type="file" 
                    id="trial-file-input" 
                    onChange={handleFileSelect} 
                    style={{ display: 'none' }} 
                  />
                  <label htmlFor="trial-file-input" className="btn-primary browse-files-btn">
                    {fileName ? `Selected: ${fileName}` : t('book.browseFiles', 'Browse Files')}
                  </label>
                </div>
              </div>

              {/* Subject Name Input */}
              <div className="form-input-group">
                <label className="input-group-label">{t('book.subjectName', 'SUBJECT NAME')}</label>
                <input 
                  type="text" 
                  placeholder={t('book.subjectPlaceholder', 'e.g., Mathematics, Physics')}
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  required
                />
              </div>

              {/* Trial Deadline Input */}
              <div className="form-input-group">
                <label className="input-group-label">{t('book.trialDeadline', 'TRIAL DEADLINE')}</label>
                <input 
                  type="date" 
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </div>

              {/* Description Input */}
              <div className="form-input-group">
                <label className="input-group-label">{t('book.description', 'DESCRIPTION')}</label>
                <textarea 
                  rows={4}
                  placeholder={t('book.descPlaceholder', 'What specific questions or difficult points should we cover?')}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Add Another Subject Button */}
              <button type="button" className="add-another-subject-btn">
                {t('book.addAnotherSubject', '⊕ Add Another Subject')}
              </button>

              {/* Submit Button */}
              <button type="submit" className="btn-dark submit-trial-btn">
                {t('book.submitTrialBtn', 'SUBMIT TRIAL REQUEST')}
              </button>

              <p className="terms-caption text-center">
                {t('book.termsNotice', 'By submitting, you agree to our terms of service regarding trial sessions.')}
              </p>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          STEP 3: Upload Your Files
         ------------------------------------------------------------- */}
      {step === 'direct_options' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => setStep('start_choice')} className="back-link-btn">
              {t('orders.back', '← Back')}
            </button>
          </div>

          <div className="flow-title-wrap text-center">
            <h1 className="flow-main-title">{t('book.uploadYourFiles', 'Upload Your Files')}</h1>
            <p className="flow-subtitle">
              {t('book.uploadYourFilesSub', 'Choose what type of file you want to upload to your workspace.')}
            </p>
          </div>

          <div className="direct-booking-layout">
            {/* Top Row: 2 Cards */}
            <div className="top-two-cards-row">
              {/* Card 1: Lecture Upload (explanation by video) */}
              <div className="flow-dark-choice-card direct-rect-card">
                <div className="dark-card-icon-box rect-icon-box">
                  <span className="card-icon-symbol">
                    <img src="/landing-icons/Icon (5).png" className="book-card-icon-img" alt="Lecture Video" />
                  </span>
                </div>
                <h2>{t('book.lectureUploadVideo', 'Lecture Upload (explanation by video)')}</h2>
                <p>
                  {t('book.lectureUploadVideoDesc', 'Share your knowledge. Upload video lessons, PDF textbooks, or presentation slides.')}
                </p>
                <button 
                  onClick={() => setStep('plan_selection')} 
                  className="btn-primary choice-rect-btn"
                >
                  {t('book.getStarted', 'Get Started')}
                </button>
              </div>

              {/* Card 2: Lecture Upload (explanation by live) */}
              <div className="flow-dark-choice-card direct-rect-card">
                <div className="dark-card-icon-box rect-icon-box">
                  <span className="card-icon-symbol">
                    <img src="/landing-icons/Icon (3).png" className="book-card-icon-img" alt="Lecture Live" />
                  </span>
                </div>
                <h2>{t('book.lectureUploadLive', 'Lecture Upload (explanation by live)')}</h2>
                <p>
                  {t('book.lectureUploadLiveDesc', 'Share your knowledge. Upload video lessons, PDF textbooks, or presentation slides.')}
                </p>
                <button 
                  onClick={() => setStep('live_explanation_form')} 
                  className="btn-primary choice-rect-btn"
                >
                  {t('book.getStarted', 'Get Started')}
                </button>
              </div>
            </div>

            {/* Bottom Row: 1 Card Centered */}
            <div className="bottom-one-card-row">
              <div className="flow-dark-choice-card direct-rect-card">
                <div className="dark-card-icon-box rect-icon-box">
                  <span className="card-icon-symbol">
                    <img src="/landing-icons/Icon.png" className="book-card-icon-img" alt="Assignment Upload" />
                  </span>
                </div>
                <h2>{t('book.assignmentUpload', 'Assignment Upload')}</h2>
                <p>
                  {t('book.assignmentUploadDesc', 'Submit your work. Upload project documents, checklists, or research papers.')}
                </p>
                <button 
                  onClick={() => setStep('assignment_upload_form')} 
                  className="btn-primary choice-rect-btn"
                >
                  {t('book.getStarted', 'Get Started')}
                </button>
              </div>
            </div>
          </div>

          <p className="flow-bottom-help text-center" style={{ marginTop: '3rem' }}>
            {t('book.supportedFormats', '⚙️ Supported formats: MP4, PDF, DOCX, ZIP (Max 500MB)')}
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
              {t('orders.back', '← Back')}
            </button>
          </div>

          <div className="flow-title-wrap text-center">
            <h1 className="flow-main-title">{t('book.uploadAssignment', 'Upload Assignment')}</h1>
            <p className="flow-subtitle">
              {t('book.uploadAssignmentSub', 'Upload your assignment and set your requirements for instructors. Our experts will review it promptly.')}
            </p>
          </div>

          <div className="flow-form-card-container">
            <form onSubmit={handleAssignmentSubmit} className="subject-request-form">
              {/* Dashed Drag & Drop Box */}
              <div className="materials-upload-group">
                <div className="dashed-dropzone assignment-dropzone">
                  <span className="drop-cloud-icon">
                    <img src="/landing-icons/Icon (9).png" className="book-drop-icon-img" alt="Upload" />
                  </span>
                  <strong>{t('book.dragDropAssignment', 'Drag & Drop your assignment file here or click to upload')}</strong>
                  <span className="drop-subtext">{t('book.asgnSupportTypes', 'SUPPORTED: PDF, DOC, PPT, IMAGES, ZIP')}</span>

                  <input 
                    type="file" 
                    id="asgn-file-input" 
                    onChange={handleFileSelect} 
                    style={{ display: 'none' }} 
                  />
                  <label htmlFor="asgn-file-input" className="btn-primary browse-files-btn">
                    {fileName ? `Selected: ${fileName}` : t('book.selectFile', 'Select File')}
                  </label>
                </div>
              </div>

              {/* Price & Deadline 2-Column Grid */}
              <div className="form-two-cols-grid">
                <div className="form-input-group">
                  <label className="input-group-label">{t('book.setPriceLabel', 'SET YOUR PRICE (SAR) , (NOT LESS THAN 60 SAR)')}</label>
                  <input 
                    type="number" 
                    min="60"
                    placeholder={t('book.pricePlaceholder', '💵 e.g. 100')}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="form-input-group">
                  <label className="input-group-label">{t('book.selectDeadline', 'SELECT DEADLINE')}</label>
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
                <label className="input-group-label">{t('book.asgnDescLabel', 'ASSIGNMENT DESCRIPTION')}</label>
                <textarea 
                  rows={4}
                  placeholder={t('book.asgnDescPlaceholder', 'Describe your assignment requirements in detail...')}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Submit Assignment Button */}
              <button type="submit" className="btn-primary submit-asgn-cyan-btn">
                {t('book.submitAsgnBtn', '🚀 Submit Assignment')}
              </button>
            </form>
          </div>

          {/* 3 Bottom Feature Cards */}
          <div className="three-features-grid text-center">
            <div className="feature-dark-card">
              <span className="feat-icon">
                <img src="/landing-icons/Icon (8).png" className="book-feat-icon-img" alt="Secure Payment" />
              </span>
              <h3>{t('book.securePayment', 'Secure Payment')}</h3>
              <p>{t('book.encryptedTrans', 'ENCRYPTED TRANSACTIONS')}</p>
            </div>
            <div className="feature-dark-card">
              <span className="feat-icon">
                <img src="/landing-icons/Icon (4).png" className="book-feat-icon-img" alt="Fast Delivery" />
              </span>
              <h3>{t('book.fastDelivery', 'Fast Delivery')}</h3>
              <p>{t('book.meetDeadline', 'MEET EVERY DEADLINE')}</p>
            </div>
            <div className="feature-dark-card">
              <span className="feat-icon">
                <img src="/landing-icons/Icon (10).png" className="book-feat-icon-img" alt="Top Quality" />
              </span>
              <h3>{t('book.topQuality', 'Top Quality')}</h3>
              <p>{t('book.verifiedInstructors', 'VERIFIED INSTRUCTORS')}</p>
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
                <strong className="toast-caps-title">{t('book.asgnSuccessTitle', 'ASSIGNMENT UPLOADED SUCCESSFULLY')}</strong>
                <button onClick={() => setShowToast(false)} className="toast-close-btn">&times;</button>
              </div>
              <p className="toast-body-text">
                {t('book.asgnSuccessSub', 'Your assignment has been uploaded successfully and added to My Orders.')}
              </p>
              <span className="toast-timestamp">Just now</span>
            </div>
          )}

          <div className="trial-success-center text-center">
            <div className="success-cyan-circle-icon">
              <span className="cyan-check">✓</span>
            </div>

            <h1 className="success-main-title">
              {t('book.asgnSuccessTitle', 'Assignment Uploaded Successfully')}
            </h1>

            <p className="success-subtext">
              {t('book.asgnSuccessSub', 'Your assignment has been uploaded and is now visible to instructors. We\'ll notify you once it\'s reviewed.')}
            </p>

            <button 
              onClick={() => navigate('/orders')} 
              className="btn-primary go-to-orders-btn"
            >
              {t('book.goToOrders', 'Go to My Orders →')}
            </button>

            <div className="dark-next-steps-banner">
              <span className="info-circle-icon">ℹ️</span>
              <div className="banner-text-wrap">
                <strong>{t('book.whatNext', 'What happens next?')}</strong>
                <p>{t('book.whatNextSub', 'Your instructor will be notified of your submission. You can track progress in the dashboard.')}</p>
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
              {t('orders.back', '← Back')}
            </button>
          </div>

          <div className="flow-title-wrap text-center">
            <h1 className="flow-main-title">{t('book.choosePlanTitle', 'Choose Your Explanation Plan')}</h1>
            <p className="flow-subtitle">
              {t('book.choosePlanSub', 'Select how you want your lecture to be explained. We offer flexible options to suit your academic needs.')}
            </p>
          </div>

          <div className="flow-cards-two-grid">
            {/* Plan 1: Hourly Explanation */}
            <div className="flow-dark-choice-card">
              <div className="dark-card-icon-box">
                <span className="card-icon-symbol">
                  <img src="/landing-icons/Icon (2).png" className="book-card-icon-img" alt="Hourly Plan" />
                </span>
              </div>
              <h2>{t('book.hourlyPlanTitle', 'Hourly Explanation')}</h2>
              <p>
                {t('book.hourlyPlanDesc', 'Get your lecture explained and pay by the hour. Perfect for quick clarifications or specific topic deep-dives.')}
              </p>
              <button 
                onClick={() => setStep('lecture_material_form')} 
                className="btn-primary choice-cta-btn"
              >
                {t('book.choosePlanBtn', 'Choose Plan')}
              </button>
            </div>

            {/* Plan 2: Package 15-Hour */}
            <div className="flow-dark-choice-card relative-card">
              <span className="most-popular-badge">{t('book.mostPopular', 'MOST POPULAR')}</span>
              <div className="dark-card-icon-box">
                <span className="card-icon-symbol">
                  <img src="/landing-icons/Icon (8).png" className="book-card-icon-img" alt="Package Plan" />
                </span>
              </div>
              <h2>{t('book.package15hTitle', 'package (15-hour by 500 SAR)')}</h2>
              <p>
                {t('book.package15hDesc', 'Get continuous help with your lectures during the whole package. Ideal for consistent academic support.')}
              </p>
              <button 
                onClick={() => setStep('subscription_details')} 
                className="btn-primary choice-cta-btn"
              >
                {t('book.choosePlanBtn', 'Choose Plan')}
              </button>
            </div>
          </div>

          {/* Bottom Trust Badges */}
          <div className="trust-badges-row text-center">
            <span><img src="/landing-icons/Icon (10).png" className="trust-badge-icon-img" alt="" /> {t('book.expertTutors', 'Expert Tutors')}</span>
            <span><img src="/landing-icons/Icon (8).png" className="trust-badge-icon-img" alt="" /> {t('book.securePayBadge', 'Secure Payment')}</span>
            <span><img src="/landing-icons/Icon (6).png" className="trust-badge-icon-img" alt="" /> {t('book.support247Badge', '24/7 Support')}</span>
            <span><img src="/landing-icons/Icon (11).png" className="trust-badge-icon-img" alt="" /> {t('book.recordedSessionsBadge', 'Recorded Sessions')}</span>
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
              {t('orders.back', '← Back')}
            </button>
          </div>

          <div className="flow-title-wrap text-center" style={{ marginBottom: '3rem' }}>
            <h1 className="flow-main-title">{t('book.subTitle', 'Explanation Subscription')}</h1>
          </div>

          <div className="subscription-card-box">
            <span className="current-sel-tag">{t('book.currentSel', 'CURRENT SELECTION')}</span>
            <h2>{t('book.packagePlanName', 'Packaging Plan')}</h2>
            <div className="sub-price-row">
              <span className="price-num">500</span>
              <span className="price-unit">{t('book.sarPer15h', 'SAR / 15 Hour')}</span>
            </div>
            <p className="sub-check-desc">
              {t('book.subDesc', '✓ You can upload lecture materials and request explanations from instructors during the subscription (15 HOURS)')}
            </p>
          </div>

          <div className="subscription-actions-row">
            <button onClick={handlePayment} className="btn-primary pay-now-btn">
              {t('book.paymentBtn', 'Payment')}
            </button>
            <button onClick={() => navigate('/contact')} className="btn-outline-white contact-us-sub-btn">
              {t('book.contactUsBtn', 'Contact Us 💬')}
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
                  {t('book.paySuccessToast', '500 SAR HAS BEEN WITHDRAWN FROM YOUR WALLET AND YOU ARE NOW SUBSCRIBED TO THE 15-HOUR PACKAGE.')}
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
              {t('book.paySuccessTitle', 'Payment completed successfully')}
            </h1>

            <p className="success-subtext">
              {t('book.paySuccessSub', 'You now have 15 hours of recorded explanations that you can use immediately. We wish you all success and excellence.')}
            </p>

            <button 
              onClick={() => setStep('lecture_material_form')} 
              className="btn-primary go-to-orders-btn"
            >
              {t('book.goToUploadFile', 'Go to upload file →')}
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
              {t('orders.back', '← Back')}
            </button>
          </div>

          <div className="flow-title-wrap text-center">
            <h1 className="flow-main-title">
              {t('book.liveExplanationTitle1', 'Upload Your Trial Material For')} <br />
              <span className="cyan-highlight-text">{t('book.liveExplanationTitle2', 'Explanation By Live')}</span>
            </h1>
            <p className="flow-subtitle">
              {t('book.uploadTrialSub', 'Upload a small sample from the material you want explained during the trial session.')}
            </p>
          </div>

          <div className="flow-form-card-container">
            <form onSubmit={handleTrialSubmit} className="subject-request-form">
              <div className="form-card-header">
                <span className="header-doc-icon">
                  <img src="/landing-icons/Icon (5).png" className="book-header-icon-img" alt="Document" />
                </span>
                <h2>{t('book.subjectRequest', 'Subject Request')}</h2>
              </div>

              {/* Dashed Drag & Drop Box */}
              <div className="materials-upload-group">
                <label className="input-group-label">{t('book.materials', 'MATERIALS')}</label>
                <div className="dashed-dropzone">
                  <span className="drop-cloud-icon">
                    <img src="/landing-icons/Icon (9).png" className="book-drop-icon-img" alt="Upload" />
                  </span>
                  <strong>{t('book.dragDropFiles', 'Drag-and-drop area for files')}</strong>
                  <span className="drop-subtext">{t('book.uploadSupportTypes', 'Upload PDF, DOC/DOCX, or Images')}</span>

                  <input 
                    type="file" 
                    id="live-file-input" 
                    onChange={handleFileSelect} 
                    style={{ display: 'none' }} 
                  />
                  <label htmlFor="live-file-input" className="btn-primary browse-files-btn">
                    {fileName ? `Selected: ${fileName}` : t('book.browseFiles', 'Browse Files')}
                  </label>
                </div>
              </div>

              {/* Subject Name Input */}
              <div className="form-input-group">
                <label className="input-group-label">{t('book.subjectName', 'SUBJECT NAME')}</label>
                <input 
                  type="text" 
                  placeholder={t('book.subjectPlaceholder', 'e.g., Mathematics, Physics')}
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  required
                />
              </div>

              {/* Trial Deadline Input */}
              <div className="form-input-group">
                <label className="input-group-label">{t('book.trialDeadline', 'TRIAL DEADLINE')}</label>
                <input 
                  type="date" 
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </div>

              {/* Description Input */}
              <div className="form-input-group">
                <label className="input-group-label">{t('book.description', 'DESCRIPTION')}</label>
                <textarea 
                  rows={4}
                  placeholder={t('book.descPlaceholder', 'What specific questions or difficult points should we cover?')}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Add Another Subject Button */}
              <button type="button" className="add-another-subject-btn">
                {t('book.addAnotherSubject', '⊕ Add Another Subject')}
              </button>

              {/* Submit Button */}
              <button type="submit" className="btn-dark submit-trial-btn">
                {t('book.submitTrialBtn', 'SUBMIT TRIAL REQUEST')}
              </button>

              <p className="terms-caption text-center">
                {t('book.termsNotice', 'By submitting, you agree to our terms of service regarding trial sessions.')}
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
              {t('orders.back', '← Back')}
            </button>
          </div>

          <div className="flow-title-wrap text-center">
            <h1 className="flow-main-title">{t('book.lectureMaterialTitle', 'Upload Your Lecture Material')}</h1>
            <p className="flow-subtitle">
              {t('book.lectureMaterialSub', 'Upload the files related to the lecture you want explained.')}
            </p>
          </div>

          <div className="flow-form-card-container">
            <form onSubmit={handleLectureSubmit} className="subject-request-form">
              <div className="form-card-header">
                <span className="header-doc-icon">
                  <img src="/landing-icons/Icon (5).png" className="book-header-icon-img" alt="Document" />
                </span>
                <h2>{t('book.subjectRequest', 'Subject Request')}</h2>
              </div>

              {/* Dashed Drag & Drop Box */}
              <div className="materials-upload-group">
                <label className="input-group-label">{t('book.lectureFilesLabel', 'LECTURE FILES')}</label>
                <div className="dashed-dropzone">
                  <span className="drop-cloud-icon">
                    <img src="/landing-icons/Icon (9).png" className="book-drop-icon-img" alt="Upload" />
                  </span>
                  <strong>{t('book.dragDropFiles', 'Drag-and-drop area for files')}</strong>
                  <span className="drop-subtext">{t('book.uploadSupportTypes', 'Upload PDF, DOC/DOCX, or Images')}</span>

                  <input 
                    type="file" 
                    id="lecture-file-input" 
                    onChange={handleFileSelect} 
                    style={{ display: 'none' }} 
                  />
                  <label htmlFor="lecture-file-input" className="btn-primary browse-files-btn">
                    {fileName ? `Selected: ${fileName}` : t('book.browseFiles', 'Browse Files')}
                  </label>
                </div>
              </div>

              {/* Subject Name Input */}
              <div className="form-input-group">
                <label className="input-group-label">{t('book.subjectName', 'SUBJECT NAME')}</label>
                <input 
                  type="text" 
                  placeholder={t('book.subjectPlaceholder', 'e.g., Mathematics, Physics')}
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  required
                />
              </div>

              {/* Explanation Deadline Input */}
              <div className="form-input-group">
                <label className="input-group-label">{t('book.explanationDeadline', 'EXPLANATION DEADLINE')}</label>
                <input 
                  type="date" 
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </div>

              {/* Description Input */}
              <div className="form-input-group">
                <label className="input-group-label">{t('book.description', 'DESCRIPTION')}</label>
                <textarea 
                  rows={4}
                  placeholder={t('book.descPlaceholder', 'What specific questions or difficult points should we cover?')}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Add Another Subject Button */}
              <button type="button" className="add-another-subject-btn">
                {t('book.addAnotherSubject', '⊕ Add Another Subject')}
              </button>

              {/* Submit Button */}
              <button type="submit" className="btn-dark submit-trial-btn">
                {t('book.submitBookingRequest', 'SUBMIT BOOKING REQUEST')}
              </button>

              <p className="terms-caption text-center">
                {t('book.termsNotice', 'By submitting, you agree to our terms of service regarding trial sessions.')}
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
                <strong>{t('book.trialSuccessTitle', 'Trial request uploaded successfully')}</strong>
                <button onClick={() => setShowToast(false)} className="toast-close-btn">&times;</button>
              </div>
              <p className="toast-body-text">
                {t('book.trialSuccessSub', 'Your request has been added to My Orders. It will be shown to multiple instructors. Please wait for their response.')}
              </p>
            </div>
          )}

          <div className="trial-success-center text-center">
            <div className="success-cyan-circle-icon">
              <span className="cyan-check">✓</span>
            </div>

            <h1 className="success-main-title">
              {t('book.trialSuccessTitle', 'Your Trial Request Has Been Submitted Successfully')}
            </h1>

            <p className="success-subtext">
              {t('book.trialSuccessSub', 'Your request has been added to My Orders and will be reviewed by multiple instructors.')}
            </p>

            <button 
              onClick={() => navigate('/orders')} 
              className="btn-primary go-to-orders-btn"
            >
              {t('book.goToOrders', 'Go to My Orders →')}
            </button>

            <div className="dark-next-steps-banner">
              <span className="info-circle-icon">ℹ️</span>
              <div className="banner-text-wrap">
                <strong>{t('book.whatNext', 'What happens next?')}</strong>
                <p>{t('book.whatNextSub', 'Your instructor will be notified of your submission. You can track progress in the dashboard.')}</p>
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
                <strong className="toast-caps-title">{t('book.lectureSuccessTitle', 'LECTURE MATERIALS UPLOADED SUCCESSFULLY')}</strong>
                <button onClick={() => setShowToast(false)} className="toast-close-btn">&times;</button>
              </div>
              <p className="toast-body-text">
                {t('book.lectureSuccessSub', 'Your request has been added to My Orders. It will be shown to multiple instructors. Please wait for their response.')}
              </p>
            </div>
          )}

          <div className="trial-success-center text-center">
            <div className="success-cyan-circle-icon">
              <span className="cyan-check">✓</span>
            </div>

            <h1 className="success-main-title">
              {t('book.lectureSuccessTitle', 'Lecture Materials Uploaded Successfully')}
            </h1>

            <p className="success-subtext">
              {t('book.lectureSuccessSub', 'Your request has been added to My Orders. Your lecture will be shown to multiple instructors, and you will receive their offers soon.')}
            </p>

            <button 
              onClick={() => navigate('/orders')} 
              className="btn-primary go-to-orders-btn"
            >
              {t('book.goToOrders', 'Go to My Orders →')}
            </button>

            <div className="dark-next-steps-banner">
              <span className="info-circle-icon">ℹ️</span>
              <div className="banner-text-wrap">
                <strong>{t('book.whatNext', 'What happens next?')}</strong>
                <p>{t('book.whatNextSub', 'Your instructor will be notified of your submission. You can track progress in the dashboard.')}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSession;
