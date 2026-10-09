import React, { useState } from 'react';
import { GLOSSARY_TERMS } from '../../data/glossary';
import { BookA, Search, Tag, ExternalLink } from 'lucide-react';

interface GlossaryViewProps {
  onNavigateToStage: (stageId: string) => void;
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({ onNavigateToStage }) => {
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Hardware', 'Operating Systems & Linux', 'Networking', 'Cybersecurity', 'Cryptography'];

  const filtered = GLOSSARY_TERMS.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery = item.term.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.definition.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.deepExplanation.toLowerCase().includes(filterQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <BookA className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">Technical Curriculum Glossary</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Definitive architectural definitions and deep mechanical explanations for core computer science, systems, networking, and cybersecurity terminology.
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={e => setFilterQuery(e.target.value)}
              placeholder="Search terms..."
              className="bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 w-48 sm:w-64"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-800">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(item => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-3 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 block mb-1">
                  {item.category}
                </span>
                <h3 className="text-base font-bold text-white">{item.term}</h3>
              </div>

              <button
                onClick={() => onNavigateToStage(item.lessonStageId)}
                className="text-[11px] text-slate-400 hover:text-indigo-300 flex items-center gap-1 shrink-0 p-1 rounded hover:bg-slate-800"
                title="View in Course"
              >
                <span>View Stage</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="text-xs text-slate-200 font-medium leading-relaxed bg-slate-950/70 p-3 rounded-lg border border-slate-800/80">
              {item.definition}
            </div>

            <div>
              <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Deep Mechanical Breakdown:
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.deepExplanation}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="text-slate-500 flex items-center gap-1">
                <Tag className="w-3 h-3" /> Related:
              </span>
              {item.relatedTerms.map(rt => (
                <span
                  key={rt}
                  className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]"
                >
                  {rt}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-500 text-xs">
          No glossary terms match your search query "{filterQuery}".
        </div>
      )}
    </div>
  );
};
