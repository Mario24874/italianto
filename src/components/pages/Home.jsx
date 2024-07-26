// src/components/pages/Home.jsx
import React from 'react';
import Header from '../Header.jsx';
import Sections from '../Sections.jsx';
import ImageComponent from '../ImageComponent.jsx';
import MediaComponent from '../MediaComponent.jsx';
import Footer from '../Footer.jsx';
import ItalianBot from './ItalianBot.jsx'; // Importa el componente ItalianBot
import { useTheme } from '../../contexts/ThemeContext'; // Importa el contexto del modo oscuro
import './Home.css'; // Importa los estilos
import sunnyIcon from '../../images/sunny.svg'; // Ruta a tu imagen del sol
import moonIcon from '../../images/moon.svg'; // Ruta a tu imagen de la luna

const Home = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`home-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="dark-mode-toggle-container">
        <div className={`dark-mode-toggle ${isDarkMode ? 'dark-mode' : ''}`} onClick={toggleDarkMode}>
          <div className="switch-button">
            <img src={isDarkMode ? sunnyIcon : moonIcon} alt="mode-icon" />
          </div>
        </div>
      </div>
      <Header />
      <Sections />
      <ImageComponent />
      <MediaComponent />      
      <Footer />
      <ItalianBot /> {/* Agrega el componente ItalianBot aquí */}
    </div>
  );
};

export default Home;