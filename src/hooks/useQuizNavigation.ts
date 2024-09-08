import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../stores/quizStore';
import { useQuizDataStore } from '../stores/dataStore';
import { useSubmitAnswers } from './useSubmitAnswers';
import { shuffleArray, transformQuizData } from '../utils/helpers';
import { Routes } from '../utils/routes';
import { MAX_QUESTIONS, STORAGE_KEYS, SURPRISE_EXPLORATION } from '../utils/variables';
import type { QuizAnswer, Theme } from '../types';

export const useQuizNavigation = () => {
  const navigate = useNavigate();
  const { mutate: submitAnswers, isPending: isSubmitting } = useSubmitAnswers();
  const { quizData } = useQuizDataStore();
  const {
    quizAnswers,
    questions,
    currentQuestionIndex,
    selectedAnswers,
    setQuizIndex,
    setQuizTitle,
    setQuizCategory,
    setQuizQuestions,
    addQuizAnswer,
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

  const processCurrentAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (!quizData) {
      console.error('Quiz data is null');
      return null;
    }

    const currentTheme = quizData.themes.find((theme) => theme.questions.some((q) => q.id === currentQuestion.id));

    if (!currentTheme) {
      console.error('Current theme not found');
      return null;
    }

    const transformedAnswer = transformQuizData(currentQuestion, selectedAnswers, quizData, currentTheme.id);
    addQuizAnswer(transformedAnswer);

    return transformedAnswer;
  };

  const finishQuiz = (lastAnswer: QuizAnswer) => {
    completeQuiz();
    const allAnswers = [...quizAnswers, lastAnswer];
    if (navigator.onLine) {
      submitAnswers(allAnswers);
    } else {
      localStorage.setItem(STORAGE_KEYS.QUIZ_ANSWERS, JSON.stringify(allAnswers));
    }
  };

  const handleNextClick = () => {
    const transformedAnswer = processCurrentAnswer();
    if (!transformedAnswer) return;

    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion();
    } else {
      finishQuiz(transformedAnswer);
    }
  };

  const handleTimerComplete = () => {
    const transformedAnswer = processCurrentAnswer();
    if (transformedAnswer) {
      finishQuiz(transformedAnswer);
    }
  };

  return { handleMountainClick, handleNextClick, handleTimerComplete, isSubmitting };
};
