import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './UserProfile.css';

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return null; // No renderizar si el usuario no está autenticado
  }

  return (
    <div className="user-profile">
      <img src={user?.avatar_url || '/default-avatar.png'} alt="Avatar" className="avatar" />
      <span className="user-name">{user?.full_name || 'Guest'}</span>
    </div>
  );
};

export default UserProfile;