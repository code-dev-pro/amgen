import { useNavigate } from 'react-router-dom';

export const ExploreButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/explore');
  };
  return (
    <button
      className="bg-primary-light-blue text-primary-dark-blue text-3xl font-notoSans font-extrabold p-4 shadow-lg flex items-center uppercase"
      onClick={handleClick}
    >
      lancer l'exploration
      <svg className="ml-2" width="25" height="25" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="50" height="50" transform="translate(0 0.5)" />
        <circle cx="25" cy="25.5" r="24.5" stroke="#00004E" />
        <path d="M23 35.5L32 26L23 16.5" stroke="#00004E" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};
