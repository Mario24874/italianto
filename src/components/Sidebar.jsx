// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside className={`sidebar ${isExpanded ? 'sb-expanded' : ''}`}>
      <nav>
        <ul>
          <li>
            <a href="/dashboard" className="active">
              <i className="bx bx-home-circle"></i>
              <span>L'aula</span>
            </a>
          </li>
          <li>
            <a href="/lezione">
              <i className="bx bx-book"></i>
              <span>Lezione</span>
            </a>
          </li>
          <li>
            <a href="/canzoni">
              <i className="bx bx-music"></i>
              <span>Canzoni</span>
            </a>
          </li>
          <li>
            <a href="/passatempi">
              <i className="bx bx-game"></i>
              <span>Passatempi</span>
            </a>
          </li>
          <li>
            <a href="/informazioniinteressanti">
              <i className="bx bx-info-circle"></i>
              <span>Informazioni Interessanti</span>
            </a>
          </li>
          <li>
            <a href="/corsidalvivo">
              <i className="bx bx-video"></i>
              <span>Corsi dal Vivo</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={toggleSidebar}>
              <i className="bx bx-chevrons-right"></i>
              <span>Chiudere</span>
            </a>
          </li>
          <li>
            <button onClick={handleLogout}>
              <i className="bx bx-log-out"></i>
              <span>Disconnessione</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;