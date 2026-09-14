import React, { useState, useEffect } from 'react';
import './ScrollToEvents.css';
import kalarambhPoster from '../../assets/events/kalarambh-2026-poster.png';

const ScrollToEvents = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup on every page load/refresh
    setIsVisible(true);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <>
          {/* Backdrop overlay */}
          <div className="popup-backdrop" onClick={closePopup}></div>
          
          {/* Centered popup */}
          <div className="event-popup-container">
            <button 
              className="close-popup-btn"
              onClick={closePopup}
              aria-label="Close popup"
            >
              ✕
            </button>
            
            <div className="popup-content">
              <img
                src={kalarambhPoster}
                alt="Kalarambh 2026"
                className="popup-poster"
              />
              <h2 className="popup-title">Kalarambh 2026 (कलारंभ २०२६)</h2>
              <p className="popup-description">
                नांदी नवपर्वाची...
              </p>
              <a
                href="https://konfhub.com/kalarambh2k26-cultural-program"
                target="_blank"
                rel="noopener noreferrer"
                className="popup-cta-btn"
              >
                <span>Register Now</span>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ScrollToEvents;