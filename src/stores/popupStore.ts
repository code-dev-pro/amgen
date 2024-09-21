import { create } from 'zustand';

export enum PopupType {
  Form = 'form',
  Text = 'text',
  Image = 'image',
}

type PopupContent =
  | { type: PopupType.Form }
  | { type: PopupType.Text; text: string }
  | { type: PopupType.Image; imageUrl: string; imageAlt: string };

interface PopupState {
  isPopupOpen: boolean;
  popupContent: PopupContent | null;
  openPopup: (content: PopupContent) => void;
  closePopup: () => void;
}

export const usePopupStore = create<PopupState>()((set) => ({
  isPopupOpen: false,
  popupContent: null,
  openPopup: (content) => set({ isPopupOpen: true, popupContent: content }),
  closePopup: () => set({ isPopupOpen: false, popupContent: null }),
}));
