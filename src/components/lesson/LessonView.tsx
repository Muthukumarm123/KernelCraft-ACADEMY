import React, { useState } from 'react';
import { Lesson, InteractiveQuestion } from '../../types';
import { PermissionsCalculator } from '../visualizers/PermissionsCalculator';
import { CpuCycleSimulator } from '../visualizers/CpuCycleSimulator';
import { BinaryDataSandbox } from '../visualizers/BinaryDataSandbox';
import { SubnetCalculator } from '../visualizers/SubnetCalculator';
import { PacketJourneySimulator } from '../visualizers/PacketJourneySimulator';
import { CryptoSandbox } from '../visualizers/CryptoSandbox';
import { LinuxTerminal } from '../terminal/LinuxTerminal';
import {
  Clock, CheckCircle, Bookmark, Sparkles, ChevronRight, ChevronLeft,
  Copy, Check, AlertTriangle, HelpCircle, ArrowRight, Lightbulb, Shield,
  BookOpen, Edit3, Save, Compass
} from 'lucide-react';

interface LessonViewProps {
  lesson: Lesson;
  stageNumber: number;
  stageTitle: string;
  isCompleted: boolean;
  isBookmarked: boolean;
  currentNote: string;
  onToggleBookmark: () => void;
  onSaveNote: (note: string) => void;
  onCompleteLesson: () => void;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  onOpenAiTutor: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  stageNumber,
  stageTitle,
  isCompleted,
  isBookmarked,
  currentNote,
  onToggleBookmark,
  onSaveNote,
  onCompleteLesson,
  onNextLesson,
  onPrevLesson,
  onOpenAiTutor,
}) => {
  // Question answering state: questionId -> { selected: string, isCorrect: boolean, submitted: boolean }
  const [answers, setAnswers] = useState<Record<string, { answer: string; isCorrect: boolean; submitted: boolean }>>({});
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Note editor toggle
  const [isEditingNote, setIsEditingNote] = useState<boolean>(false);
  const [noteContent, setNoteContent] = useState<string>(currentNote || '');

  // Checkpoint passed state
  const [checkpointPassed, setCheckpointPassed] = useState<boolean>(isCompleted);

  // Copy code helper
  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // Submit question answer
  const handleAnswerSubmit = (q: InteractiveQuestion, answerValue: string) => {
    const isCorrect = q.type === 'multiple-choice' || q.type === 'find-mistake' || q.type === 'command-builder'
      ? answerValue.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()
      : answerValue.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim();

    setAnswers(prev => ({
      ...prev,
      [q.id]: { answer: answerValue, isCorrect, submitted: true }
    }));

    if (lesson.checkpoint && lesson.checkpoint.question.id === q.id && isCorrect) {
      setCheckpointPassed(true);
    }
  };

  const handleSaveNoteSubmit = () => {
    onSaveNote(noteContent);
    setIsEditingNote(false);
  };

  // Render question card
  const renderQuestionBox = (q: InteractiveQuestion, isQuickCheck = false) => {
    const state = answers[q.id];
    const isSubmitted = state?.submitted;
    const isCorrect = state?.isCorrect;

    return (
      <div className={`p-4 rounded-xl border my-4 transition-all ${
        isQuickCheck
          ? 'bg-indigo-950/40 border-indigo-800/80'
          : 'bg-slate-950 border-slate-800'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 text-indigo-400">
            {isQuickCheck ? '⚡ Quick Check — 30 Seconds' : '🧠 Knowledge Check'}
          </span>
          {isSubmitted && (
            <span className={`text-xs font-semibold flex items-center gap-1 ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isCorrect ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </span>
          )}
        </div>

        <p className="text-xs sm:text-sm font-semibold text-slate-100 mb-3 leading-snug">
          {q.question}
        </p>

        {/* Options for Multiple Choice */}
        {q.options && (
          <div className="space-y-2 mb-3">
            {q.options.map(opt => {
              const selected = state?.answer === opt.id;
              return (
                <button
                  key={opt.id}
                  disabled={isSubmitted && isCorrect}
                  onClick={() => handleAnswerSubmit(q, opt.id)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs font-medium transition-all flex items-start gap-2.5 ${
                    selected
                      ? isCorrect
                        ? 'bg-emerald-950 border border-emerald-600 text-emerald-200'
                        : 'bg-rose-950 border border-rose-600 text-rose-200'
                      : 'bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <span className="w-5 h-5 rounded-md bg-slate-800 text-slate-400 flex items-center justify-center text-[10px] uppercase font-bold shrink-0 mt-0.5">
                    {opt.id}
                  </span>
                  <span className="leading-snug">{opt.text}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Text Input for type-answer */}
        {q.type === 'type-answer' && !q.options && (
          <div className="mb-3 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your answer here..."
              disabled={isSubmitted && isCorrect}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleAnswerSubmit(q, (e.target as HTMLInputElement).value);
                }
              }}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={e => {
                const input = (e.currentTarget.previousElementSibling as HTMLInputElement).value;
                handleAnswerSubmit(q, input);
              }}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
            >
              Submit
            </button>
          </div>
        )}

        {/* Explanation Feedback */}
        {isSubmitted && (
          <div className={`p-3 rounded-lg text-xs mt-3 border leading-relaxed ${
            isCorrect
              ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-300'
              : 'bg-rose-950/60 border-rose-800/80 text-rose-300'
          }`}>
            <p>
              <strong>{isCorrect ? 'Why this is correct:' : 'Why this answer was incorrect:'}</strong> {q.explanation}
            </p>
            {!isCorrect && (
              <p className="mt-1 text-[11px] text-slate-300">
                Try again or ask the AI Tutor for a clarifying hint!
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Lesson Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-3">
          <div className="flex items-center gap-2 text-indigo-400 font-mono font-semibold uppercase tracking-wider">
            <span>Stage {stageNumber}</span>
            <span>·</span>
            <span>{stageTitle}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800 font-mono text-[11px]">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              {lesson.estimatedMinutes} min study
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
              {lesson.difficulty}
            </span>
            <button
              onClick={onToggleBookmark}
              className={`p-1.5 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'bg-indigo-900/60 text-indigo-300 border-indigo-700'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Bookmark Lesson'}
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
          {lesson.title}
        </h1>
        <p className="text-sm text-slate-300 mt-2.5 leading-relaxed">
          {lesson.summary}
        </p>

        {/* Prerequisites & Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pt-4 border-t border-slate-800 text-xs">
          <div>
            <h4 className="font-semibold text-slate-400 uppercase tracking-wider mb-2">Prerequisites</h4>
            <ul className="space-y-1 text-slate-300">
              {lesson.prerequisites.map((p, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-indigo-400">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-400 uppercase tracking-wider mb-2">Learning Objectives</h4>
            <ul className="space-y-1 text-slate-300">
              {lesson.objectives.map((o, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Embedded Interactive Tool if lesson specifies one */}
      {lesson.interactiveTool === 'permissions-calculator' && <PermissionsCalculator />}
      {lesson.interactiveTool === 'cpu-simulator' && <CpuCycleSimulator />}
      {lesson.interactiveTool === 'binary-sandbox' && <BinaryDataSandbox />}
      {lesson.interactiveTool === 'subnet-calculator' && <SubnetCalculator />}
      {lesson.interactiveTool === 'packet-journey' && <PacketJourneySimulator />}
      {lesson.interactiveTool === 'crypto-sandbox' && <CryptoSandbox />}
      {lesson.interactiveTool === 'terminal' && <LinuxTerminal />}

      {/* Detailed Content Sections */}
      <div className="space-y-6">
        {lesson.sections.map((section, sIdx) => (
          <div
            key={section.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-4"
          >
            <h2 className="text-xl font-bold text-white tracking-tight border-b border-slate-800 pb-2">
              {section.title}
            </h2>

            {/* Main content paragraphs */}
            <div className="text-sm text-slate-200 leading-relaxed space-y-3 whitespace-pre-line font-sans">
              {section.content}
            </div>

            {/* Analogy Box */}
            {section.analogy && (
              <div className="p-3.5 bg-indigo-950/30 rounded-lg border border-indigo-900/50 flex items-start gap-2.5 text-xs text-indigo-200">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 block mb-0.5">Real-World Analogy:</strong>
                  <p className="leading-relaxed">{section.analogy}</p>
                </div>
              </div>
            )}

            {/* Code Blocks with Copy button */}
            {section.codeBlocks?.map((cb, cbIdx) => (
              <div key={cbIdx} className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden font-mono text-xs">
                {cb.description && (
                  <div className="bg-slate-900/80 px-3.5 py-1.5 border-b border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>{cb.description}</span>
                    <span className="uppercase text-slate-500">{cb.language}</span>
                  </div>
                )}
                <div className="p-3.5 relative group">
                  <pre className="text-sky-300 overflow-x-auto leading-relaxed">{cb.code}</pre>
                  <button
                    onClick={() => handleCopyCode(cb.code, `cb-${sIdx}-${cbIdx}`)}
                    className="absolute top-2.5 right-2.5 p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 text-[11px] flex items-center gap-1 transition-colors border border-slate-700 opacity-80 group-hover:opacity-100"
                  >
                    {copiedCodeId === `cb-${sIdx}-${cbIdx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {copiedCodeId === `cb-${sIdx}-${cbIdx}` ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            ))}

            {/* Deep Dive Section */}
            {section.deepDive && (
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-1.5">
                <div className="font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-sky-400" />
                  🔬 Deep Dive: {section.deepDive.title}
                </div>
                <p className="text-slate-300 leading-relaxed font-sans">
                  {section.deepDive.content}
                </p>
              </div>
            )}

            {/* Common Mistakes */}
            {section.commonMistakes && section.commonMistakes.length > 0 && (
              <div className="p-4 bg-rose-950/20 rounded-lg border border-rose-900/40 text-xs space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> Common Mistakes & Pitfalls:
                </h4>
                {section.commonMistakes.map((cm, cmIdx) => (
                  <div key={cmIdx} className="space-y-1 pt-1 border-t border-rose-900/30 first:border-0 first:pt-0">
                    <p className="text-rose-200 font-semibold">❌ Mistake: {cm.mistake}</p>
                    <p className="text-slate-300"><strong>Why it happens:</strong> {cm.whyItHappens}</p>
                    <p className="text-emerald-300"><strong>Correction:</strong> {cm.correction}</p>
                  </div>
                ))}
              </div>
            )}

            {/* In-Section Quick Check */}
            {section.quickCheck && renderQuestionBox(section.quickCheck, true)}
          </div>
        ))}
      </div>

      {/* Interactive Mid-Lesson Questions */}
      {lesson.interactiveQuestions.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
            Practice & Conceptual Checks
          </h3>
          {lesson.interactiveQuestions.map(q => renderQuestionBox(q, false))}
        </div>
      )}

      {/* Practical Exercises */}
      {lesson.exercises.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
            Hands-on Exercise
          </h3>
          {lesson.exercises.map(ex => (
            <div key={ex.id} className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-2">
              <h4 className="font-bold text-white text-sm">{ex.title}</h4>
              <p className="text-slate-300 leading-relaxed">{ex.instruction}</p>
              {ex.suggestedCommand && (
                <div className="bg-slate-900 p-2.5 rounded font-mono text-emerald-400 flex items-center justify-between">
                  <span>{ex.suggestedCommand}</span>
                  <button
                    onClick={() => handleCopyCode(ex.suggestedCommand!, `ex-${ex.id}`)}
                    className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    {copiedCodeId === `ex-${ex.id}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    Copy
                  </button>
                </div>
              )}
              <p className="text-slate-400 text-[11px] pt-1">
                <strong>Why this works:</strong> {ex.explanation}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Checkpoint before progressing */}
      {lesson.checkpoint && (
        <div className="bg-slate-900 border-2 border-indigo-700/60 rounded-xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Progression Checkpoint</h3>
          </div>
          <p className="text-xs text-slate-300">{lesson.checkpoint.prompt}</p>
          {renderQuestionBox(lesson.checkpoint.question, false)}
        </div>
      )}

      {/* End-of-Lesson Assessment Quiz */}
      {lesson.endOfLessonQuiz.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2 flex items-center justify-between">
            <span>End-of-Lesson Assessment</span>
            <span className="text-xs font-normal text-slate-400">Validate your technical understanding</span>
          </h3>
          {lesson.endOfLessonQuiz.map(q => renderQuestionBox(q, false))}
        </div>
      )}

      {/* Personal Lesson Notes Area */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            Personal Notes for This Lesson
          </h4>
          {!isEditingNote ? (
            <button
              onClick={() => setIsEditingNote(true)}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Note
            </button>
          ) : (
            <button
              onClick={handleSaveNoteSubmit}
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs flex items-center gap-1 font-semibold"
            >
              <Save className="w-3 h-3" /> Save Note
            </button>
          )}
        </div>

        {isEditingNote ? (
          <textarea
            rows={3}
            value={noteContent}
            onChange={e => setNoteContent(e.target.value)}
            placeholder="Write reminders, personal summaries, or key commands..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-white font-mono focus:border-indigo-500 focus:outline-none"
          />
        ) : (
          <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80 text-xs text-slate-300 font-mono">
            {noteContent || (
              <span className="text-slate-500 italic">No notes yet. Click "Edit Note" to jot down thoughts.</span>
            )}
          </div>
        )}
      </div>

      {/* Lesson Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800">
        <div className="flex items-center gap-2">
          {onPrevLesson && (
            <button
              onClick={onPrevLesson}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-lg text-xs font-semibold border border-slate-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Lesson
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAiTutor}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 rounded-lg text-xs font-semibold border border-indigo-800 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Ask AI Mentor
          </button>

          <button
            onClick={onCompleteLesson}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-md ${
              isCompleted
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            {isCompleted ? 'Completed ✓' : 'Mark as Completed'}
          </button>

          {onNextLesson && (
            <button
              onClick={onNextLesson}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Next Lesson <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
