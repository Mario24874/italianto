// src/components/pages/Biblioteca.jsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './Biblioteca.css'; 
import UnderConstruction from '../UnderConstruction';

const Biblioteca = () => {
  const { isDarkMode } = useTheme();

  return (
    <div>
      <h1>Biblioteca</h1>
      <UnderConstruction />
    </div>
  );
};

export default Biblioteca;