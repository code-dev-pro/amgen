import { motion } from 'framer-motion';
import { calculateDelay } from '../../utils/helpers';

interface Checkpoint {
  cx: number;
  cy: number;
  isIntermediate: boolean;
}

interface SegmentProps {
  index: number;
  currentQuestionIndex: number;
  checkpoint: Checkpoint;
  checkpoints: Checkpoint[];
  nextCheckpoint: Checkpoint;
  isBlack: boolean;
  textColor: string;
}

export const Segment = ({
  index,
  currentQuestionIndex,
  checkpoint,
  checkpoints,
  nextCheckpoint,
  isBlack,
  textColor,
}: SegmentProps) => (
  <g>
    <line
      x1={checkpoint.cx}
      y1={checkpoint.cy}
      x2={nextCheckpoint.cx}
      y2={nextCheckpoint.cy}
      className="stroke-current text-white stroke-2"
    />
    {isBlack && (
      <motion.line
        x1={checkpoint.cx}
        y1={checkpoint.cy}
        x2={nextCheckpoint.cx}
        y2={nextCheckpoint.cy}
        className={`stroke-current ${textColor} stroke-2`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 0.5,
          delay: calculateDelay(index, currentQuestionIndex, checkpoints),
        }}
      />
    )}
  </g>
);

interface CheckpointProps {
  index: number;
  currentQuestionIndex: number;
  checkpoint: Checkpoint;
  checkpoints: Checkpoint[];
  textColor: string;
}

export const Checkpoint = ({ index, currentQuestionIndex, checkpoint, checkpoints, textColor }: CheckpointProps) => {
  if (checkpoint.isIntermediate) return null;

  const nonIntermediateIndices = [
    0,
    ...checkpoints
      .slice(1)
      .map((p, i) => (!p.isIntermediate ? i + 1 : -1))
      .filter((i) => i !== -1),
  ];

  const isCurrentQuestionPoint = nonIntermediateIndices[currentQuestionIndex] === index;
  const isPreviousQuestionPoint = nonIntermediateIndices.slice(0, currentQuestionIndex).includes(index);

  return (
    <g>
      <circle cx={checkpoint.cx} cy={checkpoint.cy} r="3" className="fill-current text-white stroke-current stroke-2" />
      {isCurrentQuestionPoint && (
        <motion.circle
          cx={checkpoint.cx}
          cy={checkpoint.cy}
          r="2.5"
          className={`fill-current ${textColor}`}
          initial={{ r: 0 }}
          animate={{ r: 2.5 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            delay: calculateDelay(index, currentQuestionIndex, checkpoints),
          }}
        />
      )}
      {isPreviousQuestionPoint && (
        <circle cx={checkpoint.cx} cy={checkpoint.cy} r="2.5" className={`fill-current ${textColor}`} />
      )}
    </g>
  );
};
