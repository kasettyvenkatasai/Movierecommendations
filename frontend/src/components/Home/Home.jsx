import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Discover Your Perfect Entertainment</h1>
          <p className="hero-subtitle">
            Get personalized movie and book recommendations based on your current mood
          </p>
          <Link to="/mood" className="btn btn-primary hero-btn">
            Find My Recommendations
          </Link>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg" 
            alt="Movies and Books" 
          />
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">😊</div>
              <h3>Choose Your Mood</h3>
              <p>Tell us how you're feeling - Happy, Sad, Excited, or Relaxed</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Get Recommendations</h3>
              <p>Receive curated movie and book suggestions tailored to your mood</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Save & Track</h3>
              <p>Add favorites to your watchlist and reading list for later</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Rate & Review</h3>
              <p>Share your thoughts and help others discover great content</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of users discovering their next favorite movie or book</p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn btn-primary">Sign Up Free</Link>
            <Link to="/mood" className="btn btn-outline">Try It Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;