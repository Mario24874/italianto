// src/components/pages/Contatto.jsx
import React, { useState } from 'react';
import './Contatto.css'; 
import image from '../../assets/IlPostino.png'; 
import emailjs from 'emailjs-com';

const Contatto = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formData,
      import.meta.env.VITE_EMAILJS_USER_ID
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert('Messaggio inviato con successo!');
      // Limpiar los campos del formulario
      setFormData({
        user_name: '',
        user_email: '',
        user_phone: '',
        message: ''
      });
    }, (err) => {
      console.log('FAILED...', err);
      alert('Si è verificato un errore. Riprova.');
    });
  };

  return (
    <div className="contatto-container">
      <h2>Contattaci</h2>
      <div className="form-image-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="user_name">Nome</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="user_email">Email</label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="user_phone">Telefono</label>
            <input
              type="tel"
              id="user_phone"
              name="user_phone"
              value={formData.user_phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Messaggio</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Invia</button>
        </form>
        <div className="image-container">
          <img src={image} alt="Descripción de la imagen" className="form-image" />
        </div>
      </div>
    </div>
  );
};

export default Contatto;