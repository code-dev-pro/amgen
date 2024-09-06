export interface Proposition {
  id: number;
  libelle: string;
  isGood: number;
}

export interface Question {
  id: number;
  libelle: string;
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
