import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../supabaseClient';
import { useTheme } from '../../contexts/ThemeContext'; // Importa el contexto del tema
import './Settings.css';

const Settings = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme(); // Usa el contexto del tema
  const [profile, setProfile] = useState({
    id: user?.id || '', // Usa el id del usuario si está disponible
    full_name: '',
    email: '',
    country: '',
    region: '',
    phone_number: '',
    identity_document: '',
    avatar_url: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

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

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setAvatarFile(file);
      setProfile({ ...profile, avatar_url: URL.createObjectURL(file) });

      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`public/${file.name}`, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Error al subir el archivo:', error);
      } else {
        const { publicURL } = supabase.storage.from('avatars').getPublicUrl(data.path);
        console.log('Public URL:', publicURL);
        setProfile({ ...profile, avatar_url: publicURL });
      }
    } else {
      setError('Please upload a valid image file (jpg or png).');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log('Profile before upsert:', profile); // Depuración

    const { data, error } = await supabase
      .from('user_profiles')
      .upsert([{ ...profile, user_id: user.id }]);

    if (error) {
      setError(error.message);
    } else {
      setSuccess('Profile updated successfully!');
      setEditing(false); // Desactivar el modo de edición después de guardar
    }
    setLoading(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={`settings-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <h2>Impostazioni</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      {!editing ? (
        <div>
          <div className="profile-card">
            <img src={profile.avatar_url || '/default-avatar.png'} alt="Profile" width="100" />
            <div>
              <h3>{profile.full_name || 'Configura il tuo profilo su Impostazioni'}</h3>
              <p>{profile.email}</p>
              {/* Mostrar otros datos del perfil */}
            </div>
          </div>
          <button onClick={() => setEditing(true)}>Modifica Profilo</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome e cognome</label>
            <input
              type="text"
              name="full_name"
              value={profile.full_name}
              onChange={handleChange}
              required
              className={isDarkMode ? 'dark-mode' : ''}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              required
              className={isDarkMode ? 'dark-mode' : ''}
            />
          </div>
          <div>
            <label>Paese</label>
            <input
              type="text"
              name="country"
              value={profile.country}
              onChange={handleChange}
              required
              className={isDarkMode ? 'dark-mode' : ''}
            />
          </div>
          <div>
            <label>Regione</label>
            <input
              type="text"
              name="region"
              value={profile.region}
              onChange={handleChange}
              required
              className={isDarkMode ? 'dark-mode' : ''}
            />
          </div>
          <div>
            <label>Numero di telefono</label>
            <input
              type="text"
              name="phone_number"
              value={profile.phone_number}
              onChange={handleChange}
              required
              className={isDarkMode ? 'dark-mode' : ''}
            />
          </div>
          <div>
            <label>Documento d'identità</label>
            <input
              type="text"
              name="identity_document"
              value={profile.identity_document}
              onChange={handleChange}
              required
              className={isDarkMode ? 'dark-mode' : ''}
            />
          </div>
          <div>
            <label>Foto del profilo (solo jpg o png)</label>
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
            />
            {profile.avatar_url && (
              <img src={profile.avatar_url} alt="Profile" width="100" />
            )}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Salvare...' : 'Salva'}
          </button>
          <button type="button" onClick={() => setEditing(false)} disabled={loading}>
            Annulla
          </button>
        </form>
      )}
    </div>
  );
};

export default Settings;