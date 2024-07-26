// src/components/pages/Biblioteca.jsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './Biblioteca.css'; // Asegúrate de tener un archivo de estilos para la biblioteca

const Biblioteca = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`biblioteca-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <h2>Biblioteca</h2>
      {/* Contenido de la biblioteca */}
    </div>
  );
};

export default Biblioteca;