import { Link } from 'react-router-dom';
import { useQuizzTitleStore } from '../hooks/useQuizzTitleStore';

import logo from '../assets/images/logo.svg';
import homeIcon from '../assets/images/icon_home_off.svg';

export const Header = () => {
  const { quizzTitle, quizzCategory } = useQuizzTitleStore();
  return (
    <div className="w-full px-8 py-4">
      <img src={logo} alt="Logo" width={130} height={51} className="absolute top-8 left-8" />

      <div className="text-white text-center uppercase">
        <p className="font-almaq text-3xl">Mont</p>
        <p className="font-white-on-black text-accent-blue text-4xl">{quizzTitle}</p>

        {quizzCategory !== '' && <p className="font-light">{quizzCategory}</p>}
      </div>
      <Link to="/">
        <img src={homeIcon} alt="Accueil" width={26} height={26} className="absolute top-8 right-8" />
      </Link>
    </div>
  );
};
