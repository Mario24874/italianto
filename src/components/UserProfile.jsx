import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';
import './UserProfile.css';
import defaultAvatar from '../assets/default-avatar.png'; // Importa la imagen de avatar por defecto

const UserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    avatar_url: '',
    full_name: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const storedAvatarUrl = localStorage.getItem('avatar_url');
      if (storedAvatarUrl) {
        setProfile(prevProfile => ({ ...prevProfile, avatar_url: storedAvatarUrl }));
      }
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('avatar_url, full_name')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error(error.message);
    } else {
      setProfile(data);
      localStorage.setItem('avatar_url', data.avatar_url); // Almacenar la URL del avatar
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
      <img src={profile.avatar_url || defaultAvatar} alt="Avatar" className="avatar" />
      <span className="user-name">
        {profile.full_name || 'Configura il tuo profilo su Impostazioni'}
      </span>
    </div>
  );
};

export default UserProfile;