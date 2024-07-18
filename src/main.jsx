// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> 
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);