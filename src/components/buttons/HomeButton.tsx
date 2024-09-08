import homeIcon from '/images/icon_home_off.svg';

interface HomeButtonProps {
  className?: string;
  onClick?: () => void;
}

export const HomeButton = ({ className, onClick }: HomeButtonProps) => {
  const handleClick = () => {
    onClick && onClick();
  };
  return (
    <button onClick={handleClick}>
      <img src={homeIcon} alt="Accueil" width={26} height={26} className={className} />
    </button>
  );
};
