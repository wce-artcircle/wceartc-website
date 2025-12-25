import React, { useState, useEffect } from 'react';
import './ScrollToEvents.css';

const ScrollToEvents = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup on every page load/refresh
    setIsVisible(true);
  }, []);

  const scrollToEvents = () => {
    setIsVisible(false);
    
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      window.location.href = '/#events';
    }
  };

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
              <div className="popup-icon">
                🎉
              </div>
              <h2 className="popup-title">New Event Alert!</h2>
              <p className="popup-description">
                Don't miss out on our upcoming events and activities
              </p>
              <button 
                className="popup-cta-btn"
                onClick={scrollToEvents}
              >
                <span>View New Events</span>
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
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ScrollToEvents;