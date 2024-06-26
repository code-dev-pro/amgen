import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface QuizzTitleState {
  quizzIndex: number;
  quizzTitle: string;
  quizzCategory: string;
  setQuizzIndex: (quizzIndex: number) => void;
  setQuizzTitle: (quizzTitle: string) => void;
  setQuizzCategory: (quizzCategory: string) => void;
}

export const useQuizzTitleStore = create<QuizzTitleState>()(
  persist(
    (set) => ({
      quizzIndex: 0,
      quizzTitle: '',
      quizzCategory: '',
      setQuizzIndex: (quizzIndex) => set({ quizzIndex }),
      setQuizzTitle: (quizzTitle: string) => set({ quizzTitle }),
      setQuizzCategory: (quizzCategory: string) => set({ quizzCategory }),
    }),
    { name: 'quizzTitle' }
  )
);
