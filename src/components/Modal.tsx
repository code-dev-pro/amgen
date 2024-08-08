interface ModalProps {
  isOpen: boolean;
  title: string;
  confirmText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Modal = ({ isOpen, title, confirmText, onConfirm, onCancel }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-12 rounded-lg shadow-lg">
        <h2 className="text-black text-lg font-bold mb-8">{title}</h2>
        <div className="flex justify-end space-x-4">
          <button className="bg-primary-light-blue text-primary-dark-blue px-4 py-2 rounded" onClick={onCancel}>
            Annuler
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
