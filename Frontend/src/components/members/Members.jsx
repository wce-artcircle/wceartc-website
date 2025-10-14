import React from "react";
import "./members.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import PranavImg from "./Pranav_Chaudhary_P_img.jpg";
import PranavManeImg from "./Pranav_Mane_VP_Image.jpg";
import Revatiimg from "./Revati_Dixit_Secretary_img.jpg";


const Members = () => {
  return (
    <div id="members">
      <h2>Our Leaders</h2>
      <div className="group">
        <div className="member">
          <div className="member-image">
              <img src={PranavImg} alt="Pranav Chaudhari" />
          </div>
          <div className="member-info">
            <div className="member-name">
              <h5>Pranav Chaudhari</h5>
              <h6>President-WCE ART CIRCLE</h6>
            </div>
            <div className="member-socials">
              <a
                href="https://www.linkedin.com/in/pranav-chaudhari-00316b310?"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
            </div>
          </div>
        </div>

        <div className="member">
          <div className="member-image">
            <img src={PranavManeImg} alt="Pranav Mane"/>
          </div>
          <div className="member-info">
            <div className="member-name">
              <h5>Pranav Mane</h5>
              <h6>Vice-President-WCE ART CIRCLE</h6>
            </div>
            <div className="member-socials">
              <a
                href="https://www.linkedin.com/in/pranav-mane-5b16a7256"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
            </div>
          </div>
        </div>


          <div className="member">
          <div className="member-image">
          <img src={Revatiimg} alt="Revati Dixit"/>
          </div>
          <div className="member-info">
            <div className="member-name">
              <h5>Revati Dixit</h5>
              <h6>Secretary-WCE ART CIRCLE</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
