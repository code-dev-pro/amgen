export const IDLE_TIMEOUT = 300000; // 5 minutes in milliseconds

export const STORAGE_KEYS = {
  FORM_DATA: 'formDataList',
  QUIZ_ANSWERS: 'quizAnswers',
};

// Checkpoints on the mountain path for the progress tracker animation
export const predefinedPoints = [
  { cx: 85, cy: 245, isIntermediate: true },
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
  { cx: 220, cy: 45, isIntermediate: false },
];

// Colors for the mountain path matching the quiz index
export const colorMapping = [
  { color: '#FFE900', textColor: 'text-accent-yellow' },
  { color: '#C81806', textColor: 'text-accent-red' },
  { color: '#511F0D', textColor: 'text-accent-brown' },
  { color: '#FF9CB2', textColor: 'text-accent-pink' },
  { color: '#003B8C', textColor: 'text-accent-blue' },
  { color: '#703684', textColor: 'text-accent-purple' },
];
