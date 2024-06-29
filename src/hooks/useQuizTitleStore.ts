import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface QuizTitleState {
  quizIndex: number;
  quizTitle: string;
  quizCategory: string;
  setQuizIndex: (quizIndex: number) => void;
  setQuizTitle: (quizTitle: string) => void;
  setQuizCategory: (quizCategory: string) => void;
}

export const useQuizTitleStore = create<QuizTitleState>()(
  persist(
    (set) => ({
      quizIndex: 0,
      quizTitle: '',
      quizCategory: '',
      setQuizIndex: (quizIndex) => set({ quizIndex }),
      setQuizTitle: (quizTitle: string) => set({ quizTitle }),
      setQuizCategory: (quizCategory: string) => set({ quizCategory }),
    }),
    { name: 'quizTitle' }
  )
);
