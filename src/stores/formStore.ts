import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';

export interface FormData {
  contentPreference: string;
  firstName: string;
  lastName: string;
  postalCode: string;
  job: string;
  email: string;
  rpps: string;
  address: string;
  city: string;
  phone: string;
}

interface FormStore {
  formDataList: FormData[];
  addFormData: (data: FormData) => void;
}

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      formDataList: [],
      addFormData: (data) => set((state) => ({ formDataList: [...state.formDataList, data] })),
    }),
    {
      name: 'form-data-storage',
      storage: createJSONStorage(() => storage),
    }
  )
);
