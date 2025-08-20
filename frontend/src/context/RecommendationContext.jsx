import React, { createContext, useContext, useState } from 'react';

const RecommendationContext = createContext();

export const useRecommendation = () => {
  const context = useContext(RecommendationContext);
  if (!context) {
    throw new Error('useRecommendation must be used within a RecommendationProvider');
  }
  return context;
};

export const RecommendationProvider = ({ children }) => {
  const [currentMood, setCurrentMood] = useState('');
  const [recommendations, setRecommendations] = useState({ movies: [], books: [] });
  const [watchlist, setWatchlist] = useState([]);
  const [readingList, setReadingList] = useState([]);
  const [user, setUser] = useState(null);

  const addToWatchlist = (movie) => {
    setWatchlist(prev => {
      const exists = prev.find(item => item.id === movie.id);
      if (exists) return prev;
      return [...prev, { ...movie, addedDate: new Date().toISOString() }];
    });
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist(prev => prev.filter(movie => movie.id !== movieId));
  };

  const addToReadingList = (book) => {
    setReadingList(prev => {
      const exists = prev.find(item => item.id === book.id);
      if (exists) return prev;
      return [...prev, { ...book, addedDate: new Date().toISOString() }];
    });
  };

  const removeFromReadingList = (bookId) => {
    setReadingList(prev => prev.filter(book => book.id !== bookId));
  };

  const value = {
    currentMood,
    setCurrentMood,
    recommendations,
    setRecommendations,
    watchlist,
    readingList,
    addToWatchlist,
    removeFromWatchlist,
    addToReadingList,
    removeFromReadingList,
    user,
    setUser
  };

  return (
    <RecommendationContext.Provider value={value}>
      {children}
    </RecommendationContext.Provider>
  );
};