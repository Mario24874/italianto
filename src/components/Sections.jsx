import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';
import './Sections.css';
import UnderConstruction from './UnderConstruction';

const Sections = () => {
  const { user, profile } = useAuth();
  const [commenti, setCommenti] = useState([]);
  const commentsEndRef = useRef(null);

  useEffect(() => {
    fetchCommenti();
  }, []);
  
  const fetchCommenti = async () => {
    const { data, error } = await supabase
      .from('commenti')
      .select(`
        id, commento, created_at, user_id, 
        profiles:user_id(full_name, avatar_url, email)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error al obtener comentarios:', error);
    } else {
      setCommenti(data);
    }
  };

  useEffect(() => {
    console.log('Commenti aggiornati:', commenti);
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [commenti]);

  return (
    <div className="sections-container">
      <h2>Commenti degli Utenti</h2>
      <div className="commenti-list">
        {commenti.length === 0 ? <UnderConstruction /> : commenti.map((commento) => (
          <div key={commento.id} className="commento">
            <div className="user-info">
              <img src={commento.profiles.avatar_url} alt={commento.profiles.full_name} className="avatar" />
              <div>
                <p className="full-name">{commento.profiles.full_name}</p>
                <p className="email">{commento.profiles.email}</p>
              </div>
            </div>
            <p className="commento-text">{commento.commento}</p>
            <p className="meta">
              {new Date(commento.created_at).toLocaleString()}
            </p>
          </div>
        ))}
        <div ref={commentsEndRef} />
      </div>
    </div>
  );
};

export default Sections;