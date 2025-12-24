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

const Main = () => {
  return (
    <>
      <Toplink />
      <Navbar />
      <SponsorsToplink />
      
      {/* Landing Section */}
      <section id="home">
        <Landing />
      </section>
      
      {/* About Section */}
      <section id="about">
        <About />
      </section>
      
      {/* Teams Section */}
      <section id="teams">
        <Teams />
      </section>
      
      {/* Sponsors Section */}
      <section id="sponsors">
        <Sponsors />
      </section>
      
      {/* Events Section */}
      <section id="events">
        <Events />
      </section>
      
      {/* Members Section */}
      <section id="members">
        <Members />
      </section>
      
      <Footer />
      
      {/* Floating Scroll to Events Button - appears on scroll */}
      <ScrollToEvents />
    </>
  );
};

export default Main;