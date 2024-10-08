import React, { useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/logo.png';

function Header() {
  var prevScrollpos = window.scrollY;
  window.onscroll = function() {
    var currentScrollPos = window.scrollY;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-160px";
    }
    prevScrollpos = currentScrollPos;
  }
  return (
    <Navbar id="navbar" bg="#F3CFC6" expand="lg" fixed="top" collapseOnSelect>
      <div className="navbar-brand-container">
        <Navbar.Brand href="/" id="nav-brand"><img src={Logo} id="nav-logo"/></Navbar.Brand>
      </div>
      <div className="navbar-toggler-container">
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="nav-items"/>
      </div>
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto "></Nav>
          <Nav className="nav-items">
            <Nav.Link href="https://gibbysthinking.etsy.com" target="_blank" rel="noreferrer">Shop</Nav.Link>
            <Nav.Link href="/">Portfolio</Nav.Link>
            <Nav.Link href="/about-me">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header;