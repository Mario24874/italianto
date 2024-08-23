import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';
import './Sections.css';

const Sections = () => {
  const { user } = useAuth();
  const [commenti, setCommenti] = useState([]);
  const [userProfiles, setUserProfiles] = useState({});

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
      fetchUserProfiles(data.map(comment => comment.user_id));
    }
  };

  const fetchUserProfiles = async (userIds) => {
    const response = await fetch('https://<your-supabase-url>/functions/v1/getUserProfiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer <your-supabase-anon-key>'
      },
      body: JSON.stringify({ userIds })
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error('Error al obtener perfiles de usuario:', errorMessage);
      return;
    }

    const data = await response.json();
    const profilesMap = {};
    data.forEach(profile => {
      profilesMap[profile.user_id] = profile;
    });
    setUserProfiles(profilesMap);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Esto mostrará solo el día, mes y año
  };

  return (
    <div className="sections-container">
      <h2>Commenti degli Utenti</h2>
      <div className="commenti-list">
        {commenti.map((commento) => {
          const profile = userProfiles[commento.user_id] || {};
          return (
            <div key={commento.id} className="commento">
              <div className="user-info">
                <div className="avatar-container">
                  <img src={profile.avatar_url || '/default-avatar.png'} alt="Avatar" className="avatar" />
                  <span className="full-name">{profile.full_name || 'Utente Anonimo'}</span>
                </div>
                <span className="meta">{formatDate(commento.created_at)}</span>
              </div>
              <div className="commento-text">{commento.commento}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sections;