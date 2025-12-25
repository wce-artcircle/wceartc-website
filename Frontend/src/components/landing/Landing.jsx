import React, { useEffect, useState } from 'react';
import './landing.css';
import FloatingIcons from '../FloatingIcons';

const Landing = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // Wait for fonts to load
    document.fonts.ready.then(() => {
      setFontLoaded(true);
    });
  }, []);

  return (
    <>
      <div className='page-bg'>
        <FloatingIcons />
        <div className='landing'>
          <h1 
            className={`warm-gradient-text ${fontLoaded ? 'animate' : ''}`}
            style={{ position: 'relative', zIndex: 30 }}
          >
            WCE ART CIRCLE
          </h1>
        </div>
      </div>
    </>
  );
};

export default Landing;