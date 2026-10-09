import React, { useState } from 'react';
import { Bookmark, FileText, Trash2, ExternalLink, Edit3, Save } from 'lucide-react';
import { COURSE_STAGES } from '../../data/curriculum';

interface NotesBookmarksViewProps {
  bookmarks: string[];
  notes: Record<string, string>;
  onRemoveBookmark: (lessonId: string) => void;
  onSaveNote: (lessonId: string, note: string) => void;
  onNavigateToLesson: (stageId: string, lessonId: string) => void;
}

export const NotesBookmarksView: React.FC<NotesBookmarksViewProps> = ({
  bookmarks,
  notes,
  onRemoveBookmark,
  onSaveNote,
  onNavigateToLesson
}) => {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'notes'>('bookmarks');
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>('');

  // Find lesson details
  const getLessonInfo = (lessonId: string) => {
    for (const st of COURSE_STAGES) {
      const found = st.lessons.find(l => l.id === lessonId);
      if (found) return { stage: st, lesson: found };
    }
    return null;
  };

  const handleStartEdit = (lessonId: string, currentNote: string) => {
    setEditingLessonId(lessonId);
    setEditText(currentNote);
  };

  const handleSaveEdit = (lessonId: string) => {
    onSaveNote(lessonId, editText);
    setEditingLessonId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-indigo-400" />
              Personal Study Vault: Bookmarks & Notes
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Persistent study resources, saved textbook lessons, and custom annotations attached to your curriculum.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg text-xs">
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'bookmarks' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" /> Bookmarks ({bookmarks.length})
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'notes' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Lesson Notes ({Object.keys(notes).length})
            </button>
          </div>
        </div>
      </div>

      {/* Bookmarks Tab */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-3">
          {bookmarks.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/60 rounded-xl border border-slate-800 text-slate-500 text-xs">
              No bookmarked lessons yet. Click the bookmark icon on any lesson page to save it for quick reference!
            </div>
          ) : (
            bookmarks.map(bId => {
              const info = getLessonInfo(bId);
              if (!info) return null;
              return (
                <div
                  key={bId}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                >
                  <div>
                    <div className="text-[11px] font-mono text-indigo-400 font-semibold uppercase tracking-wider">
                      {info.stage.title}
                    </div>
                    <h3 className="text-sm font-bold text-white mt-0.5">{info.lesson.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">{info.lesson.summary}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onNavigateToLesson(info.stage.id, info.lesson.id)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      Study Lesson <ExternalLink className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onRemoveBookmark(bId)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded hover:bg-slate-800 transition-colors"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Notes Tab */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          {Object.entries(notes).length === 0 ? (
            <div className="text-center py-12 bg-slate-900/60 rounded-xl border border-slate-800 text-slate-500 text-xs">
              No notes written yet. While studying any lesson, use the Notes drawer to write personal summaries and code snippets.
            </div>
          ) : (
            Object.entries(notes).map(([lessonId, noteText]) => {
              const info = getLessonInfo(lessonId);
              const isEditing = editingLessonId === lessonId;

              return (
                <div
                  key={lessonId}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
                    <div>
                      <span className="text-[11px] text-indigo-400 font-mono uppercase tracking-wider block">
                        {info?.stage.title || 'Course Stage'}
                      </span>
                      <h3 className="text-sm font-bold text-white">
                        {info?.lesson.title || lessonId}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      {info && (
                        <button
                          onClick={() => onNavigateToLesson(info.stage.id, info.lesson.id)}
                          className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 mr-2"
                        >
                          Go to Lesson <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                      {!isEditing ? (
                        <button
                          onClick={() => handleStartEdit(lessonId, noteText)}
                          className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                          title="Edit Note"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSaveEdit(lessonId)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs flex items-center gap-1"
                        >
                          <Save className="w-3 h-3" /> Save
                        </button>
                      )}
                    </div>
                  </div>

                  {isEditing ? (
                    <textarea
                      rows={4}
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-white font-mono focus:border-indigo-500 focus:outline-none"
                    />
                  ) : (
                    <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800/80 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
                      {noteText}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
