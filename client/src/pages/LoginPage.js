import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api';
import '../styles/Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await login({ email, password });
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/dashboard');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Login failed');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Log In</h2>
        {serverError && <p className="error-text animate-error">{serverError}</p>}
        {isLoading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Logging in...</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                placeholder="Enter your email"
              />
              <i className="fas fa-envelope input-icon"></i>
            </div>
            {errors.email && <p className="error-text animate-error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`form-input ${errors.password ? 'input-error' : ''}`}
                placeholder="Enter your password"
              />
              <i
                className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} input-icon password-toggle`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            {errors.password && <p className="error-text animate-error">{errors.password}</p>}
          </div>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        <div className="social-login">
          <p className="social-login-text">Or log in with</p>
          <div className="social-buttons">
            <button
              className="social-button google-button"
              disabled
              title="Google login coming soon!"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google Logo"
                className="social-icon"
              />
            </button>
            <button
              className="social-button facebook-button"
              disabled
              title="Facebook login coming soon!"
            >
              <img
                src="https://www.facebook.com/favicon.ico"
                alt="Facebook Logo"
                className="social-icon"
              />
            </button>
          </div>
        </div>
        <p className="signup-link">
          Don't have an account?{' '}
          <Link to="/signup" className="link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;