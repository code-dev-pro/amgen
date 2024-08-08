import { ValidateButton } from './buttons/ValidateButton';
import { LearnMoreButton } from './buttons/LearnMoreButton';
import { useQuizStore } from '../stores/quizStore';
import { useQuizNavigation } from '../hooks/useQuizNavigation';

interface QuizNavigationProps {
  onLearnMoreClick: () => void;
}

export const QuizNavigation = ({ onLearnMoreClick }: QuizNavigationProps) => {
  const { isAnswerShown, selectedAnswers } = useQuizStore();
  const { handleValidateClick, handleNextClick } = useQuizNavigation();

  const isValidateButtonDisabled = selectedAnswers.length === 0;

  return (
    <div className="text-center mt-2">
      {isAnswerShown ? (
        <>
          <LearnMoreButton handleLearnMoreClick={onLearnMoreClick} />
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
