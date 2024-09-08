import { useState, useEffect, useCallback } from 'react';

interface TimerProps {
  onComplete: () => void;
  isPaused?: boolean;
  isFinished?: boolean;
}

export const Timer = ({ onComplete, isPaused, isFinished }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(180);
  const totalDuration = 180;

  const resetTimer = useCallback(() => {
    setTimeLeft(0);
  }, []);

  const restartTimer = useCallback(() => {
    setTimeLeft(totalDuration);
  }, [totalDuration]);

  useEffect(() => {
    if (isFinished) {
      resetTimer();
    }
  }, [isFinished, resetTimer]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (!isPaused && !isFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPaused, isFinished, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && !isFinished) {
      onComplete();
    }
  }, [timeLeft, isFinished, onComplete]);

  useEffect(() => {
    if (!isFinished) {
      restartTimer();
    }
  }, [restartTimer, isFinished]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  const circleStyle = {
    background:
      timeLeft === 0 ? '#00004E' : `conic-gradient(#00004E ${(timeLeft / totalDuration) * 360}deg, transparent 0)`,
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
