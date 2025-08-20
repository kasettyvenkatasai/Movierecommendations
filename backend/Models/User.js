const mongoose = require('mongoose')
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
  password: {
    type: String,
    required: true,
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie", 
    },
  ],
  role:{
    type:String,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const user =  mongoose.model("User", userSchema);
module.exports = user;