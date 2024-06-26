import { useNavigate } from 'react-router-dom';
import { usePopupStore } from '../hooks/usePopupStore';
import { useUserProgressStore } from '../hooks/useUserProgressStore';
import { Routes } from '../utils/routes';

interface QuizzCompletionProps {
  mountainName: string;
  setCompletionContentPopup: () => void;
}

export const QuizzCompletion = ({ setCompletionContentPopup, mountainName }: QuizzCompletionProps) => {
  const { setPopupOpen } = usePopupStore();
  const markMountainAsCompleted = useUserProgressStore((state) => state.markMountainAsCompleted);
  const navigate = useNavigate();

  const handleClick = () => {
    markMountainAsCompleted(mountainName);
    navigate(Routes.Menu);
  };

  const handleCompletionClick = () => {
    setCompletionContentPopup();
    setPopupOpen(true);
  };

  return (
    <div className="absolute top-[40%] left-0 w-full px-32">
      <div className="bg-accent-blue bg-opacity-25 px-10 pt-2 pb-16">
        <p className="font-almaq text-2xl">Bravo ! l'exploration est déjà terminée...</p>
        <p className="font-white-on-black text-accent-blue text-2xl">Merci de votre participation.</p>

        <div className="flex justify-between items-center mt-6 space-x-8">
          <button
            className="bg-primary-light-blue text-primary-dark-blue text-sm shadow-lg flex items-center justify-between text-left w-[373px] h-[46px] px-2"
            onClick={handleCompletionClick}
          >
            <span className="flex-1">Je souhaite recevoir de la documentation pour m'accompagner dans ma pratique</span>
            <svg
              className="ml-2"
              width="20"
              height="20"
              viewBox="0 0 50 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="50" height="50" transform="translate(0 0.5)" />
              <circle cx="25" cy="25.5" r="24.5" stroke="#00004E" />
              <path d="M23 35.5L32 26L23 16.5" stroke="#00004E" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            className="bg-primary-light-blue text-primary-dark-blue text-sm shadow-lg flex items-center justify-between text-left w-[373px] h-[46px] px-2"
            onClick={handleClick}
          >
            <span className="flex-1">Je souhaite explorer d’autres monts</span>
            <svg
              className="ml-2"
              width="20"
              height="20"
              viewBox="0 0 50 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="50" height="50" transform="translate(0 0.5)" />
              <circle cx="25" cy="25.5" r="24.5" stroke="#00004E" />
              <path d="M23 35.5L32 26L23 16.5" stroke="#00004E" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
