import { UserProgress } from '../types';

const STORAGE_KEY = 'kernelcraft_user_progress_v1';

const defaultProgress: UserProgress = {
  completedLessonIds: [],
  completedLabIds: [],
  currentLessonId: 'hw-what-is-a-computer',
  currentStageId: 'stage-1-hardware',
  quizScores: {},
  bookmarks: ['hw-what-is-a-computer', 'linux-permissions-deep-dive'],
  notes: {
    'linux-permissions-deep-dive': 'Remember: Octal r=4, w=2, x=1. In directories, execute (x) means permission to traverse/enter with cd!'
  },
  completedExercises: [],
  lastActivityTimestamp: Date.now(),
};

export function loadUserProgress(): UserProgress {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw);
    return {
      ...defaultProgress,
      ...parsed,
      completedLessonIds: Array.isArray(parsed.completedLessonIds) ? parsed.completedLessonIds : [],
      completedLabIds: Array.isArray(parsed.completedLabIds) ? parsed.completedLabIds : [],
      bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
      notes: parsed.notes || {},
      quizScores: parsed.quizScores || {},
      completedExercises: Array.isArray(parsed.completedExercises) ? parsed.completedExercises : [],
    };
  } catch (e) {
    console.error('Failed to load progress from localStorage:', e);
    return defaultProgress;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...progress,
      lastActivityTimestamp: Date.now(),
    }));
  } catch (e) {
    console.error('Failed to save progress to localStorage:', e);
  }
}

export function resetProgress(): UserProgress {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return defaultProgress;
}
