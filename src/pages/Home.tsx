import { Footer } from '../components/Footer';
import { ExploreButton } from '../components/buttons/ExploreButton';
import backgroundImage from '../assets/images/fond_accueil.jpg';
import logo from '../assets/images/logo.svg';

export const Home = () => {
  return (
    <div className="relative min-h-screen w-screen">
      <img src={backgroundImage} alt="Mountain Path" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute top-8 right-8">
        <img src={logo} alt="Logo" className="w-full min-w-[700px]" />
      </div>
      <div className="absolute bottom-[35%] right-24">
        <ExploreButton />
      </div>
      <Footer />
    </div>
  );
};
