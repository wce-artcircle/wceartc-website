import React from 'react'
import './footer.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

import logo from '../../assets/favi.png'
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="logo-icons">
        <div className="logo">
          <img src={logo} alt=""></img>
        </div>
        <div className="media-links">
          <div className="media-container">
            <p className="stay-tuned">Stay Tuned!</p>
            <div className="icons">
              <a
                href="https://www.linkedin.com/company/wce-art-circle/"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedInIcon fontSize="large" />
              </a>
              <a
                href="https://www.instagram.com/wce_artcircle/"
                target="_blank"
                rel="noreferrer"
              >
                <InstagramIcon fontSize="large" />
              </a>
              <a
                href="https://youtube.com/@wceartcircle"
                target="_blank"
                rel="noreferrer"
              >
                <YouTubeIcon fontSize="large" />
              </a>
              <a
                href="https://m.facebook.com/wceartcircle/"
                target="_blank"
                rel="noreferrer"
              >
                <FacebookIcon fontSize="large" />
              </a>
            </div>
            <div className="copy-rights">
              <p>ALL RIGHTS RESERVED &#169; WCEARTCIRCLE </p>
            </div>
          </div>
        </div>
        <div className="address-policies">
          <div className="details">
            <p className="details-icons">
              <EmailIcon className="spacing" />
              <strong className="bold">Email Us At: </strong>
              wceartcircle@walchandsangli.ac.in
            </p>
            <p className="details-icons">
              <LocationOnIcon className="spacing" />
              <strong className="bold">Reach Us At: </strong>Walchand College of
              Engineering, Vishrambagh, Sangli-416415
            </p>
            <p className="details-icons">
              <LocalPhoneIcon className="spacing" />
              <strong className="bold">Contact Us At: </strong>+91 93240 58857
            </p>
          </div>
          <div className="policies">
            <NavLink to="/privacy-policy">PRIVACY POLICY</NavLink>
            <p>&nbsp; | &nbsp;</p>

            <NavLink to="/terms-and-conditions">TERMS AND CONDITIONS</NavLink>
            <p>&nbsp; | &nbsp;</p>
            <NavLink to="/cancellation-and-refund-policy">
              CANCELLATION AND REFUND POLICY
            </NavLink>
            <p>&nbsp; | &nbsp;</p>
            <NavLink to="/service-pricing">SERVICE PRICING</NavLink>
            <p>&nbsp; | &nbsp;</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer