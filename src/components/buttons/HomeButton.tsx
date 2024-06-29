import { Link } from 'react-router-dom';
import { Routes } from '../../utils/routes';
import { useUserProgressStore } from '../../stores/userProgressStore';

import homeIcon from '../../assets/images/icon_home_off.svg';

export const HomeButton = ({ className }: { className?: string }) => {
  const resetProgress = useUserProgressStore((state) => state.resetProgress);

  return (
    <Link to={Routes.Home} onClick={resetProgress}>
      <img src={homeIcon} alt="Accueil" width={26} height={26} className={className} />
    </Link>
  );
};
