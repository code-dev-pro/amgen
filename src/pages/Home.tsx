import { Footer } from '../components/Footer';
import { ExploreButton } from '../components/buttons/ExploreButton';
import { useIdleTimer } from '../hooks/useIdleTimer';

import backgroundImage from '../assets/images/fond_accueil.jpg';
import logo from '../assets/images/logo.svg';

const Home = () => {
  const { resetTimer } = useIdleTimer();

  const handleExploreButtonClick = () => {
    resetTimer();
  };

  return (
    <div className="relative min-h-screen w-screen">
      <img
        src={backgroundImage}
        alt="Montagne"
        className="absolute inset-0 h-full w-full object-cover"
        data-testid="mountain-background"
      />
      <div className="absolute top-12 right-12">
        <img src={logo} alt="Logo" width={546} height={213} data-testid="logo" />
      </div>
      <div className="absolute bottom-[291px] right-[86px]">
        <ExploreButton onClick={handleExploreButtonClick} />
      </div>

      <p className="absolute bottom-[90px] right-[20px] text-xs text-right">
        <span>AMGEN SAS,</span>
        <br />
        <span>Société par actions simplifiée</span>
        <br />
        <span>au capital de 307.500 euros</span>
        <br />
        <span>377 998 679 RC SNanterre,</span>
        <br />
        <span>25 Quai du Président Paul Doumer,</span>
        <br />
        <span>92400 Courbevoie</span>
      </p>

      <Footer />
    </div>
  );
};

export default Home;
