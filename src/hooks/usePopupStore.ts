import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PopupState {
  isPopupOpen: boolean;
  setPopupOpen: (isPopupOpen: boolean) => void;
}

export const usePopupStore = create<PopupState>()(
  persist(
    (set) => ({
      isPopupOpen: false,
      setPopupOpen: (isPopupOpen: boolean) => set({ isPopupOpen }),
    }),
    { name: 'popup' }
  )
);
