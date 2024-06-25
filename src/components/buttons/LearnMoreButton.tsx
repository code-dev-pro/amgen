import { usePopupStore } from '../../hooks/usePopupStore';

export const LearnMoreButton = () => {
  const { setPopupOpen } = usePopupStore();

  return (
    <>
      <button
        className="font-almaq text-2xl uppercase border border-primary-light-blue p-2"
        onClick={() => setPopupOpen(true)}
      >
        <span className="text-accent-blue">En savoir +</span>
      </button>
    </>
  );
};
