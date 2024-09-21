import { useNavigate } from 'react-router-dom';
import { PopupType, usePopupStore } from '../stores/popupStore';
import { useUserProgressStore } from '../stores/userProgressStore';
import { Routes } from '../utils/routes';

interface QuizCompletionProps {
  mountainName: string;
  onStopClick: () => void;
}

export const QuizCompletion = ({ mountainName, onStopClick }: QuizCompletionProps) => {
  const navigate = useNavigate();
  const { openPopup } = usePopupStore();
  const { markMountainAsCompleted } = useUserProgressStore();

  const onExploreClick = () => {
    markMountainAsCompleted(mountainName);
    navigate(Routes.Menu);
  };

  const onFormClick = () => {
    openPopup({ type: PopupType.Form });
  };

  return (
    <div className="absolute top-[40%] left-0 w-full px-32">
      <div className="bg-accent-blue bg-opacity-25 px-10 pt-2 pb-16">
        <p className="font-almaq text-2xl">Bravo ! l'exploration est déjà terminée...</p>
        <p className="font-white-on-black text-accent-blue text-2xl">Merci de votre participation.</p>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-8">
          <button
            className="bg-primary-light-blue text-primary-dark-blue text-sm shadow-lg flex items-center justify-between text-left w-full sm:w-[373px] h-[46px] px-2"
            onClick={onFormClick}
          >
            <span className="flex-1">Je souhaite soumettre une demande d'information médicale</span>
            <div className="ml-2">
              <svg
                className="w-5 h-5"
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
            </div>
          </button>
          <button
            className="bg-primary-light-blue text-primary-dark-blue text-sm shadow-lg flex items-center justify-between text-left w-full sm:w-[373px] h-[46px] px-2"
            onClick={onExploreClick}
          >
            <span className="flex-1">Je souhaite explorer d'autres monts</span>
            <div className="ml-2">
              <svg
                className="w-5 h-5"
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
            </div>
          </button>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-8">
          <button
            className="bg-primary-light-blue text-primary-dark-blue text-sm shadow-lg flex items-center justify-between text-left w-full sm:w-[373px] h-[46px] px-2"
            onClick={onStopClick}
          >
            <span className="flex-1">Je souhaite arrêter le quiz</span>
            <div className="ml-2">
              <svg
                className="w-5 h-5"
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
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
