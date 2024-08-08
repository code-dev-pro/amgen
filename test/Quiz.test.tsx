import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Quiz from '../src/pages/Quiz';
import { create } from 'zustand';

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

interface MockStoreState {
  quizIndex: number;
  quizTitle: string;
  quizCategory: string;
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswers: string[];
  isAnswerShown: boolean;
  isQuizCompleted: boolean;
  nextQuestion: () => void;
  showAnswer: () => void;
  selectAnswer: (answer: string, isChecked: boolean) => void;
  loadQuestions: () => void;
  resetQuiz: () => void;
  completeQuiz: () => void;
}

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

// Create a mock of the quiz store
const mockQuizStore = create<MockStoreState>((set) => ({
  quizIndex: 0,
  quizTitle: 'Cardio-Métabolisme',
  quizCategory: 'cardio',
  questions: [
    {
      question: 'Quelles sont les plus grandes capitales du monde ?',
      options: ['Berlin', 'Madrid', 'Paris', 'Lisbonne'],
      correctAnswer: ['Paris', 'Berlin'],
      learnMore: {
        text: 'Voici des informations supplémentaires sur Paris.',
        imageURL: '',
        imageAlt: '',
      },
    },
    {
      question: "Quel est l'atome de césium ?",
      options: ['H', 'He', 'Li', 'Be'],
      correctAnswer: ['He', 'H'],
      learnMore: {
        text: 'Voici des informations supplémentaires sur le césium.',
        imageURL: '',
        imageAlt: '',
      },
    },
  ],
  currentQuestionIndex: 0,
  selectedAnswers: [],
  isAnswerShown: false,
  isQuizCompleted: false,
  nextQuestion: vi.fn(),
  showAnswer: vi.fn(() => set({ isAnswerShown: true })),
  selectAnswer: vi.fn((answer, isChecked) =>
    set((state) => ({
      selectedAnswers: isChecked
        ? [...state.selectedAnswers, answer]
        : state.selectedAnswers.filter((a) => a !== answer),
    }))
  ),
  loadQuestions: vi.fn(),
  resetQuiz: vi.fn(),
  completeQuiz: vi.fn(() => set({ isQuizCompleted: true })),
}));

// Mock store pour les popups
const mockPopupStore = {
  isPopupOpen: false,
  popupType: null,
  popupContent: null,
  openPopup: vi.fn((type, content) => {
    mockPopupStore.isPopupOpen = true;
    mockPopupStore.popupType = type;
    mockPopupStore.popupContent = content;
  }),
  closePopup: vi.fn(() => {
    mockPopupStore.isPopupOpen = false;
    mockPopupStore.popupType = null;
    mockPopupStore.popupContent = null;
  }),
};

// Mock the entire module
vi.mock('../src/stores/quizStore', () => ({
  useQuizStore: () => mockQuizStore((state) => state),
}));

vi.mock('../src/stores/popupStore', () => ({
  usePopupStore: () => mockPopupStore,
}));

