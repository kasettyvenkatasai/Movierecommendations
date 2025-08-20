import React from 'react';
import { useRecommendation } from '../../context/RecommendationContext';
import './Lists.css';

const ReadingList = () => {
  const { readingList, removeFromReadingList } = useRecommendation();

  if (readingList.length === 0) {
    return (
      <div className="list-container">
        <h1 className="page-title">My Reading List</h1>
        <div className="empty-list" style={{marginLeft:'450px'}}>
          <div className="empty-icon">📚</div>
          <h2>Your reading list is empty</h2>
          <p>Add books from your recommendations to keep track of what you want to read.</p>
          <button 
            onClick={() => window.location.href = '/recommendations'} 
            className="btn btn-primary"
            style={{width:'40%'}}
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
        <h1 className="page-title">My Reading List</h1>
        <p className="list-subtitle">{readingList.length} books to read</p>
      </div>

      <div className="list-grid">
        {readingList.map((book) => (
          <div key={book.id} className="list-item">
            <div className="list-item-image">
              <img src={book.cover} alt={book.title} />
            </div>
            
            <div className="list-item-content">
              <h3 className="list-item-title">{book.title}</h3>
              <p className="list-item-genre">{book.genre}</p>
              <div className="list-item-rating">
                <span className="rating-stars">⭐</span>
                <span className="rating-value">{book.rating}</span>
              </div>
              <p className="list-item-description">{book.description}</p>
              <p className="list-item-date">
                Added on {new Date(book.addedDate).toLocaleDateString()}
              </p>
              
              <div className="list-item-actions">
                <button className="btn btn-primary">Read Now</button>
                <button 
                  onClick={() => removeFromReadingList(book.id)}
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

export default ReadingList;