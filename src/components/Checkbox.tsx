import clsx from 'clsx';
import { sanitize } from '../utils/helpers';

interface CustomCheckboxProps {
  id: number;
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
  const checkboxId = `checkbox-${id}`;

  return (
    <>
      <input
        type="checkbox"
        id={checkboxId}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
        disabled={disabled}
      />
      <label htmlFor={checkboxId} className="flex items-center cursor-pointer">
        <div
          className={clsx(
            'flex items-center justify-center flex-shrink-0',
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
              'border-white bg-accent-green': isAnswerShown && isCorrectAnswerSelected,
              'border-white bg-accent-red': isAnswerShown && isIncorrectAnswerSelected,
              'border-accent-green bg-white': isAnswerShown && isCorrectAnswer && !isCorrectAnswerSelected,
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
                  'bg-accent-green': isAnswerShown && isCorrectAnswerSelected,
                  'bg-accent-red': isAnswerShown && isIncorrectAnswerSelected,
                }
              )}
            ></div>
          )}
        </div>
        {label && (
          <span
            className={clsx('ml-2 self-start', {
              [fontSize]: fontSize,
              'text-white': !isAnswerShown && labelColor === 'white',
              'text-black': !isAnswerShown && labelColor === 'black',
              'text-accent-green': (isAnswerShown && isCorrectAnswerSelected) || (isAnswerShown && isCorrectAnswer),
              'text-accent-red': isAnswerShown && isIncorrectAnswerSelected,
            })}
            dangerouslySetInnerHTML={sanitize(label)}
          />
        )}
      </label>
    </>
  );
};
