import { Footer } from '../components/Footer';
import { ExploreButton } from '../components/buttons/ExploreButton';
import backgroundImage from '../assets/images/fond_accueil.jpg';
import logo from '../assets/images/logo.svg';

export const Home = () => {
  return (
    <div className="relative min-h-screen w-screen">
      <img src={backgroundImage} alt="Montagne" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute top-12 right-12">
        <img src={logo} alt="Logo" width={546} height={213} />
      </div>
      <div className="absolute bottom-[291px] right-[86px]">
        <ExploreButton />
      </div>
      <Footer />
    </div>
  );
};
