import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
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
            <a href="/explore">
              <i className="bx bx-grid-alt"></i>
              <span>Esplorare</span>
            </a>
          </li>
          <li>
            <a href="/slideshow">
              <i className="bx bx-carousel"></i>
              <span>Presentazione</span>
            </a>
          </li>
          <li>
            <a href="/collections">
              <i className="bx bx-collection"></i>
              <span>Collezioni</span>
            </a>
          </li>
          <li>
            <a href="/downloads">
              <i className="bx bx-cloud-download"></i>
              <span>Download</span>
            </a>
          </li>
          <li>
            <a href="/messages">
              <i className="bx bx-chat"></i>
              <span>Messaggi</span>
            </a>
          </li>
          <li>
            <a href="/settings">
              <i className="bx bx-cog"></i>
              <span>Impostazioni</span>
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