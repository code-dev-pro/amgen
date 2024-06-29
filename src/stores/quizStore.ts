import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { data } from '../data';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string[];
  learnMore: {
    text: string;
    imageURL: string;
    imageAlt: string;
  };
}

interface QuizState {
  quizIndex: number;
  quizTitle: string;
  quizCategory: string;
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswers: string[];
  isAnswerShown: boolean;
  isQuizCompleted: boolean;
  setQuizIndex: (quizIndex: number) => void;
  setQuizTitle: (title: string) => void;
  setQuizCategory: (category: string) => void;
  loadQuestions: () => void;
  selectAnswer: (answer: string, isChecked: boolean) => void;
  showAnswer: () => void;
  nextQuestion: () => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
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

      loadQuestions: () => {
        const { quizTitle } = get();
        const categoryData = data.find((item) => item.title === quizTitle);
        if (categoryData && categoryData.quiz) {
          const shuffledQuestions = categoryData.quiz.sort(() => 0.5 - Math.random()).slice(0, 10);
          set({ questions: shuffledQuestions });
        } else {
          set({ questions: [] });
        }
      },

      selectAnswer: (answer, isChecked) =>
        set((state) => ({
          selectedAnswers: isChecked
            ? [...state.selectedAnswers, answer]
            : state.selectedAnswers.filter((a) => a !== answer),
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
      }),
    }
  )
);
