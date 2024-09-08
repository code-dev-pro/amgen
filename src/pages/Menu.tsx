import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Popup } from '../components/popup/Popup';
import { Form } from '../components/popup/Form';
import { MountainButton } from '../components/buttons/MountainButton';
import { useQuizNavigation } from '../hooks/useQuizNavigation';
import { useQuizDataStore } from '../stores/dataStore';
import { usePopupStore } from '../stores/popupStore';
import { useUserProgressStore } from '../stores/userProgressStore';
import { Routes } from '../utils/routes';
import { mountainStyles, SURPRISE_EXPLORATION, surpriseExplorerTheme } from '../utils/variables';

import backgroundMenu from '/images/fond_menu.jpg';
import logo from '/images/logo.svg';
import mailIcon from '/images/icon_mail_off.svg';
import homeIcon from '/images/icon_home_off.svg';

const Menu = () => {
  const { isPopupOpen, openPopup } = usePopupStore();
  const { completedMountains, resetProgress } = useUserProgressStore();
  const { quizData } = useQuizDataStore();
  const { handleMountainClick } = useQuizNavigation();

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

  const renderMountainButtons = useMemo(() => {
    if (!quizData?.themes) return null;

    const buttons = quizData.themes.map((item, index) => (
      <MountainButton
        key={item.label}
        label={item.label}
        index={index}
        mountainStyles={mountainStyles[index]}
        disabled={completedMountains.includes(item.label)}
        onClick={() => handleMountainClick(index, item)}
        aspectRatio={aspectRatio}
      />
    ));

    buttons.push(
      <MountainButton
        key={SURPRISE_EXPLORATION}
        label={SURPRISE_EXPLORATION.replace(' ', '<br />')}
        index={quizData.themes.length}
        mountainStyles={mountainStyles[quizData.themes.length % mountainStyles.length]}
        disabled={completedMountains.includes(SURPRISE_EXPLORATION)}
        onClick={() => handleMountainClick(quizData.themes.length, surpriseExplorerTheme)}
        aspectRatio={aspectRatio}
      />
    );

    return buttons;
  }, [quizData?.themes, completedMountains, handleMountainClick, aspectRatio]);

  return (
    <div className="relative w-full h-dvh">
      <div
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
            onClick={() => openPopup('form', <Form />)}
          />
          <Link to={Routes.Home} onClick={resetProgress}>
            <img src={homeIcon} alt="Accueil" width={26} height={26} />
          </Link>
        </div>

        {renderMountainButtons}
      </div>

      {isPopupOpen && <Popup>{usePopupStore.getState().popupContent}</Popup>}
      <Footer />
    </div>
  );
};

export default Menu;
