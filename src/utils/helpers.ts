import { STORAGE_KEYS } from './variables';

/**************************************************************************
  Quiz answers
******************************************************************************/

interface QuizAnswer {
  quizzTitle: string;
  answers: {
    question: string;
    selectedAnswers: string[];
  }[];
}

// Initialize quiz answers from local storage
export const initializeQuizAnswers = (): QuizAnswer[] => {
  const storedData = localStorage.getItem(STORAGE_KEYS.QUIZ_ANSWERS);
  if (storedData) {
    return JSON.parse(storedData);
  }
  return [];
};

// Save quiz answers to local storage
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

/************************************************************************
 Progress tracker animation
 ******************************************************************************/

interface Checkpoint {
  cx: number;
  cy: number;
  isIntermediate: boolean;
}

export const calculateCheckpoints = (predefinedCheckpoints: Checkpoint[], numQuestions: number): Checkpoint[] => {
  const totalCheckpoints = predefinedCheckpoints.length;
  const nonIntermediateIndices = [0, totalCheckpoints - 1];

  if (numQuestions > 2) {
    const step = (totalCheckpoints - 1) / (numQuestions - 1);
    for (let i = 1; i < numQuestions - 1; i++) {
      nonIntermediateIndices.push(Math.round(i * step));
    }
  } else if (numQuestions === 2) {
    nonIntermediateIndices.push(Math.floor((totalCheckpoints - 1) / 2));
  }

  const uniqueNonIntermediateIndices = [...new Set(nonIntermediateIndices)].sort((a, b) => a - b);

  return predefinedCheckpoints.map((checkpoint, index) => ({
    ...checkpoint,
    isIntermediate: !uniqueNonIntermediateIndices.includes(index) || index === 0,
  }));
};

export const calculateBlackSegments = (checkpoints: Checkpoint[], currentQuestionIndex: number): number[] => {
  const blackSegments: number[] = [];
  const nonIntermediateIndices = [
    0,
    ...checkpoints
      .slice(1)
      .map((checkpoint, index) => (!checkpoint.isIntermediate ? index + 1 : -1))
      .filter((index) => index !== -1),
  ];

  for (let i = 0; i < currentQuestionIndex; i++) {
    const startIndex = nonIntermediateIndices[i];
    const endIndex = nonIntermediateIndices[i + 1];
    for (let j = startIndex; j < endIndex; j++) {
      blackSegments.push(j);
    }
  }
  return blackSegments;
};

export const calculateDelay = (index: number, currentQuestionIndex: number, checkpoints: Checkpoint[]): number => {
  const nonIntermediateIndices = [
    0,
    ...checkpoints
      .slice(1)
      .map((checkpoint, i) => (!checkpoint.isIntermediate ? i + 1 : -1))
      .filter((i) => i !== -1),
  ];

  const previousNonIntermediateIndex = nonIntermediateIndices[currentQuestionIndex - 1] || 0;
  return (index - previousNonIntermediateIndex) * 0.5;
};
