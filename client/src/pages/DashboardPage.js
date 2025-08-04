import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../api';
import TaskList from '../components/TaskList';
import '../styles/Dashboard.css';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState('');
  const navigate = useNavigate();

  // Mock recent activity data
  const recentActivities = [
    { id: 1, action: 'Earned 50 points for donation', date: '2025-08-03' },
    { id: 2, action: 'Shared referral code', date: '2025-08-02' },
    { id: 3, action: 'Joined Intern Portal', date: '2025-08-01' },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const userData = await getUserData();
        setUser(userData);
      } catch (err) {
        setError('Failed to fetch user data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const copyToClipboard = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode)
        .then(() => {
          setCopySuccess('Referral code copied!');
          setTimeout(() => setCopySuccess(''), 2000);
        })
        .catch(() => setCopySuccess('Failed to copy'));
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="page-title">Dashboard</h1>
      {isLoading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      )}
      {error && <p className="error-text">{error}</p>}
      {!isLoading && user && (
        <div className="dashboard-content">
          <div className="stats-card">
            <h2>Welcome, {user.name}!</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <p className="stat-label">Referral Code</p>
                <p className="stat-value">{user.referralCode}</p>
                <button className="btn btn-copy" onClick={copyToClipboard}>
                  Copy Code
                </button>
                {copySuccess && <p className="copy-feedback">{copySuccess}</p>}
              </div>
              <div className="stat-item">
                <p className="stat-label">Donations</p>
                <p className="stat-value">{user.donations} Points</p>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(user.donations / 1000) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <button
              className="btn btn-view-leaderboard"
              onClick={() => navigate('/leaderboard')}
            >
              View Leaderboard
            </button>
          </div>
          <div className="activity-feed">
            <h3>Recent Activity</h3>
            <ul className="activity-list">
              {recentActivities.map((activity) => (
                <li key={activity.id} className="activity-item">
                  <p>{activity.action}</p>
                  <span className="activity-date">{activity.date}</span>
                </li>
              ))}
            </ul>
          </div>
          <TaskList/>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;