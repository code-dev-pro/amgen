import { create } from 'zustand';
import { ReactNode } from 'react';

type PopupType = 'form' | 'learnMore' | null;

interface PopupState {
  isPopupOpen: boolean;
  popupType: PopupType;
  popupContent: ReactNode | null;
  openPopup: (type: PopupType, content: ReactNode) => void;
  closePopup: () => void;
}

export const usePopupStore = create<PopupState>()((set) => ({
  isPopupOpen: false,
  popupType: null,
  popupContent: null,
  openPopup: (type, content) => set({ isPopupOpen: true, popupType: type, popupContent: content }),
  closePopup: () => set({ isPopupOpen: false, popupType: null, popupContent: null }),
}));
