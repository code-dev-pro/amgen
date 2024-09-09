import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';
import { STORAGE_KEYS } from '../utils/variables';

async function getKey(): Promise<CryptoKey> {
  const storedKey = await get(STORAGE_KEYS.ENCRYPTED_KEY);

  if (storedKey) {
    return await window.crypto.subtle.importKey('jwk', storedKey, { name: 'AES-GCM' }, true, ['encrypt', 'decrypt']);
  } else {
    const newKey = await window.crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, [
      'encrypt',
      'decrypt',
    ]);

    const exportedKey = await window.crypto.subtle.exportKey('jwk', newKey);
    await set(STORAGE_KEYS.ENCRYPTED_KEY, exportedKey);

    return newKey;
  }
}

async function encryptData(data: string, key: CryptoKey) {
  const encodedData = new TextEncoder().encode(data);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encryptedData = await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, encodedData);
  return { encryptedData, iv };
}

async function decryptData(encryptedData: ArrayBuffer, iv: Uint8Array, key: CryptoKey) {
  const decryptedData = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, encryptedData);
  return new TextDecoder().decode(decryptedData);
}

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
    const encryptedItem = await get(name);
    if (!encryptedItem) {
      console.warn('Aucun élément trouvé pour:', name);
      return null;
    }

    const key = await getKey();
    const { encryptedData, iv } = JSON.parse(encryptedItem);
    const decryptedData = await decryptData(
      new Uint8Array(Object.values(encryptedData)).buffer,
      new Uint8Array(Object.values(iv)),
      key
    );
    return decryptedData;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    const key = await getKey();
    const { encryptedData, iv } = await encryptData(value, key);
    await set(
      name,
      JSON.stringify({
        encryptedData: Array.from(new Uint8Array(encryptedData)),
        iv: Array.from(iv),
      })
    );
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
      clearFormData: () => set({ formDataList: [] }),
    }),
    {
      name: 'form-data-storage',
      storage: createJSONStorage(() => storage),
    }
  )
);
