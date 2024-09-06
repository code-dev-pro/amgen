import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../stores/quizStore';
import { useQuizDataStore } from '../stores/dataStore';
import { saveQuizAnswer, shuffleArray } from '../utils/helpers';
import { Routes } from '../utils/routes';
import { MAX_QUESTIONS, SURPRISE_EXPLORATION } from '../utils/variables';
import type { Theme } from '../types';

export const useQuizNavigation = () => {
  const navigate = useNavigate();
  const { quizData } = useQuizDataStore();
  const {
    quizTitle,
    questions,
    currentQuestionIndex,
    selectedAnswers,
    setQuizIndex,
    setQuizTitle,
    setQuizCategory,
    setQuizQuestions,
    showAnswer,
    nextQuestion,
    completeQuiz,
    resetQuiz,
  } = useQuizStore();

  const handleMountainClick = useCallback(
    (index: number, item: Theme) => {
      resetQuiz();

      if (item.label === SURPRISE_EXPLORATION) {
        setQuizTitle(SURPRISE_EXPLORATION);

        if (!quizData?.themes) return;
        const allQuestions = quizData.themes.flatMap((theme) => theme.questions);

        const selectedQuestions = shuffleArray(allQuestions).slice(0, 5);

        setQuizQuestions(selectedQuestions);
        setQuizCategory(SURPRISE_EXPLORATION);
      } else {
        setQuizIndex(index);
        setQuizTitle(item.label);
        setQuizCategory(item.description);

        const shuffledQuestions = shuffleArray(item.questions);
        const selectedQuestions = shuffledQuestions.slice(0, MAX_QUESTIONS);

        setQuizQuestions(selectedQuestions);
      }

      navigate(Routes.Quiz);
    },
    [resetQuiz, quizData, setQuizIndex, setQuizTitle, setQuizCategory, setQuizQuestions, navigate]
  );

  const handleValidateClick = () => {
    showAnswer();
  };

  const handleNextClick = () => {
    const currentQuestion = questions[currentQuestionIndex];
    saveQuizAnswer(quizTitle, currentQuestion, selectedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion();
    } else {
      completeQuiz();
    }
  };

  return { handleMountainClick, handleValidateClick, handleNextClick };
};
