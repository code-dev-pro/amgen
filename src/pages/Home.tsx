import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ExploreButton } from '../components/buttons/ExploreButton';
import { LongPressButton } from '../components/buttons/LongPressButton';
import { PinInput } from '../components/PinInput';
import { Footer } from '../components/Footer';
import { useIdleTimer } from '../hooks/useIdleTimer';
import { useQuizPreloader } from '../hooks/useQuizPreloader';
import { useSubmitAnswers } from '../hooks/useSubmitAnswers';
import { useCSVDownload } from '../hooks/useCSVDownload';
import { useQuizDataStore } from '../stores/dataStore';
import { useQuizStore } from '../stores/quizStore';
import { Routes } from '../utils/routes';
import { STORAGE_KEYS } from '../utils/variables';

import backgroundImage from '/images/fond_accueil.jpg';
import logo from '/images/logo.svg';
import { useQuizData } from '../hooks/useQuizData';

const Home = () => {
  const { resetTimer } = useIdleTimer();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { quizData, setQuizData, isDataLoaded } = useQuizDataStore();
  const { mutate: submitAnswers } = useSubmitAnswers();
  const { resetQuiz } = useQuizStore();
  const { handleLongPress, showPinInput, handlePinSubmit, handlePinCancel } = useCSVDownload();

  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get('mode');
  const contid = queryParams.get('contid');

  const { isLoading, error, data } = useQuizData(mode, contid);

  useQuizPreloader(data);

  const checkAndSubmitStoredAnswers = useCallback(() => {
    const storedAnswers = localStorage.getItem(STORAGE_KEYS.QUIZ_ANSWERS);
    if (storedAnswers) {
      const parsedAnswers = JSON.parse(storedAnswers);
      submitAnswers(parsedAnswers);
      localStorage.removeItem(STORAGE_KEYS.QUIZ_ANSWERS);
    }
  }, [submitAnswers]);

  useEffect(() => {
    if (data && (!quizData || quizData.version !== data.version)) {
      setQuizData(data);
    }
  }, [data, quizData, setQuizData]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      checkAndSubmitStoredAnswers();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [checkAndSubmitStoredAnswers]);

  const handleExploreButtonClick = () => {
    resetTimer();
    resetQuiz();
    navigate(Routes.Menu);
  };

  const renderExploreButton = () => {
    if (isLoading) return <p>Chargement des données...</p>;
    if (!isOnline && !isDataLoaded) return <p>Merci de vous connecter à Internet pour accéder au quiz.</p>;
    if (error) return <p>Une erreur est survenue : {error.message}</p>;
    return <ExploreButton onClick={handleExploreButtonClick} />;
  };

  return (
    <div className="relative min-h-dvh w-screen">
      <img src={backgroundImage} alt="Montagne" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute top-12 right-12">
        <LongPressButton onLongPress={handleLongPress} className="focus:outline-none">
          <img src={logo} alt="Logo" width={546} height={213} className="select-none" />
        </LongPressButton>
      </div>
      {showPinInput && <PinInput onSubmit={handlePinSubmit} onCancel={handlePinCancel} />}
      <div className="absolute bottom-[291px] right-[86px]">{renderExploreButton()}</div>

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
