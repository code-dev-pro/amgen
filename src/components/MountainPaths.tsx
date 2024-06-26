import Pin from '../assets/images/pin_rouge.svg';
import Flag from '../assets/images/drapeau_rouge.svg';

export const MountainPath = () => {
  const points = [
    { cx: 85, cy: 245, isIntermediate: true }, // Point de départ
    { cx: 126, cy: 240, isIntermediate: false },
    { cx: 160, cy: 224, isIntermediate: false },
    { cx: 188, cy: 220, isIntermediate: true },
    { cx: 195, cy: 208, isIntermediate: false },
    { cx: 210, cy: 185, isIntermediate: false },
    { cx: 235, cy: 168, isIntermediate: true },
    { cx: 248, cy: 152, isIntermediate: false },
    { cx: 226, cy: 132, isIntermediate: true },
    { cx: 230, cy: 122, isIntermediate: false },
    { cx: 240, cy: 120, isIntermediate: true },
    { cx: 262, cy: 100, isIntermediate: true },
    { cx: 254, cy: 84, isIntermediate: false },
    { cx: 252, cy: 70, isIntermediate: true },
    { cx: 238, cy: 57, isIntermediate: true },
    { cx: 228, cy: 45, isIntermediate: true },
    { cx: 220, cy: 45, isIntermediate: false }, // Point d'arrivée
  ];
  return (
    <svg width="410px" height="338px" xmlns="http://www.w3.org/2000/svg">
      {points.slice(0, -1).map((point, index) => (
        <line
          key={index}
          x1={point.cx}
          y1={point.cy}
          x2={points[index + 1].cx}
          y2={points[index + 1].cy}
          className="stroke-current text-white stroke-2"
        />
      ))}
      {points.map(
        (point, index) =>
          !point.isIntermediate && (
            <circle
              key={index}
              cx={point.cx}
              cy={point.cy}
              r="3"
              className="fill-current text-white stroke-current stroke-2"
            />
          )
      )}
      <image href={Pin} x={points[0].cx - 15} y={points[0].cy - 30} width="30" height="30" />
      <image
        href={Flag}
        x={points[points.length - 1].cx - 5}
        y={points[points.length - 1].cy - 30}
        width="30"
        height="30"
      />
    </svg>
  );
};
