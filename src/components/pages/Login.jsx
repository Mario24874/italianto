import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import Layout from '../Layout.jsx';
import './Login.css';
import googleIcon from '../../assets/google-icon.svg';
import appleIcon from '../../assets/apple-icon.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') navigate('/dashboard');
    });

    return () => authListener.unsubscribe();
  }, [navigate]);

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
        <form onSubmit={handleLogin}>
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
            onSuccess={handleGoogleLoginSuccess}
            onError={() => {
              setErrorMessage("Error al iniciar sesión con Google.");
            }}
            clientId={process.env.VITE_GOOGLE_CLIENT_ID}
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