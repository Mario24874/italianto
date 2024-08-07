import React from 'react';
import Sections from '../Sections.jsx';
import ImageComponent from '../ImageComponent.jsx';
import MediaComponent from '../MediaComponent.jsx';
import ItalianBot from './ItalianBot.jsx'; // Importa el componente ItalianBot
import { useTheme } from '../../contexts/ThemeContext'; // Importa el contexto del modo oscuro
import './Home.css'; // Importa los estilos

const Home = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`home-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <ImageComponent />
      <MediaComponent />
      <Sections />      
      <ItalianBot /> 
    </div>
  );
};

export default Home;