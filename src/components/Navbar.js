import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUser, faTools } from '@fortawesome/free-solid-svg-icons';

const StyledNavbar = styled.nav`
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary-color);
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;

    @media (max-width: 968px) {
      display: none;
      &.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        padding: 1rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
    }

    .book-now-button {
      background: var(--primary-color);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s ease;

      &:hover {
        background: var(--primary-dark);
        transform: translateY(-1px);
      }

      .icon {
        font-size: 1rem;
      }

      &.active {
        background: var(--primary-dark);
      }
    }
  }

  .nav-link {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover, &.active {
      color: var(--primary-color);
    }
  }

  .auth-buttons {
    display: flex;
    gap: 1rem;
    align-items: center;

    @media (max-width: 968px) {
      flex-direction: column;
      width: 100%;
      gap: 0.5rem;
    }
  }

  .signup-button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 25px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    font-size: 0.9rem;

    &.professional {
      background: var(--primary-light);
      color: var(--primary-color);

      &:hover {
        background: var(--primary-color);
        color: white;
      }
    }

    &.customer {
      background: var(--primary-color);
      color: white;

      &:hover {
        background: var(--primary-dark);
        transform: translateY(-2px);
      }
    }
  }

  .menu-button {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--text-color);
    cursor: pointer;

    @media (max-width: 968px) {
      display: block;
    }
  }

  @media (max-width: 968px) {
    .nav-container {
      flex-wrap: wrap;
    }

    .auth-buttons {
      order: 3;
      margin-top: 1rem;
      width: 100%;
    }
  }
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <StyledNavbar>
      <div className="nav-container">
        <Link to="/" className="logo">Homzi</Link>
        
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
          >
            About
          </Link>
          <Link 
            to="/services" 
            className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}
          >
            Services
          </Link>
          <Link 
            to="/pricing" 
            className={`nav-link ${location.pathname === '/pricing' ? 'active' : ''}`}
          >
            Pricing
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            Contact
          </Link>
          <Link 
            to="/booking" 
            className={`book-now-button ${location.pathname === '/booking' ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={faTools} className="icon" />
            Book Now
          </Link>
        </div>

        <div className="auth-buttons">
          <Link to="/professional-signup" className="signup-button professional">
            <FontAwesomeIcon icon={faUser} /> For Professionals
          </Link>
          <Link to="/customer-signup" className="signup-button customer">
            <FontAwesomeIcon icon={faUser} /> Sign Up
          </Link>
        </div>

        <button className="menu-button" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
      </div>
    </StyledNavbar>
  );
};

export default Navbar;
