// src/components/DashboardLayout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import { useTheme } from '../contexts/ThemeContext';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
  const { isDarkMode } = useTheme();

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