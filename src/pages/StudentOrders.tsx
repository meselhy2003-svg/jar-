import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentOrders.css';

type OrderFlowStep = 
  | 'orders_categories'           // Step 1: 3 Category cards
  | 'orders_list'                 // Step 2: Request / Offers tabs (Screenshot 1)
  | 'live_chat_confirm_offer'     // Screenshot 2: Live Chat & Detailed Offer Summary (210 SAR)
  | 'payment_successful_210'      // Screenshot 3: Payment Successful (210 SAR)
  | 'package_deducted_success'    // Screenshot 4: Confirmed Successful (Used 3 Hours out of 15)
  | 'live_submissions'            // Live submissions
  | 'book_session_live'           // Book session live
  | 'instructor_offers'           // Instructor offers
  | 'confirm_session'             // Confirm session
  | 'session_payment_success'     // Payment success
  | 'instructor_submissions'      // Submissions
  | 'book_session_chat'           // Chat
  | 'offers_success';             // Success

interface ChatMessage {
  id: string;
  sender: 'instructor' | 'student' | 'system';
  text: string;
  time: string;
}

const StudentOrders = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<OrderFlowStep>('orders_categories');
  const [activeSegment, setActiveSegment] = useState<'request' | 'offers'>('request');
  const [showToast, setShowToast] = useState(true);

  // Live Chat State for Screenshot 2
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

  return (
    <div className="my-orders-flow-page container animate-fade-in">
      {/* -------------------------------------------------------------
          STEP 1: My Orders Category Selection (3 Dark Cards)
         ------------------------------------------------------------- */}
      {step === 'orders_categories' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => navigate('/student/dashboard')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="flow-title-wrap text-center">
            <h1 className="flow-main-title">My Orders</h1>
            <p className="flow-subtitle">
              Choose the type of orders you want to see it.
            </p>
          </div>

          <div className="flow-cards-three-grid">
            {/* Category 1: Trial */}
            <div className="flow-dark-choice-card rect-orders-card">
              <div className="dark-card-icon-box">
                <span className="card-icon-symbol">☑️</span>
              </div>
              <h2>Trial</h2>
              <button 
                onClick={() => setStep('orders_list')} 
                className="btn-primary choice-rect-btn"
              >
                Explain
              </button>
            </div>

            {/* Category 2: Assignment */}
            <div className="flow-dark-choice-card rect-orders-card">
              <div className="dark-card-icon-box">
                <span className="card-icon-symbol">📄</span>
              </div>
              <h2>Assignment</h2>
              <button 
                onClick={() => setStep('orders_list')} 
                className="btn-primary choice-rect-btn"
              >
                Assignments
              </button>
            </div>

            {/* Category 3: Explain */}
            <div className="flow-dark-choice-card rect-orders-card">
              <div className="dark-card-icon-box">
                <span className="card-icon-symbol">🎓</span>
              </div>
              <h2>Explain</h2>
              <button 
                onClick={() => setStep('orders_list')} 
                className="btn-primary choice-rect-btn"
              >
                Explain
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          STEP 2: My Orders Dashboard (Screenshot 1: Request vs Offers Tabs)
         ------------------------------------------------------------- */}
      {step === 'orders_list' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => setStep('orders_categories')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          <div className="flow-title-wrap">
            <h1 className="flow-main-title text-left">My Orders</h1>
            <p className="flow-subtitle text-left">
              Track the status of your requests, assignments, and subscriptions.
            </p>
          </div>

          {/* 2 Segmented Tabs */}
          <div className="segmented-tabs-row">
            <div 
              className={`segment-box ${activeSegment === 'request' ? 'active' : ''}`}
              onClick={() => setActiveSegment('request')}
            >
              {activeSegment === 'request' && <span className="blue-check-badge">✓</span>}
              <h3>Request</h3>
              <p>The orders you have requested.</p>
            </div>

            <div 
              className={`segment-box ${activeSegment === 'offers' ? 'active' : ''}`}
              onClick={() => setActiveSegment('offers')}
            >
              {activeSegment === 'offers' && <span className="blue-check-badge">✓</span>}
              <h3>Offers</h3>
              <p>The instructor offer you have selected(FOR LIVE ONLY ).</p>
            </div>
          </div>

          {/* Orders List Container */}
          {activeSegment === 'request' ? (
            <div className="orders-items-list">
              {/* Order 1 */}
              <div className="order-item-card card">
                <div className="order-item-left">
                  <div className="order-meta-row">
                    <span className="order-date-text">ORDER DATE: OCT 20, 2026</span>
                    <span className="order-approved-badge">Approved</span>
                  </div>
                  <h2>Hourly Explanation (explantion by video) - Java Programming</h2>
                  <p className="order-status-sub">Java Programming | Status: Approved</p>
                </div>
                <button 
                  onClick={() => setStep('instructor_offers')} 
                  className="btn-dark enter-order-dark-btn"
                >
                  Enter Order
                </button>
              </div>

              {/* Order 2 */}
              <div className="order-item-card card">
                <div className="order-item-left">
                  <div className="order-meta-row">
                    <span className="order-date-text">ORDER DATE: OCT 16, 2026</span>
                    <span className="order-approved-badge">Approved</span>
                  </div>
                  <h2>Hourly Explanation (explantion by Live) - DATA BASE</h2>
                  <p className="order-status-sub">DATA BASE | Status: Approved</p>
                </div>
                <button 
                  onClick={() => setStep('live_submissions')} 
                  className="btn-dark enter-order-dark-btn"
                >
                  Enter Order
                </button>
              </div>

              {/* Order 3 */}
              <div className="order-item-card card">
                <div className="order-item-left">
                  <div className="order-meta-row">
                    <span className="order-date-text">ORDER DATE: OCT 15, 2026</span>
                    <span className="order-approved-badge">Approved</span>
                  </div>
                  <h2>packaging Subscription - Mathematics</h2>
                  <p className="order-status-sub">Mathematics | Status: Active</p>
                </div>
                <button 
                  onClick={() => setStep('package_deducted_success')} 
                  className="btn-dark enter-order-dark-btn"
                >
                  Enter Order
                </button>
              </div>

              <div className="view-all-history-wrap text-center" style={{ marginTop: '1.5rem' }}>
                <span className="view-all-history-link">View all order history &darr;</span>
              </div>
            </div>
          ) : (
            /* Offers Tab List (Screenshot 1) */
            <div className="orders-items-list">
              <div className="order-item-card card">
                <div className="order-item-left">
                  <div className="order-meta-row">
                    <span className="order-date-text">ORDER DATE: OCT 16, 2026</span>
                    <span className="order-approved-badge">Approved</span>
                  </div>
                  <h2>Hourly Explanation (explantion by Live) - DATA BASE</h2>
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
        </div>
      )}

      {/* -------------------------------------------------------------
          SCREENSHOT 2: Live Chat & Detailed 8-Field Offer Summary (210 SAR)
         ------------------------------------------------------------- */}
      {step === 'live_chat_confirm_offer' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => setStep('orders_list')} className="back-link-btn">
              &larr; Back
            </button>
          </div>

          {/* Top Section: Live Chat */}
          <div className="live-chat-card card" style={{ marginBottom: '3rem' }}>
            <div className="chat-card-header">
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
              onClick={() => { setShowToast(true); setStep('payment_successful_210'); }}
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

      {/* -------------------------------------------------------------
          SCREENSHOT 3: Payment Successful (210 SAR Wallet Deduction)
         ------------------------------------------------------------- */}
      {step === 'payment_successful_210' && (
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
          SCREENSHOT 4: Confirmed Successful (Used 3 Hours out of 15)
         ------------------------------------------------------------- */}
      {step === 'package_deducted_success' && (
        <div className="flow-step-container relative-container animate-fade-in" style={{ padding: '3rem 1rem' }}>
          {showToast && (
            <div className="top-right-toast-card wide-toast">
              <div className="toast-header-row">
                <span className="toast-check-icon">✓</span>
                <strong className="toast-caps-title">
                  YOU HAVE USED 3 HOURS OUT OF 15. YOU HAVE 12 HOURS REMAINING.
                </strong>
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

      {/* Live submissions */}
      {step === 'live_submissions' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => setStep('orders_list')} className="back-link-btn">&larr; Back</button>
          </div>
          <div className="flow-title-wrap text-center">
            <h1 className="flow-main-title">Hourly Trial Instructor Submissions(For live)</h1>
          </div>
          <div className="submissions-list-container">
            <div className="submission-card card">
              <div className="submission-left"><h2>AHMED.F</h2></div>
              <div className="submission-right">
                <button onClick={() => setStep('book_session_live')} className="btn-primary approve-cyan-btn">APPROVE</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Book session live */}
      {step === 'book_session_live' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => setStep('live_submissions')} className="back-link-btn">&larr; Back</button>
          </div>
          <div className="dark-book-session-card">
            <h2>Book Session</h2>
            <form onSubmit={(e) => { e.preventDefault(); setShowToast(true); setStep('offers_success'); }} className="book-session-inner-form">
              <button type="submit" className="btn-primary confirm-order-btn">Confirm & Send order</button>
            </form>
          </div>
        </div>
      )}

      {/* Instructor Offers */}
      {step === 'instructor_offers' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => setStep('orders_list')} className="back-link-btn">&larr; Back</button>
          </div>
          <div className="flow-title-wrap text-left"><h1 className="flow-main-title">Instructor Offers</h1></div>
          <div className="available-offers-list">
            <div className="instructor-offer-card card">
              <div className="instructor-offer-info"><h3>AHMED.K</h3></div>
              <button onClick={() => setStep('confirm_session')} className="btn-primary select-offer-cyan-btn">Select Offer</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm session */}
      {step === 'confirm_session' && (
        <div className="flow-step-container">
          <div className="flow-header-nav">
            <button onClick={() => setStep('instructor_offers')} className="back-link-btn">&larr; Back</button>
          </div>
          <div className="dark-book-session-card">
            <h2>Confirm Your Session</h2>
            <button onClick={() => setStep('session_payment_success')} className="btn-primary confirm-order-btn">Confirm & payment</button>
          </div>
        </div>
      )}

      {/* Session payment success */}
      {step === 'session_payment_success' && (
        <div className="flow-step-container relative-container animate-fade-in" style={{ padding: '3rem 1rem' }}>
          <div className="payment-success-dark-card">
            <div className="green-check-circle">✓</div>
            <h1 className="success-main-title white-text">Payment Successful</h1>
            <button onClick={() => navigate('/courses')} className="btn-primary go-to-orders-btn">Go to My Courses</button>
          </div>
        </div>
      )}

      {/* Offers Success */}
      {step === 'offers_success' && (
        <div className="flow-step-container relative-container animate-fade-in" style={{ padding: '3rem 1rem' }}>
          <div className="trial-success-center text-center">
            <div className="success-cyan-circle-icon"><span className="cyan-check">✓</span></div>
            <h1 className="success-main-title">Lecture Materials Uploaded <br /> Successfully</h1>
            <button onClick={() => { setActiveSegment('offers'); setStep('orders_list'); }} className="btn-primary go-to-orders-btn">Go to My Orders(Offers) &rarr;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentOrders;
