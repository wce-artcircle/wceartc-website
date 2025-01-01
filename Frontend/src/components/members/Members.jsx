import React from "react";
import "./members.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Members = () => {
  return (
    <div id="members">
      <h2>Our Leaders</h2>
      <div className="group">
        <div className="member">
          <div className="member-image">
            <img
              src="https://raw.githubusercontent.com/wce-artcircle/Assets/main/heads/president.jpg"
              alt="Anjali Patil"
            />
          </div>
          <div className="member-info">
            <div className="member-name">
              <h5>Anjali Patil</h5>
              <h6>President-WCE ART CIRCLE</h6>
            </div>
            <div className="member-socials">
              <a
                href="https://www.linkedin.com/in/anjali-patil-2ba91a280/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
              <a
                href="https://www.instagram.com/nrutyanjalii/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </div>
          </div>
        </div>

        <div className="member">
          <div className="member-image">
            <img
              src="https://raw.githubusercontent.com/wce-artcircle/Assets/main/heads/secretary.jpg"
              alt="Shruti Chavan"
            />
          </div>
          <div className="member-info">
            <div className="member-name">
              <h5>Shruti Chavan</h5>
              <h6>Secretary-WCE ART CIRCLE</h6>
            </div>
            <div className="member-socials">
              <a
                href="https://www.linkedin.com/in/shruti-chavan-4a3b32272/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
