import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import Contatto from './components/pages/Contatto';
import PrivateRoute from './components/PrivateRoute.jsx';
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
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;