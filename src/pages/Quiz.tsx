import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../stores/quizStore';
import { usePopupStore } from '../stores/popupStore';
import { useUserProgressStore } from '../stores/userProgressStore';
import { Header } from '../components/Header';
import { MountainPath } from '../components/progressTracker/MountainPath';
import { Timer } from '../components/Timer';
import { QuestionDisplay } from '../components/QuestionDisplay';
import { QuizNavigation } from '../components/QuizNavigation';
import { Footer } from '../components/Footer';
import { QuizCompletion } from '../components/QuizCompletion';
import { Popup } from '../components/popup/Popup';
import { Form } from '../components/popup/Form';
import { PlainText } from '../components/popup/PlainText';
import { ZoomableImage } from '../components/popup/ZoomableImage';
import { Modal } from '../components/Modal';
import { Routes } from '../utils/routes';
import { sanitize } from '../utils/helpers';

const Quiz = () => {
  const { quizTitle, questions, currentQuestionIndex, isQuizCompleted, completeQuiz } = useQuizStore();
  const { resetProgress } = useUserProgressStore();
  const { isPopupOpen, openPopup } = usePopupStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleTimerComplete = () => {
    completeQuiz();
  };

  const handleLearnMoreClick = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    const hasValidText = currentQuestion.feedbackText && currentQuestion.feedbackText.trim() !== '';
    const hasValidImage = currentQuestion.feedbackImage && currentQuestion.feedbackImage.trim() !== '';

    const content = hasValidText ? (
      <PlainText text={currentQuestion.feedbackText ?? ''} />
    ) : hasValidImage ? (
      <ZoomableImage imageUrl={currentQuestion.feedbackImage} imageAlt="image de feedback" />
    ) : null;

    if (content) openPopup('learnMore', content);
  };

  const handleCompletionContentClick = () => {
    openPopup('form', <Form />);
  };

  const handleStopClick = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleConfirm = () => {
    resetProgress();
    navigate(Routes.Home);
    setModalOpen(false);
  };

  return (
    <>
      <div className={clsx('relative min-h-screen w-screen z-0', { 'blur-sm': isPopupOpen })}>
        <Header onClick={() => handleStopClick()} />
        <div className="absolute top-0 right-0">
          <MountainPath numQuestions={questions.length} currentQuestionIndex={currentQuestionIndex} />
        </div>
        <div className="flex justify-center items-center px-8 mt-4">
          <Timer onComplete={handleTimerComplete} isPaused={isPopupOpen} isFinished={isQuizCompleted} />
        </div>
        <div className="absolute top-[33%] left-0 w-full px-8">
          {isQuizCompleted ? (
            <QuizCompletion
              setCompletionContentPopup={handleCompletionContentClick}
              mountainName={quizTitle}
              onStopClick={handleStopClick}
            />
          ) : (
            <>
              <QuestionDisplay />
              <QuizNavigation onLearnMoreClick={handleLearnMoreClick} />
            </>
          )}
        </div>

        <p
          className="absolute bottom-20 left-8 text-xs text-white"
          dangerouslySetInnerHTML={sanitize(questions[currentQuestionIndex].references)}
        />

        <Footer />
      </div>

      {isPopupOpen && <Popup>{usePopupStore.getState().popupContent}</Popup>}
      <Modal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Êtes-vous sûr de vouloir arrêter le quiz ?"
        confirmText="Oui, arrêter"
      />
    </>
  );
};

export default Quiz;
