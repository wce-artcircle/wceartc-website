import React from "react";
import "./members.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import AyushImg from "./Ayush_Borkar.png";
import VedantImg from "./Vedant_Deotale.jpeg";
import PrathameshImg from "./prathemesh_pachore.jpeg";
import ShwetaImg from "./Shweta_Patil.jpeg"; 

const Members = () => {
  return (
    <div id="members">
      <h2>Our Leaders</h2>

      <div className="group">

        {/* President */}
        <div className="member">
          <div className="member-image">
            <img src={AyushImg} alt="Ayush Borkar" />
          </div>

          <div className="member-info">
            <div className="member-name">
              <h5>Ayush Borkar</h5>
              <h6>President - WCE ART CIRCLE</h6>
            </div>

            <div className="member-socials">
              <a href="https://www.linkedin.com/in/ayush-borkar-6019b0289?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>

              <a href="https://www.instagram.com/mr_ayushborkar10110?igsh=cHdmZW1hYmQ0aXcw" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </div>
          </div>
        </div>

        {/* Vice President & Secretary */}
        <div className="member">
          <div className="member-image">
            <img src={VedantImg} alt="Vedant Deotale" />
          </div>

          <div className="member-info">
            <div className="member-name">
              <h5>Vedant Deotale</h5>
              <h6>Vice President & Secretary</h6>
            </div>

            <div className="member-socials">
              <a href="https://www.linkedin.com/in/vedant-deotale-836827280" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>

              <a href="https://www.instagram.com/d_vedaaant?igsh=MXIwOTVsa3U2eXlsZg==" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </div>
          </div>
        </div>

        {/* Club Manager */}
        <div className="member">
          <div className="member-image">
            <img src={PrathameshImg} alt="Prathamesh Pachore" />
          </div>

          <div className="member-info">
            <div className="member-name">
              <h5>Prathamesh Pachore</h5>
              <h6>Club Manager</h6>
            </div>

            <div className="member-socials">
              <a href="https://www.linkedin.com/in/prathamesh-pachore-402166298?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>

              <a href="https://www.instagram.com/pratham______28?igsh=OHF3NHZnY3Z6aDlp" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </div>
          </div>
        </div>

        {/* Event Director */}
        <div className="member">
          <div className="member-image">
            <img src={ShwetaImg} alt="Shweta Patil" />
          </div>

          <div className="member-info">
            <div className="member-name">
              <h5>Shweta Patil</h5>
              <h6>Event Director</h6>
            </div>

            <div className="member-socials">
              <a href="https://www.linkedin.com/in/shweta-patil-67443b2b5?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>

              <a href="https://www.instagram.com/rajeyshwetaa?igsh=OXJvaWJscmJxdmts" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Members;