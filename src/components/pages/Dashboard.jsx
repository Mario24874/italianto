// src/components/pages/Dashboard.jsx
import React from 'react';
import DashboardLayout from '../DashboardLayout';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h2>L'aula</h2>
          <p>Benvenuti in classe!</p>
          <div className="section-links">
            <h3>Sezioni</h3>
            <ul>
              <li>
                <Link to="/lezione">Lezione</Link>
              </li>
              <li>
                <Link to="/canzoni">Canzoni</Link>
              </li>
              <li>
                <Link to="/passatempi">Passatempi</Link>
              </li>
              <li>
                <Link to="/informazioniinteressanti">Información de Interés</Link>
              </li>
              <li>
                <Link to="/corsidalvivo">Clases en Vivo</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;