import React from "react";
import IgIcon from '../assets/icons/ig-icon-darker.png';
import TwitterIcon from '../assets/icons/twitter-icon-darker.png';
import EmailIcon from '../assets/icons/email-icon-darker.png';
import TiktokIconShape from '../assets/icons/tiktok-icon-shape.png';

function Contact() {
  return (
    <div id="contact">
      <div className="contact-links">
        <a href="https://www.instagram.com/gibbysthinking" target="_blank" rel="noreferrer"><img className="socials" src={IgIcon}/></a>
        <a href="https://www.tiktok.com/@gibbysthinking" target="_blank" rel="noreferrer"><img className="socials" src={TiktokIconShape}/></a>
        <a href="https://www.twitter.com/gibbysthinking" target="_blank" rel="noreferrer"><img className="socials" src={TwitterIcon}/></a>
        <a href="mailto: gabbypduran@gmail.com" target="_blank" rel="noreferrer"><img className="socials" src={EmailIcon}/></a>
      </div>
      <div style={{marginTop:"10px", marginBottom:"15px"}}>
        <p className="body-text bold-text">Art by Gabrielle Duran</p>
      </div>
    </div>
  )
}

export default Contact;