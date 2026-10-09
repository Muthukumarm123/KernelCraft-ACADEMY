import React, { useState } from 'react';
import { COURSE_STAGES } from '../../data/curriculum';
import { PRACTICAL_LABS } from '../../data/labs';
import {
  LayoutDashboard, BookOpen, Terminal, FlaskConical, Bookmark,
  BookA, ChevronDown, ChevronRight, CheckCircle2, Cpu, Network,
  Shield, Code, ShieldCheck, Wrench, X
} from 'lucide-react';

interface SidebarProps {
  currentView: 'dashboard' | 'lesson' | 'labs' | 'terminal' | 'glossary' | 'notes' | 'tools';
  currentStageId: string;
  currentLessonId: string;
  completedLessonIds: string[];
  completedLabIds: string[];
  bookmarksCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onNavigate: (view: 'dashboard' | 'lesson' | 'labs' | 'terminal' | 'glossary' | 'notes' | 'tools', stageId?: string, lessonId?: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  currentStageId,
  currentLessonId,
  completedLessonIds,
  completedLabIds,
  bookmarksCount,
  isOpenMobile,
  onCloseMobile,
  onNavigate
}) => {
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({
    'stage-1-hardware': true,
    'stage-2-linux': true,
  });

  const toggleStage = (stageId: string) => {
    setExpandedStages(prev => ({ ...prev, [stageId]: !prev[stageId] }));
  };

  const getStageIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-4 h-4 text-indigo-400" />;
      case 'Terminal': return <Terminal className="w-4 h-4 text-emerald-400" />;
      case 'Code': return <Code className="w-4 h-4 text-sky-400" />;
      case 'Network': return <Network className="w-4 h-4 text-amber-400" />;
      case 'Shield': return <Shield className="w-4 h-4 text-rose-400" />;
      case 'FlaskConical': return <ShieldCheck className="w-4 h-4 text-purple-400" />;
      default: return <BookOpen className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-950 border-r border-slate-800 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
        isOpenMobile ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Brand & Mobile Close */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              onNavigate('dashboard');
              onCloseMobile();
            }}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-md">
              KC
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                KernelCraft Academy
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                Full-Stack Systems & Security
              </div>
            </div>
          </button>

          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1 text-slate-400 hover:text-white rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs font-medium">
          {/* Main Top Links */}
          <div className="space-y-1">
            <button
              onClick={() => {
                onNavigate('dashboard');
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard & Roadmap</span>
            </button>

            <button
              onClick={() => {
                onNavigate('labs');
                onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                currentView === 'labs'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FlaskConical className="w-4 h-4 text-purple-400" />
                <span>Security Labs (CTF)</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-purple-300 border border-slate-800">
                {completedLabIds.length}/{PRACTICAL_LABS.length}
              </span>
            </button>

            <button
              onClick={() => {
                onNavigate('terminal');
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'terminal'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Linux Sandbox Terminal</span>
            </button>

            <button
              onClick={() => {
                onNavigate('notes');
                onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                currentView === 'notes'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-4 h-4 text-amber-400" />
                <span>Notes & Bookmarks</span>
              </div>
              {bookmarksCount > 0 && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-amber-300 border border-slate-800">
                  {bookmarksCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                onNavigate('glossary');
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'glossary'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <BookA className="w-4 h-4 text-sky-400" />
              <span>Technical Glossary</span>
            </button>
          </div>

          {/* Curriculum Stages Accordion */}
          <div>
            <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
              Course Stages (7)
            </div>

            <div className="space-y-1.5">
              {COURSE_STAGES.map(stage => {
                const isExpanded = expandedStages[stage.id] ?? false;
                const stageCompletedCount = stage.lessons.filter(l => completedLessonIds.includes(l.id)).length;
                const isAllDone = stageCompletedCount === stage.lessons.length;

                return (
                  <div key={stage.id} className="rounded-lg overflow-hidden border border-slate-900 bg-slate-950/40">
                    <button
                      onClick={() => toggleStage(stage.id)}
                      className="w-full flex items-center justify-between p-2.5 hover:bg-slate-900/80 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {getStageIcon(stage.iconName)}
                        <span className="font-semibold text-slate-200 truncate text-[11px]">
                          {stage.number}. {stage.shortTitle}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {isAllDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <span className="text-[10px] font-mono text-slate-500">
                            {stageCompletedCount}/{stage.lessons.length}
                          </span>
                        )}
                        {isExpanded ? (
                          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                        )}
                      </div>
                    </button>

                    {/* Lesson Items */}
                    {isExpanded && (
                      <div className="bg-slate-950 px-2 py-1 space-y-0.5 border-t border-slate-900">
                        {stage.lessons.map(lesson => {
                          const isDone = completedLessonIds.includes(lesson.id);
                          const isActive = currentView === 'lesson' && currentLessonId === lesson.id;

                          return (
                            <button
                              key={lesson.id}
                              onClick={() => {
                                onNavigate('lesson', stage.id, lesson.id);
                                onCloseMobile();
                              }}
                              className={`w-full text-left px-2.5 py-1.5 rounded text-[11px] flex items-center justify-between transition-colors ${
                                isActive
                                  ? 'bg-indigo-950 text-indigo-300 font-semibold border border-indigo-800'
                                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                              }`}
                            >
                              <span className="truncate pr-1 leading-snug">{lesson.title}</span>
                              {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/60 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Lessons Completed</span>
          <span className="font-mono font-bold text-indigo-400">
            {completedLessonIds.length} / {COURSE_STAGES.reduce((a, s) => a + s.lessons.length, 0)}
          </span>
        </div>
      </aside>
    </>
  );
};
