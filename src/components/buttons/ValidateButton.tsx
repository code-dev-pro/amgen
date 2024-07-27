import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface ValidateButtonProps {
  type?: 'submit' | 'reset' | 'button';
  text?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  textColor?: string;
  fontSize?: string;
  isAnimated?: boolean;
  isValid?: boolean;
}

export const ValidateButton: React.FC<ValidateButtonProps> = ({
  type = 'submit',
  text = 'Valider',
  onClick,
  isDisabled = false,
  textColor,
  fontSize,
  isAnimated = false,
  isValid = true,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (!isValid) setIsClicked(false);
    if (isClicked && isValid) {
      const timer = setTimeout(() => setIsClicked(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isClicked, isValid]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    if (isValid) setIsClicked(true);
    if (type !== 'submit') event.preventDefault();
    onClick?.();
  };

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      disabled={isDisabled}
      className={clsx(
        'relative font-white-on-black overflow-hidden px-4 py-2 transition-transform duration-300',
        isDisabled ? 'opacity-20 cursor-not-allowed' : 'opacity-100',
        textColor,
        fontSize
      )}
      whileTap={{ scale: 0.95 }}
    >
      {isAnimated && isValid ? (
        <div className="relative w-40 h-10 overflow-hidden">
          <AnimatePresence initial={false}>
            {!isClicked ? (
              <motion.span
                key="validate"
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                exit={{ y: -40 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {text}
              </motion.span>
            ) : (
              <motion.span
                key="loading"
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                exit={{ y: -40 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                Envoi...
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <span>{text}</span>
      )}
      {isClicked && isAnimated && isValid && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-current"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.button>
  );
};
