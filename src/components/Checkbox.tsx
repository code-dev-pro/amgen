import clsx from 'clsx';

interface CustomCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  size?: 'sm' | 'md' | 'lg';
  fontSize?: 'text-sm' | 'text-lg';
  shape?: 'round' | 'square';
  selectedColor?: 'blue' | 'green' | 'red';
  borderColor?: 'white' | 'green';
}

export const CustomCheckbox = ({
  id,
  label,
  checked,
  onChange,
  size = 'md',
  fontSize = 'text-sm',
  shape = 'square',
  selectedColor = 'blue',
  borderColor = 'white',
}: CustomCheckboxProps) => {
  return (
    <div className="flex items-center">
      <input type="checkbox" id={id} checked={checked} onChange={onChange} className="hidden" />
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
              'border-white bg-white': borderColor === 'white',
              'border-green-500 bg-green-500': borderColor === 'green',
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
                  'bg-primary-dark-blue': selectedColor === 'blue',
                  'bg-green-500': selectedColor === 'green',
                  'bg-red-500': selectedColor === 'red',
                }
              )}
            ></div>
          )}
        </div>
        <span className={clsx('ml-2', { [fontSize]: fontSize })}>{label}</span>
      </label>
    </div>
  );
};
