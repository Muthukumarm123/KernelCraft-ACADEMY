import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Terminal, Shield, ArrowRight } from 'lucide-react';
import { COURSE_STAGES } from '../../data/curriculum';
import { GLOSSARY_TERMS } from '../../data/glossary';
import { PRACTICAL_LABS } from '../../data/labs';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (stageId: string, lessonId: string) => void;
  onSelectLab: (labId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson,
  onSelectLab
}) => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // toggle modal
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search lessons
  const matchingLessons: Array<{ stageId: string; lessonId: string; title: string; summary: string; matchType: string }> = [];
  if (q.length > 1) {
    COURSE_STAGES.forEach(st => {
      st.lessons.forEach(l => {
        const titleMatch = l.title.toLowerCase().includes(q);
        const summaryMatch = l.summary.toLowerCase().includes(q);
        const sectionMatch = l.sections.some(s => s.title.toLowerCase().includes(q) || s.content.toLowerCase().includes(q));
        if (titleMatch || summaryMatch || sectionMatch) {
          matchingLessons.push({
            stageId: st.id,
            lessonId: l.id,
            title: l.title,
            summary: l.summary,
            matchType: titleMatch ? 'Title' : sectionMatch ? 'Content / Code' : 'Summary'
          });
        }
      });
    });
  }

  // Search glossary terms
  const matchingTerms = q.length > 1
    ? GLOSSARY_TERMS.filter(t => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q))
    : [];

  // Search labs
  const matchingLabs = q.length > 1
    ? PRACTICAL_LABS.filter(lab => lab.title.toLowerCase().includes(q) || lab.objective.toLowerCase().includes(q) || lab.category.toLowerCase().includes(q))
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-start justify-center p-4 pt-16">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search commands (chmod, ls), terms (ALU, CIDR), lessons, or topics..."
            autoFocus
            className="flex-1 bg-transparent border-0 outline-none text-white text-sm placeholder:text-slate-500"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[11px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            ESC
          </span>
        </div>

        {/* Results Scroll View */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {q.length <= 1 && (
            <div className="text-center py-8 text-xs text-slate-500">
              <p>Type 2 or more characters to search the entire curriculum, commands, and glossary.</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['chmod', 'stat', 'CPU registers', 'CIDR', 'SYN-ACK', 'salting', 'IDOR', 'SUID'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono text-[11px]"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Lessons Matches */}
          {matchingLessons.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Course Lessons ({matchingLessons.length})
              </div>
              <div className="space-y-1.5">
                {matchingLessons.slice(0, 5).map(item => (
                  <button
                    key={item.lessonId}
                    onClick={() => {
                      onSelectLesson(item.stageId, item.lessonId);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800/80 border border-slate-800/80 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-indigo-300 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {item.summary}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded shrink-0 ml-2">
                      {item.matchType}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Labs Matches */}
          {matchingLabs.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> Practical Labs ({matchingLabs.length})
              </div>
              <div className="space-y-1.5">
                {matchingLabs.map(lab => (
                  <button
                    key={lab.id}
                    onClick={() => {
                      onSelectLab(lab.id);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800/80 border border-slate-800/80 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-emerald-300 transition-colors">
                        {lab.title}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {lab.objective}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded shrink-0 ml-2">
                      {lab.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Glossary Terms Matches */}
          {matchingTerms.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" /> Technical Glossary Terms ({matchingTerms.length})
              </div>
              <div className="space-y-1.5">
                {matchingTerms.slice(0, 4).map(term => (
                  <div
                    key={term.id}
                    className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs"
                  >
                    <div className="font-bold text-sky-300">{term.term}</div>
                    <div className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
                      {term.definition}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {q.length > 1 && matchingLessons.length === 0 && matchingTerms.length === 0 && matchingLabs.length === 0 && (
            <div className="text-center py-8 text-xs text-slate-500">
              No matching curriculum topics found for "{query}". Try searching for standard Linux commands like "ls", "chmod", or concepts like "CPU", "DNS", "packet".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
