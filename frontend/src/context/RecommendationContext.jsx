import React, { createContext, useContext, useState,useEffect } from 'react';
import axios from 'axios';
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
  const [recommendations, setRecommendations] = useState({ movies: [], books: [] ,suggested:[] });
  const [watchlist, setWatchlist] = useState([]);
  const [readingList, setReadingList] = useState([]);
  const [user, setUser] = useState(null);
  const [topMovies, setTopMovies] = useState([]);
  const [mode, setMode] = useState('cold-start-top'); 
  const [loading, setLoading] = useState(false);
  


const loadMovieRecommendations = async () => {
  setLoading(true);

  try {
    if (!user) {
      // Optional: fetch cold-start top movies for anonymous users
      const response = await axios.get('http://localhost:5000/recommendations?limit=12');
      setMode(response.data.mode);
      if (response.data.mode === 'cold-start-top') {
        setTopMovies(response.data.movies);
      }
      return;
    }

    // Fetch personalized recommendations for logged-in users
    const response = await axios.get('http://localhost:5000/recommendations', {
      params: { email: user.email, limit: 12 }
    });
    setMode(response.data.mode);

    if (response.data.mode === 'cold-start-top') {
      setTopMovies(response.data.movies);
    } else {
      setRecommendations(prev => ({
        ...prev,
        suggested: response.data.movies
      }));
    }

  } catch (error) {
    console.error('Error loading movie recommendations:', error);
  } finally {
    setLoading(false);
  }
};

  const rateMovie = async (movieId, rating) => {
    try {
      await fetch(`/api/users/${userId}/rate-movie`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId, rating })
      });
      // After rating, reload recommendations (may switch to personalized)
      await loadMovieRecommendations();
    } catch (e) {
      console.error(e);
    }
  };
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
 useEffect(() => {
  loadMovieRecommendations();
}, []); 


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
    setUser,
     topMovies, mode, loading,
      rateMovie,

  };

  return (
    <RecommendationContext.Provider value={value}>
      {children}
    </RecommendationContext.Provider>
  );
};