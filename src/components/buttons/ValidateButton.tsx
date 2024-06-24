import clsx from 'clsx';

interface ValidateButtonProps {
  type?: 'submit' | 'reset' | 'button' | undefined;
  text?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  textColor?: string;
  fontSize?: string;
}

export const ValidateButton = ({ type, text, onClick, isDisabled, textColor, fontSize }: ValidateButtonProps) => {
  return (
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
