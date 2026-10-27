export type ModuleId =
  | 'foundations'
  | 'limits'
  | 'derivatives'
  | 'integrals'
  | 'multivariable';

export type MainView = 'curriculum' | 'sandboxes' | 'vault' | 'studyboard';

export interface WorkedStep {
  stepNumber: number;
  math: string;
  plainEnglish: string;
  strategyTip?: string;
  highlight?: string;
}

export interface WorkedExample {
  id: string;
  title: string;
  difficulty: 'Warm-Up' | 'Core' | 'Challenge';
  problemStatement: string;
  problemMath: string;
  realWorldContext: string;
  steps: WorkedStep[];
  finalAnswer: string;
}

export interface ConceptCard {
  id: string;
  title: string;
  subtitle: string;
  eli5Sentence: string;
  intuitionParagraph: string;
  deepDiveDetails?: string[];
  realWorldApplication?: string;
  keyFormula: string;
  formulaLabel: string;
  visualAnalogy: string;
  commonPitfall: string;
  keyTakeaways: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  mathPrompt?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CurriculumModule {
  id: ModuleId;
  number: number;
  title: string;
  shortTitle: string;
  badgeTitle: string;
  tagline: string;
  eli5Summary: string;
  accentColor: string;
  linkedSandbox: 'derivative' | 'riemann' | 'taylor' | 'limit' | 'gradient';
  concepts: ConceptCard[];
  workedExamples: WorkedExample[];
  quiz: QuizQuestion[];
}

export type FormulaCategory =
  | 'Limits'
  | 'Derivatives'
  | 'Integrals'
  | 'Series'
  | 'Trig Identities'
  | 'Multivariable & Vector';

export interface FormulaItem {
  id: string;
  name: string;
  category: FormulaCategory;
  latex: string;
  plainEnglish: string;
  whenToUse: string;
  tags: string[];
}
