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
        <Route path="/dashboard" element={<PrivateRoute><Layout><DashboardLayout><Dashboard /></DashboardLayout></Layout></PrivateRoute>} />
        <Route path="/contatto" element={<Layout><Contatto /></Layout>} />
        <Route path="/lezione" element={<PrivateRoute><Layout><DashboardLayout><Lezione /></DashboardLayout></Layout></PrivateRoute>} />
        <Route path="/canzoni" element={<PrivateRoute><Layout><DashboardLayout><Canzoni /></DashboardLayout></Layout></PrivateRoute>} />
        <Route path="/passatempi" element={<PrivateRoute><Layout><DashboardLayout><Passatempi /></DashboardLayout></Layout></PrivateRoute>} />
        <Route path="/downloads" element={<PrivateRoute><Layout><DashboardLayout><Downloads /></DashboardLayout></Layout></PrivateRoute>} />
        <Route path="/messages" element={<PrivateRoute><Layout><DashboardLayout><Messages /></DashboardLayout></Layout></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Layout><DashboardLayout><Settings /></DashboardLayout></Layout></PrivateRoute>} />
        <Route path="/informazioniinteressanti" element={<PrivateRoute><Layout><DashboardLayout><InformazioniInteressanti /></DashboardLayout></Layout></PrivateRoute>} />
        <Route path="/corsidalvivo" element={<PrivateRoute><Layout><DashboardLayout><CorsiDalVivo /></DashboardLayout></Layout></PrivateRoute>} />
        <Route path="/biblioteca" element={<Layout><Biblioteca /></Layout>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;