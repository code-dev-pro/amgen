import { useState } from 'react';

interface PinInputProps {
  onSubmit: (pin: string) => void;
  onCancel: () => void;
}

export const PinInput = ({ onSubmit, onCancel }: PinInputProps) => {
  const [pin, setPin] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(pin);
  };

  return (
    <div className="fixed inset-0 bg-black text-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-6 rounded-lg min-w-[350px]">
        <h2 className="text-xl mb-4">Entrez le code PIN</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="border-2 border-gray-300 p-2 mb-4 w-full"
            maxLength={4}
          />
          <div className="flex justify-end space-x-6">
            <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
              Annuler
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
