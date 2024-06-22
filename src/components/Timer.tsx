import { useState, useEffect } from 'react';

interface TimerProps {
  onComplete: () => void;
}

export const Timer = ({ onComplete }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(180);
  const totalDuration = 180;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
    }
  }, [timeLeft, onComplete]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  const circleStyle = {
    background: `conic-gradient(#00004E ${(timeLeft / totalDuration) * 360}deg, transparent 0)`,
  };

  return (
    <div className="relative w-[85px] h-[85px] flex justify-center items-center">
      <div className="absolute w-full h-full rounded-full" style={circleStyle}></div>
      <div className="absolute text-white text-2xl font-bold font-almaq">
        {minutes}:{seconds}
      </div>
    </div>
  );
};
