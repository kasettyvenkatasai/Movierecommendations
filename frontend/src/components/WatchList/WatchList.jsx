import React from 'react';
import { useRecommendation } from '../../context/RecommendationContext';
import '../ReadingList/Lists.css';

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useRecommendation();

  if (watchlist.length === 0) {
    return (
      <div className="list-container">
        <h1 className="page-title">My Watchlist</h1>
        <div className="empty-list">
          <div className="empty-icon">🎬</div>
          <h2>Your watchlist is empty</h2>
          <p>Add movies from your recommendations to keep track of what you want to watch.</p>
          <button 
            onClick={() => window.location.href = '/recommendations'} 
            className="btn btn-primary"
          >
            Browse Recommendations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="list-container">
      <div className="list-header">
        <h1 className="page-title">My Watchlist</h1>
        <p className="list-subtitle">{watchlist.length} movies to watch</p>
      </div>

      <div className="list-grid">
        {watchlist.map((movie) => (
          <div key={movie.id} className="list-item">
            <div className="list-item-image">
              <img src={movie.poster} alt={movie.title} />
            </div>
            
            <div className="list-item-content">
              <h3 className="list-item-title">{movie.title}</h3>
              <p className="list-item-genre">{movie.genre}</p>
              <div className="list-item-rating">
                <span className="rating-stars">⭐</span>
                <span className="rating-value">{movie.rating}</span>
              </div>
              <p className="list-item-description">{movie.description}</p>
              <p className="list-item-date">
                Added on {new Date(movie.addedDate).toLocaleDateString()}
              </p>
              
              <div className="list-item-actions">
                <button className="btn btn-primary">Watch Now</button>
                <button 
                  onClick={() => removeFromWatchlist(movie.id)}
                  className="btn btn-outline remove-btn"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;