import React from 'react'
import Navbar from './components/nav/Navbar'
import Landing from './components/landing/Landing'
import About from './components/about/About'
import Teams from './components/teams/Teams'
import Events from './components/events/Events'
import Members from './components/members/Members'
import Footer from './components/footer/Footer'

const Main = () => {
  return (
    <>
    <Navbar/>
    <Landing/>
    <About/>
    <Teams/>
    <Events/>
    <Members/>
    <Footer/>
    </>
  )
}

export default Main