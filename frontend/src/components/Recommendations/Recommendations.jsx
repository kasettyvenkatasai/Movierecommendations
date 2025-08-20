import React, { useState } from 'react';
import { useRecommendation } from '../../context/RecommendationContext';
import MovieCard from './MovieCard';
import BookCard from './Bookcard';
import Modal from '../common/Modal';
import './Recommendations.css';

const Recommendations = () => {
  const { currentMood, recommendations, addToWatchlist, addToReadingList } = useRecommendation();
  const [activeModal, setActiveModal] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  const openTrailerModal = (movie) => {
    setModalContent({
      type: 'trailer',
      title: movie.title,
      trailer: movie.trailer,
      description: movie.description
    });
    setActiveModal('trailer');
  };

  const openBookModal = (book) => {
    setModalContent({
      type: 'book',
      title: book.title,
      preview: book.preview,
      description: book.description,
      cover: book.cover
    });
    setActiveModal('book');
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalContent(null);
  };

  if (!currentMood || (!recommendations.movies.length && !recommendations.books.length)) {
    return (
      <div className="recommendations-container">
        <div className="no-recommendations">
          <h2>No Recommendations Yet</h2>
          <p>Please select your mood first to get personalized recommendations.</p>
          <button 
            onClick={() => window.location.href = '/mood'} 
            className="btn btn-primary"
          >
            Choose My Mood
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="recommendations-container">
      <div className="recommendations-header">
        <h1 className="page-title">
          Perfect for Your {currentMood.charAt(0).toUpperCase() + currentMood.slice(1)} Mood
        </h1>
        <p className="recommendations-subtitle">
          Curated just for you based on how you're feeling today
        </p>
      </div>

      {recommendations.movies && recommendations.movies.length > 0 && (
        <section className="recommendations-section">
          <h2 className="section-title">🎬 Movies for You</h2>
          <div className="recommendations-grid">
            {recommendations.movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onWatchNow={() => openTrailerModal(movie)}
                onAddToWatchlist={() => addToWatchlist(movie)}
              />
            ))}
          </div>
        </section>
      )}

      {recommendations.books && recommendations.books.length > 0 && (
        <section className="recommendations-section">
          <h2 className="section-title">📚 Books for You</h2>
          <div className="recommendations-grid">
            {recommendations.books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onReadNow={() => openBookModal(book)}
                onAddToReadingList={() => addToReadingList(book)}
              />
            ))}
          </div>
        </section>
      )}

      {activeModal === 'trailer' && modalContent && (
        <Modal onClose={closeModal}>
          <div className="trailer-modal">
            <h3>{modalContent.title}</h3>
            <div className="video-container">
              <iframe
                src={modalContent.trailer}
                title={`${modalContent.title} trailer`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <p className="modal-description">{modalContent.description}</p>
          </div>
        </Modal>
      )}

      {activeModal === 'book' && modalContent && (
        <Modal onClose={closeModal}>
          <div className="book-modal">
            <div className="book-modal-content">
              <img 
                src={modalContent.cover} 
                alt={modalContent.title}
                className="book-modal-cover"
              />
              <div className="book-modal-info">
                <h3>{modalContent.title}</h3>
                <p className="modal-description">{modalContent.description}</p>
                <div className="book-preview">
                  <h4>Preview:</h4>
                  <p>{modalContent.preview}</p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Recommendations;