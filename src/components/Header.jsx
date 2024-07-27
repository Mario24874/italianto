// src/components/Header.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo_Italianto.png';
import '../App.css';
import './Header.css';

function Header() {
  const location = useLocation();

  const getWelcomeMessage = () => {
    switch (location.pathname) {
      case '/':
        return 'Benvenuti a Italianto!';
      case '/biblioteca':
        return 'Biblioteca';
      case '/contatto':
        return 'Contatto';
      case '/register':
        return 'Registro';
      case '/login':
        return 'Accesso';
      // Agrega más casos según sea necesario
      default:
        return 'Benvenuti a Italianto!';
    }
  };

  return (
    <header className="App-header">
      <div className="header-content">
        <div className="logo-container">
          <img src={logo} className="App-logo" alt="logo" />
        </div>

        <div className="welcome-message">
          <h1 lang="it">{getWelcomeMessage()}</h1>
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
      </div>
    </header>
  );
}

export default Header;