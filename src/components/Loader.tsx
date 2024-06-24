export const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-dark-blue">
      <svg className="w-[500px] h-[500px]" viewBox="0 0 500 500">
        <defs>
          <g id="circles">
            <symbol id="dot">
              <circle cx="30" cy="30" r="30" />
            </symbol>
            <symbol id="moving-dot">
              <circle className="animate-scanner" cx="175" cy="175" r="28" />
            </symbol>
          </g>
          <g id="filters">
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 19 -9" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
            <filter id="glow" filterUnits="userSpaceOnUse" x="-20%" y="-20%" height="140%" width="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
            </filter>
            <filter id="outer-glow" filterUnits="userSpaceOnUse" x="-50%" y="-50%" height="220%" width="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="outer-glow" />
            </filter>
          </g>
        </defs>
        <g className="circles transform translate-x-[calc(50%-30px)] translate-y-[calc(50%-30px)]">
          <use className="dot" href="#dot" x="106" y="106" />
          <use className="dot" href="#dot" x="0" y="150" />
          <use className="dot" href="#dot" x="-106" y="106" />
          <use className="dot" href="#dot" x="-150" y="0" />
          <use className="dot" href="#dot" x="-106" y="-106" />
          <use className="dot" href="#dot" x="0" y="-150" />
          <use className="dot" href="#dot" x="106" y="-106" />
          <use className="dot" href="#dot" x="150" y="0" />
          <use className="dot--light" href="#moving-dot" x="-150" y="-150" />
        </g>
        <g className="transform translate-x-[calc(50%-30px)] translate-y-[calc(50%-30px)]">
          <use className="dot--glowing" href="#moving-dot" x="-150" y="-150" />
        </g>
      </svg>
    </div>
  );
};
