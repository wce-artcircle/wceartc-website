import React, { useState } from 'react'
import './navbar.css'
import IMG from '../../assets/favi.png'

const Navbar = () => {
  const [activeNav, setActiveNav] = useState('#home')

  const handleNavClick = (e, target) => {
    e.preventDefault()
    setActiveNav(target)
    
    const elementId = target.substring(1)
    const element = document.getElementById(elementId)
    
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <header className='head'>
      <div className='image'>
        <img src={IMG} alt='WCE Art Circle Logo'></img>
      </div>
      <div className='sections'>
        <a 
          href='#home' 
          onClick={(e) => handleNavClick(e, '#home')} 
          className={activeNav === '#home' ? 'active' : ''}
        >
          Home
        </a>
        <a 
          href='#about' 
          onClick={(e) => handleNavClick(e, '#about')} 
          className={activeNav === '#about' ? 'active' : ''}
        >
          About Us
        </a>
        <a 
          href='#teams' 
          onClick={(e) => handleNavClick(e, '#teams')} 
          className={activeNav === '#teams' ? 'active' : ''}
        >
          Teams
        </a>
        <a 
          href='#events' 
          onClick={(e) => handleNavClick(e, '#events')} 
          className={activeNav === '#events' ? 'active' : ''}
        >
          Events
        </a>
        <a 
          href='#footer' 
          onClick={(e) => handleNavClick(e, '#footer')} 
          className={activeNav === '#footer' ? 'active' : ''}
        >
          Contact Us
        </a>
      </div>
    </header>
  )
}

export default Navbar