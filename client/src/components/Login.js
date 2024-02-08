import React, { useState } from 'react';
import Auth from '../utils/auth';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = (e) => {
    e.preventDefault();
    Auth.logout();   
  }

  const [values, setValues] = useState({
    username: "",
    password: ""
  })

  const handleLogin = async (e) => {
    e.preventDefault();
    
    axios.post("/api/user/login", {
      username: values.username,
      password: values.password
    })
    .then((res) => {
      localStorage.setItem("id_token", res.data.token)
      window.location.reload()
    })
    .catch((err) => console.error(err));
  }

  return (
    <div>
      <p className="body-text bold-text mt-3">Art by <span onClick={handleShow} className="login">Gabrielle Duran</span></p>
      {Auth.loggedIn() ? (
        <button onClick={handleLogout}>Logout</button>
      ): (
        <div></div>
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>Admin Login</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleLogin} className=''>
        <Modal.Body>
            <input 
              placeholder='username'
              name='username'
              type='username'
              onChange={(e) => setValues({...values, username: e.target.value})
            }
            />
            <input 
              placeholder='*******'
              name='password'
              type='password'
              onChange={(e) => setValues({...values, password: e.target.value})
            }
            />
        </Modal.Body>
        <Modal.Footer>
            <button variant="secondary" onClick={handleClose}>
              Cancel
            </button>
            <button variant="primary" type="submit" onClick={handleClose}>
              Login
            </button>
        </Modal.Footer>
        </form>
      </Modal>
    </div>    
  )
}

export default Login;