import { ValidateButton } from './buttons/ValidateButton';
import { LearnMoreButton } from './buttons/LearnMoreButton';
import { useQuizStore } from '../stores/quizStore';
import { useQuizNavigation } from '../hooks/useQuizNavigation';

interface quizNavigationProps {
  onLearnMoreClick: () => void;
}

export const QuizNavigation = ({ onLearnMoreClick }: quizNavigationProps) => {
  const { isAnswerShown, selectedAnswers, questions, currentQuestionIndex } = useQuizStore();
  const { handleValidateClick, handleNextClick } = useQuizNavigation();

  const currentQuestion = questions[currentQuestionIndex];
  const hasFeedback = currentQuestion.feedbackText || currentQuestion.feedbackImage;

  const isValidateButtonDisabled = selectedAnswers.length === 0;

  return (
    <div className="text-center mt-2">
      {isAnswerShown ? (
        <>
          {hasFeedback && <LearnMoreButton handleLearnMoreClick={onLearnMoreClick} />}
          <div className="mt-2">
            <ValidateButton text="Suivant" fontSize="text-4xl" onClick={handleNextClick} />
          </div>
        </>
      ) : (
        <ValidateButton
          text="Valider"
          fontSize="text-4xl"
          onClick={handleValidateClick}
          isDisabled={isValidateButtonDisabled}
        />
      )}
    </div>
  );
};
