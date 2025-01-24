import React from "react";
import "./Sponsors.css";

function SponsorsToplink() {
  return (
    <div className="marquee-container">
      <b
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <u>Sponsors</u>
      </b>

      <a href="#sponsors">
        <div className="marquee">
          <a
            href="https://www.dinnch.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="sponsors/refreshment.png" alt="Sponsor 5" />
          </a>
          <img src="sponsors/lead1.png" alt="Sponsor 1" />
          <img src="sponsors/lead.png" alt="Sponsor 2" />
          <img src="sponsors/co.png" alt="Sponsor 3" />
          <img src="sponsors/food.png" alt="Sponsor 4" />

          <img src="sponsors/media.png" alt="Sponsor 6" />
          <img src="sponsors/facility.png" alt="Sponsor 7" />
          <img src="sponsors/thank-you.png" alt="Sponsor 8" />
          <div className="marquee-padding"></div>
        </div>
      </a>
    </div>
  );
}

export default SponsorsToplink;

// // Add this CSS to your stylesheet or a <style> tag in your component
// const styles = `
// @keyframes borderAnimation {
//   0% {
//     border-color: transparent;
//   }
//   50% {
//     border-color: blue;
//   }
//   100% {
//     border-color: transparent;
//   }
// }
// `;

// // Inject styles into the document
// const styleSheet = document.createElement("style");
// styleSheet.type = "text/css";
// styleSheet.innerText = styles;
// document.head.appendChild(styleSheet);
