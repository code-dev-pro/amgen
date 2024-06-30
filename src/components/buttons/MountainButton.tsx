import clsx from 'clsx';
import DOMPurify from 'dompurify';
import { adjustPosition } from '../../utils/helpers';

interface MountainButtonProps {
  item: {
    title: string;
    titleHTML: string;
  };
  index: number;
  mountainStyles: {
    top: string;
    left: string;
  };
  disabled: boolean;
  onClick: () => void;
  aspectRatio: '16:9' | '4:3';
}

export const MountainButton = ({ item, mountainStyles, disabled, onClick, aspectRatio }: MountainButtonProps) => {
  const sanitizeHtml = (html: string) => ({ __html: DOMPurify.sanitize(html) });
  const adjustedStyles = {
    top: adjustPosition(mountainStyles.top, aspectRatio, false),
    left: adjustPosition(mountainStyles.left, aspectRatio, true),
  };

  return (
    <button
      className={clsx(
        'absolute text-accent-blue font-white-on-black whitespace-nowrap text-center transform -translate-x-1/2 -translate-y-1/2',
        'text-[2vw] aspect-16/9:text-[1.5vw]',
        {
          'opacity-50 cursor-not-allowed': disabled,
        }
      )}
      style={adjustedStyles}
      dangerouslySetInnerHTML={sanitizeHtml(
        `<span class="text-white font-almaq text-lg uppercase">Mont</span> <br />${item.titleHTML}`
      )}
      disabled={disabled}
      onClick={onClick}
    />
  );
};
