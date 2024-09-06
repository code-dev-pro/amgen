import DOMPurify from 'dompurify';
import { STORAGE_KEYS } from './variables';
import type { Proposition, Question } from '../types';

/**************************************************************************
random helpers
******************************************************************************/
export const sanitize = (html: string) => {
  return {
    __html: DOMPurify.sanitize(html),
  };
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**************************************************************************
  Quiz answers
******************************************************************************/

export interface QuizAnswer {
  question: string;
  selectedAnswers: Proposition[];
}

export interface QuizResult {
  quizTitle: string;
  answers: QuizAnswer[];
}

// Initialize quiz answers from local storage
export const initializeQuizAnswers = (): QuizAnswer[] => {
  const storedData = localStorage.getItem(STORAGE_KEYS.QUIZ_ANSWERS);
  if (storedData) {
    return JSON.parse(storedData);
  }
  return [];
};

export const saveQuizAnswer = (quizTitle: string, currentQuestion: Question, selectedAnswers: Proposition[]) => {
  const quizAnswers: QuizResult[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_ANSWERS) || '[]');

  const answer: QuizAnswer = {
    question: currentQuestion.libelle,
    selectedAnswers: selectedAnswers,
  };

  const existingQuizIndex = quizAnswers.findIndex((quiz) => quiz.quizTitle === quizTitle);

  if (existingQuizIndex !== -1) {
    quizAnswers[existingQuizIndex].answers.push(answer);
  } else {
    quizAnswers.push({
      quizTitle,
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

/**************************************************************************
  Mountain button position adjustment
******************************************************************************/

export const adjustPosition = (position: string, aspectRatio: '16:9' | '4:3', isHorizontal: boolean) => {
  if (aspectRatio === '4:3') return position;

  const numericPosition = parseFloat(position);

  if (isHorizontal) {
    if (numericPosition < 40) {
      return `calc(${position} + ${(50 - numericPosition) * 0.3}%)`;
    } else if (numericPosition > 50 && numericPosition < 70) {
      return `calc(${position} - ${(numericPosition - 50) * 0.15}%)`;
    } else if (numericPosition > 70) {
      return `calc(${position} - ${(numericPosition - 50) * 0.3}%)`;
    }
  } else {
    return `calc(${position} - 1%)`;
  }

  return position;
};
