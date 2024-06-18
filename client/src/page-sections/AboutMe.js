import React, {useState, useEffect} from "react";
import axios from 'axios';
import Auth from '../utils/auth';
import GabbyAvatar from '../assets/gabby-avatar-cropped.png';

function AboutMe() {
  // const user = Auth.getProfile().data
  const [user, setUser] = useState();
  // const [user, setUser] = useState(Auth.getProfile().data);
  const [aboutMe, setAboutMe] = useState();

  useEffect(() => {
    queryMe();
  },[])

  const queryMe = async () => {
    const result = await axios.get("api/user/query-me");
    setUser(result.data.user)
    console.log(result.data.user.aboutMe, "result ")
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
    } catch (error) {
      console.error("Error editing about me:", error);
    }
  };

  // if(!Auth.loggedIn()) {
  //   return (
  //     <div className="about-me">
  //       {/* <img src={GabbyAvatar} className="about-me-pic me-lg-3"/> */}
  //       <p>{user?.aboutMe}</p>
  //     </div>
  //   )
  // } else {      
  //   const adminLoggedIn = () => {
  //     const isUser = Auth.getProfile().data
  //     if(isUser.isAdmin === true) {
  //       return true
  //     } else if(isUser.isAdmin === false) {
  //       return false
  //     }
  //   }
  //   const adminIsLoggedIn = adminLoggedIn();
  //   return (
  //     <div className="about-me">
  //       <div className="about-me-text ms-lg-3">
  //         <h1 className="mb-4">About Me</h1>
  //         {adminIsLoggedIn == true ? (
  //           <form className="" onSubmit={handleEditAboutMe}>
  //             <textarea
  //               className="textarea" 
  //               onChange={handleChange}
  //               placeholder={`${user?.aboutMe}`}
  //               value={aboutMe}
  //             />
  //             <button type="submit">edit</button>
  //           </form>
  //         ) : (
  //           <div></div>
  //         )}

  //       </div>
  //     </div>
  //   )
  // }
  return (
    <div className="about-me">
      <div className="about-me-text ms-lg-3">
        <h1 className="mb-4">About Me</h1>
        {!Auth.loggedIn() ? (
          <p>{user?.aboutMe}</p>
        ) : (
          Auth.getProfile().data.isAdmin ? (
            <form className="edit-about-me" onSubmit={handleEditAboutMe}>
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