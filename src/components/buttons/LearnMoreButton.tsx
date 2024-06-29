interface LearnMoreButtonProps {
  handleLearnMoreClick: () => void;
}

export const LearnMoreButton = ({ handleLearnMoreClick }: LearnMoreButtonProps) => {
  return (
    <>
      <button
        className="font-almaq text-2xl uppercase border border-primary-light-blue p-2"
        onClick={handleLearnMoreClick}
      >
        <span className="text-accent-blue">En savoir +</span>
      </button>
    </>
  );
};
