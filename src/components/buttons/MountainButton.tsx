import clsx from 'clsx';
import { useMemo } from 'react';
import { adjustPosition, sanitize } from '../../utils/helpers';

interface MountainButtonProps {
  index: number;
  label: string;
  mountainStyles: {
    top: string;
    left: string;
  };
  disabled: boolean;
  onClick: () => void;
  aspectRatio: '16:9' | '4:3';
}

export const MountainButton = ({ label, mountainStyles, disabled, onClick, aspectRatio }: MountainButtonProps) => {
  const adjustedStyles = useMemo(
    () => ({
      top: adjustPosition(mountainStyles.top, aspectRatio, false),
      left: adjustPosition(mountainStyles.left, aspectRatio, true),
    }),
    [mountainStyles.top, mountainStyles.left, aspectRatio]
  );

  return (
    <button
      role="button"
      className={clsx(
        'absolute text-accent-blue font-white-on-black whitespace-nowrap text-center transform -translate-x-1/2 -translate-y-1/2',
        'text-[2vw] aspect-16/9:text-[1.5vw]',
        {
          'opacity-50 cursor-not-allowed': disabled,
        }
      )}
      style={adjustedStyles}
      dangerouslySetInnerHTML={sanitize(
        `<span class="text-white font-almaq text-lg uppercase">Mont</span> <br />${label}`
      )}
      disabled={disabled}
      onClick={onClick}
    />
  );
};
