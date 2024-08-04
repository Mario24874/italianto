// src/components/pages/Dashboard.jsx
import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext'; // Importa el contexto del modo oscuro
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../supabaseClient';
import './Dashboard.css';

const Dashboard = () => {
  const { isDarkMode } = useTheme(); // Obtén el estado del modo oscuro
  const { user } = useAuth();
  const [commento, setCommento] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commento.trim()) return;

    const { data, error } = await supabase
      .from('commenti')
      .insert([{ user_id: user.id, commento }]);

    if (error) {
      console.error('Errore nell\'aggiunta del commento:', error);
    } else {
      setCommento('');
      setSuccessMessage('Il tuo commento è stato pubblicato con successo!');
      setTimeout(() => setSuccessMessage(''), 3000); // Limpia el mensaje después de 3 segundos
    }
  };

  return (
    <DashboardLayout>
      <div className={`dashboard-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="dashboard-content">
          <h2>L'aula</h2>
          <p>Benvenuti in classe!</p>
          <div className="section-buttons">
            <Link to="/lezione" className="section-button">Lezioni</Link>
            <Link to="/canzoni" className="section-button">Canzoni</Link>
            <Link to="/passatempi" className="section-button">Passatempi</Link>
            <Link to="/informazioniinteressanti" className="section-button">Informazioni Interessanti</Link>
            <Link to="/corsidalvivo" className="section-button">Corsi dal Vivo</Link>
          </div>
          <div className="comment-section">
            <form onSubmit={handleSubmit}>
              <textarea
                value={commento}
                onChange={(e) => setCommento(e.target.value)}
                placeholder="Scrivi il tuo commento qui"
              />
              <button type="submit">Invia</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;