import React, {useState} from "react";
import Auth from '../utils/auth';
import GabbyAvatar from '../assets/gabby-avatar-cropped.png';

function AboutMe() {
  const [aboutMe, setAboutMe] = useState();

  // const handleChange = (e) => {
  //   const 
  // }
  const user = Auth.getProfile().data
  console.log(user.aboutMe)
  return (
    <div id="about-me">
      {/* <img src={GabbyAvatar} className="about-me-pic me-lg-3"/> */}
      <div className="about-me-text ms-lg-3">
        <h1 className="mb-4">About Me</h1>
        {/* <form>
          <textarea
            className="textarea" 
            onChange={handleChange}
            placeholder=
            value=
          />
        </form> */}

      </div>
    </div>
  )
}

export default AboutMe;