describe('Quiz Component', () => {
  beforeEach(() => {
    mockQuizStore.setState({
      quizIndex: 0,
      quizTitle: 'Cardio-Métabolisme',
      quizCategory: 'cardio',
      questions: [
        {
          question: 'Quelles sont les plus grandes capitales du monde ?',
          options: ['Berlin', 'Madrid', 'Paris', 'Lisbonne'],
          correctAnswer: ['Paris', 'Berlin'],
          learnMore: {
            text: 'Voici des informations supplémentaires sur Paris.',
            imageURL: '',
            imageAlt: '',
          },
        },
        {
          question: "Quel est l'atome de césium ?",
          options: ['H', 'He', 'Li', 'Be'],
          correctAnswer: ['He', 'H'],
          learnMore: {
            text: 'Voici des informations supplémentaires sur le césium.',
            imageURL: '',
            imageAlt: '',
          },
        },
      ],
      currentQuestionIndex: 0,
      selectedAnswers: [],
      isAnswerShown: false,
      isQuizCompleted: false,
    });

    // Réinitialiser l'état du store de popups
    mockPopupStore.isPopupOpen = false;
    mockPopupStore.popupType = null;
    mockPopupStore.popupContent = null;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initializes quiz correctly', () => {
    renderWithRouter(<Quiz />);
    const state = mockQuizStore.getState();
    expect(state.currentQuestionIndex).toBe(0);
    expect(state.isQuizCompleted).toBe(false);
    expect(state.quizTitle).toBe('Cardio-Métabolisme');
  });

  it('should complete question flow: select answer, validate, and navigate to next question', async () => {
    renderWithRouter(<Quiz />);
    const user = userEvent.setup();

    // Select an option
    const optionToSelect = screen.getByText('Paris');
    await user.click(optionToSelect);

    // Simulate state update after selection
    act(() => {
      mockQuizStore.setState({ selectedAnswers: ['Paris'] });
    });

    // Click the "Validate" button
    const validateButton = screen.getByText('Valider');
    expect(validateButton).not.toBeDisabled();
    await user.click(validateButton);

    // Simulate showing the answer
    act(() => {
      mockQuizStore.setState({ isAnswerShown: true });
    });

    // Verify answers are shown
    expect(mockQuizStore.getState().isAnswerShown).toBe(true);

    // Verify "Learn More" and "Next" buttons are present
    expect(screen.getByText('En savoir +')).toBeInTheDocument();
    expect(screen.getByText('Suivant')).toBeInTheDocument();

    // Click "Next" button and verify nextQuestion is called
    await user.click(screen.getByText('Suivant'));
    expect(mockQuizStore.getState().nextQuestion).toHaveBeenCalled();

    // Update question index to simulate moving to the next question
    act(() => {
      mockQuizStore.setState({
        currentQuestionIndex: 1,
        selectedAnswers: ['He', 'H'],
      });
    });

    // Click "Next" button and verify completeQuiz is called if no more questions
    await user.click(screen.getByText('Suivant'));
    expect(mockQuizStore.getState().completeQuiz).toHaveBeenCalled();
  });

  it('should open learn more popup after selecting and validating an answer', async () => {
    renderWithRouter(<Quiz />);
    const user = userEvent.setup();

    // Sélectionner une option
    const optionToSelect = screen.getByText('Paris');
    await user.click(optionToSelect);

    // Simuler la mise à jour de l'état après la sélection
    act(() => {
      mockQuizStore.setState({ selectedAnswers: ['Paris'] });
    });

    // Cliquer sur le bouton "Valider"
    const validateButton = screen.getByText('Valider');
    expect(validateButton).not.toBeDisabled();
    await user.click(validateButton);

    // Simuler l'affichage des réponses
    act(() => {
      mockQuizStore.setState({ isAnswerShown: true });
    });

    // Cliquer sur le bouton "En savoir +" et vérifier que le popup est ouvert
    const learnMoreButton = screen.getByText(/En savoir \+/i);
    expect(learnMoreButton).toBeInTheDocument();
    await user.click(learnMoreButton);

    // Vérifier que le popup est ouvert
    expect(mockPopupStore.isPopupOpen).toBe(true);
  });

  it('should selects answer correctly', async () => {
    renderWithRouter(<Quiz />);
    const answerOption = screen.getByText('Paris');
    await userEvent.click(answerOption);

    // Verify answer is selected
    expect(mockQuizStore.getState().selectedAnswers).toContain('Paris');
  });

  it('should complete quiz when timer ends', () => {
    vi.useFakeTimers();
    renderWithRouter(<Quiz />);
    act(() => {
      vi.advanceTimersByTime(180000); // 3 minutes (180000 ms)
    });
    expect(mockQuizStore.getState().isQuizCompleted).toBe(true);
    vi.useRealTimers();
  });
});
