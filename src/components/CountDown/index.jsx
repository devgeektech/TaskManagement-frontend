import { useState, useEffect, useRef } from 'react';

export default function Countdown( props ) {
  const [timeLeft, setTimeLeft] = useState(props.seconds);
  const [isPaused, setIsPaused] = useState(false); // Added isPaused state
  const [pauseTime, setPauseTime] = useState('');

  const intervalRef = useRef();

  useEffect(() => {
    if (!isPaused) { 
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 0) {
            clearInterval(intervalRef.current); 
            return 0;
          } else {
            return t - 1;
          }
        });
      }, 1000);
  
      return () => clearInterval(intervalRef.current); 
    }
  }, [isPaused]); 

  const togglePause = () => {
    setIsPaused(!isPaused);
    const currentTime = new Date().toLocaleTimeString();

    if (!isPaused) {
      setPauseTime(currentTime);
      let obj={
        action:"pause",
        time:currentTime
      }
      props.handleCountDown(obj)
    } else {
      setPauseTime('');
      let obj={
        action:"start",
        time:currentTime
      }
      props.handleCountDown(obj)
    }
    
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <div>
      <div>{formatTime(timeLeft)}</div>
      {/* Added button to toggle pause/play with conditional rendering for its text */}
      {timeLeft > 0 && (
        <button onClick={togglePause} className='btn btn-success'>{isPaused ? 'Start' : 'Pause'}</button>
   
      )}
           {pauseTime && <div>{pauseTime}</div>}
    </div>
  );
}
