import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLeaderboardData } from '../api';
import '../styles/Home.css';

const Home = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    { text: "Intern Portal keeps me motivated to achieve my goals!", author: "Alice Brown" },
    { text: "The leaderboard competition is thrilling! I love earning badges!", author: "Mike Wilson" },
    { text: "Tracking my progress has never been this engaging!", author: "Sarah Lee" },
  ];

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getLeaderboardData();
      setLeaderboard(data.slice(0, 3));
    } catch (err) {
      setError('Failed to load leaderboard preview');
      console.error('Leaderboard error:', err);
      setLeaderboard([
        { name: 'Ayush ', donations: 500, rank: 1 },
        { name: 'David Smith', donations: 400, rank: 2 },
        { name: 'Blake Johnson', donations: 300, rank: 3 },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 100000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(testimonialInterval);
  }, []);

  const handleRetry = () => {
    fetchLeaderboard();
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Intern Portal</h1>
          <p>Join our vibrant community to track your progress, compete, and earn rewards!</p>
          <div className="cta-buttons">
            <Link to="/login" className="btn btn-login">Log In</Link>
            <Link to="/signup" className="btn btn-signup">Sign Up</Link>
          </div>
        </div>
      </section>
      <section className="features-section">
        <h2>Why Join Intern Portal?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-chart-line feature-icon"></i>
            <h3>Track Progress</h3>
            <p>Monitor your contributions and watch your impact grow.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-trophy feature-icon"></i>
            <h3>Compete & Win</h3>
            <p>Climb the leaderboard with points from donations and activities.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-gift feature-icon"></i>
            <h3>Earn Rewards</h3>
            <p>Unlock badges and perks as you hit milestones.</p>
          </div>
        </div>
      </section>
      <section className="leaderboard-preview">
        <h2>Leaderboard Top 3</h2>
        {isLoading && <p className="loading-text">Loading leaderboard...</p>}
        {error && (
          <div className="error-container">
            <p className="error-text">{error}</p>
            <button className="btn btn-retry" onClick={handleRetry}>Retry</button>
          </div>
        )}
        {!isLoading && !error && (
          <ul className="leaderboard-list">
            {leaderboard.map((entry) => (
              <li key={entry.rank} className="leaderboard-item">
                <div className="leaderboard-entry">
                  <span>Rank {entry.rank}: {entry.name}</span>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${(entry.donations / 500) * 100}%` }}
                    ></div>
                  </div>
                  <span>{entry.donations} Points</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-carousel">
          <button className="carousel-nav prev" onClick={prevTestimonial}>&lt;</button>
          <div className="testimonial-card">
            <p>{testimonials[currentTestimonial].text}</p>
            <p className="testimonial-author">{testimonials[currentTestimonial].author}</p>
          </div>
          <button className="carousel-nav next" onClick={nextTestimonial}>&gt;</button>
        </div>
      </section>
    </div>
  );
};

export default Home;