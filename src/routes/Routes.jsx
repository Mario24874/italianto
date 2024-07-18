// src/Routes.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute.jsx';
import Login from '../components/pages/Login.jsx';
import Register from '../components/pages/Register.jsx';
import Dashboard from '../components/pages/Dashboard.jsx';
import Home from '../components/pages/Home.jsx';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;