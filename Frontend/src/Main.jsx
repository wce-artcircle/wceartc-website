import React from "react";
import Navbar from "./components/nav/Navbar";
import Landing from "./components/landing/Landing";
import About from "./components/about/About";
import Teams from "./components/teams/Teams";
import Events from "./components/events/Events";
import Members from "./components/members/Members";
import Footer from "./components/footer/Footer";
import Toplink from "./components/yuvarang/Toplink";
import SponsorsToplink from "./components/yuvarang/SponsorsToplink";
import Sponsors from "./components/yuvarang/Sponsors";
import ScrollToEvents from "./components/ScrollToEvents/ScrollToEvents.jsx";
//import FloatingIcons from "./components/FloatingIcons";

const Main = () => {
  return (
    <>
      {/* <FloatingIcons /> */}
      <Toplink />
      <Navbar />
      <SponsorsToplink />
      
      {/* Landing Section */}
      <section id="home" style={{ position: 'relative', zIndex: 20 }}>
        <Landing />
      </section>
      
      {/* About Section */}
      <section id="about" style={{ position: 'relative', zIndex: 20 }}>
        <About />
      </section>
      
      {/* Teams Section */}
      <section id="teams" style={{ position: 'relative', zIndex: 20 }}>
        <Teams />
      </section>
      
      {/* Sponsors Section */}
      <section id="sponsors" style={{ position: 'relative', zIndex: 20 }}>
        <Sponsors />
      </section>
      
      {/* Events Section */}
      <section id="events" style={{ position: 'relative', zIndex: 20 }}>
        <Events />
      </section>
      
      {/* Members Section */}
      <section id="members" style={{ position: 'relative', zIndex: 20 }}>
        <Members />
      </section>
      
      <Footer />
      
      {/* Floating Scroll to Events Button - appears on scroll */}
      <ScrollToEvents />
    </>
  );
};

export default Main;