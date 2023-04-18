import React from "react";

import ProfileAvatar from '../assets/profile-avatar.png';
import GabbyAvatar from '../assets/gabby-avatar-cropped.png';


function About() {
  return (
    <div id="about">
      <div>
        <img src={GabbyAvatar} className="profile-avatar"/> 
      </div>
      <div>
        <p>bello banana im dagibby i draw cool things hello everybody potato</p>
      </div>
      
    </div>
  )
}

export default About;