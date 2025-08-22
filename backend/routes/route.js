const express = require('express');
const router = express.Router();
const { createSignup, createlogin, logout, getRecommendations, addtowatchlist } = require('../controller/controller');
const Movie = require('../Models/Movie');
const mongoose = require('mongoose');
const axios = require('axios');

const API_KEY = "0486e059eafa160337656d2addf0e92a"; 
const BASE_URL = "https://api.themoviedb.org/3/movie/popular"; 
const GENRE_URL = "https://api.themoviedb.org/3/genre/movie/list";

// Function to fetch genres and create a map { id: name }
async function fetchGenres() {
  const response = await axios.get(GENRE_URL, {
    params: { api_key: API_KEY, language: "en-US" }
  });

  const genres = response.data.genres; // [{id: 28, name: "Action"}, ...]
  const genreMap = {};
  genres.forEach(g => {
    genreMap[g.id] = g.name;
  });

  return genreMap;
}

async function fetchMovies() {
  try {
    const genreMap = await fetchGenres(); // Get id→name mapping

    for (let page = 1; page <= 30; page++) { // 30 pages × 20 movies ≈ 600
      const response = await axios.get(BASE_URL, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          page: page,
        },
      });

      const movies = response.data.results;

      // Save to DB
      for (const m of movies) {
        // Map genre_ids to names
        const genreNames = m.genre_ids.map(id => genreMap[id] || "Unknown");

        await Movie.updateOne(
          { tmdb_id: m.id }, // avoid duplicates
          {
            $set: {
              tmdb_id: m.id,                    
              title: m.title,                  
              original_title: m.original_title, 
              overview: m.overview,            
              release_date: m.release_date,    
              poster_path: m.poster_path,     
              backdrop_path: m.backdrop_path,  
              vote_average: m.vote_average,    
              vote_count: m.vote_count,        
              popularity: m.popularity,        
              genres: genreNames,              // store genre names instead of ids
              original_language: m.original_language 
            },
          },
          { upsert: true }
        );
      }

      console.log(`✅ Page ${page} stored successfully`);
    }

    console.log("🎉 All movies stored in MongoDB");
  } catch (err) {
    console.error("Error fetching movies:", err.message);
  } finally {
    mongoose.connection.close();
  }
}

 fetchMovies();

router.use('/signup', createSignup);
router.use('/login', createlogin);
router.use('/logout', logout);
router.get('/recommendations', getRecommendations);
router.post('/addtowatchlist', addtowatchlist);

module.exports = router;
