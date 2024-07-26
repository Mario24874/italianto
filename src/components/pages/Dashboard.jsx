// src/components/pages/Dashboard.jsx
import React from 'react';
import DashboardLayout from '../DashboardLayout';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext'; // Importa el contexto del modo oscuro
import './Dashboard.css';

const Dashboard = () => {
  const { isDarkMode } = useTheme(); // Obtén el estado del modo oscuro

  return (
    <DashboardLayout>
      <div className={`dashboard-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="dashboard-content">
          <h2>L'aula</h2>
          <p>Benvenuti in classe!</p>
          <div className="section-buttons">
            <Link to="/lezione" className="section-button">Lezione</Link>
            <Link to="/canzoni" className="section-button">Canzoni</Link>
            <Link to="/passatempi" className="section-button">Passatempi</Link>
            <Link to="/informazioniinteressanti" className="section-button">Información de Interés</Link>
            <Link to="/corsidalvivo" className="section-button">Clases en Vivo</Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;