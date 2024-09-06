import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Proposition, Question } from '../types';

interface QuizState {
  quizIndex: number;
  quizTitle: string;
  quizCategory: string;
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswers: Proposition[];
  isAnswerShown: boolean;
  isQuizCompleted: boolean;
  setQuizIndex: (quizIndex: number) => void;
  setQuizTitle: (title: string) => void;
  setQuizCategory: (category: string) => void;
  setQuizQuestions: (questions: Question[]) => void;
  selectAnswer: (answer: Proposition, isChecked: boolean) => void;
  showAnswer: () => void;
  nextQuestion: () => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      quizIndex: 0,
      quizTitle: '',
      quizCategory: '',
      questions: [],
      currentQuestionIndex: 0,
      selectedAnswers: [],
      isAnswerShown: false,
      isQuizCompleted: false,

      setQuizIndex: (quizIndex) => set({ quizIndex }),
      setQuizTitle: (title) => set({ quizTitle: title }),
      setQuizCategory: (category) => set({ quizCategory: category }),
      setQuizQuestions: (questions) => set({ questions }),

      selectAnswer: (answer, isChecked) =>
        set((state) => ({
          selectedAnswers: isChecked
            ? [...state.selectedAnswers, answer]
            : state.selectedAnswers.filter((a) => a.id !== answer.id),
        })),

      showAnswer: () => set({ isAnswerShown: true }),

      nextQuestion: () =>
        set((state) => ({
          currentQuestionIndex: state.currentQuestionIndex + 1,
          selectedAnswers: [],
          isAnswerShown: false,
        })),

      completeQuiz: () => set({ isQuizCompleted: true }),

      resetQuiz: () =>
        set({
          questions: [],
          currentQuestionIndex: 0,
          selectedAnswers: [],
          isAnswerShown: false,
          isQuizCompleted: false,
        }),
    }),
    {
      name: 'quiz-store',
      partialize: (state) => ({
        quizIndex: state.quizIndex,
        quizTitle: state.quizTitle,
        quizCategory: state.quizCategory,
        questions: state.questions,
      }),
    }
  )
);
