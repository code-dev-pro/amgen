import { CustomCheckbox } from './Checkbox';
import { useQuizStore } from '../stores/quizStore';

export const QuestionDisplay = () => {
  const { questions, currentQuestionIndex, selectedAnswers, isAnswerShown, selectAnswer } = useQuizStore();
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-accent-blue bg-opacity-25 px-10 py-6">
      <p className="text-3xl font-bold">{currentQuestion?.question}</p>
      <ul className="text-lg pl-8 mt-4 space-y-4">
        {currentQuestion?.options.map((option, optionIndex) => (
          <li key={optionIndex} className="flex items-center space-x-2">
            <CustomCheckbox
              id={`question-${currentQuestionIndex}-option-${optionIndex}`}
              label={option}
              checked={selectedAnswers.includes(option)}
              onChange={(isChecked) => selectAnswer(option, isChecked)}
              size="sm"
              fontSize="text-lg"
              shape="square"
              labelColor="white"
              isAnswerShown={isAnswerShown}
              isCorrectAnswer={currentQuestion.correctAnswer.includes(option)}
              isCorrectAnswerSelected={
                isAnswerShown && selectedAnswers.includes(option) && currentQuestion.correctAnswer.includes(option)
              }
              isIncorrectAnswerSelected={
                isAnswerShown && selectedAnswers.includes(option) && !currentQuestion.correctAnswer.includes(option)
              }
              disabled={isAnswerShown}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
