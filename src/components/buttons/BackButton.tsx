import { usePopupStore } from '../../hooks/usePopupStore';

export const BackButton = () => {
  const { setPopupOpen } = usePopupStore();
  return (
    <button className="flex items-center" onClick={() => setPopupOpen(false)}>
      <svg width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="24.5" transform="rotate(-180 25 25)" stroke="#00004E" />
        <path d="M27 15L18 24.5L27 34" stroke="#00004E" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <span className="ml-2 uppercase text-xs">Retour</span>
    </button>
  );
};
