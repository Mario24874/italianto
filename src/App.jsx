// src/App.jsx
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
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
import Biblioteca from './components/pages/Biblioteca';
import DashboardLayout from './components/DashboardLayout';
import './App.css';

function App() {
  return (
    <ThemeProvider> 
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardLayout><Dashboard /></DashboardLayout></PrivateRoute>} />
        <Route path="/contatto" element={<Layout><Contatto /></Layout>} />
        <Route path="/lezione" element={<PrivateRoute><DashboardLayout><Lezione /></DashboardLayout></PrivateRoute>} />
        <Route path="/canzoni" element={<PrivateRoute><DashboardLayout><Canzoni /></DashboardLayout></PrivateRoute>} />
        <Route path="/passatempi" element={<PrivateRoute><DashboardLayout><Passatempi /></DashboardLayout></PrivateRoute>} />
        <Route path="/downloads" element={<PrivateRoute><DashboardLayout><Downloads /></DashboardLayout></PrivateRoute>} />
        <Route path="/messages" element={<PrivateRoute><DashboardLayout><Messages /></DashboardLayout></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><DashboardLayout><Settings /></DashboardLayout></PrivateRoute>} />
        <Route path="/informazioniinteressanti" element={<PrivateRoute><DashboardLayout><InformazioniInteressanti /></DashboardLayout></PrivateRoute>} />
        <Route path="/corsidalvivo" element={<PrivateRoute><DashboardLayout><CorsiDalVivo /></DashboardLayout></PrivateRoute>} />
        <Route path="/biblioteca" element={<Layout><Biblioteca /></Layout>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;