import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecommendation } from '../../context/RecommendationContext';
import axios from 'axios';
import './MoodInput.css';

const MoodInput = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentMood, setRecommendations } = useRecommendation();
  const navigate = useNavigate();

  const moods = [
    { 
      value: 'happy', 
      label: 'Happy', 
      emoji: '😊',
      description: 'Feel-good content to keep your spirits high'
    },
    { 
      value: 'sad', 
      label: 'Sad', 
      emoji: '😢',
      description: 'Uplifting or cathartic content to help you through'
    },
    { 
      value: 'excited', 
      label: 'Excited', 
      emoji: '🎉',
      description: 'High-energy, thrilling entertainment'
    },
    { 
      value: 'relaxed', 
      label: 'Relaxed', 
      emoji: '😌',
      description: 'Calm, peaceful content for unwinding'
    }
  ];

  const getMockRecommendations = (mood) => {
    const recommendations = {
      happy: {
        movies: [
          {
            id: 1,
            title: 'The Grand Budapest Hotel',
            poster: 'https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg',
            genre: 'Comedy',
            rating: 8.1,
            description: 'A whimsical comedy-drama about a legendary hotel concierge.',
            trailer: 'https://www.youtube.com/embed/1Fg5iWmQjwk'
          },
          {
            id: 2,
            title: 'Paddington 2',
            poster: 'https://images.pexels.com/photos/918281/pexels-photo-918281.jpg',
            genre: 'Family',
            rating: 8.2,
            description: 'A charming bear adventure full of heart and humor.',
            trailer: 'https://www.youtube.com/embed/BeaF5A1dkk4'
          }
        ],
        books: [
          {
            id: 1,
            title: 'The Seven Husbands of Evelyn Hugo',
            cover: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpg',
            genre: 'Romance',
            rating: 4.5,
            description: 'A captivating novel about love, ambition, and the price of fame.',
            preview: 'An engaging story that will keep you hooked from start to finish.'
          },
          {
            id: 2,
            title: 'Beach Read',
            cover: 'https://images.pexels.com/photos/1766604/pexels-photo-1766604.jpg',
            genre: 'Contemporary Fiction',
            rating: 4.2,
            description: 'Two writers challenge each other to write outside their comfort zones.',
            preview: 'A delightful romantic comedy that celebrates the power of storytelling.'
          }
        ]
      },
      sad: {
        movies: [
          {
            id: 3,
            title: 'Inside Out',
            poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
            genre: 'Animation',
            rating: 8.1,
            description: 'A beautiful exploration of emotions and growing up.',
            trailer: 'https://www.youtube.com/embed/yRUAzGQ3nSY'
          },
          {
            id: 4,
            title: 'The Pursuit of Happyness',
            poster: 'https://images.pexels.com/photos/6966965/pexels-photo-6966965.jpeg',
            genre: 'Drama',
            rating: 8.0,
            description: 'An inspiring story of perseverance and hope.',
            trailer: 'https://www.youtube.com/embed/DMOBlEcRuw8'
          }
        ],
        books: [
          {
            id: 3,
            title: 'The Midnight Library',
            cover: 'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpg',
            genre: 'Philosophy',
            rating: 4.3,
            description: 'A philosophical novel about life choices and regret.',
            preview: 'A thought-provoking journey through the infinite possibilities of life.'
          },
          {
            id: 4,
            title: 'A Man Called Ove',
            cover: 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpg',
            genre: 'Literary Fiction',
            rating: 4.4,
            description: 'A heartwarming story about friendship and second chances.',
            preview: 'A touching tale that will restore your faith in humanity.'
          }
        ]
      },
      excited: {
        movies: [
          {
            id: 5,
            title: 'Mad Max: Fury Road',
            poster: 'https://images.pexels.com/photos/7991674/pexels-photo-7991674.jpeg',
            genre: 'Action',
            rating: 8.1,
            description: 'High-octane action in a post-apocalyptic wasteland.',
            trailer: 'https://www.youtube.com/embed/hEJnMQG9ev8'
          },
          {
            id: 6,
            title: 'Spider-Man: Into the Spider-Verse',
            poster: 'https://images.pexels.com/photos/5662857/pexels-photo-5662857.png',
            genre: 'Animation',
            rating: 8.4,
            description: 'A groundbreaking animated superhero adventure.',
            trailer: 'https://www.youtube.com/embed/tg52up16eq0'
          }
        ],
        books: [
          {
            id: 5,
            title: 'Ready Player One',
            cover: 'https://images.pexels.com/photos/1261180/pexels-photo-1261180.jpg',
            genre: 'Sci-Fi',
            rating: 4.3,
            description: 'A thrilling virtual reality adventure.',
            preview: 'An exciting journey through a digital world full of pop culture references.'
          },
          {
            id: 6,
            title: 'The Hunger Games',
            cover: 'https://images.pexels.com/photos/2128249/pexels-photo-2128249.jpg',
            genre: 'Dystopian',
            rating: 4.3,
            description: 'A gripping tale of survival and rebellion.',
            preview: 'An intense story that will keep you on the edge of your seat.'
          }
        ]
      },
      relaxed: {
        movies: [
          {
            id: 7,
            title: 'My Neighbor Totoro',
            poster: 'https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg',
            genre: 'Animation',
            rating: 8.2,
            description: 'A gentle tale of childhood wonder and magic.',
            trailer: 'https://www.youtube.com/embed/92a7Hj0ijLs'
          },
          {
            id: 8,
            title: 'Julie & Julia',
            poster: 'https://images.pexels.com/photos/4253312/pexels-photo-4253312.jpeg',
            genre: 'Biography',
            rating: 7.0,
            description: 'A charming story about cooking and finding purpose.',
            trailer: 'https://www.youtube.com/embed/dzX-jFz-wKk'
          }
        ],
        books: [
          {
            id: 7,
            title: 'The House in the Cerulean Sea',
            cover: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpg',
            genre: 'Fantasy',
            rating: 4.5,
            description: 'A cozy fantasy about finding family in unexpected places.',
            preview: 'A heartwarming story that feels like a warm hug.'
          },
          {
            id: 8,
            title: 'Educated',
            cover: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpg',
            genre: 'Memoir',
            rating: 4.4,
            description: 'A powerful memoir about education and self-discovery.',
            preview: 'An inspiring true story of transformation and resilience.'
          }
        ]
      }
    };

    return recommendations[mood] || { movies: [], books: [] };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMood) return;

    setIsLoading(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would make an API call here
      // const response = await axios.post('/api/recommendations', { mood: selectedMood });
      
      const mockRecommendations = getMockRecommendations(selectedMood);
      
      setCurrentMood(selectedMood);
      setRecommendations(mockRecommendations);
      
      setIsLoading(false);
      navigate('/recommendations');
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="mood-input-container">
      <div className="mood-card">
        <h1 className="mood-title">How are you feeling today?</h1>
        <p className="mood-subtitle">
          Choose your current mood to get personalized recommendations
        </p>

        <form onSubmit={handleSubmit} className="mood-form">
          <div className="moods-grid">
            {moods.map((mood) => (
              <div
                key={mood.value}
                className={`mood-option ${selectedMood === mood.value ? 'selected' : ''}`}
                onClick={() => setSelectedMood(mood.value)}
              >
                <div className="mood-emoji">{mood.emoji}</div>
                <h3 className="mood-label">{mood.label}</h3>
                <p className="mood-description">{mood.description}</p>
              </div>
            ))}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary mood-btn"
            disabled={!selectedMood || isLoading}
          >
            {isLoading ? 'Finding Perfect Matches...' : 'Get My Recommendations'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MoodInput;