const mongoose  = require('mongoose');
const User = require('../Models/User');   
const bcrypt = require('bcryptjs');
const Admin = require('../Models/Admin');
const jwt  = require('jsonwebtoken');
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
module.exports = { createSignup, createlogin ,logout};
