import React, { useState, useEffect } from 'react';
import { getLeaderboard, getLeaderboardData } from '../api';
import '../styles/Leaderboard.css';

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboardData();
        setLeaderboard(data);
      } catch (err) {
        setError('Failed to fetch leaderboard');
        console.error(err);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-container">
      <h1 className="page-title">Leaderboard</h1>
      {error && <p className="error-text">{error}</p>}
      {leaderboard.length > 0 ? (
        <ul className="leaderboard-list">
          {leaderboard.map((entry) => (
            <li key={entry.rank} className="leaderboard-item">
              Rank {entry.rank}: {entry.name} - {entry.donations} Points
            </li>
          ))}
        </ul>
      ) : (
        <p>No leaderboard data available</p>
      )}
    </div>
  );
};

export default LeaderboardPage;