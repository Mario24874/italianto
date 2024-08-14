import React from 'react';
import Sidebar from './Sidebar';
import { useTheme } from '../contexts/ThemeContext';
import sunnyIcon from '../images/sunny.svg';
import moonIcon from '../images/moon.svg';
import UserProfile from './UserProfile'; // Importa UserProfile
import './DashboardLayout.css';
import '../App.css'; // Importa App.css para tener los estilos del botón de cambio de tema

const DashboardLayout = ({ children }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`dashboard-layout ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="dark-mode-toggle-container">
        <div className={`dark-mode-toggle ${isDarkMode ? 'dark-mode' : ''}`} onClick={toggleDarkMode}>
          <div className="switch-button">
            <img src={isDarkMode ? sunnyIcon : moonIcon} alt="mode-icon" />
          </div>
        </div>
      </div>
      <Sidebar />
      <main className="dashboard-content">
        <UserProfile /> {/* Incluye UserProfile aquí */}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;