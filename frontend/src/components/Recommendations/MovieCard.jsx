import React, { useState } from 'react';
import './Cards.css';
import axios from 'axios';
import { useRecommendation } from '../../context/RecommendationContext';
const MovieCard = ({ movie, onWatchNow, onAddToWatchlist }) => {
  const [isAdded, setIsAdded] = useState(false);
  const {user} = useRecommendation()  
  const handleAddToWatchlist =  async () => {
  try {
    const response = await axios.post("http://localhost:5000/addtowatchlist", {
      useremail: user.email,  
      movieId: movie._id, 
    });
    console.log(response.data.message);
    onAddToWatchlist(movie); 
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  } catch (err) {
    console.error("Error adding to watchlist:", err);
  }
};

  return (
    <div className="card">
      <div className="card-image">
        <img src={movie.poster} alt={movie.title} />
        <div className="card-overlay">
          <button onClick={onWatchNow} className="btn btn-primary card-btn">
            Watch Trailer
          </button>
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{movie.title}</h3>
        <p className="card-genre">{movie.genre}</p>
        <div className="card-rating">
          <span className="rating-stars">⭐</span>
          <span className="rating-value">{movie.rating}</span>
        </div>
        <p className="card-description">{movie.description}</p>
        
        <div className="card-actions">
          <button onClick={onWatchNow} className="btn btn-primary">
            Watch Now
          </button>
          <button 
            onClick={handleAddToWatchlist} 
            className={`btn btn-outline ${isAdded ? 'added' : ''}`}
            disabled={isAdded}
          >
            {isAdded ? 'Added!' : 'Add to Watchlist'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;