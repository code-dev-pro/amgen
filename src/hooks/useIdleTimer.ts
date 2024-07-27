import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../utils/routes';
import { IDLE_TIMEOUT } from '../utils/variables';

export const useIdleTimer = (timeout = IDLE_TIMEOUT) => {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef<number | null>(null);
  const navigate = useNavigate();

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setIsIdle(true), timeout);
  }, [timeout]);

  const handleActivity = useCallback(() => {
    setIsIdle(false);
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);

    resetTimer();

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);

      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [handleActivity, resetTimer]);

  useEffect(() => {
    if (isIdle) navigate(Routes.Home);
  }, [isIdle, navigate]);

  return { isIdle, resetTimer };
};
