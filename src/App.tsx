import React, { useState, useEffect } from 'react';
import { COURSE_STAGES } from './data/curriculum';
import { PRACTICAL_LABS } from './data/labs';
import { UserProgress } from './types';
import { loadUserProgress, saveUserProgress } from './services/storage';

import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { LessonView } from './components/lesson/LessonView';
import { PracticalLabs } from './components/labs/PracticalLabs';
import { LinuxTerminal } from './components/terminal/LinuxTerminal';
import { GlossaryView } from './components/glossary/GlossaryView';
import { NotesBookmarksView } from './components/notes/NotesBookmarksView';
import { AiTutorDrawer } from './components/tutor/AiTutorDrawer';
import { SearchModal } from './components/modals/SearchModal';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress);
  const [currentView, setCurrentView] = useState<'dashboard' | 'lesson' | 'labs' | 'terminal' | 'glossary' | 'notes' | 'tools'>('dashboard');

  // Modals & Drawers
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Sync progress to localStorage on updates
  useEffect(() => {
    saveUserProgress(progress);
  }, [progress]);

  // Global Ctrl+K shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Current active stage & lesson lookup
  const currentStage = COURSE_STAGES.find(s => s.id === progress.currentStageId) || COURSE_STAGES[0];
  const currentLesson = currentStage.lessons.find(l => l.id === progress.currentLessonId) || currentStage.lessons[0];

  const totalLessons = COURSE_STAGES.reduce((acc, st) => acc + st.lessons.length, 0);
  const overallPercentage = Math.round((progress.completedLessonIds.length / totalLessons) * 100);

  // Navigation handlers
  const handleNavigateToLesson = (stageId: string, lessonId: string) => {
    setProgress(prev => ({
      ...prev,
      currentStageId: stageId,
      currentLessonId: lessonId,
    }));
    setCurrentView('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToStage = (stageId: string) => {
    const stage = COURSE_STAGES.find(s => s.id === stageId);
    if (stage && stage.lessons.length > 0) {
      handleNavigateToLesson(stageId, stage.lessons[0].id);
    }
  };

  const handleCompleteLesson = () => {
    if (!progress.completedLessonIds.includes(currentLesson.id)) {
      setProgress(prev => ({
        ...prev,
        completedLessonIds: [...prev.completedLessonIds, currentLesson.id],
      }));
    }
  };

  const handleToggleBookmark = () => {
    const isBookmarked = progress.bookmarks.includes(currentLesson.id);
    setProgress(prev => ({
      ...prev,
      bookmarks: isBookmarked
        ? prev.bookmarks.filter(b => b !== currentLesson.id)
        : [...prev.bookmarks, currentLesson.id],
    }));
  };

  const handleSaveNote = (note: string) => {
    setProgress(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [currentLesson.id]: note,
      },
    }));
  };

  const handleRemoveBookmark = (lessonId: string) => {
    setProgress(prev => ({
      ...prev,
      bookmarks: prev.bookmarks.filter(b => b !== lessonId),
    }));
  };

  const handleSaveAnyNote = (lessonId: string, note: string) => {
    setProgress(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [lessonId]: note,
      },
    }));
  };

  const handleLabCompleted = (labId: string) => {
    if (!progress.completedLabIds.includes(labId)) {
      setProgress(prev => ({
        ...prev,
        completedLabIds: [...prev.completedLabIds, labId],
      }));
    }
  };

  // Next / Previous Lesson Calculation
  const currentLessonIdx = currentStage.lessons.findIndex(l => l.id === currentLesson.id);
  const nextLesson = currentStage.lessons[currentLessonIdx + 1];
  const prevLesson = currentStage.lessons[currentLessonIdx - 1];

  const handleNextLesson = () => {
    if (nextLesson) {
      handleNavigateToLesson(currentStage.id, nextLesson.id);
    } else {
      // Advance to next stage if available
      const currentStageIdx = COURSE_STAGES.findIndex(s => s.id === currentStage.id);
      const nextStage = COURSE_STAGES[currentStageIdx + 1];
      if (nextStage && nextStage.lessons.length > 0) {
        handleNavigateToLesson(nextStage.id, nextStage.lessons[0].id);
      }
    }
  };

  const handlePrevLesson = () => {
    if (prevLesson) {
      handleNavigateToLesson(currentStage.id, prevLesson.id);
    } else {
      const currentStageIdx = COURSE_STAGES.findIndex(s => s.id === currentStage.id);
      const prevStage = COURSE_STAGES[currentStageIdx - 1];
      if (prevStage && prevStage.lessons.length > 0) {
        handleNavigateToLesson(prevStage.id, prevStage.lessons[prevStage.lessons.length - 1].id);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAiTutor={() => setIsAiTutorOpen(true)}
        onToggleTerminal={() => setCurrentView('terminal')}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
        overallPercentage={overallPercentage}
      />

      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <Sidebar
          currentView={currentView}
          currentStageId={progress.currentStageId}
          currentLessonId={progress.currentLessonId}
          completedLessonIds={progress.completedLessonIds}
          completedLabIds={progress.completedLabIds}
          bookmarksCount={progress.bookmarks.length}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          onNavigate={(view, stageId, lessonId) => {
            if (view === 'lesson' && stageId && lessonId) {
              handleNavigateToLesson(stageId, lessonId);
            } else {
              setCurrentView(view);
            }
          }}
        />

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-72 p-4 sm:p-6 lg:p-8 min-w-0">
          {currentView === 'dashboard' && (
            <DashboardView
              progress={progress}
              onNavigateToLesson={handleNavigateToLesson}
              onNavigateToStage={handleNavigateToStage}
              onNavigateToLabs={() => setCurrentView('labs')}
              onOpenAiTutor={() => setIsAiTutorOpen(true)}
            />
          )}

          {currentView === 'lesson' && (
            <LessonView
              lesson={currentLesson}
              stageNumber={currentStage.number}
              stageTitle={currentStage.title}
              isCompleted={progress.completedLessonIds.includes(currentLesson.id)}
              isBookmarked={progress.bookmarks.includes(currentLesson.id)}
              currentNote={progress.notes[currentLesson.id] || ''}
              onToggleBookmark={handleToggleBookmark}
              onSaveNote={handleSaveNote}
              onCompleteLesson={handleCompleteLesson}
              onNextLesson={nextLesson ? handleNextLesson : undefined}
              onPrevLesson={prevLesson ? handlePrevLesson : undefined}
              onOpenAiTutor={() => setIsAiTutorOpen(true)}
            />
          )}

          {currentView === 'labs' && (
            <PracticalLabs
              completedLabIds={progress.completedLabIds}
              onLabCompleted={handleLabCompleted}
            />
          )}

          {currentView === 'terminal' && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
                <h2 className="text-xl font-bold text-white">Full-Featured Linux Sandbox Terminal</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Practice commands, pipes, redirection, file operations, permissions, and process inspection in a secure sandbox.
                </p>
              </div>
              <LinuxTerminal initialWorkingDir="/home/student" />
            </div>
          )}

          {currentView === 'glossary' && (
            <GlossaryView
              onNavigateToStage={(stageId) => {
                handleNavigateToStage(stageId);
              }}
            />
          )}

          {currentView === 'notes' && (
            <NotesBookmarksView
              bookmarks={progress.bookmarks}
              notes={progress.notes}
              onRemoveBookmark={handleRemoveBookmark}
              onSaveNote={handleSaveAnyNote}
              onNavigateToLesson={handleNavigateToLesson}
            />
          )}
        </main>
      </div>

      {/* Global AI Mentor Drawer */}
      <AiTutorDrawer
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
        currentLessonTitle={currentView === 'lesson' ? currentLesson.title : 'General Systems & Security'}
        currentContext={`Stage: ${currentStage.title}, View: ${currentView}`}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLesson={handleNavigateToLesson}
        onSelectLab={(labId) => {
          setCurrentView('labs');
        }}
      />
    </div>
  );
}
