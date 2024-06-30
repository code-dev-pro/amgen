import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { RotateDevice } from './RotateDevice';

export const Layout = () => {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const updateOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    updateOrientation();
    window.addEventListener('resize', updateOrientation);
    return () => window.removeEventListener('resize', updateOrientation);
  }, []);

  if (isPortrait) {
    return <RotateDevice />;
  }

  return <Outlet />;
};
