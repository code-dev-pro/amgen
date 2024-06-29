import { useMemo } from 'react';
import { useQuizStore } from '../../stores/quizStore';
import { Pin } from './Pin';
import { Flag } from './Flag';
import { Checkpoint, Segment } from './Checkpoints';
import { colorMapping, predefinedPoints } from '../../utils/variables';
import { calculateBlackSegments, calculateCheckpoints } from '../../utils/helpers';

interface MountainPathProps {
  numQuestions: number;
  currentQuestionIndex: number;
}

export const MountainPath = ({ numQuestions, currentQuestionIndex }: MountainPathProps) => {
  const { quizIndex } = useQuizStore();
  const { color, textColor } = colorMapping[quizIndex] || colorMapping[0];

  const checkpoints = useMemo(() => calculateCheckpoints(predefinedPoints, numQuestions), [numQuestions]);
  const blackSegments = useMemo(
    () => calculateBlackSegments(checkpoints, currentQuestionIndex),
    [checkpoints, currentQuestionIndex]
  );

  return (
    <svg width="410px" height="338px" xmlns="http://www.w3.org/2000/svg" className="relative">
      {checkpoints.slice(0, -1).map((checkpoint, index) => (
        <Segment
          key={index}
          index={index}
          currentQuestionIndex={currentQuestionIndex}
          checkpoint={checkpoint}
          checkpoints={checkpoints}
          nextCheckpoint={checkpoints[index + 1]}
          isBlack={blackSegments.includes(index)}
          textColor={textColor}
        />
      ))}

      {checkpoints.map((checkpoint, index) => (
        <Checkpoint
          key={index}
          index={index}
          currentQuestionIndex={currentQuestionIndex}
          checkpoint={checkpoint}
          checkpoints={checkpoints}
          textColor={textColor}
        />
      ))}

      <Pin x={checkpoints[0].cx - 15} y={checkpoints[0].cy - 30} width="30" height="30" color={color} />
      <Flag
        x={checkpoints[checkpoints.length - 1].cx - 5}
        y={checkpoints[checkpoints.length - 1].cy - 30}
        width="30"
        height="30"
        color={color}
      />
    </svg>
  );
};
