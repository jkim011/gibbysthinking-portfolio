import React, {useState} from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if(!document.getElementById("name").value) {
      setErrorMessage("Name required")
      return;
    }
    if(!document.getElementById("email").value) {
      setErrorMessage("Email required")
      return; 
    }
    if(!document.getElementById("message").value) {
      setErrorMessage("Message required")
      return; 
    }

    try {
      await axios.post(
        "/api/send-email",
        { name, email, subject, message }
      )
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setErrorMessage("");
      handleShow();
    } catch (error) {
      console.log("Error sending email: ", error)
    }
  }

  return (
    <div id="contact">
      <h1 className="mb-4">Contact Me</h1>
      <form id="contact-form" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Name (required)</label> <br/>
          <input 
            type="text" 
            id="name"
            className="contact-forms"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email (required)</label> <br/>
          <input 
            type="email" 
            id="email"
            className="contact-forms" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Subject</label> <br/>
          <input 
            type="text" 
            id="subject"
            className="contact-forms" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Message (required)</label> <br/>
          <textarea 
            id="message"
            className="contact-forms" 
            rows={5} 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="submit" className="button-submit">Submit</button>

        <div className="" style={{color:"red", fontWeight:"bold", fontSize:"18px"}}>{errorMessage}</div>
      </form>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          <div className="d-flex flex-column align-items-center">
            <p>Your message has been sent. I will get back to you soon!</p>
          </div>
          <div className="d-flex flex-column align-items-center">
          <button className="button-submit" style={{borderRadius:"5px"}} type="submit" onClick={handleClose}>
            ✔
          </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Contact;