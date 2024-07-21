import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.tsx';
import Layout from '../Layout.jsx';
import './Register.css';
import googleIcon from '../../assets/google-icon.svg';
import appleIcon from '../../assets/apple-icon.svg';
import { supabase } from '../../supabaseClient'; // Importa supabase

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }
    try {
      await register(email, password);
      navigate('/login'); // Redirige al usuario a la página de inicio de sesión después del registro
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { prompt: 'select_account' },
      });
      if (error) throw new Error(error.message);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleAppleRegister = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: { prompt: 'select_account' },
      });
      if (error) throw new Error(error.message);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Layout>
      <div className="register-container">
        <h2>Registrazione Utente</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Confermare la Password:</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <button type="submit" className="register-button">Registro</button>
        </form>
        <div className="social-register">
          <GoogleLogin
            onSuccess={handleGoogleRegister}
            onError={() => {
              setErrorMessage("Error al registrarse con Google.");
            }}
            clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
          />
          <button onClick={handleAppleRegister} className="social-button apple">
            <img src={appleIcon} alt="Apple" className="social-icon" />
            Accedi con Apple
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Register;