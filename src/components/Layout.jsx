// src/components/Layout.jsx
import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { useTheme } from '../contexts/ThemeContext';
import sunnyIcon from '../images/sunny.svg';
import moonIcon from '../images/moon.svg';
import '../App.css'; // Importa App.css en lugar de Layout.css

const Layout = ({ children }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`layout-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="dark-mode-toggle-container">
        <div className={`dark-mode-toggle ${isDarkMode ? 'dark-mode' : ''}`} onClick={toggleDarkMode}>
          <div className="switch-button">
            <img src={isDarkMode ? sunnyIcon : moonIcon} alt="mode-icon" />
          </div>
        </div>
      </div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;