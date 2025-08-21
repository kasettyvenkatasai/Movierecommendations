const mongoose  = require('mongoose');
const User = require('../Models/User');   
const bcrypt = require('bcryptjs');
const Admin = require('../Models/Admin');
const Movie = require('../Models/Movie')
const jwt  = require('jsonwebtoken');
const movie = require('../Models/Movie');
const secret = 'venkatasai';
async function createSignup(req,res) {
  try {
    const { name, email, password, userType } = req.body;

    // check if user/admin already exists
    const existingUser = await User.findOne({ email });
    const existingAdmin = await Admin.findOne({ email });

    if (existingUser || existingAdmin) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;
    if (userType === "admin") {
      newUser = new Admin({ username: name, email, password: hashedPassword, role: userType });
    } else {
      newUser = new User({ username: name, email, password: hashedPassword, role: userType });
    }

    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      user: {
        id: newUser._id,
        name: newUser.username,   // fixed
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------- LOGIN -----------------
async function createlogin(req, res) {
  try {
    const { email, password, userType } = req.body;

    let userDoc; 

    if (userType === "admin") {
      userDoc = await Admin.findOne({ email: email });
    } else if (userType === "user") {
      userDoc = await User.findOne({ email: email });
    }

    if (!userDoc) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, userDoc.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // generate token
    const token = jwt.sign(
      { id: userDoc._id, email: userDoc.email, role: userDoc.role },
      secret,
      { expiresIn: "1d" }
    );

    // set cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // remove password before sending user
    const { password: _, ...userData } = userDoc._doc;

    res.status(200).json({ user: userData, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
async function logout(req,res) {
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: false, 
    sameSite: 'strict',
  });
  res.status(200).json({ message: 'Logged out successfully' });
}
const getRecommendations = async (req, res) => {
  try {
    console.log("hello");
    const { email, limit = 12 } = req.query;

    let mode = 'cold-start-top';
    let movies = [];

    // If user exists, get their mode
    if (email) {
      const user = await User.findOne({ email });
      if (user) {
        mode = user.mode;

        if (mode === 'personalized') {
          // Example: fetch top-rated movies by the user’s preferences
          const ratedMovieIds = user.ratedMovies.map(r => r.movieId);
          movies = await Movie.find({ _id: { $nin: ratedMovieIds } }) // exclude already rated
            .sort({ popularity: -1 }) // simple personalized approach, you can replace with real recommendation logic
            .limit(limit);
        }
      }
    }

    // Cold-start: popular movies
    if (mode === 'cold-start-top' || movies.length === 0) {
      movies = await Movie.find().sort({ popularity: -1 }).limit(limit);
    } 
    console.log(movies)

    res.json({ mode, movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
async function addtowatchlist(req, res) {
  try {
    const { useremail, movieId } = req.body;
    console.log(useremail)
    if (!useremail || !movieId) {
      return res.status(400).json({ message: "useremail and movieId are required" });
    }

    // Find user
    const user = await User.findOne({ email: useremail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
   console.log(user);
   
    const exists = user.watchlist.some(
      (entry) => entry.movie.toString() === movieId
    );
    if (exists) {
      return res.status(400).json({ message: "Movie already in watchlist" });
    }

   
    user.watchlist.push({ movie: movieId });
    await user.save();
     console.log("saved");
    return res.status(200).json({
      message: "Movie added to watchlist",
      watchlist: user.watchlist,
    });

  } catch (error) {
    console.error("Error adding to watchlist:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = { createSignup, createlogin ,logout,getRecommendations,addtowatchlist};
