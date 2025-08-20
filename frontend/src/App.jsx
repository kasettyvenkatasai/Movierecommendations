import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecommendationProvider } from './context/RecommendationContext';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup.jsx';
import MoodInput from './components/MoodInput/MoodInput';
import Recommendations from './components/Recommendations/Recommendations';
import Watchlist from './components/Watchlist/Watchlist';
import ReadingList from './components/ReadingList/ReadingList';
import Profile from './components/Profile/Profile';
import './App.css';

function App() {
  return (
    <RecommendationProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/mood" element={<MoodInput />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/reading-list" element={<ReadingList />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </Router>
    </RecommendationProvider>
  );
}

export default App;