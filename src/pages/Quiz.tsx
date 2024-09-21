import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../stores/quizStore';
import { PopupType, usePopupStore } from '../stores/popupStore';
import { useUserProgressStore } from '../stores/userProgressStore';
import { Header } from '../components/Header';
import { MountainPath } from '../components/progressTracker/MountainPath';
import { Timer } from '../components/Timer';
import { QuestionDisplay } from '../components/QuestionDisplay';
import { QuizNavigation } from '../components/QuizNavigation';
import { Footer } from '../components/Footer';
import { QuizCompletion } from '../components/QuizCompletion';
import { Popup } from '../components/popup/Popup';
import { Modal } from '../components/Modal';
import { Routes } from '../utils/routes';
import { sanitize } from '../utils/helpers';
import { useQuizNavigation } from '../hooks/useQuizNavigation';

const Quiz = () => {
  const navigate = useNavigate();
  const { resetProgress } = useUserProgressStore();
  const { isPopupOpen, openPopup } = usePopupStore();
  const { isSubmitting, handleTimerComplete } = useQuizNavigation();
  const { quizTitle, questions, currentQuestionIndex, isQuizCompleted, isAnswerShown } = useQuizStore();

  const [isModalOpen, setModalOpen] = useState(false);

  const handleLearnMoreClick = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    const hasValidText = currentQuestion.feedbackText && currentQuestion.feedbackText.trim() !== '';
    const hasValidImage = currentQuestion.feedbackImage && currentQuestion.feedbackImage.trim() !== '';
    if (hasValidText) {
      openPopup({ type: PopupType.Text, text: currentQuestion.feedbackText ?? '' });
    }
    if (hasValidImage) {
      openPopup({ type: PopupType.Image, imageUrl: currentQuestion.feedbackImage, imageAlt: 'Feedback Image' });
    }
  };

  const onCancel = () => {
    setModalOpen(false);
  };

  const onConfirm = () => {
    resetProgress();
    setModalOpen(false);
    navigate(Routes.Home);
  };

  return (
    <>
      <div className={clsx('relative min-h-dvh w-screen z-0', { 'blur-sm': isPopupOpen })}>
        <Header onClick={() => setModalOpen(true)} />
        <div className="absolute top-0 right-0">
          <MountainPath numQuestions={questions.length} currentQuestionIndex={currentQuestionIndex} />
        </div>
        <div className="flex justify-center items-center px-8">
          <Timer
            onComplete={handleTimerComplete}
            isPaused={isPopupOpen || isSubmitting || isAnswerShown}
            isFinished={isQuizCompleted}
          />
        </div>
        <div className="absolute top-[260px] left-0 w-full px-8">
          {isQuizCompleted ? (
            <QuizCompletion mountainName={quizTitle} onStopClick={() => setModalOpen(true)} />
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

      {isPopupOpen && <Popup />}

      <Modal
        isOpen={isModalOpen}
        onCancel={onCancel}
        onConfirm={onConfirm}
        title="Êtes-vous sûr de vouloir arrêter le quiz ?"
        confirmText="Oui, arrêter"
      />
    </>
  );
};

export default Quiz;
