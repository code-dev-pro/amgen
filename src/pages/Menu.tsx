import backgroundMenu from '../assets/images/fond_menu.jpg';
import logo from '../assets/images/logo.svg';
import homeIcon from '../assets/images/icon_home_off.svg';
import mailIcon from '../assets/images/icon_mail_off.svg';
import { Footer } from '../components/Footer';

export const Menu = () => {
  return (
    <div
      className="relative min-h-screen w-screen"
      style={{ backgroundImage: `url(${backgroundMenu})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="w-full flex items-end space-x-10 p-8">
        <img src={logo} alt="Logo" className="w-full max-w-[315px]" />
        <div className="text-white font-notoSans text-2xl">
          <p className="font-extrabold text-4xl text-accent-blue">À vous de jouer !</p>
          <p>Répondez à un maximum de questions en 3 minutes !</p>
          <p>Choisissez votre pool de questions.</p>
        </div>
      </div>

      <div className="absolute top-8 right-12 flex items-center space-x-10">
        <img src={mailIcon} alt="Mail" className="w-[35px] h-[35px] cursor-pointer" />
        <img src={homeIcon} alt="Accueil" className="w-[35px] h-[35px] cursor-pointer" />
      </div>

      <div className="absolute bottom-[35%] left-24">
        <p className="text-white text-center text-2xl font-bold">Menu</p>
      </div>
      <Footer />
    </div>
  );
};
