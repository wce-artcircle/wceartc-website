import React from "react";
import "./about.css";
import ABTIMAGE from "../../assets/about_img.jpg";

const PaletteIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#21E6C1" strokeWidth="1.5">
      <circle cx="13.5" cy="6.5" r=".5" fill="#21E6C1" />
      <circle cx="17.5" cy="10.5" r=".5" fill="#21E6C1" />
      <circle cx="8.5" cy="7.5" r=".5" fill="#21E6C1" />
      <circle cx="6.5" cy="12.5" r=".5" fill="#21E6C1" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );

  const CameraIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#21E6C1" strokeWidth="1.5">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );

  const FilmIcon = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#21E6C1" strokeWidth="1.5">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 3v18M3 7.5h4M3 12h18M3 16.5h4M17 3v18M21 7.5h-4M21 16.5h-4" />
    </svg>
  );

  const HeartIcon = () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#21E6C1" strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );

const About = () => {
  return (
    <div id="about">
      <div className="main">
        <div className="about">
          <h2 className="warm-gradient-text about-title">About Us</h2>
          <div className="heading">
            <div className="about-img">
              <img src={ABTIMAGE} alt="Art Circle mandala artwork" />
            </div>
            <div className="about-text">
              <h6>
                ART CIRCLE is a cultural club of Walchand College of
                Engineering, Sangli. We always strive for the development and
                growth of artistic skills and capabilities in the students. ART
                CIRCLE also provides a platform for the students to enhance
                their management skills as well as personality development.
                Currently we are a family of more than 100 working members.
                Since last 4 years we have produced more than 400 artists from
                Walchand College of Engineering, Sangli. We also conduct various
                cultural and art-related events throughout the academic year. We
                contribute to social and personal development of a student
                achieving balance between curricular and extra-curricular skill.
              </h6>
            </div>
          </div>
          <div className="decorative-icons">
            <div className="deco-icon deco-palette">
              <PaletteIcon />
            </div>
            <div className="deco-icon deco-camera">
              <CameraIcon />
            </div>
            <div className="deco-icon deco-film">
              <FilmIcon />
            </div>
            <div className="deco-icon deco-heart">
              <HeartIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
