import { useEffect } from 'react';
import { useIdleTimer } from '../hooks/useIdleTimer';

interface Props {
  children: React.ReactNode;
}

const RedirectWrapper = ({ children }: Props) => {
  const { resetTimer } = useIdleTimer();

  useEffect(() => {
    resetTimer();
  }, [resetTimer]);

  return <>{children}</>;
};

export default RedirectWrapper;
