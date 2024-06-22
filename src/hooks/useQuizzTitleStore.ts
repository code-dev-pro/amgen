import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface QuizzTitleState {
  quizzTitle: string;
  quizzCategory: string;
  setQuizzTitle: (quizzTitle: string) => void;
  setQuizzCategory: (quizzCategory: string) => void;
}

export const useQuizzTitleStore = create<QuizzTitleState>()(
  persist(
    (set) => ({
      quizzTitle: '',
      quizzCategory: '',
      setQuizzTitle: (quizzTitle: string) => set({ quizzTitle }),
      setQuizzCategory: (quizzCategory: string) => set({ quizzCategory }),
    }),
    { name: 'quizzTitle' }
  )
);
