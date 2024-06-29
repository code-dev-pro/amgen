import { useQuizStore } from '../stores/quizStore';
import { saveQuizAnswer } from '../utils/helpers';

export const useQuizNavigation = () => {
  const { quizTitle, questions, currentQuestionIndex, selectedAnswers, showAnswer, nextQuestion, completeQuiz } =
    useQuizStore();

  const handleValidateClick = () => {
    showAnswer();
  };

  const handleNextClick = () => {
    const currentQuestion = questions[currentQuestionIndex];
    saveQuizAnswer(quizTitle, {
      question: currentQuestion.question,
      selectedAnswers,
    });

    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion();
    } else {
      completeQuiz();
    }
  };

  return { handleValidateClick, handleNextClick };
};
