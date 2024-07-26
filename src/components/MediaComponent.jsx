import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import videoSrc from '../images/media/vid/LinguaItaliana.mp4';
import VocaliSrc from '../images/media/vid/Vocali.mp4'; 
import Consonanti1Src from '../images/media/vid/Consonanti1.mp4'; 
import Consonanti2Src from '../images/media/vid/Consonanti2.mp4'; 
import LetteraStranieriSrc from '../images/media/vid/LetteraStranieri.mp4'; 
import SettimanaSrc from '../images/media/vid/Settimana.mp4'; 
import MesiStagioniSrc from '../images/media/vid/MesiStagioni.mp4'; 
import PublitaliantoSrc from '../images/media/vid/Publitalianto.mp4'; 
import LinguaItalianaThumb from '../images/media/thumbnails/LinguaItaliana.png';
import VocaliThumb from '../images/media/thumbnails/Vocali.png';
import Consonanti1Thumb from '../images/media/thumbnails/Consonanti1.png';
import Consonanti2Thumb from '../images/media/thumbnails/Consonanti2.png';
import LetteraStranieriThumb from '../images/media/thumbnails/LetteraStranieri.png';
import SettimanaThumb from '../images/media/thumbnails/Settimana.png';
import MesiStagioniThumb from '../images/media/thumbnails/MesiStagioni.png';
import PublitaliantoThumb from '../images/media/thumbnails/Publitalianto.png';
import './MediaComponent.css';

function MediaComponent() {
  const videoSources = [
    {
      src: videoSrc,
      thumbnail: LinguaItalianaThumb,
      title: 'Lingua Italiana'
    },
    {
      src: VocaliSrc,
      thumbnail: VocaliThumb,
      title: 'Le Vocali'
    },
    {
      src: Consonanti1Src,
      thumbnail: Consonanti1Thumb,
      title: 'Le Consonanti 1'
    },
    {
      src: Consonanti2Src,
      thumbnail: Consonanti2Thumb,
      title: 'Le Consonanti 2'
    },
    {
      src: LetteraStranieriSrc,
      thumbnail: LetteraStranieriThumb,
      title: 'Le Lettere Straniere'
    },
    {
      src: SettimanaSrc,
      thumbnail: SettimanaThumb,
      title: 'I Giorni'
    },
    {
      src: MesiStagioniSrc,
      thumbnail: MesiStagioniThumb,
      title: 'Mesi e Stagioni'
    },
    {
      src: PublitaliantoSrc,
      thumbnail: PublitaliantoThumb,
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
                <img src={source.thumbnail} alt={source.title} className="video-thumbnail" />
              )}
              <ReactPlayer
                url={source.src}
                playing={playing[index]}
                controls={true}
                width="100%"
                height="auto"
                className="video-player"
                onEnded={() => handleEnded(index)}
              />
            </div>
            <div className="video-title">{source.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MediaComponent;