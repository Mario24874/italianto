import React, { useState } from 'react';
import { supabase } from '../../supabaseClient'; // Asegúrate de que la ruta sea correcta
import { GoogleLogin } from '@react-oauth/google';
import Layout from '../Layout';
import './Register.css'; // Importa el archivo de estilos
import googleIcon from '../../assets/google-icon.svg';
import appleIcon from '../../assets/apple-icon.svg';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setErrorMessage(error.message);
    } else {
      alert('Check your email for the confirmation link');
      // Redirigir a la página deseada después del registro exitoso
      window.location.href = '/login'; // Cambia '/login' por la ruta a la que deseas redirigir
    }
  };

  const handleGoogleRegisterSuccess = async (credentialResponse) => {
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
        // Redirigir a la página deseada después del registro exitoso
        window.location.href = '/dashboard'; // Cambia '/dashboard' por la ruta a la que deseas redirigir
      }
    } catch (error) {
      setErrorMessage("Error inesperado durante el registro.");
    }
  };

  const handleAppleRegister = async () => {
    const { user, error } = await supabase.auth.signInWithOAuth({ provider: 'apple' });
    if (error) {
      alert(error.message);
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
            onSuccess={handleGoogleRegisterSuccess}
            onError={() => {
              setErrorMessage("Error al registrarse con Google.");
            }}
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