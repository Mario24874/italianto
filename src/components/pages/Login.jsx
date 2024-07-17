import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient'; // Asegúrate de que la ruta sea correcta
import { GoogleLogin } from '@react-oauth/google';
import Layout from '../Layout';
import './Login.css';
import googleIcon from '../../assets/google-icon.svg';
import appleIcon from '../../assets/apple-icon.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          navigate('/dashboard');
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setErrorMessage(error.message);
      }
    } catch (error) {
      setErrorMessage("Error inesperado durante el inicio de sesión.");
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          access_token: credentialResponse.credential, // Enviar el token de acceso a Supabase
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        navigate('/dashboard'); // Redirigir al dashboard después de iniciar sesión
      }
    } catch (error) {
      setErrorMessage("Error inesperado durante el inicio de sesión.");
    }
  };

  const handleAppleLogin = async () => {
    try {
      await supabase.auth.signInWithOAuth({ provider: 'apple' });
    } catch (error) {
      setErrorMessage("Error al iniciar sesión con Apple.");
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