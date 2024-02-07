import React from "react";

import ProfileAvatar from '../assets/profile-avatar.png';
import GabbyAvatar from '../assets/gabby-avatar-cropped.png';
import Rays from '../assets/rays.png';

function About() {
  return (
    <div id="about">
        <div>
          <img src={Rays} className="rays"/> 
        </div>
        <div>
          <img src={GabbyAvatar} className="profile-avatar box-shadow"/> 
        </div>
      <div className="about-text">
        <p>We have the ability to trigger deep memories through food; Its texture, taste, and image can bring back emotions that we experienced long ago. My focus is to create pieces that can remind us of these bygone memories, & for these feelings of nostalgia to connect us closer as we find out just how much we shared in our childhood.</p>
      </div>
      
    </div>
  )
}

export default About;