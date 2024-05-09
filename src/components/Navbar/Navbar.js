import React from "react";
import { Link } from "react-router-dom";
import "./index.css"; // Assuming you're using react-router-dom for navigation

const Navbar = () => (
  <div className="navbar">
    <div className="logo">
      <Link to="/" className="link">
        Realtor
      </Link>
    </div>
    <div className="menu">
      <button className="menu-button">
        <span className="menu-icon">☰</span>
      </button>
      <div className="menu-list">
        <Link to="/" className="menu-item">
          <span className="menu-icon">🏠</span> Home
        </Link>
        <Link to="/search" className="menu-item">
          <span className="menu-icon">🔍</span> Search
        </Link>
        <Link to="/search?purpose=for-sale" className="menu-item">
          <span className="menu-icon">ℹ️</span> Buy Property
        </Link>
        <Link to="/search?purpose=for-rent" className="menu-item">
          <span className="menu-icon">🔑</span> Rent Property
        </Link>
      </div>
    </div>
  </div>
);

export default Navbar;
