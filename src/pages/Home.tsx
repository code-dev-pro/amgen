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
      <Footer />
    </div>
  );
};

export default Home;
