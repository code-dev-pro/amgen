import clsx from 'clsx';

interface ValidateButtonProps {
  type?: 'submit' | 'reset' | 'button' | undefined;
  isDisabled?: boolean;
  textColor?: string;
  fontSize?: string;
}

export const ValidateButton = ({ type, isDisabled, textColor, fontSize }: ValidateButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        'font-white-on-black',
        isDisabled ? 'opacity-20 cursor-not-allowed' : 'opacity-100',
        textColor,
        fontSize
      )}
      disabled={isDisabled}
    >
      Valider
    </button>
  );
};
