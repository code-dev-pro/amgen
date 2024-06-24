import { STORAGE_KEYS } from './storageKeys';

interface QuizAnswer {
  quizzTitle: string;
  answers: {
    question: string;
    selectedAnswers: string[];
  }[];
}

export const initializeQuizAnswers = (): QuizAnswer[] => {
  const storedData = localStorage.getItem(STORAGE_KEYS.QUIZ_ANSWERS);
  if (storedData) {
    return JSON.parse(storedData);
  }
  return [];
};

export const saveQuizAnswer = (quizzTitle: string, answer: { question: string; selectedAnswers: string[] }) => {
  if (answer.selectedAnswers.length === 0) return;

  const quizAnswers = initializeQuizAnswers();
  const existingAnswerIndex = quizAnswers.findIndex((resp) => resp.quizzTitle === quizzTitle);

  if (existingAnswerIndex !== -1) {
    quizAnswers[existingAnswerIndex].answers.push(answer);
  } else {
    quizAnswers.push({
      quizzTitle,
      answers: [answer],
    });
  }

  localStorage.setItem(STORAGE_KEYS.QUIZ_ANSWERS, JSON.stringify(quizAnswers));
};
