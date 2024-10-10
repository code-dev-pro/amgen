import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchData, fetchDataWithId } from '../utils/helpers';
import type { Themes } from '../types';

type QuizMode = string | null;
type ContId = string | null;

const fetchQuizData = async (mode: QuizMode, contid: ContId): Promise<Themes> => {
  if (mode && mode !== 'preview' && !contid) {
    throw new Error("L'url est incorrect pour le mode preview.");
  }

  if (mode === 'preview' && contid) {
    return await fetchDataWithId(contid);
  }
  return await fetchData();
};

export const useQuizData = (mode: QuizMode, contid: ContId): UseQueryResult<Themes, Error> => {
  return useQuery({
    queryKey: ['quizData', contid],
    queryFn: () => fetchQuizData(mode, contid),
    enabled: navigator.onLine,
    staleTime: 1000 * 60 * 5,
    gcTime: Infinity,
  });
};
