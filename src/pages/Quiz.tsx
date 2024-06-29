import clsx from 'clsx';
import { useEffect } from 'react';
import { useQuizStore } from '../stores/quizStore';
import { usePopupStore } from '../stores/popupStore';
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

const Quiz = () => {
  const { quizTitle, questions, currentQuestionIndex, isQuizCompleted, loadQuestions, completeQuiz, resetQuiz } =
    useQuizStore();
  const { isPopupOpen, openPopup } = usePopupStore();

  useEffect(() => {
    resetQuiz();
    loadQuestions();
  }, [loadQuestions, resetQuiz]);

  const handleTimerComplete = () => {
    completeQuiz();
  };

  const handleLearnMoreClick = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const content =
      currentQuestion.learnMore.text !== '' ? (
        <PlainText text={currentQuestion.learnMore.text} />
      ) : (
        <ZoomableImage imageUrl={currentQuestion.learnMore.imageURL} imageAlt={currentQuestion.learnMore.imageAlt} />
      );
    openPopup('learnMore', content);
  };

  const handleCompletionContentClick = () => {
    openPopup('form', <Form />);
  };

  return (
    <>
      <div className={clsx('relative min-h-screen w-screen z-0', { 'blur-sm': isPopupOpen })}>
        <Header />
        <div className="absolute top-0 right-0">
          <MountainPath numQuestions={questions.length} currentQuestionIndex={currentQuestionIndex} />
        </div>
        <div className="flex justify-center items-center px-8 mt-4">
          <Timer onComplete={handleTimerComplete} isPaused={isPopupOpen} isFinished={isQuizCompleted} />
        </div>
        <div className="absolute top-[33%] left-0 w-full px-8">
          {isQuizCompleted ? (
            <QuizCompletion setCompletionContentPopup={handleCompletionContentClick} mountainName={quizTitle} />
          ) : (
            <>
              <QuestionDisplay />
              <QuizNavigation onLearnMoreClick={handleLearnMoreClick} />
            </>
          )}
        </div>
        <Footer />
      </div>

      {isPopupOpen && <Popup>{usePopupStore.getState().popupContent}</Popup>}
    </>
  );
};

export default Quiz;
