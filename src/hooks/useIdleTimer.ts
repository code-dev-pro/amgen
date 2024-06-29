import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../utils/routes';
import { IDLE_TIMEOUT } from '../utils/variables';

export const useIdleTimer = (timeout = IDLE_TIMEOUT) => {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef<number | null>(null);
  const navigate = useNavigate();

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => setIsIdle(true), timeout);
  };

  useEffect(() => {
    const handleActivity = () => {
      setIsIdle(false);
      resetTimer();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);

    resetTimer();

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isIdle) {
      navigate(Routes.Home);
    }
  }, [isIdle, navigate]);

  return { isIdle, resetTimer };
};
