// src/components/Sections.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';
import './Sections.css';
import LoginModal from './LoginModal';

const Sections = () => {
  const { user, profile } = useAuth();
  const [commenti, setCommenti] = useState([]);
  const [nuovoCommento, setNuovoCommento] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    if (!nuovoCommento.trim()) return;

    await sendComment();
  };

  const sendComment = async () => {
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

  const handleLoginSuccess = () => {
    sendComment();
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
      </div>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default Sections;