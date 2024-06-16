import React from "react";
import IgIcon from '../assets/icons/ig-icon-darker.png';
import TwitterIcon from '../assets/icons/twitter-icon-darker.png';
import EmailIcon from '../assets/icons/email-icon-darker.png';
import TiktokIconShape from '../assets/icons/tiktok-icon-shape.png';
import Login from "../components/Login";

const Footer = () => {
  return (
    <div id="footer">
      <div className="social-links">
        <a href="https://www.instagram.com/gibbysthinking" target="_blank" rel="noreferrer"><img className="socials" src={IgIcon} alt="Instagram" draggable="false"/></a>
        <a href="https://www.tiktok.com/@gibbysthinking" target="_blank" rel="noreferrer"><img className="socials" src={TiktokIconShape} alt="TikTok" draggable="false"/></a>
        <a href="mailto: gabbypduran@gmail.com" target="_blank" rel="noreferrer"><img className="socials" src={EmailIcon} alt="Email" draggable="false"/></a>
      </div>
      <Login />
    </div>
  )
}

export default Footer;