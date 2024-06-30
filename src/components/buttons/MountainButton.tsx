import clsx from 'clsx';
import DOMPurify from 'dompurify';
import { useCallback } from 'react';
import { data } from '../../data';

interface MountainButtonProps {
  item: (typeof data)[0];
  index: number;
  mountainStyles: { top: string; left: string };
  disabled: boolean;
  onClick: () => void;
}

export const MountainButton = ({ item, index, mountainStyles, disabled, onClick }: MountainButtonProps) => {
  const sanitizeHtml = useCallback((html: string) => ({ __html: DOMPurify.sanitize(html) }), []);

  return (
    <button
      key={index}
      className={clsx(
        'absolute text-accent-blue font-white-on-black text-2xl block mb-4 whitespace-nowrap text-center',
        {
          'opacity-50 cursor-not-allowed': disabled,
        }
      )}
      style={{
        top: mountainStyles.top,
        left: mountainStyles.left,
      }}
      dangerouslySetInnerHTML={sanitizeHtml(
        `<span class="text-white font-almaq text-lg uppercase">Mont</span> <br />${item.titleHTML}`
      )}
      disabled={disabled}
      onClick={onClick}
    />
  );
};
