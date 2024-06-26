export const MountainPath = () => {
  const points = [
    { cx: 292, cy: 28, isIntermediate: false },
    { cx: 304, cy: 28, isIntermediate: true }, // Point intermédiaire
    { cx: 310, cy: 38, isIntermediate: true }, // Point intermédiaire
    { cx: 338, cy: 62, isIntermediate: true }, // Point intermédiaire
    // { cx: 320, cy: 65, isIntermediate: false },
    // { cx: 125, cy: 200, isIntermediate: true }, // Point intermédiaire
    // { cx: 150, cy: 250, isIntermediate: false },
    // { cx: 125, cy: 300, isIntermediate: true }, // Point intermédiaire
    // { cx: 100, cy: 350, isIntermediate: false },
    // { cx: 75, cy: 400, isIntermediate: true }, // Point intermédiaire
    // { cx: 50, cy: 450, isIntermediate: false },
    // { cx: 75, cy: 500, isIntermediate: true }, // Point intermédiaire
    // { cx: 100, cy: 550, isIntermediate: false },
    // { cx: 125, cy: 600, isIntermediate: true }, // Point intermédiaire
    // { cx: 150, cy: 650, isIntermediate: false },
    // { cx: 125, cy: 700, isIntermediate: true }, // Point intermédiaire
    // { cx: 100, cy: 750, isIntermediate: false },
    // { cx: 75, cy: 800, isIntermediate: true }, // Point intermédiaire
    // { cx: 50, cy: 850, isIntermediate: false },
    // { cx: 75, cy: 900, isIntermediate: true }, // Point intermédiaire
    // { cx: 100, cy: 950, isIntermediate: false },
  ];

  return (
    <svg width="410px" xmlns="http://www.w3.org/2000/svg">
      {points.slice(0, -1).map((point, index) => (
        <line
          key={index}
          x1={point.cx}
          y1={point.cy}
          x2={points[index + 1].cx}
          y2={points[index + 1].cy}
          className="stroke-current text-black stroke-2"
        />
      ))}
      {points.map(
        (point, index) =>
          !point.isIntermediate && (
            <circle
              key={index}
              cx={point.cx}
              cy={point.cy}
              r="4"
              className="fill-current text-red-500 stroke-current stroke-2"
            />
          )
      )}
    </svg>
  );
};
