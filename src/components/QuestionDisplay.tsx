import { CustomCheckbox } from './Checkbox';
import { useQuizStore } from '../stores/quizStore';
import { sanitize } from '../utils/helpers';

export const QuestionDisplay = () => {
  const { questions, currentQuestionIndex, selectedAnswers, isAnswerShown, selectAnswer } = useQuizStore();
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-accent-blue bg-opacity-25 px-10 py-6">
      <p className="text-3xl font-bold" dangerouslySetInnerHTML={sanitize(currentQuestion?.libelle)} />
      <ul className="text-lg pl-8 mt-4 space-y-4">
        {currentQuestion?.propositions.map((proposition) => (
          <li key={proposition.id} className="flex items-center space-x-2">
            <CustomCheckbox
              id={proposition.id}
              label={<span dangerouslySetInnerHTML={sanitize(proposition.libelle)} />}
              checked={selectedAnswers.some((answer) => answer.id === proposition.id)}
              onChange={(isChecked) => selectAnswer(proposition, isChecked)}
              size="sm"
              fontSize="text-lg"
              shape="square"
              labelColor="white"
              isAnswerShown={isAnswerShown}
              isCorrectAnswer={proposition.isGood === 1}
              isCorrectAnswerSelected={
                isAnswerShown &&
                selectedAnswers.some((answer) => answer.id === proposition.id && proposition.isGood === 1)
              }
              isIncorrectAnswerSelected={
                isAnswerShown &&
                selectedAnswers.some((answer) => answer.id === proposition.id && proposition.isGood === 0)
              }
              disabled={isAnswerShown}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
