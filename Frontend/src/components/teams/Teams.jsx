// import React, { useState } from 'react'
// import { motion } from "framer-motion";
// import {
//   CarouselComponent,
//   CarouselItemsDirective,
//   CarouselItemDirective,
// } from "@syncfusion/ej2-react-navigations";
// import * as ReactDOM from "react-dom";
import Slideshow from "./Slideshow";
import "./teams.css";
import DANCE from "../../assets/dance.jpg";
import MUSIC from "../../assets/music_t.jpeg";
import PHOTO from "../../assets/photo_team.jpg";
import DRAMA from "../../assets/drama_t.jpg";
import CONTENT from "../../assets/write_team.jpg";
import ART from "../../assets/design_team.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Teams = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  const navigate = useNavigate();

  const [expandIndex, setExpandIndex] = useState(null);

  const handleHover = (index) => {
    setExpandIndex(index === expandIndex ? -1 : index);
  };

  const handleCardClick = (index) => {
    navigate(card.link[index]);
  };
  const card = {
    name: [
      "Dance Team",
      "Drama Team",
      "Band Team",
      "Photography and Editing Team",
      "Content Team",
      "Art and Decoration Team",
    ],
    images: [DANCE, DRAMA, MUSIC, PHOTO, CONTENT, ART],
    link: [
      "/dance-team",
      "/drama-team",
      "/music-team",
      "/photography-editing-team",
      "/content-team",
      "/art-deco-team",
    ],
  };

  return (
    <div>
      {windowWidth < 1500 ? (
        <Slideshow images={card.images} desc={card.name} navlink={card.link} />
      ) : (
        <div id="teams">
          <div className="teams">
            <h2 className="warm-gradient-text">Our Teams And Their Artforms</h2>
          </div>
          <div className="cards">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div
                className={`cards-style ${
                  index === expandIndex ? "expand" : ""
                }`}
                key={index}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleHover(index)}
                onClick={() => handleCardClick(index)}
                style={{
                  backgroundImage: `url(${card.images[index]})`,
                  transition: "width 0.5s",
                  width: index === expandIndex ? "400px" : "200px",
                }}
              >
                <div className="card-content">
                  <div className="card-footer">
                    <h6 className="heading2">{card.name[index]}</h6>
                    {index === expandIndex && <p>{card.name[index]}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
