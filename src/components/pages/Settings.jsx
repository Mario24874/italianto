import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../supabaseClient';
import './Settings.css';

const Settings = () => {
  const { user } = useAuth();
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

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single(); // Asegúrate de usar .single() para obtener un solo objeto

    if (error) {
      setError(error.message);
    } else {
      setProfile({ ...data, id: data.id || user.id }); // Asegúrate de que el id esté inicializado correctamente
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setAvatarFile(file);
      setProfile({ ...profile, avatar_url: URL.createObjectURL(file) });
    } else {
      setError('Please upload a valid image file (jpg or png).');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (avatarFile) {
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`public/${avatarFile.name}`, avatarFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setProfile({ ...profile, avatar_url: data.Key });
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .upsert([{ ...profile, user_id: user.id }]);

    if (error) {
      setError(error.message);
    } else {
      setSuccess('Profile updated successfully!');
    }
    setLoading(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="settings-container">
      <h2>Impostazioni</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome e cognome</label>
          <input
            type="text"
            name="full_name"
            value={profile.full_name}
            onChange={handleChange}
            required
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
      </form>
    </div>
  );
};

export default Settings;