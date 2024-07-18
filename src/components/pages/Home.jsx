// src/components/pages/Home.jsx
import React from 'react';
import Header from '../Header.jsx';
import Sections from '../Sections.jsx';
import ImageComponent from '../ImageComponent.jsx';
import MediaComponent from '../MediaComponent.jsx';
import Footer from '../Footer.jsx';
import ItalianBot from './ItalianBot.jsx'; // Importa el componente ItalianBot

const Home = () => {
  return (
    <div>
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