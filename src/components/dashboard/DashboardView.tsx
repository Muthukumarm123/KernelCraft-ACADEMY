import React from 'react';
import { COURSE_STAGES } from '../../data/curriculum';
import { PRACTICAL_LABS } from '../../data/labs';
import { UserProgress } from '../../types';
import {
  ArrowRight, CheckCircle2, ShieldCheck, Flame, BookOpen, Clock,
  Award, Terminal, Cpu, Network, Shield, Code, ChevronRight, Sparkles
} from 'lucide-react';

interface DashboardViewProps {
  progress: UserProgress;
  onNavigateToLesson: (stageId: string, lessonId: string) => void;
  onNavigateToStage: (stageId: string) => void;
  onNavigateToLabs: () => void;
  onOpenAiTutor: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  progress,
  onNavigateToLesson,
  onNavigateToStage,
  onNavigateToLabs,
  onOpenAiTutor
}) => {
  // Total lessons calculation
  const totalLessons = COURSE_STAGES.reduce((acc, st) => acc + st.lessons.length, 0);
  const completedCount = progress.completedLessonIds.length;
  const overallPercentage = Math.round((completedCount / totalLessons) * 100);

  // Active lesson lookup
  let currentStage = COURSE_STAGES.find(s => s.id === progress.currentStageId) || COURSE_STAGES[0];
  let currentLesson = currentStage.lessons.find(l => l.id === progress.currentLessonId) || currentStage.lessons[0];

  // Stage progress
  const stageCompletedCount = currentStage.lessons.filter(l => progress.completedLessonIds.includes(l.id)).length;
  const stagePercentage = Math.round((stageCompletedCount / currentStage.lessons.length) * 100);

  // Next lesson
  const currentLessonIdx = currentStage.lessons.findIndex(l => l.id === currentLesson.id);
  const nextLesson = currentStage.lessons[currentLessonIdx + 1];

  // Icon mapping
  const getStageIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-indigo-400" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-emerald-400" />;
      case 'Code': return <Code className="w-5 h-5 text-sky-400" />;
      case 'Network': return <Network className="w-5 h-5 text-amber-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-rose-400" />;
      case 'FlaskConical': return <ShieldCheck className="w-5 h-5 text-purple-400" />;
      default: return <BookOpen className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Master Course Roadmap Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold mb-2">
          MASTER CURRICULUM ARCHITECTURE & CAREER PROGRESSION
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs">
          {[
            { num: 1, name: 'Hardware', sub: 'Von Neumann' },
            { num: 2, name: 'OS & Linux', sub: 'Kernel & Shell' },
            { num: 3, name: 'Programming', sub: 'Python & C' },
            { num: 4, name: 'Networking', sub: 'TCP/IP & Packets' },
            { num: 5, name: 'Cybersecurity', sub: 'CIA & Crypto' },
            { num: 6, name: 'Practical Labs', sub: 'Audit & CTF' },
            { num: 7, name: 'Advanced Threat', sub: 'AD & Hardening' },
          ].map((st, idx) => {
            const isStageActive = currentStage.number === st.num;
            return (
              <div
                key={st.num}
                className={`p-2.5 rounded-lg border transition-all ${
                  isStageActive
                    ? 'bg-indigo-950/80 border-indigo-500 shadow-md ring-1 ring-indigo-500'
                    : 'bg-slate-950 border-slate-800/80 text-slate-400'
                }`}
              >
                <div className="text-[10px] font-mono text-slate-500">STAGE {st.num}</div>
                <div className="font-bold text-white text-xs mt-0.5">{st.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{st.sub}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Continue Learning Primary Hero Card */}
      <div className="bg-gradient-to-r from-indigo-950/90 via-slate-900 to-slate-900 border border-indigo-900/60 rounded-xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-[11px] font-mono font-bold text-indigo-400 uppercase tracking-wider">
            CONTINUE LEARNING · YOUR CURRENT POSITION
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {currentLesson.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
            {currentLesson.summary}
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
            <span className="font-mono text-indigo-300">{currentStage.title}</span>
            <span>·</span>
            <span>{currentLesson.estimatedMinutes} mins remaining</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => onNavigateToLesson(currentStage.id, currentLesson.id)}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            Resume Lesson <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenAiTutor}
            className="px-4 py-3 bg-slate-800 hover:bg-slate-750 text-indigo-300 rounded-xl font-semibold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" /> Consult Mentor
          </button>
        </div>
      </div>

      {/* Progress & Study Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Progress */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md">
          <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
            Overall Course Progress
          </div>
          <div className="text-2xl font-black text-white mt-1 flex items-baseline gap-2">
            <span>{overallPercentage}%</span>
            <span className="text-xs font-normal text-slate-500 font-mono">
              ({completedCount}/{totalLessons} lessons)
            </span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full mt-3 overflow-hidden">
            <div
              style={{ width: `${overallPercentage}%` }}
              className="bg-indigo-500 h-full rounded-full transition-all duration-500"
            />
          </div>
        </div>

        {/* Current Stage Progress */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md">
          <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
            Current Stage Progress
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-1 flex items-baseline gap-2">
            <span>{stagePercentage}%</span>
            <span className="text-xs font-normal text-slate-500 font-mono">
              ({stageCompletedCount}/{currentStage.lessons.length})
            </span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full mt-3 overflow-hidden">
            <div
              style={{ width: `${stagePercentage}%` }}
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
            />
          </div>
        </div>

        {/* Practical Security Labs */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md">
          <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
            Security Labs Verified
          </div>
          <div className="text-2xl font-black text-sky-400 mt-1 flex items-baseline gap-2">
            <span>{progress.completedLabIds.length}</span>
            <span className="text-xs font-normal text-slate-500 font-mono">
              of {PRACTICAL_LABS.length} labs
            </span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full mt-3 overflow-hidden">
            <div
              style={{ width: `${(progress.completedLabIds.length / PRACTICAL_LABS.length) * 100}%` }}
              className="bg-sky-500 h-full rounded-full transition-all duration-500"
            />
          </div>
        </div>

        {/* Estimated Time Remaining */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md">
          <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
            Curriculum Depth
          </div>
          <div className="text-2xl font-black text-amber-400 mt-1">
            7 Stages
          </div>
          <div className="text-[11px] text-slate-500 mt-2 font-mono">
            ~120 Hours Total Mastery
          </div>
        </div>
      </div>

      {/* Stage Roadmap Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Full Academy Stage Curriculum</h3>
          <span className="text-xs text-slate-400">Click any stage to browse lessons</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COURSE_STAGES.map(stage => {
            const stageCompleted = stage.lessons.filter(l => progress.completedLessonIds.includes(l.id)).length;
            const pct = Math.round((stageCompleted / stage.lessons.length) * 100);
            const isCurr = stage.id === currentStage.id;

            return (
              <div
                key={stage.id}
                onClick={() => onNavigateToStage(stage.id)}
                className={`p-5 rounded-xl border cursor-pointer transition-all hover:border-slate-700 bg-slate-900 ${
                  isCurr ? 'ring-1 ring-indigo-500 border-indigo-800' : 'border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
                      {getStageIcon(stage.iconName)}
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider">
                        STAGE {stage.number} · {stage.difficulty}
                      </div>
                      <h4 className="text-sm font-bold text-white mt-0.5">{stage.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-500 shrink-0 mt-1" />
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>{stage.lessons.length} Lessons · {stage.estimatedTime}</span>
                  <span className={pct === 100 ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                    {pct}% complete
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
