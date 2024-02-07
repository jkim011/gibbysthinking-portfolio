import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Header() {
  return (
    <Navbar id="navbar" bg="#F3CFC6" expand="lg">
        <Navbar.Brand href="#about" id="nav-brand">DaGibby</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="nav-items"/>
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto "></Nav>
          <Nav className="nav-items">
            <Nav.Link href="https://gibbysthinking.etsy.com" target="_blank" rel="noreferrer">Shop</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#portfolio">Portfolio</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header;