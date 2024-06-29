import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useQuizTitleStore } from '../hooks/useQuizTitleStore';
import { usePopupStore } from '../hooks/usePopupStore';
import { Footer } from '../components/Footer';
import { Timer } from '../components/Timer';
import { ValidateButton } from '../components/buttons/ValidateButton';
import { LearnMoreButton } from '../components/buttons/LearnMoreButton';
import { CustomCheckbox } from '../components/Checkbox';
import { QuizCompletion } from '../components/QuizCompletion';
import { Header } from '../components/Header';
import { Popup } from '../components/popup/Popup';
import { Form } from '../components/popup/Form';
import { PlainText } from '../components/popup/PlainText';
import { ZoomableImage } from '../components/popup/ZoomableImage';
import { MountainPath } from '../components/progressTracker/MountainPath';
import { saveQuizAnswer } from '../utils/helpers';
import { data } from '../data';

import leftMountain from '../assets/images/montagne_autres.png';
import rightMountain from '../assets/images/montagne-seule.png';

const Quiz = () => {
  const { isPopupOpen } = usePopupStore();
  const { quizTitle } = useQuizTitleStore();
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [questions, setQuestions] = useState([
    {
      question: 'Question ?',
      options: ['Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
      correctAnswer: ['Réponse 1', 'Réponse 3'],
      learnMore: {
        text: '',
        imageURL: '',
        imageAlt: '',
      },
    },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [popupContent, setPopupContent] = useState<'learnMore' | 'completionContent'>('learnMore');

  useEffect(() => {
    const categoryData = data.find((item) => item.title === quizTitle);
    if (categoryData && categoryData.quiz) {
      const shuffledQuestions = categoryData.quiz.sort(() => 0.5 - Math.random()).slice(0, 10);
      setQuestions(shuffledQuestions);
    }
  }, [quizTitle]);

  const handleAnswerChange = (answer: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedAnswers([...selectedAnswers, answer]);
    } else {
      setSelectedAnswers(selectedAnswers.filter((a) => a !== answer));
    }
  };

  const handleValidateClick = () => {
    setIsAnswerShown(true);
  };

  const handleNextClick = () => {
    setIsAnswerShown(false);
    const answer = {
      question: currentQuestion.question,
      selectedAnswers,
    };
    saveQuizAnswer(quizTitle, answer);

    setSelectedAnswers([]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleTimerComplete = () => {
    saveQuizAnswer(quizTitle, {
      question: currentQuestion.question,
      selectedAnswers,
    });
    setQuizCompleted(true);
  };

  const currentQuestion = questions[currentQuestionIndex];

  const setCompletionContentPopup = () => {
    setPopupContent('completionContent');
  };

  const isValidateButtonDisabled = selectedAnswers.length === 0;

  return (
    <>
      <div className={clsx('relative min-h-screen w-screen z-0', { 'blur-sm': isPopupOpen })}>
        <img src={leftMountain} alt="background" className="absolute top-0 -left-[70px] w-[900px] h-auto" />
        <img src={rightMountain} alt="background" className="absolute top-0 right-0 w-[410px] h-auto" />

        <div className="absolute top-0 right-0">
          <MountainPath numQuestions={questions.length} currentQuestionIndex={currentQuestionIndex} />
        </div>

        <Header />

        <div className="flex justify-center items-center px-8 mt-4">
          <Timer
            onComplete={handleTimerComplete}
            isPaused={isPopupOpen && popupContent === 'learnMore'}
            isFinished={quizCompleted}
          />
        </div>

        {quizCompleted ? (
          <QuizCompletion setCompletionContentPopup={setCompletionContentPopup} mountainName={quizTitle} />
        ) : (
          <div className="absolute top-[33%] left-0 w-full px-8">
            <div className="bg-accent-blue bg-opacity-25 px-10 py-6">
              <p className="text-3xl font-bold">{currentQuestion.question}</p>

              <ul className="text-lg pl-8 mt-4 space-y-4">
                {currentQuestion?.options.map((option, optionIndex) => (
                  <li key={optionIndex} className="flex items-center space-x-2">
                    <CustomCheckbox
                      id={`question-${currentQuestionIndex}-option-${optionIndex}`}
                      label={option}
                      checked={selectedAnswers.includes(option)}
                      onChange={(isChecked) => handleAnswerChange(option, isChecked)}
                      size="sm"
                      fontSize="text-lg"
                      shape="square"
                      labelColor="white"
                      isAnswerShown={isAnswerShown}
                      isCorrectAnswer={currentQuestion.correctAnswer.includes(option)}
                      isCorrectAnswerSelected={
                        isAnswerShown &&
                        selectedAnswers.includes(option) &&
                        currentQuestion.correctAnswer.includes(option)
                      }
                      isIncorrectAnswerSelected={
                        isAnswerShown &&
                        selectedAnswers.includes(option) &&
                        !currentQuestion.correctAnswer.includes(option)
                      }
                      disabled={isAnswerShown}
                    />
                  </li>
                ))}
              </ul>
            </div>
            {isAnswerShown ? (
              <>
                <div className="text-center mt-6">
                  <LearnMoreButton />
                </div>
                <div className="text-center mt-6">
                  <ValidateButton text="Suivant" fontSize="text-4xl" onClick={handleNextClick} />
                </div>
              </>
            ) : (
              <div className="text-center mt-6">
                <ValidateButton
                  text="Valider"
                  fontSize="text-4xl"
                  onClick={handleValidateClick}
                  isDisabled={isValidateButtonDisabled}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {isPopupOpen && (
        <Popup>
          {popupContent === 'learnMore' ? (
            <>
              {currentQuestion.learnMore.text !== '' ? (
                <PlainText text={currentQuestion.learnMore.text} />
              ) : (
                <ZoomableImage
                  imageUrl={currentQuestion.learnMore.imageURL}
                  imageAlt={currentQuestion.learnMore.imageAlt}
                />
              )}
            </>
          ) : (
            <Form />
          )}
        </Popup>
      )}

      <Footer />
    </>
  );
};

export default Quiz;
