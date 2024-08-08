interface LearnMoreButtonProps {
  handleLearnMoreClick: () => void;
}

export const LearnMoreButton = ({ handleLearnMoreClick }: LearnMoreButtonProps) => {
  return (
    <div className="relative">
      <button
        className="font-almaq text-2xl uppercase border border-primary-light-blue p-2"
        onClick={handleLearnMoreClick}
      >
        <span className="text-accent-blue">En savoir +</span>
      </button>
      <p className="absolute top-1/2 left-[58%] ml-4 transform -translate-y-1/2 text-left text-sm text-accent-blue">
        Sur demande d'information complémentaire,
        <br />
        l'équipe médicale pourra répondre à vos questions.
      </p>
    </div>
  );
};
