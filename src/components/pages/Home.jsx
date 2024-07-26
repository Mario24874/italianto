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

const Home = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`home-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <Header />
      <Sections />
      <ImageComponent />
      <MediaComponent />      
      <Footer />
      <ItalianBot /> 
    </div>
  );
};

export default Home;