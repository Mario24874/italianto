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

// Agregar el código JavaScript aquí
document.addEventListener('DOMContentLoaded', () => {
  const element = document.getElementById('your-element-id');
  if (element) {
    console.log(element.classList);
  } else {
    console.error('Element not found');
  }
});