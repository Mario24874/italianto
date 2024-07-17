import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="622821208445-puv92g4hoif5gftv9fuof5a8o5hmhtro.apps.googleusercontent.com"> 
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
