import React, { useState } from 'react';
import './Cards.css';

const BookCard = ({ book, onReadNow, onAddToReadingList }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToReadingList = () => {
    onAddToReadingList(book);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="card">
      <div className="card-image">
        <img src={book.cover} alt={book.title} />
        <div className="card-overlay">
          <button onClick={onReadNow} className="btn btn-primary card-btn">
            Read Preview
          </button>
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{book.title}</h3>
        <p className="card-genre">{book.genre}</p>
        <div className="card-rating">
          <span className="rating-stars">⭐</span>
          <span className="rating-value">{book.rating}</span>
        </div>
        <p className="card-description">{book.description}</p>
        
        <div className="card-actions">
          <button onClick={onReadNow} className="btn btn-primary">
            Read Now
          </button>
          <button 
            onClick={handleAddToReadingList} 
            className={`btn btn-outline ${isAdded ? 'added' : ''}`}
            disabled={isAdded}
          >
            {isAdded ? 'Added!' : 'Add to Reading List'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;