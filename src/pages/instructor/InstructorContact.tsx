import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InstructorContact.css';

const InstructorContact: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="instructor-contact-page">
      <div className="instructor-contact-container">
        {/* Back Link */}
        <button className="inst-contact-back-btn" onClick={() => navigate(-1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>

        {/* Header Title & Subtitle */}
        <div className="inst-contact-header">
          <h1 className="inst-contact-title">Contact Us</h1>
          <p className="inst-contact-subtitle">We're here to support you anytime.</p>
        </div>

        {/* Card 1: Intro Text Card */}
        <div className="inst-contact-intro-card">
          <p className="inst-contact-intro-text">
            At <span className="highlight-jar">JAR ACADEMY</span>, our goal is to make working easier, faster, and more
            personalized for every instructor. We are always here to support you and answer all
            your questions.
          </p>
        </div>

        {/* Section 2: Two Dark Contact Cards */}
        <div className="inst-contact-two-cards-grid">
          {/* Card 1: Call Us */}
          <div className="inst-contact-dark-card">
            <div className="inst-contact-icon-circle blue-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <span className="inst-contact-card-tag">CALL US</span>
            <h2 className="inst-contact-card-value">+966 5XXXXXXXX</h2>
          </div>

          {/* Card 2: Availability */}
          <div className="inst-contact-dark-card">
            <div className="inst-contact-icon-circle green-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
            </div>
            <span className="inst-contact-card-tag">AVAILABILITY</span>
            <h2 className="inst-contact-card-value">24/7 Support</h2>
          </div>
        </div>

        {/* Section 3: Connect With Us (Social Media Card) */}
        <div className="inst-contact-connect-card">
          <h2 className="inst-contact-connect-title">Connect With Us</h2>
          <div className="inst-contact-cyan-line"></div>

          <div className="inst-contact-social-grid">
            {/* WhatsApp */}
            <a href="https://wa.me/" target="_blank" rel="noreferrer" className="inst-social-item">
              <div className="inst-social-icon-wrapper wa-bg">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.072-1.874-.442-1.503-.623-2.463-2.148-2.538-2.247-.074-.099-.607-.808-.607-1.543s.385-1.099.521-1.249c.137-.15.298-.187.397-.187.099 0 .198.001.284.005.09.004.21-.034.329.251.123.295.421 1.026.458 1.101.037.075.062.163.012.262-.05.099-.074.161-.148.247-.075.087-.157.194-.224.261-.075.075-.153.157-.066.307.086.15.383.632.822 1.023.565.502 1.042.658 1.191.733.15.075.237.062.324-.037.087-.1.373-.435.473-.585.099-.15.198-.125.334-.075.137.05.867.409 1.016.484.149.075.248.112.285.174.037.062.037.362-.107.767z" />
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.661 1.436 5.176L2 22l4.981-1.396A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.062c-1.637 0-3.167-.487-4.448-1.325l-.319-.209-2.957.828.84-2.879-.228-.337A8.04 8.04 0 0 1 3.938 12c0-4.446 3.617-8.062 8.062-8.062 4.446 0 8.062 3.616 8.062 8.062 0 4.446-3.616 8.062-8.062 8.062z" />
                </svg>
              </div>
              <div className="inst-social-text-block">
                <span className="inst-social-platform-name">WhatsApp</span>
                <span className="inst-social-handle">@JarAcademy</span>
              </div>
            </a>

            {/* Telegram */}
            <a href="https://telegram.me/" target="_blank" rel="noreferrer" className="inst-social-item">
              <div className="inst-social-icon-wrapper tg-bg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.674c.459 0 .661-.211.918-.461l2.203-2.142 4.582 3.385c.845.466 1.452.226 1.663-.785l3.008-14.167c.308-1.236-.472-1.796-1.438-1.471z" />
                </svg>
              </div>
              <div className="inst-social-text-block">
                <span className="inst-social-platform-name">Telegram</span>
                <span className="inst-social-handle">@JarAcademy</span>
              </div>
            </a>

            {/* Instagram */}
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="inst-social-item">
              <div className="inst-social-icon-wrapper ig-bg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <div className="inst-social-text-block">
                <span className="inst-social-platform-name">Instagram</span>
                <span className="inst-social-handle">@JarAcademy</span>
              </div>
            </a>

            {/* Facebook */}
            <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="inst-social-item">
              <div className="inst-social-icon-wrapper fb-bg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div className="inst-social-text-block">
                <span className="inst-social-platform-name">Facebook</span>
                <span className="inst-social-handle">@JarAcademy</span>
              </div>
            </a>

            {/* TikTok */}
            <a href="https://tiktok.com/" target="_blank" rel="noreferrer" className="inst-social-item">
              <div className="inst-social-icon-wrapper tt-bg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.69a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.58a8.28 8.28 0 0 0 4.84 1.56V6.69h-.93z" />
                </svg>
              </div>
              <div className="inst-social-text-block">
                <span className="inst-social-platform-name">TikTok</span>
                <span className="inst-social-handle">@JarAcademy</span>
              </div>
            </a>

            {/* Snapchat */}
            <a href="https://snapchat.com/" target="_blank" rel="noreferrer" className="inst-social-item">
              <div className="inst-social-icon-wrapper sc-bg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.02 3c-3.71 0-5.83 2.58-5.83 4.97 0 .86.34 1.77.67 2.4.11.22.18.42.06.66-.14.28-.51.46-.86.58-.39.13-.8.24-.92.65-.11.37.13.67.43.83.47.26 1.05.38 1.59.43.2.02.34.17.37.37.11.75-.43 1.25-1.02 1.63-.44.29-.98.54-1.2.98-.18.37-.02.78.36.98.59.31 1.28.4 1.94.46.25.02.43.21.44.46.03.71-.34 1.34-.87 1.83-.28.26-.53.58-.45.98.08.41.44.64.83.69.75.09 1.5-.1 2.24-.26.31-.07.62-.05.91.07.82.35 1.58.53 2.47.53.89 0 1.65-.18 2.47-.53.29-.12.6-.14.91-.07.74.16 1.49.35 2.24.26.39-.05.75-.28.83-.69.08-.4-.17-.72-.45-.98-.53-.49-.9-1.12-.87-1.83.01-.25.19-.44.44-.46.66-.06 1.35-.15 1.94-.46.38-.2.54-.61.36-.98-.22-.44-.76-.69-1.2-.98-.59-.38-1.13-.88-1.02-1.63.03-.2.17-.35.37-.37.54-.05 1.12-.17 1.59-.43.3-.16.54-.46.43-.83-.12-.41-.53-.52-.92-.65-.35-.12-.72-.3-.86-.58-.12-.24-.05-.44.06-.66.33-.63.67-1.54.67-2.4C17.85 5.58 15.73 3 12.02 3z" />
                </svg>
              </div>
              <div className="inst-social-text-block">
                <span className="inst-social-platform-name">Snapchat</span>
                <span className="inst-social-handle">@JarAcademy</span>
              </div>
            </a>

            {/* LinkedIn */}
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="inst-social-item">
              <div className="inst-social-icon-wrapper li-bg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 1 0-.01-2.9 1.45 1.45 0 0 0 .01 2.9m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </div>
              <div className="inst-social-text-block">
                <span className="inst-social-platform-name">LinkedIn</span>
                <span className="inst-social-handle">@JarAcademy</span>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Help Text */}
        <p className="inst-contact-footer-note">
          Feel free to reach out to us anytime. We are here to help you.
        </p>
      </div>
    </div>
  );
};

export default InstructorContact;
