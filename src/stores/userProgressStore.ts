import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProgressState {
  completedMountains: string[];
  markMountainAsCompleted: (mountain: string) => void;
  resetProgress: () => void;
}

export const useUserProgressStore = create<UserProgressState>()(
  persist(
    (set) => ({
      completedMountains: [],
      markMountainAsCompleted: (mountain) =>
        set((state) => ({
          completedMountains: [...state.completedMountains, mountain],
        })),
      resetProgress: () =>
        set({
          completedMountains: [],
        }),
    }),
    {
      name: 'user-progress',
    }
  )
);
