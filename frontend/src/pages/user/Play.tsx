import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { CreateAdEvent, GetUserAds, GetUserEventInfo } from '../../services/CommanServices';
import { useNavigate } from "react-router-dom";
import { secondsToHMS } from '../../helpers';

const Play = () => {
  const [playing, setPlaying] = useState(true);
  const [showTimer, setShowTimer] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(5);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [playedDuration, setPlayedDuration] = useState(0);
  const playerRef = useRef<ReactPlayer | null>(null);
  //user screen Time
  const [screenTime, setScreenTime]:any = useState(0);

  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [videoUrls, setVideoUrls]:any = useState([]);
  const [exceedAds, setexceedAds]:any = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause video when tab is switched or minimized
        setPlaying(false);
        trackVideoEvent('paused');
      } else {
        // Resume video when tab is in focus
        setPlaying(true);
        trackVideoEvent('resumed');
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );

    //get ads data
    GetUserAds({}).then(async (res) => {
      if (res?.status) {
        setVideoUrls(res.data);
        //get screen Time of user
        const eventInfo = await GetUserEventInfo();
        setScreenTime(eventInfo?.screen?.screenTime || 0);
      } 
    });

  }, []);

  useEffect(() => {
    //filter videoUrls
    const updatedVideoUrls = videoUrls.filter((video: any) => !exceedAds.includes(video._id));
    setVideoUrls(updatedVideoUrls);
  }, [exceedAds]);
  
  const handleVideoEnd = () => {
    // Handle video end event, e.g., play the next video
    // You may want to update video logs using an API here
    trackVideoEvent('ended');
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
     setPlayedDuration(playedSeconds);
     let sTime= screenTime+1;
     setScreenTime(sTime);
    // Check if the remaining time is less than 5 seconds
    if (videoDuration - playedSeconds <= 5) {
      setShowTimer(true);
      setTimerSeconds(Math.ceil(videoDuration - playedSeconds));
    } else {
      setShowTimer(false);
    }

  };

  const trackVideoEvent = async (eventName: string) => {
    // Implement logic to track video events, e.g., send API request with event data
    console.log('Tracking video event:', eventName);
    try {
      const currentVideo = videoUrls[currentVideoIndex]?._id;
      const createEvent = await CreateAdEvent({
                eventName,
                videoId:currentVideo,
                userLocation,
                timestamp: new Date().toISOString(),
                videoDuration,
                playedDuration,
              });
      
      if (!createEvent.status && createEvent.errors?.[0]?.message === "Authentication Failed, Please Login again.") {
          navigate("/login");
      }
      //limit per exceed
      if(!createEvent.status && createEvent.error==='Ad count per day limit exceeded'){
        const adData = [...exceedAds, currentVideo];
        setexceedAds(adData);
      }

      //get event info
      if(eventName==='ended'){
        const eventInfo = await GetUserEventInfo();
        setScreenTime(eventInfo?.screen?.screenTime || 0);
      }
    } catch (error) {
      console.log('ERROR:::', error);
      navigate("/login");
    }
  
  };

  const playNextVideo = () => {
    // Increment the current video index
    const nextIndex = (currentVideoIndex + 1) % videoUrls.length;
    // For demonstration, play the next video
    setCurrentVideoIndex(nextIndex);
    setVideoDuration(0); // Reset video duration
    setPlayedDuration(0);
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
      <div className='log-wrapper'>
        <span>{secondsToHMS(Math.round(screenTime))}</span>
      </div>
      <ReactPlayer
        ref={playerRef}
        url={ videoUrls[currentVideoIndex]?.video?.replace(/\\/g, '/') }
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
