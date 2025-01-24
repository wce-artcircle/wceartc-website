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

const Main = () => {
  return (
    <>
      <Toplink />
      <Navbar />
      <SponsorsToplink />
      <Landing />
      <About />
      <Teams />
      <Sponsors />
      <Events />
      <Members />
      <Footer />
    </>
  );
};

export default Main;
