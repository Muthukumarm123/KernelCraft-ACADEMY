export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface QuestionOption {
  id: string;
  text: string;
}

export interface InteractiveQuestion {
  id: string;
  type: 'multiple-choice' | 'type-answer' | 'predict-output' | 'find-mistake' | 'command-builder';
  question: string;
  codeSnippet?: string;
  options?: QuestionOption[];
  correctAnswer: string; // ID for multiple choice, or expected text string
  explanation: string;
  hint?: string;
  commonMistakeWhy?: string;
}

export interface PracticalExercise {
  id: string;
  title: string;
  instruction: string;
  suggestedCommand?: string;
  expectedOutputSnippet?: string;
  testCheck?: string; // command or check rule
  explanation: string;
}

export interface LessonSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string; // rich markdown / structured paragraphs
  codeBlocks?: {
    language: string;
    code: string;
    description?: string;
    expectedOutput?: string;
  }[];
  deepDive?: {
    title: string;
    content: string;
  };
  analogy?: string;
  commonMistakes?: {
    mistake: string;
    whyItHappens: string;
    correction: string;
  }[];
  quickCheck?: InteractiveQuestion;
}

export interface Lesson {
  id: string;
  stageId: string;
  title: string;
  summary: string;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  prerequisites: string[];
  objectives: string[];
  sections: LessonSection[];
  interactiveQuestions: InteractiveQuestion[];
  exercises: PracticalExercise[];
  checkpoint?: {
    prompt: string;
    question: InteractiveQuestion;
  };
  endOfLessonQuiz: InteractiveQuestion[];
  interactiveTool?: 'permissions-calculator' | 'cpu-simulator' | 'binary-sandbox' | 'subnet-calculator' | 'packet-journey' | 'crypto-sandbox' | 'terminal';
}

export interface CourseStage {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedTime: string;
  lessonCount: number;
  iconName: string;
  lessons: Lesson[];
}

export interface SecurityLab {
  id: string;
  title: string;
  stage: string;
  difficulty: DifficultyLevel;
  category: 'Linux Hardening' | 'Cryptography' | 'Network Analysis' | 'Web Security' | 'Log Forensics' | 'Multi-Stage Defense';
  objective: string;
  scenario: string;
  backgroundKnowledge: string;
  tasks: {
    id: string;
    instruction: string;
    hint: string;
    completed: boolean;
  }[];
  verificationFlag: string;
  solutionExplanation: string;
  simulatedEnvironmentType: 'terminal' | 'packets' | 'api-inspector' | 'logs';
  initialFiles?: Record<string, string>;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  category: 'Hardware' | 'Operating Systems & Linux' | 'Networking' | 'Programming' | 'Cybersecurity' | 'Cryptography';
  definition: string;
  deepExplanation: string;
  relatedTerms: string[];
  lessonStageId: string;
}

export interface UserProgress {
  completedLessonIds: string[];
  completedLabIds: string[];
  currentLessonId: string;
  currentStageId: string;
  quizScores: Record<string, number>; // lessonId -> percentage
  bookmarks: string[]; // lessonIds
  notes: Record<string, string>; // lessonId -> note text
  completedExercises: string[]; // exerciseIds
  lastActivityTimestamp: number;
}
