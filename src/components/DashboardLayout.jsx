// src/components/DashboardLayout.jsx
import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import { useTheme } from '../contexts/ThemeContext';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
  const { isDarkMode } = useTheme();

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
      </main>
    </div>
  );
};

export default DashboardLayout;