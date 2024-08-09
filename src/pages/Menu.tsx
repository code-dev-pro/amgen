import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import { Popup } from '../components/popup/Popup';
import { Form } from '../components/popup/Form';
import { MountainButton } from '../components/buttons/MountainButton';
import { usePopupStore } from '../stores/popupStore';
import { useQuizStore } from '../stores/quizStore';
import { useUserProgressStore } from '../stores/userProgressStore';
import { data } from '../data';
import { Routes } from '../utils/routes';
import { mountainStyles } from '../utils/variables';

import backgroundMenu from '../assets/images/fond_menu.jpg';
import logo from '../assets/images/logo.svg';
import mailIcon from '../assets/images/icon_mail_off.svg';
import homeIcon from '../assets/images/icon_home_off.svg';

const Menu = () => {
  const navigate = useNavigate();
  const { isPopupOpen, openPopup } = usePopupStore();
  const { setQuizIndex, setQuizTitle, setQuizCategory } = useQuizStore();
  const { completedMountains, resetProgress } = useUserProgressStore();
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '4:3'>('4:3');

  useEffect(() => {
    const updateAspectRatio = () => {
      const ratio = window.innerWidth / window.innerHeight;
      setAspectRatio(ratio > 1.6 ? '16:9' : '4:3');
    };

    updateAspectRatio();
    window.addEventListener('resize', updateAspectRatio);
    return () => window.removeEventListener('resize', updateAspectRatio);
  }, []);

  const handleHomeClick = () => {
    resetProgress();
  };

  const handleMailIconClick = () => {
    openPopup('form', <Form />);
  };

  const handleMountainClick = useCallback(
    (index: number, item: (typeof data)[0]) => {
      setQuizIndex(index);
      setQuizTitle(item.title);
      setQuizCategory(item.category);
      navigate(Routes.Quiz);
    },
    [setQuizIndex, setQuizTitle, setQuizCategory, navigate]
  );

  return (
    <div className="relative w-full h-screen">
      <div
        data-testid="mountain-background"
        className={clsx('absolute inset-0 bg-cover bg-center', { 'blur-sm': isPopupOpen })}
        style={{
          backgroundImage: `url(${backgroundMenu})`,
          backgroundPosition: aspectRatio === '4:3' ? 'center center' : 'center top',
        }}
      >
        <div className="absolute top-0 left-0 w-full p-8 flex items-end space-x-10">
          <img src={logo} alt="Logo" className="w-60" />

          <div className="text-white font-notoSans text-xl">
            <p className="font-extrabold text-3xl text-accent-blue">À vous de jouer !</p>
            <p>Répondez à un maximum de questions en 3 minutes !</p>
            <p>Choisissez votre pool de questions.</p>
          </div>
        </div>
        <div className="absolute top-8 right-8 flex items-center space-x-8">
          <img
            src={mailIcon}
            alt="Mail"
            width={26}
            height={26}
            className="cursor-pointer"
            onClick={handleMailIconClick}
          />

          <Link to={Routes.Home} onClick={handleHomeClick}>
            <img src={homeIcon} alt="Accueil" width={26} height={26} />
          </Link>
        </div>

        {data.map((item, index) => (
          <MountainButton
            key={index}
            item={item}
            index={index}
            mountainStyles={mountainStyles[index]}
            disabled={completedMountains.includes(item.title)}
            onClick={() => handleMountainClick(index, item)}
            aspectRatio={aspectRatio}
          />
        ))}
      </div>
      {isPopupOpen && <Popup>{usePopupStore.getState().popupContent}</Popup>}
      <Footer />
    </div>
  );
};

export default Menu;
