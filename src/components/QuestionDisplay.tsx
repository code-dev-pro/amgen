import { CustomCheckbox } from './Checkbox';
import { useQuizStore } from '../stores/quizStore';
import { sanitize } from '../utils/helpers';
import { Proposition } from '../types';

export const QuestionDisplay: React.FC = () => {
  const { questions, currentQuestionIndex, selectedAnswers, isAnswerShown, selectAnswer } = useQuizStore();
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerChange = (proposition: Proposition, isChecked: boolean) => {
    selectAnswer(proposition, isChecked, currentQuestion.type === 'QCU');
  };

  const isAnswerSelected = (propositionId: number) => {
    return selectedAnswers.some((answer) => answer.id === propositionId);
  };

  if (!currentQuestion) return null;

  return (
    <div className="bg-accent-blue bg-opacity-25 px-8 py-6">
      <p className="text-xl font-bold" dangerouslySetInnerHTML={sanitize(currentQuestion.libelle)} />
      <ul className="text-lg pl-8 mt-4 space-y-4">
        {currentQuestion.propositions.map((proposition) => (
          <li key={proposition.id} className="flex items-center">
            <CustomCheckbox
              id={proposition.id}
              label={proposition.libelle}
              checked={isAnswerSelected(proposition.id)}
              onChange={(isChecked) => handleAnswerChange(proposition, isChecked)}
              size="sm"
              fontSize="text-sm"
              shape={currentQuestion.type === 'QCU' ? 'round' : 'square'}
              labelColor="white"
              isAnswerShown={isAnswerShown}
              isCorrectAnswer={proposition.isGood === 1}
              isCorrectAnswerSelected={isAnswerShown && isAnswerSelected(proposition.id) && proposition.isGood === 1}
              isIncorrectAnswerSelected={isAnswerShown && isAnswerSelected(proposition.id) && proposition.isGood === 0}
              disabled={isAnswerShown}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
