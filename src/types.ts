export interface Proposition {
  id: number;
  libelle: string;
  isGood: number;
}

export interface Question {
  id: number;
  libelle: string;
  type: 'QCU' | 'QCM';
  soustitre: string;
  feedbackText: string | null;
  feedbackImage: string;
  feedbackImageZoom: boolean;
  references: string;
  propositions: Proposition[];
}

export interface Theme {
  id: number;
  label: string;
  description: string;
  questions: Question[];
}

export interface Themes {
  error: number;
  textError: string;
  id: number;
  date: string;
  version: string;
  published: number;
  label: string;
  description: string;
  themes: Theme[];
}

export interface QuizAnswer {
  date: string;
  time: string;
  id: number;
  version: number;
  idTheme: number;
  idQuestion: number;
  success: boolean;
  propositions: Array<{ id: number; isCheck: boolean }>;
}
