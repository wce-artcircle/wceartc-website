import React from "react";
import "./members.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import PRESIDENT from "../../assets/images/president.jpg";
// import VICEPRESIDENT from "../../assets/ruturaj2.jpg";
// import SECRETARY from "../../assets/images/secretary.jpg";
// import SIR from '../../assets/sir.jpeg'

const Members = () => {
  return (
    <div id="members">
      <h2>Our Leaders</h2>
      <div className="group">
        {/* <div className="member">
          <div className="member-image">
            <img src={SIR} alt=''/>
          </div>
          <div className="member-info">
            <div className='member-name'>
              <h5>Prof. Kiran Madhale</h5>
              <h6>Staff Advisor-WCE ART CIRCLE</h6>
            </div>
            <div className="member-socials">
              <a href='https://www.linkedin.com/company/wce-art-circle/' target='_blank' rel='noreferrer'><LinkedInIcon fontSize='large'/></a>
              <a href='https://www.instagram.com/wce_artcircle/' target='_blank' rel='noreferrer'><InstagramIcon fontSize='large'/></a>
            </div>
          </div>
        </div> */}
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
                target='_blank' rel='noreferrer'
              >
                <LinkedInIcon fontSize="large" />
              </a>
              <a
                href="https://www.instagram.com/nrutyanjalii/"
                target='_blank' rel='noreferrer'
              >
                <InstagramIcon fontSize="large" />
              </a>
            </div>
          </div>
        </div>
        {/* <div className="member">
          <div className="member-image">
            <img src={VICEPRESIDENT} alt=''/>
          </div>
          <div className="member-info">
            <div className='member-name'>
              <h5>Ruturaj Chikurde</h5>
              <h6>Vice-President-WCE ART CIRCLE</h6>
            </div>
            <div className="member-socials">
              <a href='https://www.linkedin.com/in/ruturaj-chikurde-72033b243' target='_blank' rel='noreferrer'><LinkedInIcon fontSize='large'/></a>
              <a href='https://www.instagram.com/r__ruturaj/?igshid=ZDdkNTZiNTM%3D' target='_blank' rel='noreferrer'><InstagramIcon fontSize='large'/></a>
            </div>
          </div>
        </div> */}

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
                target='_blank' rel='noreferrer'
              >
                <LinkedInIcon fontSize="large" />
              </a>
              {/* <a
                href="https://instagram.com/prajval_tayde_patil?igshid=MzRlODBiNWFlZA=="
                target='_blank' rel='noreferrer'
              >
                <InstagramIcon fontSize="large" />
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
