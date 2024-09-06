import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Themes } from '../types';

interface QuizDataState {
  quizData: Themes | null;
  isDataLoaded: boolean;
  setQuizData: (data: Themes) => void;
  setIsDataLoaded: (loaded: boolean) => void;
}

export const useQuizDataStore = create<QuizDataState>()(
  persist(
    (set) => ({
      quizData: null,
      isDataLoaded: false,
      setQuizData: (data) => set({ quizData: data, isDataLoaded: true }),
      setIsDataLoaded: (loaded) => set({ isDataLoaded: loaded }),
    }),
    {
      name: 'quiz-data-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
