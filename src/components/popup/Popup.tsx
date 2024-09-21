import { PopupType, usePopupStore } from '../../stores/popupStore';
import { BackButton } from '../buttons/BackButton';
import { Form } from './Form';
import { PlainText } from './PlainText';
import { ZoomableImage } from './ZoomableImage';

export const Popup = () => {
  const { popupContent } = usePopupStore();

  if (!popupContent) return null;

  const renderContent = () => {
    switch (popupContent.type) {
      case PopupType.Form:
        return <Form />;
      case PopupType.Text:
        return <PlainText text={popupContent.text} />;
      case PopupType.Image:
        return <ZoomableImage imageUrl={popupContent.imageUrl} imageAlt={popupContent.imageAlt} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 animate-fadeIn">
      <div className="relative w-full max-w-[845px] h-auto min-h-[560px] p-4 bg-primary-light-blue shadow-lg overflow-hidden">
        <BackButton />
        {renderContent()}
      </div>
    </div>
  );
};
