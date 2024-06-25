import { useEffect } from 'react';
import { useIdleTimer } from '../hooks/useIdleTimer';

interface Props {
  children: React.ReactNode;
}

const Wrapper = ({ children }: Props) => {
  const { resetTimer } = useIdleTimer();

  useEffect(() => {
    resetTimer();
  }, [resetTimer]);

  return <>{children}</>;
};

export default Wrapper;
