// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo_Italianto.png';
import sunnyIcon from '../images/sunny.svg';
import moonIcon from '../images/moon.svg';
import '../App.css';
import './Header.css';

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const app = document.querySelector('.App');
    if (isDarkMode) {
      app.classList.add('dark-mode');
    } else {
      app.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <header className={`App-header ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="header-content">
        <div className="logo-container">
          <img src={logo} className="App-logo" alt="logo" />
        </div>

        <div className="welcome-message">
          <h1 lang="it">Benvenuti a Italianto!</h1>
        </div>

        <nav className="navigation">
          <ul>
            <li><Link to="/">Inizio</Link></li>
            <li><Link to="/biblioteca">Biblioteca</Link></li>
            <li><Link to="/contatto">Contatto</Link></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <Link to="/register" className="auth-button">Registro</Link>
          <Link to="/login" className="auth-button">Accesso</Link>
        </div>
        <div className="dark-mode-toggle-container">
          <div className={`dark-mode-toggle ${isDarkMode ? 'dark-mode' : ''}`} onClick={toggleDarkMode}>
            <div className="switch-button">
              <img src={isDarkMode ? sunnyIcon : moonIcon} alt="mode-icon" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
