// src/components/UnderConstruction.jsx
import React from 'react';
import './UnderConstruction.css';
import underConstructionImage from '../assets/InCostruzione.png';

const UnderConstruction = () => {
  return (
    <div className="under-construction-container">
      <img src={underConstructionImage} alt="Under Construction" />
    </div>
  );
};

export default UnderConstruction;