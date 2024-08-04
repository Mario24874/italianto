// src/components/Sections.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';
import './Sections.css';

const Sections = () => {
  const { user } = useAuth();
  const [commenti, setCommenti] = useState([]);
  const [nuovoCommento, setNuovoCommento] = useState('');

  useEffect(() => {
    fetchCommenti();
  }, []);

  const fetchCommenti = async () => {
    const { data, error } = await supabase
      .from('commenti')
      .select('*, user:user_id(email)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Errore nel fetch dei commenti:', error);
    } else {
      setCommenti(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuovoCommento.trim()) return;

    const { data, error } = await supabase
      .from('commenti')
      .insert([{ user_id: user.id, commento: nuovoCommento }]);

    if (error) {
      console.error('Errore nell\'aggiunta del commento:', error);
    } else {
      setNuovoCommento('');
      fetchCommenti();
    }
  };

  return (
    <div className="sections-container">
      <h2>Commenti degli Utenti</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={nuovoCommento}
          onChange={(e) => setNuovoCommento(e.target.value)}
          placeholder="Scrivi il tuo commento qui"
        />
        <button type="submit">Invia</button>
      </form>
      <div className="commenti-list">
        {commenti.map((commento) => (
          <div key={commento.id} className="commento">
            <p>{commento.commento}</p>
            <p className="meta">
              {commento.user.email} - {new Date(commento.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sections;