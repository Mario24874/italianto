import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ItalianBot.css';
import botIcon from '../../assets/bot-icon.png'; // Asegúrate de que la ruta sea correcta

const ItalianBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Ciao, sono ItalianBot. Come posso aiutarti?', fromBot: true }
  ]);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const toggleChat = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    let response;
    switch (option) {
      case '1':
        response = 'I nostri corsi includono lo sviluppo delle quattro competenze linguistiche e cultura italiana.';
        break;
      case '2':
        response = 'Le lezioni sono disponibili secondo la disponibilità.';
        break;
      case '3':
        response = '- Assistita. - Consultiva. - On Line. - Presenziale.';
        break;
      default:
        response = 'Scusa, non ho capito la tua richiesta.';
    }
    setMessages(prevMessages => [...prevMessages, { text: `Hai scelto: ${option}`, fromBot: false }, { text: response, fromBot: true }]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="italian-bot-container">
      <div className={`chat-icon ${isOpen ? 'open' : ''}`} onClick={toggleChat}>
        <img src={botIcon} alt="ItalianBot Icon" />
      </div>
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>ItalianBot</h3>
            <button onClick={toggleChat}>Chiudi</button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.fromBot ? 'from-bot' : 'from-user'}`}>
                {msg.fromBot && <img src={botIcon} alt="Bot Icon" className="message-icon" />}
                <div className="message-text">{msg.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-options">
            <button onClick={() => handleOptionClick('1')}>1. Informazioni sui corsi</button>
            <button onClick={() => handleOptionClick('2')}>2. Orari delle lezioni</button>
            <button onClick={() => handleOptionClick('3')}>3. Modalità</button>
            <button onClick={() => navigate('/contatto')}>Contattaci</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItalianBot;