import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './MediaComponent.css';

function MediaComponent() {
  const videoSources = [
    {
      src: '/images/media/vid/LinguaItaliana.mp4',
      thumbnail: '/images/media/thumbnails/LinguaItaliana.png',
      title: 'Lingua Italiana'
    },
    {
      src: '/images/media/vid/Vocali.mp4',
      thumbnail: '/images/media/thumbnails/Vocali.png',
      title: 'Le Vocali'
    },
    {
      src: '/images/media/vid/Consonanti1.mp4',
      thumbnail: '/images/media/thumbnails/Consonanti1.png',
      title: 'Le Consonanti 1'
    },
    {
      src: '/images/media/vid/Consonanti2.mp4',
      thumbnail: '/images/media/thumbnails/Consonanti2.png',
      title: 'Le Consonanti 2'
    },
    {
      src: '/images/media/vid/LetteraStranieri.mp4',
      thumbnail: '/images/media/thumbnails/LetteraStranieri.png',
      title: 'Le Lettere Straniere'
    },
    {
      src: '/images/media/vid/Settimana.mp4',
      thumbnail: '/images/media/thumbnails/Settimana.png',
      title: 'I Giorni'
    },
    {
      src: '/images/media/vid/MesiStagioni.mp4',
      thumbnail: '/images/media/thumbnails/MesiStagioni.png',
      title: 'Mesi e Stagioni'
    },
    {
      src: '/images/media/vid/Publitalianto.mp4',
      thumbnail: '/images/media/thumbnails/Publitalianto.png',
      title: 'Publitalianto'
    }
  ];

  const [playing, setPlaying] = useState({});

  const handlePlay = (index) => {
    setPlaying((prev) => ({ ...prev, [index]: true }));
  };

  const handleEnded = (index) => {
    setPlaying((prev) => ({ ...prev, [index]: false }));
  };

  return (
    <div className="video-pro-container">
      <div className="video-pro-content">
        {videoSources.map((source, index) => (
          <div key={index} className="video-item">
            <div className="video-thumbnail-wrapper" onClick={() => handlePlay(index)}>
              {!playing[index] && (
                <img src={source.thumbnail} alt={source.title} className="video-thumbnail" loading="lazy" />
              )}
              {playing[index] && (
                <ReactPlayer
                  url={source.src}
                  playing={playing[index]}
                  controls={true}
                  width="100%"
                  height="auto"
                  className="video-player"
                  onEnded={() => handleEnded(index)}
                  lazyLoad
                />
              )}
            </div>
            <div className="video-title">{source.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MediaComponent;