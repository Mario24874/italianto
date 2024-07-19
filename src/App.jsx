// src/App.jsx
import React from 'react';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import AppRoutes from './routes/Routes.jsx';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
        {/* Agregar el elemento aquí */}
        <div id="your-element-id" className="example-class">Este es el elemento</div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;