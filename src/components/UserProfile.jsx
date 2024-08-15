import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';
import './UserProfile.css';

const UserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    avatar_url: '',
    full_name: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
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
      <img src={profile.avatar_url || '/default-avatar.png'} alt="Avatar" className="avatar" />
      <span className="user-name">{profile.full_name || 'Guest'}</span>
    </div>
  );
};

export default UserProfile;