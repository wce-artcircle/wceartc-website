import React from "react";
import "./Sponsors.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const Sponsors = () => {
  return (
    <div id="sponsors" style={{ marginTop: "50px" }}>
      <h2 className="rainbow-text">Sponsors</h2>
      <div className="sponsors-container">
        {/* <h1 className="sponsors-heading">Sponsors</h1> */}
        <div className="sponsors-scroll">
          <div className="sponsor-item">
            <a
              href="https://www.dinnch.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "white" }}
            >
              <img
                src="sponsors/refreshment-partner.jpg"
                alt="Refreshment Partner (Dinnch)"
              />
              <p>
                Refreshment Partner{" "}
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </p>
            </a>
          </div>
          <div className="sponsor-item">
            <img src="sponsors/lead-sponsor.jpg" alt="Lead Sponsor (JTI)" />
            <p>Lead Sponsor</p>
          </div>
          <div className="sponsor-item">
            <img src="sponsors/lead-sponsor1.jpg" alt="Lead Sponsor (FinIQ)" />
            <p>Lead Sponsor</p>
          </div>
          <div className="sponsor-item">
            <img src="sponsors/co-sponsor.jpg" alt="Co-Sponsor (PNG)" />
            <p>Co-Sponsor</p>
          </div>

          <div className="sponsor-item">
            <img
              src="sponsors/facility-partner.jpg"
              alt="Facility Partner (Debounce Sports)"
            />
            <p>Facility Partner</p>
          </div>
          <div className="sponsor-item">
            <img
              src="sponsors/food-partner.jpg"
              alt="Food Partner (Curry Pallete)"
            />
            <p>Food Partner</p>
          </div>
          <div className="sponsor-item">
            <img
              src="sponsors/media-partner.jpg"
              alt="Media Partner (Sakal Media)"
            />
            <p>Media Partner</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
