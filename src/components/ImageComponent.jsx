import React, { useState, useEffect, useRef } from 'react';
import './ImageComponent.css';

function ImageComponent() {
  const [images, setImages] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState('left');
  const sliderRef = useRef(null);

  useEffect(() => {
    // Simulando la carga de imágenes desde la carpeta 'public/images/media/img'
    const imageList = [
      { src: 'Coliseo.jfif', text: 'Il Colosseo o Anfiteatro Flavio. Roma - Italia' },
      { src: 'Altare_della_Patria.jfif', text: 'Il monumento nazionale a Vittorio Emanuele II, noto anche come Altare della Patria o semplicemente Il Vittoriano. Roma - Italia.' },
      { src: 'FontanaTrevi.jfif', text: 'La Fontana di Trevi, con una facciata di quasi 50 metri, è una delle più grandi fontane monumentali del periodo barocco a Roma.' },
      { src: 'Arena_di_Verona.jfif', text: 'L`Arena di Verona è un anfiteatro romano situato nella città italiana di Verona, noto per le produzioni operistiche che vi si svolgono (Festival di Verona).' },
      { src: 'Piazza_San_Pietro_Vaticano.jfif', text: 'Piazza San Pietro è la piazza antistante la Basilica di San Pietro nella Città del Vaticano, situata all`interno di Roma.' },
      { src: 'Genova.jfif', text: 'Genova è una città italiana, capoluogo dell`omonima città metropolitana e della regione Liguria.' },
      { src: 'Ponte_di_Rialto_Venezia.jfif', text: 'Il Ponte di Rialto è il più antico dei quattro ponti di Venezia (Veneto, Italia) che attraversano il Canal Grande e probabilmente il più famoso della città.' },
      { src: 'LalanternaGenova.jfif', text: 'Il Faro della Lanterna di Genova, comunemente chiamato anche la Lanterna, si trova nel porto di Genova, in Italia. Fu costruito e dotato di illuminazione nel 1543.' },
      { src: 'Torre_de_Pisa_Italia.jfif', text: 'La Torre di Pisa o Torre pendente di Pisa è il campanile della Cattedrale di Pisa, situato in Piazza del Duomo di Pisa, nell`omonima città, comune della regione Toscana e capoluogo dell`omonima provincia.' },
      { src: 'Spettacolo.jfif', text: 'Il Porto di Genova è un importante porto italiano sul Mar Mediterraneo situato nella città di Genova.' },
      { src: 'Romanotte.jfif', text: 'Il Colosseo era il luogo dei combattimenti tra gladiatori e degli spettacoli pubblici. Fu costruito a est del Foro Romano e i lavori iniziarono tra il 70 e il 72 d.C., sotto l`imperatore Vespasiano.' }
    ];

    const loadedImages = imageList.map(img => ({
      src: `/images/media/img/${img.src}`, // Usar una URL relativa a la carpeta public
      alt: img.src.split('.')[0],
      text: img.text
    }));

    // Duplicar las imágenes para evitar el reinicio
    setImages([...loadedImages, ...loadedImages]);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      if (isPaused) {
        slider.style.animationPlayState = 'paused';
      } else {
        slider.style.animationPlayState = 'running';
      }
    }
  }, [isPaused]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      if (direction === 'left') {
        slider.style.animationDirection = 'normal';
      } else if (direction === 'right') {
        slider.style.animationDirection = 'reverse';
      }
    }
  }, [direction]);

  return (
    <div className="image-component">
      <div className="image-slider" ref={sliderRef}>
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <img
              src={image.src}
              alt={image.alt}
              className="carousel-image"
              loading="lazy"
            />
            <div className="image-text">
              {image.text}
            </div>
          </div>
        ))}
      </div>
      <div className="slider-controls">
        <button onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? 'Play' : 'Pausa'}
        </button>
        <button onClick={() => setDirection(direction === 'left' ? 'right' : 'left')}>
          {direction === 'left' ? 'Destra' : 'Sinistra'}
        </button>
      </div>
    </div>
  );
}

export default ImageComponent;