// src/App.jsx
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import Contatto from './components/pages/Contatto';
import PrivateRoute from './components/PrivateRoute.jsx';
import Lezione from './components/pages/Lezione';
import Canzoni from './components/pages/Canzoni';
import Passatempi from './components/pages/Passatempi';
import Downloads from './components/pages/Downloads';
import Messages from './components/pages/Messages';
import Settings from './components/pages/Settings';
import InformazioniInteressanti from './components/pages/InformazioniInteressanti';
import CorsiDalVivo from './components/pages/CorsiDalVivo';
import Biblioteca from './components/pages/Biblioteca'; // Importa el componente Biblioteca
import './App.css';

function App() {
  return (
    <ThemeProvider> 
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/contatto" element={<Contatto />} />
          <Route path="/lezione" element={<PrivateRoute><Lezione /></PrivateRoute>} />
          <Route path="/canzoni" element={<PrivateRoute><Canzoni /></PrivateRoute>} />
          <Route path="/passatempi" element={<PrivateRoute><Passatempi /></PrivateRoute>} />
          <Route path="/downloads" element={<PrivateRoute><Downloads /></PrivateRoute>} />
          <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          <Route path="/informazioniinteressanti" element={<PrivateRoute><InformazioniInteressanti /></PrivateRoute>} />
          <Route path="/corsidalvivo" element={<PrivateRoute><CorsiDalVivo /></PrivateRoute>} />
          <Route path="/biblioteca" element={<Biblioteca />} /> {/* Agrega la ruta para la biblioteca */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;