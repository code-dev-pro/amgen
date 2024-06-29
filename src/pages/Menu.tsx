import DOMPurify from 'dompurify';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Popup } from '../components/popup/Popup';
import { Form } from '../components/popup/Form';
import { HomeButton } from '../components/buttons/HomeButton';
import { usePopupStore } from '../hooks/usePopupStore';
import { useQuizTitleStore } from '../hooks/useQuizTitleStore';
import { useUserProgressStore } from '../hooks/useUserProgressStore';
import { data } from '../data';
import { Routes } from '../utils/routes';

import backgroundMenu from '../assets/images/fond_menu.jpg';
import logo from '../assets/images/logo.svg';
import mailIcon from '../assets/images/icon_mail_off.svg';

const Menu = () => {
  const mountainStyles = [
    { top: '250px', left: '30px' },
    { top: '350px', left: '170px' },
    { top: '250px', left: '320px' },
    { top: '200px', left: '510px' },
    { top: '300px', left: '720px' },
    { top: '250px', left: '850px' },
  ];

  const navigate = useNavigate();
  const { isPopupOpen, setPopupOpen } = usePopupStore();
  const { setQuizIndex, setQuizTitle, setQuizCategory } = useQuizTitleStore();
  const completedMountains = useUserProgressStore((state) => state.completedMountains);

  const handleMailIconClick = () => {
    setPopupOpen(true);
  };

  const sanitizeHtml = (html: string) => ({
    __html: DOMPurify.sanitize(html),
  });

  return (
    <>
      <div
        className={clsx('relative min-h-screen w-screen', { 'blur-sm': isPopupOpen })}
        style={{ backgroundImage: `url(${backgroundMenu})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
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
          <button
            key={index}
            className={clsx('text-accent-blue font-white-on-black text-2xl block mb-4 whitespace-nowrap text-center', {
              'opacity-50 cursor-not-allowed': completedMountains.includes(item.title),
            })}
            style={{
              position: 'absolute',
              top: mountainStyles[index].top,
              left: mountainStyles[index].left,
            }}
            dangerouslySetInnerHTML={sanitizeHtml(
              `<span class="text-white font-almaq text-lg uppercase">Mont</span> <br />${item.titleHTML}`
            )}
            disabled={completedMountains.includes(item.title)}
            onClick={() => {
              setQuizIndex(index);
              setQuizTitle(item.title);
              setQuizCategory(item.category);
              navigate(Routes.Quiz);
            }}
          />
        ))}
      </div>

      {isPopupOpen && (
        <Popup>
          <Form />
        </Popup>
      )}

      <Footer />
    </>
  );
};

export default Menu;
