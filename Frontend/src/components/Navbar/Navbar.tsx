import React from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../../assets/home.png';
import './Navbar.scss';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-home-link">
          <img src={homeIcon} alt="Home" className="home-icon" />
          Home
        </Link>
      </div>
    </nav>
  );
};
