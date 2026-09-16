import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './StudentOrders.css';

type OrderFlowStep = 
  | 'orders_categories'             // Batch 1 Pic 1: 3 Dark Category Cards (Trial, Assignment, Explain)
  | 'explain_type_selection'        // Explains Orders: 2 Dark Cards (Video Order vs Live Order)
  | 'orders_list'                   // Batch 1 Pic 2 & Batch 2 Pic 3: Trial Requests & Offers
  | 'explain_orders_list'           // Batch 5 Pic 2 & Batch 6 Pic 1 & Batch 8 Pic 2: Explain Requests & Offers
  | 'instructor_offers'             // Batch 5 Pic 3 & Batch 6 Pic 2: Instructor Offers (Ahmed.K 150 SAR, Omar.K 250 SAR, Sarah.M 200 SAR)
  | 'confirm_your_session_java'     // Batch 6 Pic 3: Confirm Your Session (Ahmed.k, Java programming, 3 Hours, 50 SAR/hr, 150 SAR)
  | 'payment_successful_java_150'   // Batch 7 Pic 1: Payment Successful (Ahmed.k, Java programming, 3 Hours, 150 SAR)
  | 'hourly_trial_submissions_live' // Batch 7 Pic 2: Hourly Trial Instructor Submissions(For live) (Data base)
  | 'book_session_database'         // Batch 7 Pic 3: Book Session (Ahmed.F, Data base, 50 SAR/hr)
  | 'assignment_orders_list'        // Batch 4 Pic 2: Assignment Solution Requests List
  | 'assignment_order_details'      // Batch 4 Pic 3: Assignment Order Details (Data Structures Homework)
  | 'payment_successful_120_asg'    // Batch 5 Pic 1: Payment Successful (120 SAR Assignment)
  | 'hourly_trial_submissions'      // Batch 1 Pic 3: Hourly Trial Instructor Submissions (Calculus)
  | 'book_session_chat'             // Batch 2 Pic 1: Book Session Dark Card & Chat Section
  | 'materials_uploaded_success'    // Batch 2 Pic 2 & Batch 8 Pic 1: Lecture Materials Uploaded Successfully & Toast
  | 'confirm_order_150'             // Batch 3 Pic 1: Confirm Your order (150 SAR)
  | 'payment_successful_150'        // Batch 3 Pic 2: Payment Successful (150 SAR)
  | 'confirm_order_subscription'   // Batch 3 Pic 3: Confirm Your order (Physics - You have been subscribed)
  | 'package_deducted_success_3hr'  // Batch 4 Pic 1: Confirmed Successful (3 Hour deducted from package)
  | 'live_chat_confirm_offer'       // Batch 8 Pic 3: Live Chat & 8-Field Offer Summary (210 SAR)
  | 'payment_successful_210_database'// Batch 9 Pic 1: Payment Successful (Ahmed.F, Data base, 3 Hours, 210 SAR)
  | 'confirm_order_subscription_math'// Batch 5 Pic 2 & Batch 9 Pic 2: Confirm Mathematics Subscription
  | 'package_deducted_success_math_12hr'; // Batch 9 Pic 2: Confirmed Successful (3/15 Hours used, 12 Remaining)

interface ChatMessage {
  id: string;
  sender: 'instructor' | 'student' | 'system';
  text: string;
  time: string;
}

