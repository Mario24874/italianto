import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './UserProfile.css';
import defaultAvatar from '../assets/default-avatar.png'; // Importa la imagen de avatar por defecto

const UserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    avatar_url: '',
    full_name: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    const response = await fetch('https://<your-supabase-url>/functions/v1/getUserProfiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer <your-supabase-anon-key>'
      },
      body: JSON.stringify({ userIds: [user.id] })
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      setError(errorMessage);
      setLoading(false);
      return;
    }

    const data = await response.json();
    if (data.length > 0) {
      setProfile(data[0]);
    } else {
      setError('Per favore, configura il tuo profilo su Impostazioni');
    }
    setLoading(false);
  };

  if (!user) {
    return null; // No renderizar si el usuario no está autenticado
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-profile">
      {error && <p className="error">{error}</p>}
      <img src={profile.avatar_url || defaultAvatar} alt="Avatar" className="avatar" />
      <span className="user-name">
        {profile.full_name || 'Configura il tuo profilo su Impostazioni'}
      </span>
    </div>
  );
};

export default UserProfile;