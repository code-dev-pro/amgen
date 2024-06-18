import { useState } from 'react';
import { BackButton } from './buttons/BackButton';
import Form from './Form';

interface PopupProps {
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Popup = ({ setPopupOpen }: PopupProps) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="w-full max-w-[845px] h-full max-h-[560px] p-4 bg-primary-light-blue shadow-lg">
        <BackButton setPopupOpen={setPopupOpen} />

        <Form isChecked={isChecked} setIsChecked={setIsChecked} />
      </div>
    </div>
  );
};
