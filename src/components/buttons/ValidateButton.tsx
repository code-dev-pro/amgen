import clsx from 'clsx';
import { stagger, useAnimate, animate } from 'framer-motion';

interface ValidateButtonProps {
  type?: 'submit' | 'reset' | 'button' | undefined;
  text?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  textColor?: string;
  fontSize?: string;
  isAnimated?: boolean;
}

const randomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

type AnimationSequence = Parameters<typeof animate>[0];

export const ValidateButton = ({
  type,
  text,
  onClick,
  isDisabled,
  textColor,
  fontSize,
  isAnimated,
}: ValidateButtonProps) => {
  const [scope, animate] = useAnimate();

  const onButtonClick = () => {
    const sparkles = Array.from({ length: 20 });
    const sparklesAnimation: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: randomNumberBetween(-100, 100),
        y: randomNumberBetween(-100, 100),
        scale: randomNumberBetween(1.5, 2.5),
        opacity: 1,
      },
      {
        duration: 0.4,
        at: '<',
      },
    ]);

    const sparklesFadeOut: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        opacity: 0,
        scale: 0,
      },
      {
        duration: 0.3,
        at: '<',
      },
    ]);

    const sparklesReset: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: 0,
        y: 0,
      },
      {
        duration: 0.000001,
      },
    ]);

    animate([
      ...sparklesReset,
      ['.letter', { y: -36 }, { duration: 0.2, delay: stagger(0.05) }],
      ['button', { scale: 0.8 }, { duration: 0.1, at: '<' }],
      ['button', { scale: 1 }, { duration: 0.1 }],
      ...sparklesAnimation,
      ['.letter', { y: 0 }, { duration: 0.000001 }],
      ...sparklesFadeOut,
    ]);

    if (onClick) {
      onClick();
    }
  };

  return isAnimated ? (
    <div ref={scope}>
      <button
        type={type}
        onClick={onButtonClick}
        className={clsx(
          'relative font-white-on-black z-20',
          isDisabled ? 'opacity-20 cursor-not-allowed' : 'opacity-100',
          textColor,
          fontSize
        )}
      >
        <span className="sr-only">{text}</span>
        <span className="block h-9 overflow-hidden" aria-hidden>
          {['V', 'a', 'l', 'i', 'd', 'e', 'r'].map((letter, index) => (
            <span
              data-letter={letter}
              className="letter relative inline-block h-9 leading-9 after:absolute after:left-0 after:top-full after:h-9 after:content-[attr(data-letter)]"
              key={`${letter}-${index}`}
            >
              {letter}
            </span>
          ))}
        </span>
        <span aria-hidden className="pointer-events-none absolute inset-0 z-[2] block">
          {Array.from({ length: 20 }).map((_, index) => (
            <svg
              className={`absolute left-1/2 top-1/2 opacity-0 sparkle-${index}`}
              key={index}
              viewBox="0 0 122 117"
              width="10"
              height="10"
            >
              <path
                className="fill-primary-dark-blue"
                d="M64.39,2,80.11,38.76,120,42.33a3.2,3.2,0,0,1,1.83,5.59h0L91.64,74.25l8.92,39a3.2,3.2,0,0,1-4.87,3.4L61.44,96.19,27.09,116.73a3.2,3.2,0,0,1-4.76-3.46h0l8.92-39L1.09,47.92A3.2,3.2,0,0,1,3,42.32l39.74-3.56L58.49,2a3.2,3.2,0,0,1,5.9,0Z"
              />
            </svg>
          ))}
        </span>
      </button>
    </div>
  ) : (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        'font-white-on-black',
        isDisabled ? 'opacity-20 cursor-not-allowed' : 'opacity-100',
        textColor,
        fontSize
      )}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};
