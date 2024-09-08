import { useState, useCallback, ReactNode } from 'react';

interface LongPressButtonProps {
  onLongPress: () => void;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  longPressTime?: number;
}

export const LongPressButton = ({
  onLongPress,
  onClick,
  children,
  className = '',
  longPressTime = 1000,
}: LongPressButtonProps) => {
  const [isLongPress, setIsLongPress] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    setIsLongPress(false);
    const timer = setTimeout(() => {
      setIsLongPress(true);
      onLongPress();
    }, longPressTime);
    setTimerId(timer);
  }, [onLongPress, longPressTime]);

  const stop = useCallback(() => {
    if (timerId) {
      clearTimeout(timerId);
    }
    if (!isLongPress && onClick) {
      onClick();
    }
  }, [isLongPress, onClick, timerId]);

  return (
    <button
      className={className}
      onMouseDown={start}
      onMouseUp={stop}
      onMouseLeave={stop}
      onTouchStart={start}
      onTouchEnd={stop}
    >
      {children}
    </button>
  );
};
