import React from 'react';
import './Navbar.css';
import logo from '../../assets/logo.jpg';

function Navbar() {
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="navbar-logo" />
    </nav>
  );
}

export default Navbar;
