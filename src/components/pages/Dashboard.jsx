import React, { useState, useEffect } from 'react';
import DashboardLayout from '../DashboardLayout.jsx';
import Sidebar from '../Sidebar';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import moonIcon from '../../images/moon.svg';
import sunnyIcon from '../../images/sunny.svg';
import './Dashboard.css';
import '../../App.css';

const Dashboard = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga de datos (reemplaza con tu lógica real)
    const fetchData = async () => {
      try {
        // Aquí va tu lógica para cargar datos desde Supabase
        // Ejemplo:
        // const { data, error } = await supabase.from('tabla').select('*');
        // if (error) throw error;
        // ... procesar los datos ...

      } catch (error) {
        console.error('Error al cargar datos:', error);
        // Manejo de errores (opcional): puedes mostrar un mensaje de error al usuario
      } finally {
        setIsLoading(false); // Indicar que la carga ha terminado (éxito o error)
      }
    };

    fetchData(); // Llama a la función para cargar datos
  }, []); // Ejecutar solo una vez al montar el componente

  return (
    <DashboardLayout>
      <div className={`dashboard-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <Sidebar />
        <div className="dashboard-content">
          <h2>L'aula</h2>
          <p>Benvenuti in classe!</p>
          <div className="dark-mode-toggle-container">
          <div className={`dark-mode-toggle ${isDarkMode ? 'dark-mode' : ''}`} onClick={toggleDarkMode}>
            <div className="switch-button">
              <img src={isDarkMode ? sunnyIcon : moonIcon} alt="mode-icon" />
            </div>
          </div>
        </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
