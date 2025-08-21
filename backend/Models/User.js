const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  mode: { 
    type: String, 
    default: 'cold-start-top' 
  }, 
  password: {
    type: String,
    required: true,
  },

  // Movies user has favorited
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],

  // Movies the user has rated
  ratings: [
    {
      movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
      },
    },
  ],

  // Movies in user’s watchlist
  watchlist: [
    {
      movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movie",
        required: true,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  role: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
