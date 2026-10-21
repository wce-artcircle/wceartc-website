import React, { useState, useEffect } from 'react';
import './ScrollToEvents.css';
import events, { resolveEventStatus } from '../events/allEvents';

const ScrollToEvents = () => {
  const [isVisible, setIsVisible] = useState(false);

  const liveEvent = events.find((event) => resolveEventStatus(event) === 'live');

  useEffect(() => {
    // Show popup on every page load/refresh
    setIsVisible(true);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  if (!liveEvent) {
    return null;
  }

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
              <span className="popup-live-label">LIVE - Registrations Open</span>
              <img
                src={liveEvent.icon}
                alt={liveEvent.Name}
                className="popup-poster"
              />
              <h2 className="popup-title">{liveEvent.Name}</h2>
              {liveEvent.tagline && (
                <p className="popup-tagline">{liveEvent.tagline}</p>
              )}
              <p className="popup-meta">
                {liveEvent.date}
                <br />
                {liveEvent.venue}
              </p>
              {liveEvent.register && (
                <a
                  href={liveEvent.register}
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
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ScrollToEvents;
