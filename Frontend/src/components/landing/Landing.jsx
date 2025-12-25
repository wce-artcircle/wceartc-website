import React from 'react'
import './landing.css'
import FloatingIcons from '../FloatingIcons';

const Landing = () => {
  return (
    <>
      <div className='page-bg'>
        <FloatingIcons />
        <div className='landing'>
            <h1 className='warm-gradient-text' style={{ position: 'relative', zIndex: 30 }}>WCE ART CIRCLE</h1>
        </div>
      </div>
    </>
  )
}

export default Landing