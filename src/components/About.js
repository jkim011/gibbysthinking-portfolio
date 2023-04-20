import React from "react";

import ProfileAvatar from '../assets/profile-avatar.png';
import GabbyAvatar from '../assets/gabby-avatar-cropped.png';


function About() {
  return (
    <div id="about">
      <div>
        <img src={GabbyAvatar} className="profile-avatar box-shadow"/> 
      </div>
      <div className="about-text">
        <p>bello banana im dagibby i draw cool things hello everybody potato alskdf flaksdjf ldkfj sdkjf kdjf ks ksdfj  ksf slkdjf dkf slkfj sfllj asdlk lakdf  fadsklf dslkfj asdlfkj lakd kfdsa kfdjl lkds</p>
      </div>
      
    </div>
  )
}

export default About;