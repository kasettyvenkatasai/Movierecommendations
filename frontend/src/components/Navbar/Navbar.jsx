import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRecommendation } from '../../context/RecommendationContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
 const { setUser } = useRecommendation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
   const handleLogout = async () => {
    try {
      // Call backend to clear cookie
      await axios.post(
        'http://localhost:5000/logout', 
        {}, 
        { withCredentials: true } // important for cookies
      );

      // Reset user state in context
      setUser(null);

      // Redirect to login or home page
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          📚🎬 MoodPicks
        </Link>
        
        <div className={`navbar-menu ${isMenuOpen ? 'is-active' : ''}`}>
          <Link to="/" className={`navbar-item ${isActive('/')}`} onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/recommendations" className={`navbar-item ${isActive('/recommendations')}`} onClick={() => setIsMenuOpen(false)}>
            Recommendations
          </Link>
          <Link to="/watchlist" className={`navbar-item ${isActive('/watchlist')}`} onClick={() => setIsMenuOpen(false)}>
            Watchlist
          </Link>
          <Link to="/reading-list" className={`navbar-item ${isActive('/reading-list')}`} onClick={() => setIsMenuOpen(false)}>
            Reading List
          </Link>
          <Link to="/profile" className={`navbar-item ${isActive('/profile')}`} onClick={() => setIsMenuOpen(false)}>
            Profile
          </Link>
          <Link to="/login" className={`navbar-item ${isActive('/login')}`} onClick={() => setIsMenuOpen(false)}>
            Login
          </Link>
          <Link to="/signup" className={`navbar-item ${isActive('/signup')}`} onClick={() => setIsMenuOpen(false)}>
            Signup
          </Link>
          <button onClick={handleLogout} className="btn-logout">
      Logout
    </button>
        </div>

        <div className="navbar-burger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;