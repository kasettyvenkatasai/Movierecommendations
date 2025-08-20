import React from 'react';
import { useRecommendation } from '../../context/RecommendationContext';
import './Profile.css';

const Profile = () => {
  const { user, watchlist, readingList } = useRecommendation();

  // Mock user data if no user is logged in
  const userData = user || {
    id: 1,
    name: 'Guest User',
    email: 'guest@example.com',
    userType: 'user',
    joinDate: new Date().toISOString()
  };

  const mockRatings = [
    { id: 1, title: 'The Grand Budapest Hotel', type: 'movie', rating: 5, date: '2024-01-15' },
    { id: 2, title: 'The Seven Husbands of Evelyn Hugo', type: 'book', rating: 4, date: '2024-01-10' },
    { id: 3, title: 'Inside Out', type: 'movie', rating: 5, date: '2024-01-08' },
    { id: 4, title: 'The Midnight Library', type: 'book', rating: 4, date: '2024-01-05' }
  ];

  const stats = {
    totalRatings: mockRatings.length,
    moviesWatched: mockRatings.filter(r => r.type === 'movie').length,
    booksRead: mockRatings.filter(r => r.type === 'book').length,
    watchlistCount: watchlist.length,
    readingListCount: readingList.length
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <img 
            src={`https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg`} 
            alt="Profile"
          />
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{userData.username}</h1>
          <p className="profile-email">{userData.email}</p>
          <p className="profile-type">
            {userData.userType === 'admin' ? '👑 Admin' : '👤 User'}
          </p>
          <p className="profile-joined">
            Member since {new Date(userData.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <div className="stat-number">{stats.totalRatings}</div>
          <div className="stat-label">Total Ratings</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.moviesWatched}</div>
          <div className="stat-label">Movies Rated</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.booksRead}</div>
          <div className="stat-label">Books Rated</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.watchlistCount}</div>
          <div className="stat-label">Watchlist Items</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.readingListCount}</div>
          <div className="stat-label">Reading List Items</div>
        </div>
      </div>

      <div className="profile-sections">
        <section className="profile-section">
          <h2 className="section-title">Recent Ratings</h2>
          <div className="ratings-list">
            {mockRatings.map((rating) => (
              <div key={rating.id} className="rating-item">
                <div className="rating-info">
                  <h4 className="rating-title">{rating.title}</h4>
                  <p className="rating-type">
                    {rating.type === 'movie' ? '🎬' : '📚'} {rating.type}
                  </p>
                </div>
                <div className="rating-score">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`star ${i < rating.rating ? 'filled' : ''}`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  <p className="rating-date">
                    {new Date(rating.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="profile-section">
          <h2 className="section-title">Quick Actions</h2>
          <div className="quick-actions">
            <button 
              onClick={() => window.location.href = '/mood'}
              className="btn btn-primary action-btn"
            >
              Get New Recommendations
            </button>
            <button 
              onClick={() => window.location.href = '/watchlist'}
              className="btn btn-outline action-btn"
            >
              View Watchlist ({stats.watchlistCount})
            </button>
            <button 
              onClick={() => window.location.href = '/reading-list'}
              className="btn btn-outline action-btn"
            >
              View Reading List ({stats.readingListCount})
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;