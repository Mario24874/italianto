import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';
import './Sections.css';

const Sections = () => {
  const { user } = useAuth();
  const [commenti, setCommenti] = useState([]);
  const [avatars, setAvatars] = useState({});
  const commentsEndRef = useRef(null);

  useEffect(() => {
    fetchCommenti();
  }, []);
  
  const fetchCommenti = async () => {
    const { data, error } = await supabase
      .from('commenti')
      .select('id, commento, created_at, user_id')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error al obtener comentarios:', error);
    } else {
      setCommenti(data);
      fetchAvatars(data.map(comment => comment.user_id));
    }
  };

  const fetchAvatars = async (userIds) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('user_id, avatar_url')
      .in('user_id', userIds);

    if (error) {
      console.error('Error al obtener avatares:', error);
    } else {
      console.log('Avatares obtenidos:', data); // Depuración
      const avatarsMap = {};
      data.forEach(profile => {
        avatarsMap[profile.user_id] = profile.avatar_url;
      });
      setAvatars(avatarsMap);
    }
  };

  useEffect(() => {
    console.log('Commenti aggiornati:', commenti);
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [commenti]);

  useEffect(() => {
    console.log('Avatares actualizados:', avatars); // Depuración
  }, [avatars]);

  return (
    <div className="sections-container">
      <h2>Commenti degli Utenti</h2>
      <div className="commenti-list">
        {commenti.map((commento) => (
          <div key={commento.id} className="commento">
            <img src={avatars[commento.user_id] || '/default-avatar.png'} alt="Avatar" className="avatar" />
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