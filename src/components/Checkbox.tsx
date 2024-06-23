import clsx from 'clsx';

interface CustomCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (isChecked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  fontSize?: 'text-sm' | 'text-lg';
  labelColor?: 'white' | 'black';
  shape?: 'round' | 'square';
  isAnswerShown?: boolean;
  isCorrectAnswer?: boolean;
  isCorrectAnswerSelected?: boolean;
  isIncorrectAnswerSelected?: boolean;
  disabled?: boolean;
}

export const CustomCheckbox = ({
  id,
  label,
  checked,
  onChange,
  size = 'md',
  fontSize = 'text-sm',
  labelColor = 'white',
  shape = 'square',
  isAnswerShown = false,
  isCorrectAnswer = false,
  isCorrectAnswerSelected = false,
  isIncorrectAnswerSelected = false,
  disabled = false,
}: CustomCheckboxProps) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
        disabled={disabled}
      />
      <label htmlFor={id} className="flex items-center cursor-pointer">
        <div
          className={clsx(
            'flex items-center justify-center',
            {
              'w-4 h-4 border-2': size === 'sm',
              'w-6 h-6 border-2': size === 'md',
              'w-8 h-8 border-4': size === 'lg',
            },
            {
              'rounded-full': shape === 'round',
            },
            {
              'border-white bg-white': !isAnswerShown,
              'border-white bg-green-500': isAnswerShown && isCorrectAnswerSelected,
              'border-white bg-red-500': isAnswerShown && isIncorrectAnswerSelected,
              'border-green-500 bg-white': isAnswerShown && isCorrectAnswer && !isCorrectAnswerSelected,
              'bg-white': isAnswerShown && !isCorrectAnswer && !isIncorrectAnswerSelected,
            }
          )}
        >
          {checked && (
            <div
              className={clsx(
                {
                  'w-3 h-3': size === 'sm',
                  'w-4 h-4': size === 'md',
                  'w-6 h-6': size === 'lg',
                },
                {
                  'rounded-full': shape === 'round',
                },
                {
                  'bg-primary-dark-blue': !isAnswerShown,
                  'bg-green-500': isAnswerShown && isCorrectAnswerSelected,
                  'bg-red-500': isAnswerShown && isIncorrectAnswerSelected,
                }
              )}
            ></div>
          )}
        </div>

        <span
          className={clsx('ml-2', {
            [fontSize]: fontSize,
            'text-white': !isAnswerShown && labelColor === 'white',
            'text-black': !isAnswerShown && labelColor === 'black',
            'text-green-500': (isAnswerShown && isCorrectAnswerSelected) || (isAnswerShown && isCorrectAnswer),
            'text-red-500': isAnswerShown && isIncorrectAnswerSelected,
          })}
        >
          {label}
        </span>
      </label>
    </div>
  );
};