const StudentOrders = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [step, setStep] = useState<OrderFlowStep>('orders_categories');
  const [selectedCategory, setSelectedCategory] = useState<'Trial' | 'Assignment' | 'Explain'>('Trial');
  const [activeSegment, setActiveSegment] = useState<'request' | 'offers'>('request');
  const [showToast, setShowToast] = useState(true);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Live Chat State (Batch 8 Pic 3)
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'instructor',
      text: "Hi Ahmed, as your instructor, I'll be covering this course in 6 sessions, each session will be 30 minutes. Is that okay with you?",
      time: '7:02 PM'
    },
    {
      id: '2',
      sender: 'student',
      text: "Yes, that sounds perfect 👍",
      time: '7:04 PM'
    },
    {
      id: '3',
      sender: 'system',
      text: 'ENCRYPTED CHAT SESSION STARTED',
      time: ''
    },
    {
      id: '4',
      sender: 'instructor',
      text: 'Great. The first session will be on Monday, May 5th, at 7:00 PM.',
      time: '7:06 PM'
    }
  ]);

  const [explainFilter, setExplainFilter] = useState<'all' | 'video' | 'live'>('all');

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'student',
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');
  };

  const handleCategoryClick = (category: 'Trial' | 'Assignment' | 'Explain') => {
    setSelectedCategory(category);
    setActiveSegment('request');
    if (category === 'Assignment') {
      setStep('assignment_orders_list');
    } else if (category === 'Explain') {
      setStep('explain_type_selection');
    } else {
      setStep('orders_list');
    }
  };

  const handleApproveSubmission = (instructorName: string) => {
    alert(`You approved ${instructorName}'s trial submission! Proceeding to Book Session.`);
    setStep('book_session_database');
  };

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        setUploadedFileName(target.files[0].name);
      }
    };
    input.click();
  };

  const handleConfirmSendOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setStep('materials_uploaded_success');
  };

  const handleGoToOffers = () => {
    setActiveSegment('offers');
    setStep('explain_orders_list');
  };

  return (
    <div className="my-orders-flow-page container animate-fade-in">
      {/* -------------------------------------------------------------
          BATCH 1 PIC 1: My Orders Category Selection (3 Dark Navy Cards)
         ------------------------------------------------------------- */}
      {step === 'orders_categories' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => navigate('/student/dashboard')} className="back-link-btn">
              {t('orders.back', '← Back')}
            </button>
          </div>

          <div className="flow-title-wrap text-center">
            <h1 className="flow-main-title">{t('orders.myOrders', 'My Orders')}</h1>
            <p className="flow-subtitle">
              {t('orders.chooseType', 'Choose the type of orders you want to see it.')}
            </p>
          </div>

          <div className="flow-cards-three-grid">
            {/* Category 1: Trial */}
            <div className="flow-dark-choice-card rect-orders-card">
              <div className="dark-card-icon-box cyan-square">
                <span className="card-icon-symbol">☑</span>
              </div>
              <h2>{t('orders.trial', 'Trial')}</h2>
              <button 
                onClick={() => handleCategoryClick('Trial')} 
                className="btn-primary choice-rect-btn"
              >
                {t('orders.explainBtn', 'Explain')}
              </button>
            </div>

            {/* Category 2: Assignment */}
            <div className="flow-dark-choice-card rect-orders-card">
              <div className="dark-card-icon-box cyan-circle">
                <span className="card-icon-symbol">
                  <img src="/pdf-icon.png" alt="PDF" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                </span>
              </div>
              <h2>{t('orders.assignment', 'Assignment')}</h2>
              <button 
                onClick={() => handleCategoryClick('Assignment')} 
                className="btn-primary choice-rect-btn"
              >
                {t('orders.assignmentsBtn', 'Assignments')}
              </button>
            </div>

            {/* Category 3: Explain */}
            <div className="flow-dark-choice-card rect-orders-card">
              <div className="dark-card-icon-box cyan-circle">
                <span className="card-icon-symbol">
                  <img src="/student-dash-icons/Icon (14).png" alt="Explain" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                </span>
              </div>
              <h2>{t('orders.explain', 'Explain')}</h2>
              <button 
                onClick={() => handleCategoryClick('Explain')} 
                className="btn-primary choice-rect-btn"
              >
                {t('orders.explainBtn', 'Explain')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          EXPLAINS ORDERS TYPE SELECTION SCREEN: 2 Dark Cards (Video vs Live)
         ------------------------------------------------------------- */}
      {step === 'explain_type_selection' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => setStep('orders_categories')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="flow-title-wrap text-center" style={{ marginBottom: '3.5rem' }}>
            <h1 className="flow-main-title" style={{ fontSize: '3rem', lineHeight: '1.1' }}>
              Explains<br />Orders
            </h1>
            <p className="flow-subtitle" style={{ marginTop: '0.5rem' }}>
              Choose the type of orders you want to see it.
            </p>
          </div>

          <div className="flow-cards-two-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2.5rem', maxWidth: '760px', margin: '0 auto 4rem auto' }}>
            {/* Card 1: (explantion by video) */}
            <div className="flow-dark-choice-card rect-orders-card" style={{ padding: '3.5rem 2rem' }}>
              <div className="dark-card-icon-box cyan-square" style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#182C3D', color: '#56B8E6', marginBottom: '2rem' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#56B8E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="4" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
              </div>
              <h2 style={{ color: '#FFFFFF', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 2.5rem 0' }}>
                (explantion by video)
              </h2>
              <button 
                onClick={() => {
                  setExplainFilter('video');
                  setStep('explain_orders_list');
                }} 
                className="btn-primary choice-rect-btn"
                style={{ width: '100%', padding: '0.9rem 1rem', background: '#56B8E6', color: '#0F172A', fontWeight: 700, borderRadius: '8px', border: 'none', cursor: 'pointer' }}
              >
                video order
              </button>
            </div>

            {/* Card 2: (explantion by live ) */}
            <div className="flow-dark-choice-card rect-orders-card" style={{ padding: '3.5rem 2rem' }}>
              <div className="dark-card-icon-box cyan-square" style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#182C3D', color: '#56B8E6', marginBottom: '2rem' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#56B8E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="4" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
              </div>
              <h2 style={{ color: '#FFFFFF', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 2.5rem 0' }}>
                (explantion by live )
              </h2>
              <button 
                onClick={() => {
                  setExplainFilter('live');
                  setActiveSegment('request');
                  setStep('explain_orders_list');
                }} 
                className="btn-primary choice-rect-btn"
                style={{ width: '100%', padding: '0.9rem 1rem', background: '#56B8E6', color: '#0F172A', fontWeight: 700, borderRadius: '8px', border: 'none', cursor: 'pointer' }}
              >
                live order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          BATCH 5 PIC 2 & BATCH 6 PIC 1 & BATCH 8 PIC 2: Explain Orders Requests List Screen
         ------------------------------------------------------------- */}
      {step === 'explain_orders_list' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => setStep('explain_type_selection')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="flow-title-wrap">
            <div className="title-with-pill-row">
              <h1 className="flow-main-title text-left">My Orders</h1>
              {explainFilter !== 'all' && (
                <span className="active-category-pill" style={{ textTransform: 'uppercase' }}>
                  {explainFilter === 'video' ? 'Explanation by Video' : 'Explanation by Live'}
                </span>
              )}
            </div>
            <p className="flow-subtitle text-left">
              Track the status of your requests, assignments, and subscriptions.
            </p>
          </div>

          {/* 2 Segmented Cards (Request vs Offers) - FOR LIVE / ALL ONLY */}
          {explainFilter !== 'video' && (
            <div className="segmented-tabs-row">
              <div 
                className={`segment-box ${activeSegment === 'request' ? 'active' : ''}`}
                onClick={() => setActiveSegment('request')}
              >
                {activeSegment === 'request' && <span className="blue-check-badge">✓</span>}
                <h3 className="req-title">Request</h3>
                <p>The orders you have requested.</p>
              </div>

              <div 
                className={`segment-box ${activeSegment === 'offers' ? 'active' : ''}`}
                onClick={() => setActiveSegment('offers')}
              >
                {activeSegment === 'offers' && <span className="blue-check-badge">✓</span>}
                <h3 className="off-title">Offers</h3>
                <p>The instructor offer you have selected(FOR LIVE ONLY ).</p>
              </div>
            </div>
          )}

          {explainFilter === 'video' || activeSegment === 'request' ? (
            <div className="orders-items-list">
              {/* Item 1: Java Programming (Video Order) */}
              {(explainFilter === 'all' || explainFilter === 'video') && (
                <div className="order-item-card card">
                  <div className="order-item-left">
                    <div className="order-meta-row">
                      <span className="order-date-text">ORDER DATE: OCT 20, 2026</span>
                      <span className="order-approved-badge">• Approved</span>
                    </div>
                    <h2>Java Programming</h2>
                    <p className="order-status-sub">Java Programming | Status: Approved</p>
                  </div>
                  <button 
                    onClick={() => setStep('instructor_offers')} 
                    className="btn-dark enter-order-dark-btn"
                  >
                    Enter Order
                  </button>
                </div>
              )}

              {/* Item 2: DATA BASE (Live Order) */}
              {(explainFilter === 'all' || explainFilter === 'live') && (
                <div className="order-item-card card">
                  <div className="order-item-left">
                    <div className="order-meta-row">
                      <span className="order-date-text">ORDER DATE: OCT 16, 2026</span>
                      <span className="order-approved-badge">• Approved</span>
                    </div>
                    <h2>DATA BASE</h2>
                    <p className="order-status-sub">DATA BASE | Status: Approved</p>
                  </div>
                  <button 
                    onClick={() => setStep('hourly_trial_submissions_live')} 
                    className="btn-dark enter-order-dark-btn"
                  >
                    Enter Order
                  </button>
                </div>
              )}

              {/* Item 3: Mathematics (Subscription Order) */}
              {explainFilter === 'all' && (
                <div className="order-item-card card">
                  <div className="order-item-left">
                    <div className="order-meta-row">
                      <span className="order-date-text">ORDER DATE: OCT 15, 2026</span>
                      <span className="order-approved-badge">• Approved</span>
                    </div>
                    <h2>packaging Subscription - Mathematics</h2>
                    <p className="order-status-sub">Mathematics | Status: Active</p>
                  </div>
                  <button 
                    onClick={() => setStep('confirm_order_subscription_math')} 
                    className="btn-dark enter-order-dark-btn"
                  >
                    Enter Order
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Offers Tab Selected (Batch 8 Pic 2) */
            <div className="orders-items-list">
              <div className="order-item-card card">
                <div className="order-item-left">
                  <div className="order-meta-row">
                    <span className="order-date-text">ORDER DATE: OCT 16, 2026</span>
                    <span className="order-approved-badge">• Approved</span>
                  </div>
                  <h2>DATA BASE</h2>
                  <p className="order-status-sub">DATA BASE | Status: Approved</p>
                </div>
                <button 
                  onClick={() => setStep('live_chat_confirm_offer')} 
                  className="btn-dark enter-order-dark-btn"
                >
                  Enter Order
                </button>
              </div>
            </div>
          )}

          <div className="text-center" style={{ marginTop: '2.5rem' }}>
            <span className="view-history-link-text">View all order history ↓</span>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          BATCH 9 PIC 2: Confirm Mathematics Subscription
         ------------------------------------------------------------- */}
      {step === 'confirm_order_subscription_math' && (
        <div className="flow-step-container animate-fade-in">
          <div className="flow-header-nav">
            <button onClick={() => setStep('explain_orders_list')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="dark-book-session-card">
            <h2>Confirm Your order</h2>

            <div className="offer-summary-inner-box">
              <h3>Offer Summary</h3>

              <div className="four-fields-grid-summary">
                <div>
                  <span className="off-label">INSTRUCTOR</span>
                  <strong className="off-val">Ahmed.F</strong>
                </div>
                <div>
                  <span className="off-label">SUBJECT</span>
                  <strong className="off-val">Mathematics</strong>
                </div>
                <div>
                  <span className="off-label">HOURS</span>
                  <strong className="off-val">3 Hours</strong>
                </div>
                <div>
                  <span className="off-label">RATE</span>
                  <strong className="off-val">You have been subscribed</strong>
                </div>
              </div>
            </div>

            <button 
              onClick={() => { setShowToast(true); setStep('package_deducted_success_math_12hr'); }}
              className="btn-primary confirm-send-order-cyan-btn"
              style={{ marginTop: '2.5rem' }}
            >
              Confirm
            </button>

            <p className="terms-note-text text-center" style={{ marginTop: '1.25rem' }}>
              By clicking confirm, you agree to our Terms of Service
            </p>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          BATCH 9 PIC 2: Confirmed Successful (3/15 Hours used, 12 Remaining)
         ------------------------------------------------------------- */}
      {step === 'package_deducted_success_math_12hr' && (
        <div className="flow-step-container relative-container animate-fade-in" style={{ padding: '3rem 1rem' }}>
          {showToast && (
            <div className="top-right-toast-card">
              <div className="toast-header-row">
                <span className="toast-check-icon">✓</span>
                <strong className="toast-caps-title">YOU HAVE USED 3 HOURS OUT OF 15. YOU HAVE 12 HOURS REMAINING.</strong>
                <button onClick={() => setShowToast(false)} className="toast-close-btn">&times;</button>
              </div>
            </div>
          )}

          <div className="payment-success-dark-card">
            <div className="green-check-circle">✓</div>
            <h1 className="success-main-title white-text">Confirmed Successful</h1>
            <p className="success-subtext light-text">
              Your session has been confirmed and added to your courses.
            </p>

            <div className="payment-details-table">
              <div className="table-row-item">
                <span className="table-label">Instructor</span>
                <strong className="table-val">Ahmed.F</strong>
              </div>
              <div className="table-row-item">
                <span className="table-label">Subject</span>
                <strong className="table-val">Mathematics</strong>
              </div>
              <div className="table-row-item">
                <span className="table-label">Hours</span>
                <strong className="table-val">3 Hours</strong>
              </div>
            </div>

            <button 
              onClick={() => navigate('/courses')} 
              className="btn-primary go-to-orders-btn"
              style={{ width: '100%', borderRadius: '12px' }}
            >
              Go to My Courses
            </button>

            <p className="access-dashboard-subtext text-center">
              You can now access your session from your courses dashboard.
            </p>

            <div className="card-footer-note text-center">
              Your instructor will begin preparing your session shortly.
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          BATCH 7 PIC 2: Hourly Trial Instructor Submissions(For live)
         ------------------------------------------------------------- */}
      {step === 'hourly_trial_submissions_live' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => setStep('explain_orders_list')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="flow-title-wrap text-center">
            <h1 className="flow-main-title">Hourly Trial Instructor Submissions(For live)</h1>
            <p className="flow-subtitle">
              Multiple instructors reviewed your material and uploaded a trial explanation sample.
            </p>
          </div>

          {/* Subject / Material Details Header Box (Batch 7 Pic 2) */}
          <div className="submission-summary-header-card card">
            <div className="summary-header-grid">
              <div className="left-fields-col">
                <div className="f-item">
                  <span className="f-label">SUBJECT</span>
                  <strong className="f-value font-bold">Data base</strong>
                </div>

                <div className="f-item">
                  <span className="f-label">MATERIAL</span>
                  <strong className="f-value font-bold">Chapter 3 - Integrate data</strong>
                </div>

                <div className="f-item">
                  <span className="f-label">DESCRIPTION</span>
                  <p className="f-desc">Explanation of definite integrals and their applications in area calculation.</p>
                </div>
              </div>

              <div className="right-note-box">
                <p><strong>Note:</strong> All instructors below are responding to this specific request.</p>
              </div>
            </div>
          </div>

          {/* 3 Instructor Submissions List */}
          <div className="submissions-cards-list">
            {/* Instructor 1: AHMED.F */}
            <div className="submission-row-card card">
              <div className="sub-left-info">
                <h3>AHMED.F</h3>
                <span className="sub-tag">Top Rated Instructor</span>
              </div>

              <div className="sub-video-container">
                <div className="video-player-placeholder">
                  <div className="play-button-circle">▶</div>
                  <span className="time-badge">05:00</span>
                </div>
              </div>

              <div className="sub-right-action">
                <button 
                  onClick={() => handleApproveSubmission('AHMED.F')} 
                  className="btn-primary approve-cyan-btn"
                >
                  APPROVE
                </button>
              </div>
            </div>

            {/* Instructor 2: OMAR.M */}
            <div className="submission-row-card card">
              <div className="sub-left-info">
                <h3>OMAR.M</h3>
                <span className="sub-tag">Mathematics Specialist</span>
              </div>

              <div className="sub-video-container">
                <div className="video-player-placeholder">
                  <div className="play-button-circle">▶</div>
                  <span className="time-badge">05:00</span>
                </div>
              </div>

              <div className="sub-right-action">
                <button 
                  onClick={() => handleApproveSubmission('OMAR.M')} 
                  className="btn-primary approve-cyan-btn"
                >
                  APPROVE
                </button>
              </div>
            </div>

            {/* Instructor 3: SARAH.L */}
            <div className="submission-row-card card">
              <div className="sub-left-info">
                <h3>SARAH.L</h3>
                <span className="sub-tag">Expert Educator</span>
              </div>

              <div className="sub-video-container">
                <div className="video-player-placeholder brown-bottom">
                  <div className="play-button-circle">▶</div>
                  <span className="time-badge">05:00</span>
                </div>
              </div>

              <div className="sub-right-action">
                <button 
                  onClick={() => handleApproveSubmission('SARAH.L')} 
                  className="btn-primary approve-cyan-btn"
                >
                  APPROVE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          BATCH 7 PIC 3: Book Session (Data base 50 SAR/hr)
         ------------------------------------------------------------- */}
      {step === 'book_session_database' && (
        <div className="flow-step-container animate-fade-in">
          <div className="flow-header-nav">
            <button onClick={() => setStep('hourly_trial_submissions_live')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="dark-book-session-card">
            <h2>Book Session</h2>

            <form onSubmit={handleConfirmSendOrder} className="book-session-inner-form">
              {/* Offer Summary Box */}
              <div className="offer-summary-inner-box">
                <h3>Offer Summary</h3>

                <div className="three-fields-grid">
                  <div>
                    <span className="off-label">INSTRUCTOR</span>
                    <strong className="off-val">Ahmed.F</strong>
                  </div>
                  <div>
                    <span className="off-label">SUBJECT</span>
                    <strong className="off-val">Data base</strong>
                  </div>
                  <div>
                    <span className="off-label">RATE</span>
                    <strong className="off-val">50 SAR/hr</strong>
                  </div>
                </div>

                <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <span className="off-note">Note: This offer is based on your requested material.</span>
                </div>
              </div>

              {/* Upload Your Materials Box */}
              <div className="upload-materials-box">
                <h3>Upload Your Materials</h3>

                <div className="dashed-upload-dropzone" onClick={handleFileUpload}>
                  <div className="upload-circle-ico">
                    <img src="/pdf-icon.png" alt="Upload" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                  </div>
                  <strong className="dropzone-main-text">
                    {uploadedFileName ? `Attached: ${uploadedFileName}` : 'Click or drag and drop to upload'}
                  </strong>
                  <span className="dropzone-sub-text">PDF, JPG, PNG or DOCX (Max 20MB)</span>
                </div>
              </div>

              <button type="submit" className="btn-primary confirm-send-order-cyan-btn">
                Confirm & Send order
              </button>

              <p className="terms-note-text text-center">
                By clicking confirm, you agree to our Terms of Service
              </p>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          BATCH 5 PIC 3 & BATCH 6 PIC 2: Instructor Offers Screen
         ------------------------------------------------------------- */}
      {step === 'instructor_offers' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => setStep('explain_orders_list')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="flow-title-wrap">
            <h1 className="flow-main-title text-left">Instructor Offers</h1>
            <p className="flow-subtitle text-left">
              Choose the best offer based on time and price.
            </p>
          </div>

          {/* Pricing Note Dark Card */}
          <div className="pricing-note-dark-card card" style={{ marginBottom: '3rem' }}>
            <div className="info-ico-circle">ℹ</div>
            <div>
              <strong className="pricing-title-text">Pricing Note</strong>
              <p className="pricing-body-text">
                Each instructor estimates the number of hours required to explain your material. The price per hour is fixed at <strong>50 SAR/hour</strong>.
              </p>
            </div>
          </div>

          <div className="available-offers-section">
            <h2 className="available-offers-title">Available Offers</h2>

            <div className="instructor-offers-list">
              {/* Offer 1: AHMED.K */}
              <div className="instructor-offer-card card">
                <div className="offer-left-avatar-wrap">
                  <div className="avatar-circle-placeholder font-bold">AK</div>
                </div>

                <div className="offer-mid-details">
                  <div className="instructor-name-check-row">
                    <h3>AHMED.K</h3>
                    <span className="blue-verified-check">☑</span>
                  </div>
                  <p className="calc-sub-text">Price is calculated based on 50 SAR per hour.</p>
                  <div className="est-total-pills-row">
                    <span className="meta-time-pill">🕒 Estimated Time: 3 Hours</span>
                    <span className="meta-price-pill">💵 Total Price: 150 SAR</span>
                  </div>
                </div>

                <div className="offer-right-action">
                  <button 
                    onClick={() => setStep('confirm_your_session_java')} 
                    className="btn-primary select-offer-cyan-btn"
                  >
                    Select Offer
                  </button>
                </div>
              </div>

              {/* Offer 2: OMAR.K */}
              <div className="instructor-offer-card card">
                <div className="offer-left-avatar-wrap">
                  <div className="avatar-circle-placeholder font-bold">OK</div>
                </div>

                <div className="offer-mid-details">
                  <div className="instructor-name-check-row">
                    <h3>OMAR.K</h3>
                  </div>
                  <p className="calc-sub-text">Price is calculated based on 50 SAR per hour.</p>
                  <div className="est-total-pills-row">
                    <span className="meta-time-pill">🕒 Estimated Time: 5 Hours</span>
                    <span className="meta-price-pill">💵 Total Price: 250 SAR</span>
                  </div>
                </div>

                <div className="offer-right-action">
                  <button 
                    onClick={() => setStep('confirm_your_session_java')} 
                    className="btn-primary select-offer-cyan-btn"
                  >
                    Select Offer
                  </button>
                </div>
              </div>

              {/* Offer 3: SARAH.M */}
              <div className="instructor-offer-card card">
                <div className="offer-left-avatar-wrap">
                  <div className="avatar-circle-placeholder font-bold">SM</div>
                </div>

                <div className="offer-mid-details">
                  <div className="instructor-name-check-row">
                    <h3>SARAH.M</h3>
                    <span className="star-rating-badge">⭐</span>
                  </div>
                  <p className="calc-sub-text">Price is calculated based on 50 SAR per hour.</p>
                  <div className="est-total-pills-row">
                    <span className="meta-time-pill">🕒 Estimated Time: 4 Hours</span>
                    <span className="meta-price-pill">💵 Total Price: 200 SAR</span>
                  </div>
                </div>

                <div className="offer-right-action">
                  <button 
                    onClick={() => setStep('confirm_your_session_java')} 
                    className="btn-primary select-offer-cyan-btn"
                  >
                    Select Offer
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p className="need-help-bottom-txt text-center" style={{ marginTop: '2.5rem' }}>
            Need help choosing? <span className="cyan-underline-link">Contact support</span> for assistance with your material.
          </p>
        </div>
      )}

      {/* -------------------------------------------------------------
          BATCH 6 PIC 3: Confirm Your Session Screen (Java programming 150 SAR)
         ------------------------------------------------------------- */}
      {step === 'confirm_your_session_java' && (
        <div className="flow-step-container animate-fade-in">
          <div className="flow-header-nav">
            <button onClick={() => setStep('instructor_offers')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="dark-book-session-card">
            <h2>Confirm Your Session</h2>
            <p className="confirm-session-sub-header text-left" style={{ color: '#94A3B8', marginTop: '-1.25rem', marginBottom: '2rem', fontSize: '0.95rem' }}>
              Review the selected offer and provide your materials before starting.
            </p>

            <div className="offer-summary-inner-box">
              <h3>Offer Summary</h3>

              <div className="four-fields-grid-summary">
                <div>
                  <span className="off-label">INSTRUCTOR</span>
                  <strong className="off-val">Ahmed.k</strong>
                </div>
                <div>
                  <span className="off-label">SUBJECT</span>
                  <strong className="off-val">Java programming</strong>
                </div>
                <div>
                  <span className="off-label">HOURS</span>
                  <strong className="off-val">3 Hours</strong>
                </div>
                <div>
                  <span className="off-label">RATE</span>
                  <strong className="off-val">50 SAR/hr</strong>
                </div>
              </div>

              <div className="offer-summary-bottom-row" style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <span className="off-note">Note: This offer is based on your requested material.</span>
                <div className="total-amount-display">
                  <span>Total Amount:</span>
                  <strong>150 SAR</strong>
                </div>
              </div>
            </div>

            <button 
              onClick={() => { setShowToast(true); setStep('payment_successful_java_150'); }}
              className="btn-primary confirm-send-order-cyan-btn"
              style={{ marginTop: '2.5rem' }}
            >
              Confirm & payment
            </button>

            <p className="terms-note-text text-center" style={{ marginTop: '1.25rem' }}>
              By clicking confirm, you agree to our Terms of Service regarding tutoring sessions.
            </p>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          BATCH 7 PIC 1: Payment Successful (Java programming 150 SAR)
         ------------------------------------------------------------- */}
      {step === 'payment_successful_java_150' && (
        <div className="flow-step-container relative-container animate-fade-in" style={{ padding: '3rem 1rem' }}>
          {showToast && (
            <div className="top-right-toast-card">
              <div className="toast-header-row">
                <span className="toast-check-icon">💳</span>
                <strong className="toast-caps-title">150 SAR HAS BEEN DEDUCTED FROM YOUR WALLET.</strong>
                <button onClick={() => setShowToast(false)} className="toast-close-btn">&times;</button>
              </div>
            </div>
          )}

          <div className="payment-success-dark-card">
            <div className="green-check-circle">✓</div>
            <h1 className="success-main-title white-text">Payment Successful</h1>
            <p className="success-subtext light-text">
              Your session has been confirmed and added to your courses.
            </p>

            <div className="payment-details-table">
              <div className="table-row-item">
                <span className="table-label">Instructor</span>
                <strong className="table-val">Ahmed.k</strong>
              </div>
              <div className="table-row-item">
                <span className="table-label">Subject</span>
                <strong className="table-val">Java programming</strong>
              </div>
              <div className="table-row-item">
                <span className="table-label">Hours</span>
                <strong className="table-val">3 Hours</strong>
              </div>
              <div className="table-row-item highlight-paid">
                <span className="table-label">Total Paid</span>
                <strong className="table-val cyan-text">150 SAR</strong>
              </div>
            </div>

            <button 
              onClick={() => navigate('/courses')} 
              className="btn-primary go-to-orders-btn"
              style={{ width: '100%', borderRadius: '12px' }}
            >
              Go to My Courses
            </button>

            <p className="access-dashboard-subtext text-center">
              You can now access your session from your courses dashboard.
            </p>

            <div className="card-footer-note text-center">
              Your instructor will begin preparing your session shortly.
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          BATCH 9 PIC 1: Payment Successful (210 SAR Data base)
         ------------------------------------------------------------- */}
      {step === 'payment_successful_210_database' && (
        <div className="flow-step-container relative-container animate-fade-in" style={{ padding: '3rem 1rem' }}>
          {showToast && (
            <div className="top-right-toast-card">
              <div className="toast-header-row">
                <span className="toast-check-icon">💳</span>
                <strong className="toast-caps-title">210 SAR HAS BEEN DEDUCTED FROM YOUR WALLET.</strong>
                <button onClick={() => setShowToast(false)} className="toast-close-btn">&times;</button>
              </div>
            </div>
          )}

          <div className="payment-success-dark-card">
            <div className="green-check-circle">✓</div>
            <h1 className="success-main-title white-text">Payment Successful</h1>
            <p className="success-subtext light-text">
              Your session has been confirmed and added to your courses.
            </p>

            <div className="payment-details-table">
              <div className="table-row-item">
                <span className="table-label">Instructor</span>
                <strong className="table-val">Ahmed.F</strong>
              </div>
              <div className="table-row-item">
                <span className="table-label">Subject</span>
                <strong className="table-val">Data base</strong>
              </div>
              <div className="table-row-item">
                <span className="table-label">Hours</span>
                <strong className="table-val">3 Hours</strong>
              </div>
              <div className="table-row-item highlight-paid">
                <span className="table-label">Total Paid</span>
                <strong className="table-val cyan-text">210 SAR</strong>
              </div>
            </div>

            <button 
              onClick={() => navigate('/courses')} 
              className="btn-primary go-to-orders-btn"
              style={{ width: '100%', borderRadius: '12px' }}
            >
              Go to My Courses
            </button>

            <p className="access-dashboard-subtext text-center">
              You can now access your session from your courses dashboard.
            </p>

            <div className="card-footer-note text-center">
              Your instructor will begin preparing your session shortly.
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          BATCH 4 PIC 2: Assignment Orders List Screen
         ------------------------------------------------------------- */}
      {step === 'assignment_orders_list' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => setStep('orders_categories')} className="back-link-btn">
              {t('orders.back', '← Back')}
            </button>
          </div>

          <div className="flow-title-wrap">
            <h1 className="flow-main-title text-left">{t('assignments.myAssignments', 'My Assignments')}</h1>
            <p className="flow-subtitle text-left">
              {t('assignments.subtitle', 'View and manage your completed assignments.')}
            </p>
          </div>

          <div className="orders-items-list">
            {/* Item 1: Approved Assignment */}
            <div className="order-item-card card">
              <div className="order-item-left">
                <div className="order-meta-row">
                  <span className="order-date-text">{t('assignments.submittedOn', 'Submitted on:')} OCT 21, 2026</span>
                  <span className="order-approved-badge">{t('common.completed', 'COMPLETED')}</span>
                </div>
                <h2>{t('assignments.calculusHw', 'Calculus Homework')}</h2>
                <p className="order-status-sub">{t('assignments.mathDept', 'Mathematics Department')}</p>
              </div>
              <button 
                onClick={() => setStep('assignment_order_details')} 
                className="btn-dark enter-order-dark-btn"
              >
                {t('assignments.enterAssignment', 'Enter Assignment')}
              </button>
            </div>

            {/* Item 2: Pending Assignment */}
            <div className="order-item-card card">
              <div className="order-item-left">
                <div className="order-meta-row">
                  <span className="order-date-text">{t('assignments.submittedOn', 'Submitted on:')} OCT 23, 2026</span>
                  <span className="order-pending-badge">{t('common.pending', 'PROCESSING')}</span>
                </div>
                <h2>{t('assignments.physicsAsg', 'Physics Assignment 3')}</h2>
                <p className="order-status-sub">{t('assignments.physicsDept', 'Theoretical Physics 101')}</p>
              </div>
              <button 
                onClick={() => setStep('assignment_order_details')} 
                className="btn-outline enter-order-gray-btn"
              >
                {t('assignments.enterAssignment', 'Enter Assignment')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          BATCH 4 PIC 3: Assignment Order Details Screen
         ------------------------------------------------------------- */}
      {step === 'assignment_order_details' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => setStep('assignment_orders_list')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="flow-title-wrap">
            <div className="title-with-pill-row">
              <h1 className="flow-main-title text-left">Assignment Order Details</h1>
              <span className="order-approved-badge">Approved</span>
            </div>
            <p className="flow-subtitle text-left">
              Track your assignment request and wait for instructor offers.
            </p>
          </div>

          {/* Main Gray Information Card */}
          <div className="assignment-details-gray-card">
            <div className="card-top-header-flex">
              <h3>Assignment Information</h3>
              <span className="pending-offers-pill">Status: Pending Offers</span>
            </div>

            <div className="fields-grid-two-cols">
              <div className="asg-field-group">
                <span className="asg-lbl">SUBJECT NAME</span>
                <strong className="asg-val">Data Structures</strong>
              </div>

              <div className="asg-field-group">
                <span className="asg-lbl">DEADLINE</span>
                <strong className="asg-val">📅 25 March 2026</strong>
              </div>

              <div className="asg-field-group">
                <span className="asg-lbl">ASSIGNMENT TITLE</span>
                <strong className="asg-val">Linked List Implementation</strong>
              </div>

              <div className="asg-field-group">
                <span className="asg-lbl">PRICE</span>
                <strong className="asg-val cyan-txt font-bold">120 SAR</strong>
              </div>

              <div className="asg-field-group col-span-two">
                <span className="asg-lbl">DESCRIPTION</span>
                <p className="asg-desc-txt">
                  Implement a linked list in Java with insert, delete, and search functions.
                </p>
              </div>

              <div className="asg-field-group col-span-two">
                <span className="asg-lbl">UPLOADED FILES</span>
                <div className="attached-file-dark-box">
                  <div className="file-info-left">
                    <span className="file-doc-ico">
                      <img src="/pdf-icon.png" alt="PDF" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                    </span>
                    <div>
                      <strong>assignment.pdf</strong>
                      <span className="file-size-txt">2.4 MB</span>
                    </div>
                  </div>
                  <span className="file-download-ico" title="Download File">📥</span>
                </div>
              </div>
            </div>
          </div>

          {/* Under Review Notice */}
          <div className="under-review-notice-row text-center" style={{ margin: '2rem 0' }}>
            <span className="clock-icon">🕒</span>
            <span className="notice-text">Your request is currently under review. Instructors will submit their offers soon.</span>
          </div>

          <div className="text-center">
            <button 
              onClick={() => { setShowToast(true); setStep('payment_successful_120_asg'); }} 
              className="btn-primary view-offer-cyan-btn"
            >
              View Offer
            </button>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          BATCH 5 PIC 1: Payment Successful (120 SAR Assignment)
         ------------------------------------------------------------- */}
      {step === 'payment_successful_120_asg' && (
        <div className="flow-step-container relative-container animate-fade-in" style={{ padding: '3rem 1rem' }}>
          {showToast && (
            <div className="top-right-toast-card">
              <div className="toast-header-row">
                <span className="toast-check-icon">💳</span>
                <strong className="toast-caps-title">120 SAR HAS BEEN DEDUCTED FROM YOUR WALLET.</strong>
                <button onClick={() => setShowToast(false)} className="toast-close-btn">&times;</button>
              </div>
            </div>
          )}

          <div className="payment-success-dark-card">
            <div className="green-check-circle">✓</div>
            <h1 className="success-main-title white-text">Payment Successful</h1>
            <p className="success-subtext light-text">
              Your Assignment has been confirmed and added to your assignments.
            </p>

            <div className="payment-details-table">
              <div className="table-row-item">
                <span className="table-label">Instructor</span>
                <strong className="table-val">Ahmed.k</strong>
              </div>
              <div className="table-row-item">
                <span className="table-label">Subject</span>
                <strong className="table-val">Data Structeurs</strong>
              </div>
              <div className="table-row-item">
                <span className="table-label">Deadline</span>
                <strong className="table-val">25 March , 2026</strong>
              </div>
              <div className="table-row-item highlight-paid">
                <span className="table-label">Total Paid</span>
                <strong className="table-val cyan-text">120 SAR</strong>
              </div>
            </div>

            <button 
              onClick={() => navigate('/assignments')} 
              className="btn-primary go-to-orders-btn"
              style={{ width: '100%', borderRadius: '12px' }}
            >
              Go to My Assignments
            </button>

            <p className="access-dashboard-subtext text-center">
              You can now access your Assignment from your Assignment dashboard.
            </p>

            <div className="card-footer-note text-center">
              Your instructor will begin preparing your assignment shortly.
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          BATCH 1 PIC 2 & BATCH 2 PIC 3: My Orders Requests & Offers List
         ------------------------------------------------------------- */}
      {step === 'orders_list' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => setStep('orders_categories')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="flow-title-wrap">
            <div className="title-with-pill-row">
              <h1 className="flow-main-title text-left">My Orders</h1>
              <span className="active-category-pill">{selectedCategory} Orders</span>
            </div>
            <p className="flow-subtitle text-left">
              Track the status of your requests, assignments, and subscriptions.
            </p>
          </div>

          {/* 2 Segmented Cards (Request vs Offers) */}
          <div className="segmented-tabs-row">
            <div 
              className={`segment-box ${activeSegment === 'request' ? 'active' : ''}`}
              onClick={() => setActiveSegment('request')}
            >
              {activeSegment === 'request' && <span className="blue-check-badge">✓</span>}
              <h3 className="req-title">Request</h3>
              <p>The orders you have requested.</p>
            </div>

            <div 
              className={`segment-box ${activeSegment === 'offers' ? 'active' : ''}`}
              onClick={() => setActiveSegment('offers')}
            >
              {activeSegment === 'offers' && <span className="blue-check-badge">✓</span>}
              <h3 className="off-title">Offers</h3>
              <p>The Instructor offer you have selected.</p>
            </div>
          </div>

          {/* Orders List Container */}
          {activeSegment === 'request' ? (
            /* Batch 1 Pic 2: Requests List */
            <div className="orders-items-list">
              {/* Order 1 */}
              <div className="order-item-card card">
                <div className="order-item-left">
                  <div className="order-meta-row">
                    <span className="order-date-text">ORDER DATE: TODAY</span>
                    <span className="order-approved-badge">• Approved</span>
                  </div>
                  <h2>Hourly Trial Explanation Request - Calculus</h2>
                  <p className="order-status-sub">Status: Approved</p>
                </div>
                <button 
                  onClick={() => setStep('hourly_trial_submissions')} 
                  className="btn-dark enter-order-dark-btn"
                >
                  Enter Order
                </button>
              </div>

              {/* Order 2 */}
              <div className="order-item-card card">
                <div className="order-item-left">
                  <div className="order-meta-row">
                    <span className="order-date-text">ORDER DATE: OCT 22, 2026</span>
                    <span className="order-approved-badge">• Approved</span>
                  </div>
                  <h2>packaging Trial Explanation Request - Physics Chapter 5</h2>
                  <p className="order-status-sub">Status: Approved</p>
                </div>
                <button 
                  onClick={() => setStep('confirm_order_subscription')} 
                  className="btn-dark enter-order-dark-btn"
                >
                  Enter Order
                </button>
              </div>
            </div>
          ) : (
            /* Batch 2 Pic 3: Offers Tab List */
            <div className="orders-items-list">
              {/* Order 1: Pending Offer (Batch 2 Pic 3) */}
              <div className="order-item-card card">
                <div className="order-item-left">
                  <div className="order-meta-row">
                    <span className="order-date-text">ORDER DATE: TODAY</span>
                    <span className="order-pending-badge">Pending</span>
                  </div>
                  <h2>Hourly Trial Explanation Offer - Calculus</h2>
                  <p className="order-status-sub">Status: Pending (waiting for instructor offers)</p>
                </div>
                <button 
                  onClick={() => setStep('confirm_order_150')} 
                  className="btn-outline enter-order-gray-btn"
                >
                  Enter Order
                </button>
              </div>

              {/* Order 2: Approved Offer (Batch 2 Pic 3) */}
              <div className="order-item-card card">
                <div className="order-item-left">
                  <div className="order-meta-row">
                    <span className="order-date-text">ORDER DATE: OCT 22, 2026</span>
                    <span className="order-approved-badge">• Approved</span>
                  </div>
                  <h2>packaging Trial Explanation Offer - Physics Chapter 5</h2>
                  <p className="order-status-sub">Physics Chapter 5 | Status: Approved</p>
                </div>
                <button 
                  onClick={() => setStep('confirm_order_subscription')} 
                  className="btn-dark enter-order-dark-btn"
                >
                  Enter Order
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------
          BATCH 1 PIC 3: Hourly Trial Instructor Submissions
         ------------------------------------------------------------- */}
      {step === 'hourly_trial_submissions' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => setStep('orders_list')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="flow-title-wrap text-center">
            <h1 className="flow-main-title">Hourly Trial Instructor Submissions</h1>
            <p className="flow-subtitle">
              Multiple instructors reviewed your material and uploaded a trial explanation sample.
            </p>
          </div>

          {/* Subject / Material Details Header Box */}
          <div className="submission-summary-header-card card">
            <div className="summary-header-grid">
              <div className="left-fields-col">
                <div className="f-item">
                  <span className="f-label">SUBJECT</span>
                  <strong className="f-value font-bold">calculuas</strong>
                </div>

                <div className="f-item">
                  <span className="f-label">MATERIAL</span>
                  <strong className="f-value font-bold">Chapter 3 - Integration</strong>
                </div>

                <div className="f-item">
                  <span className="f-label">DESCRIPTION</span>
                  <p className="f-desc">Explanation of definite integrals and their applications in area calculation.</p>
                </div>
              </div>

              <div className="right-note-box">
                <p><strong>Note:</strong> All instructors below are responding to this specific request.</p>
              </div>
            </div>
          </div>

          {/* 3 Instructor Submissions List */}
          <div className="submissions-cards-list">
            {/* Instructor 1: AHMED.F */}
            <div className="submission-row-card card">
              <div className="sub-left-info">
                <h3>AHMED.F</h3>
                <span className="sub-tag">Top Rated Instructor</span>
              </div>

              <div className="sub-video-container">
                <div className="video-player-placeholder">
                  <div className="play-button-circle">▶</div>
                  <span className="time-badge">05:00</span>
                </div>
              </div>

              <div className="sub-right-action">
                <button 
                  onClick={() => handleApproveSubmission('AHMED.F')} 
                  className="btn-primary approve-cyan-btn"
                >
                  APPROVE
                </button>
              </div>
            </div>

            {/* Instructor 2: OMAR.M */}
            <div className="submission-row-card card">
              <div className="sub-left-info">
                <h3>OMAR.M</h3>
                <span className="sub-tag">Mathematics Specialist</span>
              </div>

              <div className="sub-video-container">
                <div className="video-player-placeholder">
                  <div className="play-button-circle">▶</div>
                  <span className="time-badge">05:00</span>
                </div>
              </div>

              <div className="sub-right-action">
                <button 
                  onClick={() => handleApproveSubmission('OMAR.M')} 
                  className="btn-primary approve-cyan-btn"
                >
                  APPROVE
                </button>
              </div>
            </div>

            {/* Instructor 3: SARAH.L */}
            <div className="submission-row-card card">
              <div className="sub-left-info">
                <h3>SARAH.L</h3>
                <span className="sub-tag">Expert Educator</span>
              </div>

              <div className="sub-video-container">
                <div className="video-player-placeholder brown-bottom">
                  <div className="play-button-circle">▶</div>
                  <span className="time-badge">05:00</span>
                </div>
              </div>

              <div className="sub-right-action">
                <button 
                  onClick={() => handleApproveSubmission('SARAH.L')} 
                  className="btn-primary approve-cyan-btn"
                >
                  APPROVE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          BATCH 2 PIC 1: Book Session Dark Card & Chat Section
         ------------------------------------------------------------- */}
      {step === 'book_session_chat' && (
        <div className="flow-step-container animate-fade-in">
          <div className="flow-header-nav">
            <button onClick={() => setStep('hourly_trial_submissions')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          {/* Top Section: Book Session Dark Card */}
          <div className="dark-book-session-card">
            <h2>Book Session</h2>

            <form onSubmit={handleConfirmSendOrder} className="book-session-inner-form">
              {/* Offer Summary Box */}
              <div className="offer-summary-inner-box">
                <h3>Offer Summary</h3>

                <div className="three-fields-grid">
                  <div>
                    <span className="off-label">INSTRUCTOR</span>
                    <strong className="off-val">Ahmed.F</strong>
                  </div>
                  <div>
                    <span className="off-label">SUBJECT</span>
                    <strong className="off-val">calculus</strong>
                  </div>
                  <div>
                    <span className="off-label">RATE</span>
                    <strong className="off-val">50 SAR/hr</strong>
                  </div>
                </div>

                <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <span className="off-note">Note: This offer is based on your requested material.</span>
                </div>
              </div>

              {/* Upload Your Materials Box */}
              <div className="upload-materials-box">
                <h3>Upload Your Materials</h3>

                <div className="dashed-upload-dropzone" onClick={handleFileUpload}>
                  <div className="upload-circle-ico">
                    <img src="/pdf-icon.png" alt="Upload" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                  </div>
                  <strong className="dropzone-main-text">
                    {uploadedFileName ? `Attached: ${uploadedFileName}` : 'Click or drag and drop to upload'}
                  </strong>
                  <span className="dropzone-sub-text">PDF, JPG, PNG or DOCX (Max 20MB)</span>
                </div>
              </div>

              <button type="submit" className="btn-primary confirm-send-order-cyan-btn">
                Confirm & Send order
              </button>

              <p className="terms-note-text text-center">
                By clicking confirm, you agree to our Terms of Service
              </p>
            </form>
          </div>

          {/* Bottom Section: Chat Box */}
          <div className="live-chat-card card" style={{ marginTop: '2.5rem' }}>
            <div className="chat-card-header text-center">
              <h3>Chat</h3>
            </div>

            <div className="chat-messages-scroll">
              {chatMessages.map((msg) => (
                <React.Fragment key={msg.id}>
                  {msg.sender === 'system' ? (
                    <div className="system-encrypted-divider">
                      <span>{msg.text}</span>
                    </div>
                  ) : (
                    <div className={`chat-bubble-wrap ${msg.sender}`}>
                      <div className="chat-bubble-content">
                        <p>{msg.text}</p>
                        <span className="chat-timestamp">{msg.time}</span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Chat Input Row */}
            <form onSubmit={handleSendChatMessage} className="chat-input-form">
              <button type="button" className="chat-attach-btn">+</button>
              <input 
                type="text" 
                placeholder="Type a message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit" className="chat-send-btn">➢</button>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          BATCH 2 PIC 2 & BATCH 8 PIC 1: Lecture Materials Uploaded Successfully & Toast
         ------------------------------------------------------------- */}
      {step === 'materials_uploaded_success' && (
        <div className="flow-step-container relative-container animate-fade-in" style={{ padding: '2rem 1rem' }}>
          {/* Top Right Dark Toast */}
          {showToast && (
            <div className="top-right-dark-toast">
              <div className="toast-flex-row">
                <span className="toast-cyan-check">✓</span>
                <div>
                  <strong className="toast-bold-title">LECTURE MATERIALS UPLOADED SUCCESSFULLY</strong>
                  <p className="toast-body-text">
                    Your request has been added to My Orders. It will be shown to multiple instructors. Please wait for their response.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Center Success Graphic & Action */}
          <div className="lecture-success-center-wrap text-center">
            <div className="cyan-check-large-circle">
              <span className="check-mark-sym">✓</span>
            </div>

            <h1 className="lecture-success-title">
              Lecture Materials Uploaded <br /> Successfully
            </h1>

            <p className="lecture-success-subtext">
              Your request has been added to <span className="cyan-link-text">My Orders(Offers)</span>. <br />
              Your lecture will be shown to your instructor, and you <br />
              will receive their offers soon.
            </p>

            <button onClick={handleGoToOffers} className="btn-primary go-to-offers-cyan-btn">
              Go to My Orders(Offers) &rarr;
            </button>
          </div>

          {/* Bottom Dark Info Box */}
          <div className="what-happens-next-dark-card card">
            <div className="info-ico-circle">ℹ</div>
            <div>
              <strong>What happens next?</strong>
              <p>Your instructor will be notified of your submission. You can track progress in the dashboard.</p>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          BATCH 3 PIC 1: Confirm Your order (150 SAR)
         ------------------------------------------------------------- */}
      {step === 'confirm_order_150' && (
        <div className="flow-step-container animate-fade-in">
          <div className="flow-header-nav">
            <button onClick={() => setStep('explain_orders_list')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="dark-book-session-card">
            <h2>Confirm Your order</h2>

            <div className="offer-summary-inner-box">
              <h3>Offer Summary</h3>

              <div className="four-fields-grid-summary">
                <div>
                  <span className="off-label">INSTRUCTOR</span>
                  <strong className="off-val">Ahmed.F</strong>
                </div>
                <div>
                  <span className="off-label">SUBJECT</span>
                  <strong className="off-val">calculus</strong>
                </div>
                <div>
                  <span className="off-label">HOURS</span>
                  <strong className="off-val">3 Hours</strong>
                </div>
                <div>
                  <span className="off-label">RATE</span>
                  <strong className="off-val">50 SAR/hr</strong>
                </div>
              </div>

              <div className="offer-summary-bottom-row" style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <span className="off-note">Note: This offer is based on your requested material.</span>
                <div className="total-amount-display">
                  <span>Total Amount:</span>
                  <strong>150 SAR</strong>
                </div>
              </div>
            </div>

            <button 
              onClick={() => { setShowToast(true); setStep('payment_successful_150'); }}
              className="btn-primary confirm-send-order-cyan-btn"
              style={{ marginTop: '2.5rem' }}
            >
              Confirm & payment
            </button>

            <p className="terms-note-text text-center" style={{ marginTop: '1.25rem' }}>
              By clicking confirm, you agree to our Terms of Service
            </p>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          BATCH 3 PIC 2: Payment Successful (150 SAR Deducted)
         ------------------------------------------------------------- */}
      {step === 'payment_successful_150' && (
        <div className="flow-step-container relative-container animate-fade-in" style={{ padding: '3rem 1rem' }}>
          {showToast && (
            <div className="top-right-toast-card">
              <div className="toast-header-row">
                <span className="toast-check-icon">💳</span>
                <strong className="toast-caps-title">150 SAR HAS BEEN DEDUCTED FROM YOUR WALLET.</strong>
                <button onClick={() => setShowToast(false)} className="toast-close-btn">&times;</button>
              </div>
            </div>
          )}

          <div className="payment-success-dark-card">
            <div className="green-check-circle">✓</div>
            <h1 className="success-main-title white-text">Payment Successful</h1>
            <p className="success-subtext light-text">
              Your session has been confirmed and added to your courses.
            </p>

            <div className="payment-details-table">
              <div className="table-row-item">
                <span className="table-label">Instructor</span>
                <strong className="table-val">Ahmed.F</strong>
              </div>
              <div className="table-row-item">
                <span className="table-label">Subject</span>
                <strong className="table-val">calculus</strong>
              </div>
              <div className="table-row-item">
                <span className="table-label">Hours</span>
                <strong className="table-val">3 Hours</strong>
              </div>
              <div className="table-row-item highlight-paid">
                <span className="table-label">Total Paid</span>
                <strong className="table-val cyan-text">150 SAR</strong>
              </div>
            </div>

            <button 
              onClick={() => navigate('/courses')} 
              className="btn-primary go-to-orders-btn"
              style={{ width: '100%', borderRadius: '12px' }}
            >
              Go to My Courses
            </button>

            <p className="access-dashboard-subtext text-center">
              You can now access your session from your courses dashboard.
            </p>

            <div className="card-footer-note text-center">
              Your instructor will begin preparing your session shortly.
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          BATCH 3 PIC 3: Confirm Your order (You Have Been Subscribed)
         ------------------------------------------------------------- */}
      {step === 'confirm_order_subscription' && (
        <div className="flow-step-container animate-fade-in">
          <div className="flow-header-nav">
            <button onClick={() => setStep('orders_list')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="dark-book-session-card">
            <h2>Confirm Your order</h2>

            <div className="offer-summary-inner-box">
              <h3>Offer Summary</h3>

              <div className="four-fields-grid-summary">
                <div>
                  <span className="off-label">INSTRUCTOR</span>
                  <strong className="off-val">Ahmed.F</strong>
                </div>
                <div>
                  <span className="off-label">SUBJECT</span>
                  <strong className="off-val">physics</strong>
                </div>
                <div>
                  <span className="off-label">HOURS</span>
                  <strong className="off-val">3 Hours</strong>
                </div>
                <div>
                  <span className="off-label">RATE</span>
                  <strong className="off-val">You have been subscribed</strong>
                </div>
              </div>
            </div>

            <button 
              onClick={() => { setShowToast(true); setStep('package_deducted_success_3hr'); }}
              className="btn-primary confirm-send-order-cyan-btn"
              style={{ marginTop: '2.5rem' }}
            >
              Confirm
            </button>

            <p className="terms-note-text text-center" style={{ marginTop: '1.25rem' }}>
              By clicking confirm, you agree to our Terms of Service
            </p>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          BATCH 4 PIC 1: Confirmed Successful (3 Hour Deducted From Package)
         ------------------------------------------------------------- */}
      {step === 'package_deducted_success_3hr' && (
        <div className="flow-step-container relative-container animate-fade-in" style={{ padding: '3rem 1rem' }}>
          {showToast && (
            <div className="top-right-toast-card">
              <div className="toast-header-row">
                <span className="toast-check-icon">💳</span>
                <strong className="toast-caps-title">3 HOUR HAS BEEN DEDUCTED FROM YOUR PACKAGE.</strong>
                <button onClick={() => setShowToast(false)} className="toast-close-btn">&times;</button>
              </div>
            </div>
          )}

          <div className="payment-success-dark-card">
            <div className="green-check-circle">✓</div>
            <h1 className="success-main-title white-text">Confirmed Successful</h1>
            <p className="success-subtext light-text">
              Your session has been confirmed and added to your courses.
            </p>

            <div className="payment-details-table">
              <div className="table-row-item">
                <span className="table-label">Instructor</span>
                <strong className="table-val">Ahmed.F</strong>
              </div>
              <div className="table-row-item">
                <span className="table-label">Subject</span>
                <strong className="table-val">physics</strong>
              </div>
              <div className="table-row-item">
                <span className="table-label">Hours</span>
                <strong className="table-val">3 Hours</strong>
              </div>
            </div>

            <button 
              onClick={() => navigate('/courses')} 
              className="btn-primary go-to-orders-btn"
              style={{ width: '100%', borderRadius: '12px' }}
            >
              Go to My Courses
            </button>

            <p className="access-dashboard-subtext text-center">
              You can now access your session from your courses dashboard.
            </p>

            <div className="card-footer-note text-center">
              Your instructor will begin preparing your session shortly.
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          BATCH 8 PIC 3: LIVE CHAT & 8-FIELD OFFER SUMMARY (210 SAR)
         ------------------------------------------------------------- */}
      {step === 'live_chat_confirm_offer' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => setStep('explain_orders_list')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          {/* Top Section: Live Chat (Batch 8 Pic 3) */}
          <div className="live-chat-card card" style={{ marginBottom: '3rem' }}>
            <div className="chat-card-header text-center">
              <h3>Chat</h3>
            </div>

            <div className="chat-messages-scroll">
              {chatMessages.map((msg) => (
                <React.Fragment key={msg.id}>
                  {msg.sender === 'system' ? (
                    <div className="system-encrypted-divider">
                      <span>{msg.text}</span>
                    </div>
                  ) : (
                    <div className={`chat-bubble-wrap ${msg.sender}`}>
                      <div className="chat-bubble-content">
                        <p>{msg.text}</p>
                        <span className="chat-timestamp">{msg.time}</span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Chat Input Row */}
            <form onSubmit={handleSendChatMessage} className="chat-input-form">
              <button type="button" className="chat-attach-btn">+</button>
              <input 
                type="text" 
                placeholder="Type a message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit" className="chat-send-btn">➢</button>
            </form>
          </div>

          {/* Bottom Section: Dark Card (Confirm Your order) */}
          <div className="dark-book-session-card">
            <h2>Confirm Your order</h2>

            <div className="offer-summary-inner-box">
              <h3>Offer Summary</h3>

              <div className="eight-fields-grid">
                <div>
                  <span className="off-label">INSTRUCTOR</span>
                  <strong className="off-val">Ahmed.F</strong>
                </div>
                <div>
                  <span className="off-label">SUBJECT</span>
                  <strong className="off-val">calculus</strong>
                </div>
                <div>
                  <span className="off-label">NUMBER OF SESSION</span>
                  <strong className="off-val">6 session</strong>
                </div>
                <div>
                  <span className="off-label">ESTIMATED TIME PER SESSION (HOURS)</span>
                  <strong className="off-val">30 min.</strong>
                </div>
                <div>
                  <span className="off-label">TOTAL TIME</span>
                  <strong className="off-val">3 HOURS</strong>
                </div>
                <div>
                  <span className="off-label">RATE</span>
                  <strong className="off-val">70 SAR/hr</strong>
                </div>
                <div>
                  <span className="off-label">TIME FIRST SESSION</span>
                  <strong className="off-val">Monday,May 5th</strong>
                </div>
                <div>
                  <span className="off-label">TIME DURING THE DAY</span>
                  <strong className="off-val">7:00 PM</strong>
                </div>
              </div>

              <div className="offer-summary-bottom-row" style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <span className="off-note">Note: This offer is based on your requested material.</span>
                <div className="total-amount-display">
                  <span>Total Amount:</span>
                  <strong>210 SAR</strong>
                </div>
              </div>
            </div>

            <button 
              onClick={() => { setShowToast(true); setStep('payment_successful_210_database'); }}
              className="btn-primary confirm-order-btn"
              style={{ marginTop: '2.5rem' }}
            >
              Confirm & payment
            </button>

            <p className="terms-note-text text-center" style={{ marginTop: '1.25rem' }}>
              By clicking confirm, you agree to our Terms of Service
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentOrders;
