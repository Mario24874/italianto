import React, { useEffect } from 'react';
import DashboardLayout from '../DashboardLayout.jsx';
import Sidebar from '../Sidebar';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import moonIcon from '../../images/moon.svg';
import sunnyIcon from '../../images/sunny.svg';
import './Dashboard.css';
import '../../App.css';

const Dashboard = () => {
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
    <DashboardLayout>
      <div className={`dashboard-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <Sidebar />
        <div className="dashboard-content">
          <h2>L'aula</h2>
          <p>Benvenuti in classe!</p>
          <div className="dark-mode-toggle-container">
          <div className={`dark-mode-toggle ${isDarkMode ? 'dark-mode' : ''}`} onClick={toggleDarkMode}>
            <div className="switch-button">
              <img src={isDarkMode ? sunnyIcon : moonIcon} alt="mode-icon" />
            </div>
          </div>
        </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;