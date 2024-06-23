import { usePopupStore } from '../../hooks/usePopupStore';
import { Popup } from '../popup/Popup';
import { ZoomableImage } from '../popup/ZoomableImage';
import { PlainText } from '../popup/PlainText';

interface LearnMoreButtonProps {
  content: {
    text: string;
    imageURL: string;
    imageAlt: string;
  };
}

export const LearnMoreButton = ({ content }: LearnMoreButtonProps) => {
  const { isPopupOpen, setPopupOpen } = usePopupStore();

  return (
    <>
      <button
        className="font-almaq text-2xl uppercase border border-primary-light-blue p-2"
        onClick={() => setPopupOpen(true)}
      >
        <span className="text-accent-blue">En savoir +</span>
      </button>

      {isPopupOpen && (
        <Popup>
          {content.text !== '' ? (
            <PlainText text={content.text} />
          ) : (
            <ZoomableImage imageUrl={content.imageURL} imageAlt={content.imageAlt} />
          )}
        </Popup>
      )}
    </>
  );
};
