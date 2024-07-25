// src/components/DashboardLayout.jsx
import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import { useTheme } from '../contexts/ThemeContext';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const app = document.querySelector('.App');
    if (isDarkMode) {
      app.classList.add('dark-mode');
    } else {
      app.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <div className={`dashboard-layout ${isDarkMode ? 'dark-mode' : ''}`}>
      <Sidebar />
      <main className="dashboard-content">
        {children}
        <div className="dark-mode-toggle-container">
          <div className={`dark-mode-toggle ${isDarkMode ? 'dark-mode' : ''}`} onClick={toggleDarkMode}>
            <div className="switch-button">
              <img src={isDarkMode ? '/path/to/sunny-icon.svg' : '/path/to/moon-icon.svg'} alt="mode-icon" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;