// src/components/Sections.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';
import './Sections.css';

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
      .select('*, user:user_id(email, full_name, avatar_url)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Errore nel fetch dei commenti:', error);
    } else {
      setCommenti(data);
    }
  };

  useEffect(() => {
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [commenti]);

  return (
    <div className="sections-container">
      <h2>Commenti degli Utenti</h2>
      <div className="commenti-list">
        {commenti.map((commento) => (
          <div key={commento.id} className="commento">
            <div className="user-info">
              <img src={commento.user.avatar_url} alt={commento.user.full_name} className="avatar" />
              <div>
                <p className="full-name">{commento.user.full_name}</p>
                <p className="email">{commento.user.email}</p>
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