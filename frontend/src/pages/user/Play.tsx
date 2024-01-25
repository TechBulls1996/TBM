import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

const Play = () => {
  const [playing, setPlaying] = useState(true);
  const [showTimer, setShowTimer] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(5);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const playerRef = useRef<ReactPlayer | null>(null);

  const videoUrls = [
    '/mov_bbb.mp4',
  ];

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause video when tab is switched or minimized
        setPlaying(false);
      } else {
        // Resume video when tab is in focus
        setPlaying(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleVideoEnd = () => {
    // Handle video end event, e.g., play the next video
    console.log('Video ended');
    // You may want to update video logs using an API here

    // For demonstration, play the next video
    playNextVideo();
  };

  const handleProgress = ({
    played,
    playedSeconds,
    loadedSeconds,
  }: {
    played: number;
    playedSeconds: number;
    loadedSeconds: number;
  }) => {
    // Update the video duration once it's available
    if (loadedSeconds > 0 && loadedSeconds !== videoDuration) {
      setVideoDuration(loadedSeconds);
    }

    // Check if the remaining time is less than 5 seconds
    if (videoDuration - playedSeconds <= 5) {
      setShowTimer(true);
      setTimerSeconds(Math.ceil(videoDuration - playedSeconds));
    } else {
      setShowTimer(false);
    }

  };

  const playNextVideo = () => {
    // Increment the current video index
    const nextIndex = (currentVideoIndex + 1) % videoUrls.length;

    // For demonstration, play the next video
    setCurrentVideoIndex(nextIndex);
    setVideoDuration(0); // Reset video duration
    playerRef.current?.seekTo(0);
    setPlaying(true);
  };

  const fullScreenMode = () => {
    const player = playerRef.current;
      if (player) {
        const playerElement = player.getInternalPlayer();
        if (playerElement && playerElement.requestFullscreen) {
          playerElement.requestFullscreen();
        }
      }
  } 

  return (
    <>
      <ReactPlayer
        ref={playerRef}
        url={videoUrls[currentVideoIndex]}
        playing={playing}
        controls={true} 
        width="100%"
        height="100vh"
        onEnded={handleVideoEnd}
        onProgress={handleProgress}
      />
      {showTimer && (
        <div
          style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            padding: '10px',
            background: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            borderRadius: '3px',
          }}
        >
          Next: {timerSeconds}s
        </div>
      )}
    </>
  );
};

export default Play;
