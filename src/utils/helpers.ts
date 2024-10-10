import DOMPurify from 'dompurify';
import type { Proposition, Question, QuizAnswer, Themes } from '../types';

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
  Fetch data
******************************************************************************/

export const fetchData = async (): Promise<Themes> => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const response = await fetch(`${apiUrl}/api/amgen/getConteneur`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const fetchDataWithId = async (id: string): Promise<Themes> => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const response = await fetch(`${apiUrl}/api/amgen/getConteneur/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data with ID');
  }

  return response.json();
};

/**************************************************************************
  Submit answers
******************************************************************************/
export const transformQuizData = (
  question: Question,
  selectedAnswers: Proposition[],
  quizData: Themes,
  themeId: number
): QuizAnswer => {
  const correctPropositions = question.propositions.filter((prop) => prop.isGood === 1);

  const allGoodSelected =
    selectedAnswers.length === correctPropositions.length &&
    selectedAnswers.every((answer) => correctPropositions.some((prop) => prop.id === answer.id));

  return {
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    id: quizData.id,
    version: parseFloat(quizData.version),
    idTheme: themeId,
    idQuestion: question.id,
    success: allGoodSelected,
    propositions: question.propositions.map((prop) => ({
      id: prop.id,
      isCheck: selectedAnswers.some((answer) => answer.id === prop.id),
    })),
  };
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
export const adjustPosition = (position: string, aspectRatio: '16:9' | '4:3', isHorizontal: boolean): string => {
  if (aspectRatio === '4:3') return position;

  const numericPosition = parseFloat(position);

  if (isHorizontal) {
    if (numericPosition < 20) {
      return `calc(${position} + 5%)`;
    } else if (numericPosition < 40) {
      return `calc(${position} + 2%)`;
    } else if (numericPosition > 60) {
      return `calc(${position} - 0.5%)`;
    } else if (numericPosition > 80) {
      return `calc(${position} + 2%)`;
    }
  } else {
    return `calc(${position} - 2%)`;
  }

  return position;
};
