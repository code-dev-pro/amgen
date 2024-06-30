import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { Footer } from '../components/Footer';
import { Popup } from '../components/popup/Popup';
import { Form } from '../components/popup/Form';
import { HomeButton } from '../components/buttons/HomeButton';
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

const Menu = () => {
  const navigate = useNavigate();
  const { isPopupOpen, openPopup } = usePopupStore();
  const { setQuizIndex, setQuizTitle, setQuizCategory } = useQuizStore();
  const completedMountains = useUserProgressStore((state) => state.completedMountains);

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
    <>
      <div
        className={clsx('relative min-h-screen w-screen bg-cover bg-center', { 'blur-sm': isPopupOpen })}
        style={{ backgroundImage: `url(${backgroundMenu})` }}
      >
        <div className="w-full flex items-end space-x-10 p-8">
          <img src={logo} alt="Logo" width={241} height={90} />

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

          <HomeButton />
        </div>

        {data.map((item, index) => (
          <MountainButton
            key={index}
            item={item}
            index={index}
            mountainStyles={mountainStyles[index]}
            disabled={completedMountains.includes(item.title)}
            onClick={() => handleMountainClick(index, item)}
          />
        ))}
      </div>

      {isPopupOpen && <Popup>{usePopupStore.getState().popupContent}</Popup>}

      <Footer />
    </>
  );
};

export default Menu;
