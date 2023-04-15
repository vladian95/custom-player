import React, { useState, useRef } from 'react';
import video from '../assets/vladvideo.mp4';
import play from '../assets/play.svg';
import pause from '../assets/pause.svg';

function CustomPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef(null);

  const handlePlayPauseClick = () => {
    setIsPlaying((prevState) => !prevState);
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleProgressClick = (e) => {
    if (!videoRef.current) {
      return;
    }

    const progressRect = e.target.getBoundingClientRect();
    const progressClickX = e.clientX - progressRect.left;
    const progressWidth = progressRect.width;
    const progressPercentage = progressClickX / progressWidth;
    const videoDuration = videoRef.current.duration;
    videoRef.current.currentTime = videoDuration * progressPercentage;
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    videoRef.current.volume = e.target.value;
  };

  return (
    <div className="custom-player">
      <video
        className="video-player"
        src={video}
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        onError={(e) => console.log('Error loading video:', e)}
      />

      <div className="custom-player-controls">
        <button className="btn-video" onClick={handlePlayPauseClick}>
          {isPlaying ? (
            <img className="btn-pause" src={pause} alt="Pause" />
          ) : (
            <img className="btn-play" src={play} alt="Play" />
          )}
        </button>
        <div className="custom-player-progress" onClick={handleProgressClick}>
          <div
            className="custom-player-progress-bar"
            style={{
              width: videoRef.current
                ? `${(currentTime / videoRef.current.duration) * 100}%`
                : '0%',
            }}
          />
        </div>
        <div className="custom-player-volume">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
}

export default CustomPlayer;
