import { useMutation } from '@tanstack/react-query';
import { useQuizStore } from '../stores/quizStore';
import { useQuizDataStore } from '../stores/dataStore';
import type { QuizAnswer } from '../types';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
const API_ENDPOINT = `${apiUrl}/api/amgen/tracking/store`;

async function submitAnswers(answers: QuizAnswer[]) {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(answers),
  });
  if (!response.ok) {
    throw new Error('Failed to submit answers');
  }
  return response.json();
}

export function useSubmitAnswers() {
  const { quizData } = useQuizDataStore();
  const { clearQuizAnswers } = useQuizStore();

  return useMutation({
    mutationFn: (answers: QuizAnswer[]) => {
      if (quizData?.published === 1) {
        return submitAnswers(answers);
      } else {
        console.log('Dev mode: answers not submitted', answers);
        return Promise.resolve({ message: 'Dev mode: answers not submitted' });
      }
    },
    onSuccess: () => {
      if (quizData?.published === 1) clearQuizAnswers();
    },
    onError: (error) => console.error('Failed to submit answers:', error),
  });
}
