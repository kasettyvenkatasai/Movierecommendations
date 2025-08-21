const mongoose = require('mongoose')
const movieSchema = new mongoose.Schema({
  tmdb_id: Number,       
  title: String,
  original_title: String,
  overview: String,
  release_date: String,
  poster_path: String,
  backdrop_path: String,
  vote_average: Number,
  vote_count: Number,
  popularity: Number,
  genre_ids: [Number],
  original_language: String,
});
const movie = mongoose.model('Movie' , movieSchema);
module.exports = movie;
