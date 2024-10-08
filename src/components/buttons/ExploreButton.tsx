interface Props {
  onClick: () => void;
}

export const ExploreButton = ({ onClick }: Props) => {
  return (
    <button
      role="button"
      className="bg-primary-light-blue text-primary-dark-blue text-2xl font-extrabold px-4 shadow-lg flex items-center justify-between uppercase w-[373px] h-[46px] hover:scale-95 transition-all duration-300 ease-in-out"
      onClick={onClick}
    >
      lancer l'exploration
      <svg className="ml-2" width="20" height="20" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="50" height="50" transform="translate(0 0.5)" />
        <circle cx="25" cy="25.5" r="24.5" stroke="#00004E" />
        <path d="M23 35.5L32 26L23 16.5" stroke="#00004E" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};
