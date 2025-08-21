const express = require('express');
const router = express.Router();
const {createSignup,createlogin,logout,getRecommendations,addtowatchlist} =require('../controller/controller')
const Movie = require('../Models/Movie');
const mongoose = require('mongoose')
const API_KEY = "0486e059eafa160337656d2addf0e92a"; 
const BASE_URL = "https://api.themoviedb.org/3/movie/popular"; 
const axios = require('axios');
async function fetchMovies() {
  try {
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
        await Movie.updateOne(
          { tmdb_id: m.id }, // avoid duplicates
          {
            $set: {
              tmdb_idid: m.id,                      
            title: m.title,                  
            original_title: m.original_title, 
            overview: m.overview,            
            release_date: m.release_date,    
            poster_path: m.poster_path,     
            backdrop_path: m.backdrop_path,  
            vote_average: m.vote_average,    
            vote_count: m.vote_count,        
            popularity: m.popularity,        
            genre_ids: m.genre_ids,          
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

// fetchMovies();


router.use('/signup', createSignup);
router.use('/login', createlogin);
router.use('/logout',logout);
router.get('/recommendations', getRecommendations);
router.post('/addtowatchlist', addtowatchlist);
module.exports = router