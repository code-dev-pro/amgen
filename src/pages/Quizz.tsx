import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { useQuizzTitleStore } from '../hooks/useQuizzTitleStore';

import backgroundMenu from '../assets/images/fond_quizz.jpg';
import logo from '../assets/images/logo.svg';
import homeIcon from '../assets/images/icon_home_off.svg';
import { Timer } from '../components/Timer';

const Quizz = () => {
  const { quizzTitle, quizzCategory } = useQuizzTitleStore();

  return (
    <div
      className="relative min-h-screen w-screen"
      style={{ backgroundImage: `url(${backgroundMenu})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
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

      <div className="flex justify-center items-center px-8 mt-4">
        <Timer />
      </div>

      <Footer />
    </div>
  );
};

export default Quizz;
