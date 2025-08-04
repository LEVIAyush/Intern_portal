import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (['/', '/login', '/signup'].includes(location.pathname)) {
    return null;
  }

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsOpen(false);
    navigate('/');
  };

  return (
    <div className="navbar-container">
      <button className="menu-toggle" onClick={toggleNavbar}>
        ☰ Menu
      </button>
      <nav ref={navbarRef} className={`navbar ${isOpen ? 'open' : ''}`}>
        <div className="navbar-brand">
          <Link to="/dashboard">Intern Portal</Link>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/dashboard" className="nav-link" onClick={() => setIsOpen(false)}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" className="nav-link" onClick={() => setIsOpen(false)}>
              Leaderboard
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-button">
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;