import { BackButton } from '../buttons/BackButton';

interface PopupProps {
  children?: React.ReactNode;
}

export const Popup = ({ children }: PopupProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 animate-fadeIn" data-testid="popup">
      <div className="relative w-full max-w-[845px] h-auto min-h-[560px] p-4 bg-primary-light-blue shadow-lg overflow-hidden">
        <BackButton />

        {children}
      </div>
    </div>
  );
};
