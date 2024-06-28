import { useQuizzTitleStore } from '../hooks/useQuizzTitleStore';
import { motion } from 'framer-motion';

import PinYellow from '../assets/images/pin_jaune.svg';
import PinRed from '../assets/images/pin_rouge.svg';
import PinBrown from '../assets/images/pin_marron.svg';
import PinPink from '../assets/images/pin_rose.svg';
import PinBlue from '../assets/images/pin_bleu.svg';
import PinPurple from '../assets/images/pin_violet.svg';

import FlagYellow from '../assets/images/drapeau_jaune.svg';
import FlagRed from '../assets/images/drapeau_rouge.svg';
import FlagBrown from '../assets/images/drapeau_marron.svg';
import FlagPink from '../assets/images/drapeau_rose.svg';
import FlagBlue from '../assets/images/drapeau_bleu.svg';
import FlagPurple from '../assets/images/drapeau_violet.svg';

interface MountainPathProps {
  numQuestions: number;
  currentQuestionIndex: number;
}

export const MountainPath = ({ numQuestions, currentQuestionIndex }: MountainPathProps) => {
  const { quizzIndex } = useQuizzTitleStore();

  const predefinedPoints = [
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

  const totalPoints = predefinedPoints.length;
  const nonIntermediateIndices = [0, totalPoints - 1];

  if (numQuestions > 2) {
    const step = (totalPoints - 1) / (numQuestions - 1);
    for (let i = 1; i < numQuestions - 1; i++) {
      nonIntermediateIndices.push(Math.round(i * step));
    }
  } else if (numQuestions === 2) {
    nonIntermediateIndices.push(Math.floor((totalPoints - 1) / 2));
  }

  const uniqueNonIntermediateIndices = [...new Set(nonIntermediateIndices)].sort((a, b) => a - b);
  const points = predefinedPoints.map((point, index) => ({
    ...point,
    isIntermediate: !uniqueNonIntermediateIndices.includes(index) || index === 0,
  }));

  const colorMapping = [
    { pin: PinYellow, flag: FlagYellow, color: 'text-accent-yellow' },
    { pin: PinRed, flag: FlagRed, color: 'text-accent-red' },
    { pin: PinBrown, flag: FlagBrown, color: 'text-accent-brown' },
    { pin: PinPink, flag: FlagPink, color: 'text-accent-pink' },
    { pin: PinBlue, flag: FlagBlue, color: 'text-accent-blue' },
    { pin: PinPurple, flag: FlagPurple, color: 'text-accent-purple' },
  ];

  const { pin, flag, color } = colorMapping[quizzIndex] || colorMapping[0];

  const blackSegments: number[] = [];

  const updateBlackSegments = () => {
    blackSegments.length = 0;
    for (let i = 0; i < uniqueNonIntermediateIndices.length - 1; i++) {
      if (currentQuestionIndex > i) {
        const startIndex = uniqueNonIntermediateIndices[i];
        const endIndex = uniqueNonIntermediateIndices[i + 1];
        for (let j = startIndex; j < endIndex; j++) {
          blackSegments.push(j);
        }
      }
    }
  };

  updateBlackSegments();

  return (
    <svg width="410px" height="338px" xmlns="http://www.w3.org/2000/svg" className="relative">
      {points.slice(0, -1).map((point, index) => (
        <g key={index}>
          <line
            x1={point.cx}
            y1={point.cy}
            x2={points[index + 1].cx}
            y2={points[index + 1].cy}
            className="stroke-current text-white stroke-2"
          />
          {blackSegments.includes(index) && (
            <motion.line
              key={`motion-line-${index}`}
              x1={point.cx}
              y1={point.cy}
              x2={points[index + 1].cx}
              y2={points[index + 1].cy}
              className={`stroke-current ${color} stroke-2`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 0.5,
                delay: (index - (uniqueNonIntermediateIndices[currentQuestionIndex - 1] || 0)) * 0.5,
              }}
            />
          )}
        </g>
      ))}

      {points.map((point, index) => {
        const isCurrentQuestionPoint = uniqueNonIntermediateIndices[currentQuestionIndex] === index;
        const allPreviousQuestionPoints = uniqueNonIntermediateIndices.slice(0, currentQuestionIndex);

        return (
          !point.isIntermediate && (
            <g key={index}>
              <circle cx={point.cx} cy={point.cy} r="3" className="fill-current text-white stroke-current stroke-2" />
              {isCurrentQuestionPoint && (
                <motion.circle
                  cx={point.cx}
                  cy={point.cy}
                  r="2.5"
                  className={`fill-current ${color}`}
                  initial={{ r: 0 }}
                  animate={{ r: 2.5 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    delay: (index - (uniqueNonIntermediateIndices[currentQuestionIndex - 1] || 0)) * 0.5,
                  }}
                />
              )}
              {allPreviousQuestionPoints.includes(index) && (
                <circle cx={point.cx} cy={point.cy} r="2.5" className={`fill-current ${color}`} />
              )}
            </g>
          )
        );
      })}

      <image href={pin} x={points[0].cx - 15} y={points[0].cy - 30} width="30" height="30" />
      <image
        href={flag}
        x={points[points.length - 1].cx - 5}
        y={points[points.length - 1].cy - 30}
        width="30"
        height="30"
      />
    </svg>
  );
};
