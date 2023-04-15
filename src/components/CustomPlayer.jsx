import React, { useState, useRef } from 'react';

function CustomPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
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

  return (
    <div className="custom-player">
      <video
        src="https://www.youtube.com/watch?v=wHYu-SfQD5o"
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        onError={(e) => console.log('Error loading video:', e)}
      />
      <div className="custom-player-controls">
        <button onClick={handlePlayPauseClick}>
          {isPlaying ? 'Pause' : 'Play'}
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
      </div>
    </div>
  );
}

export default CustomPlayer;
