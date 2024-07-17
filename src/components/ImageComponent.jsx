import React, { useState, useEffect, useRef } from 'react';
import './ImageComponent.css';

function ImageComponent() {
  const [images, setImages] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState('left');
  const sliderRef = useRef(null);

  useEffect(() => {
    // Simulando la carga de imágenes desde la carpeta 'images/media/img'
    const imageList = [
      'Coliseo.jfif',
      'Coloseo.jfif',
      'FontanaTrevi.jfif',
      'Roma.jfif',
      'RomaItaly.jfif',
      'Genova.jfif',
      'GENOVALaLanterna.jfif',
      'LalanternaGenova.jfif',
      'LanternaNotte.jfif',
      'Spettacolo.jfif',
      'Romanotte.jfif'
    ];

    const loadedImages = imageList.map(img => ({
      src: `/src/images/media/img/${img}`, // Usar una URL relativa
      alt: img.split('.')[0]
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
            />
            <div className="image-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id orci aliquam, hendrerit mi quis, commodo elit. Donec suscipit risus non ipsum condimentum, at vulputate diam tempor. Aliquam sit amet diam orci. Integer porttitor sem turpis, in dapibus sem efficitur at. Maecenas at tellus porttitor, viverra enim eu, imperdiet nunc. Nulla quis dignissim augue. Sed id metus enim. Nunc ut eros volutpat, volutpat ligula et, sagittis neque. Sed vulputate ex eget nibh venenatis vehicula. Vestibulum dictum elit id velit commodo, ut interdum est tempus.
            </div>
          </div>
        ))}
      </div>
      <div className="slider-controls">
        <button onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? 'Gioco' : 'Pausa'}
        </button>
        <button onClick={() => setDirection(direction === 'left' ? 'right' : 'left')}>
          {direction === 'left' ? 'Destra' : 'Sinistra'}
        </button>
      </div>
    </div>
  );
}

export default ImageComponent;