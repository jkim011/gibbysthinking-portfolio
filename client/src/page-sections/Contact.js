import React from "react";

function Contact() {
  return (
    <div id="contact">
      <h1 className="mb-4">Contact Me</h1>
      <form id="contact-form" >
        <div className="form-group">
          <label>Name</label> <br/>
          <input type="text" className=""/>
        </div>
        <div className="form-group">
          <label>Email address</label> <br/>
          <input type="email" className="" />
        </div>
        <div className="form-group">
          <label>Message</label> <br/>
          <textarea className="" rows={6} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Contact;