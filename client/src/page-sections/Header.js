import React, { useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/logo.png';

function Header() {
  return (
    <Navbar id="navbar" className="" bg="#F3CFC6" expand="lg" sticky="top" collapseOnSelect>
        <Navbar.Brand href="/" id="nav-brand"><img src={Logo} id="nav-logo"/></Navbar.Brand>
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