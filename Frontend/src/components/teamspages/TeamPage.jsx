import React from "react";
import "./TeamPage.css";
import Artpiece from "./Artpiece";

function TeamPage({ heading, description, artform }) {
  return (
    <div className="main">
      <div className="description">
        <h1>{heading}</h1>
        <h3>{description}</h3>
      </div>
      <div className="exhibition-tiles">
        {artform.map((artpiece, index) => (
          <Artpiece key={index} artpiece={artpiece} />
        ))}
      </div>
    </div>
  );
}

export default TeamPage;
