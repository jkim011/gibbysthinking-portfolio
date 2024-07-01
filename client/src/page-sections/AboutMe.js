import React, {useState, useEffect} from "react";
import axios from 'axios';
import Auth from '../utils/auth';
import GabbyAvatar from '../assets/gabby-avatar-cropped.png';

function AboutMe() {
  const [user, setUser] = useState();
  const [aboutMe, setAboutMe] = useState(user?.aboutMe);

  useEffect(() => {
    queryMe();
  },[])

  const queryMe = async () => {
    const result = await axios.get("api/user/query-me");
    setUser(result.data.user)
  }

  const handleChange = (e) => {
    setAboutMe(e.target.value)
  }

  const handleEditAboutMe = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/user/edit-about-me",
        { 
          username: user.username,
          aboutMe: aboutMe 
        },
        { headers: { "Content-Type": "application/json" } }
      ); 
      console.log(response.data)
      alert("Changes saved")
    } catch (error) {
      console.error("Error editing about me:", error);
    }
  };

  return (
    <div className="about-me">
      <div className="about-me-text ms-lg-3">
        <h1 className="mb-4">About Me</h1>
        {!Auth.loggedIn() ? (
          <p>{user?.aboutMe}</p>
        ) : (
          Auth.getProfile().data.isAdmin ? (
            <form className="edit-about-me text-start" onSubmit={handleEditAboutMe}>
              <textarea
                className="textarea w-100"
                onChange={handleChange}
                placeholder={`${user?.aboutMe}`}
                value={aboutMe}
                rows={6}
              />
              <div>
                <button className="button-submit" type="submit">Save Changes</button>
              </div>
            </form>
          ) : (
            <p>{user?.aboutMe}</p>
          )
        )}
      </div>
    </div>
  );
}

export default AboutMe;