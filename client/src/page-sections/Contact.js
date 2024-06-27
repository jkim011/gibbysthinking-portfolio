import React, {useState} from "react";
import axios from "axios";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/send-email",
        { name, email, subject, message }
      )
      alert("success") // need to reset state so form is empty after sending
    } catch (error) {
      console.log("Error sending email: ", error)
    }
  }

  return (
    <div id="contact">
      <h1 className="mb-4">Contact Me</h1>
      <form id="contact-form" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Name</label> <br/>
          <input 
            type="text" 
            className=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email address</label> <br/>
          <input 
            type="email" 
            className="" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Subject</label> <br/>
          <input 
            type="text" 
            className="" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Message</label> <br/>
          <textarea 
            className="" 
            rows={6} 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Contact;