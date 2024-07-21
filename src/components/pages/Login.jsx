import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { GoogleLogin } from '@react-oauth/google';
import Layout from '../Layout.jsx';
import './Login.css';
import googleIcon from '../../assets/google-icon.svg';
import appleIcon from '../../assets/apple-icon.svg';
import { supabase } from '../../supabaseClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleGoogleLogin = async () => {
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

  const handleAppleLogin = async () => {
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
      <div className="login-container">
        <h2>Accedi</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleLoginWithEmail}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Accesso
          </button>
        </form>
        <div className="social-login">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              setErrorMessage("Error al iniciar sesión con Google.");
            }}
            clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
          />
          <button onClick={handleAppleLogin} className="social-button apple">
            <img src={appleIcon} alt="Apple" className="social-icon" />
            Accedi con Apple
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Login;