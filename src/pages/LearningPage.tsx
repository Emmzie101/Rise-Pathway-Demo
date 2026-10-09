import React, { useState, useEffect } from 'react';
import { PageView, WeeklyLearningLesson } from '../types';
import { initialWeeklyLessons } from '../data/mockData';
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Check,
  ExternalLink,
  Plus,
  Edit2,
  Calendar,
  Layers,
  ShieldCheck,
  FolderOpen,
} from 'lucide-react';
import { fetchLessons, toggleLessonComplete, saveStaffLesson } from '../services/api';

interface LearningPageProps {
  onNavigate: (view: PageView) => void;
  userRole?: string;
}

export const LearningPage: React.FC<LearningPageProps> = ({
  onNavigate,
  userRole = 'fellow',
}) => {
  const [lessons, setLessons] = useState<WeeklyLearningLesson[]>(initialWeeklyLessons);
  const [activeStage, setActiveStage] = useState<'All' | 'Stabilise' | 'Decentre' | 'Equip' | 'Act'>('All');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Partial<WeeklyLearningLesson> | null>(null);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  const isStaffOrAdmin = userRole === 'staff' || userRole === 'admin';

  useEffect(() => {
    fetchLessons().then((data) => {
      if (data && data.length > 0) setLessons(data);
    });
  }, []);

  const handleToggle = async (id: string) => {
    const updated = lessons.map((l) => (l.id === id ? { ...l, completed: !l.completed } : l));
    setLessons(updated);
    await toggleLessonComplete(id);
    triggerToast('Lesson progress updated!');
  };

  const handleOpenEdit = (lesson?: WeeklyLearningLesson) => {
    if (lesson) {
      setEditingLesson({ ...lesson });
    } else {
      setEditingLesson({
        weekNumber: lessons.length + 1,
        stage: 'Equip',
        title: '',
        description: '',
        durationMinutes: 20,
        googleDriveLink: '',
        assignmentTask: '',
        deadline: 'End of Week',
        isUnlocked: true,
        isPublished: true,
      });
    }
    setShowEditModal(true);
  };

  const handleSaveLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLesson || !editingLesson.title) return;

    const saved = await saveStaffLesson(editingLesson);
    setLessons((prev) => {
      const idx = prev.findIndex((l) => l.id === saved.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = saved;
        return copy;
      }
      return [...prev, saved];
    });

    setShowEditModal(false);
    setEditingLesson(null);
    triggerToast('Learning resource saved and published!');
  };

  const triggerToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 2500);
  };

  const filteredLessons = lessons.filter((l) => {
    if (activeStage === 'All') return true;
    return l.stage === activeStage;
  });

  const completedCount = lessons.filter((l) => l.completed).length;

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#F8FAF8] py-6 sm:py-8 lg:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Toast */}
        {saveToast && (
          <div className="fixed top-20 right-6 z-50 bg-[#074626] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold animate-fadeIn border border-[#0B6B3A]">
            <CheckCircle2 className="w-4 h-4 text-[#F3C623]" />
            <span>{saveToast}</span>
          </div>
        )}

        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#0B6B3A] text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
              <BookOpen className="w-3.5 h-3.5 text-[#0B6B3A]" />
              <span>Growth Beyond Grades Curriculum</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
              Weekly Learning Hub
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl font-normal leading-relaxed">
              Curated weekly guides, Google Drive templates, and practical milestone assignments structured across the 4 transition stages.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {isStaffOrAdmin && (
              <button
                onClick={() => handleOpenEdit()}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#0B6B3A] hover:bg-[#074626] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Weekly Resource</span>
              </button>
            )}

            <div className="p-3 bg-[#FAF9F5] rounded-2xl border border-gray-200 text-right">
              <span className="text-[10px] font-bold text-gray-500 uppercase block">Curriculum Pace</span>
              <span className="text-sm font-black text-gray-950">
                {completedCount} of {lessons.length} Completed
              </span>
            </div>
          </div>
        </div>

        {/* Stage Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {(['All', 'Stabilise', 'Decentre', 'Equip', 'Act'] as const).map((stg) => (
            <button
              key={stg}
              onClick={() => setActiveStage(stg)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeStage === stg
                  ? 'bg-[#0B6B3A] text-white shadow-xs'
                  : 'bg-white hover:bg-emerald-50 text-gray-700 border border-gray-200'
              }`}
            >
              {stg === 'All' ? 'All 4 Stages' : `Stage: ${stg}`}
            </button>
          ))}
        </div>

        {/* Weekly Lessons Grid */}
        <div className="space-y-4">
          {filteredLessons.map((lesson) => {
            const isLocked = !lesson.isUnlocked && !isStaffOrAdmin;

            return (
              <div
                key={lesson.id}
                className={`p-6 rounded-3xl border transition-all ${
                  isLocked
                    ? 'bg-gray-50/80 border-gray-200 opacity-75'
                    : lesson.completed
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-white border-gray-200 shadow-2xs hover:border-emerald-300'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2.5 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-[#074626] text-white">
                        Week {lesson.weekNumber}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FEF7DA] text-[#074626] border border-[#F3C623]">
                        {lesson.stage}
                      </span>
                      <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>~{lesson.durationMinutes} mins</span>
                      </span>
                      {lesson.completed && (
                        <span className="text-xs font-bold text-[#0B6B3A] flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Completed</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-gray-950">{lesson.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
                      {lesson.description}
                    </p>

                    {/* Assignment description */}
                    {lesson.assignmentTask && (
                      <div className="p-3 bg-[#FAF9F5] rounded-2xl border border-gray-200 text-xs text-gray-800 space-y-1">
                        <span className="font-bold text-[#0B6B3A] uppercase tracking-wider text-[10px] block">
                          Weekly Deliverable Task:
                        </span>
                        <p>{lesson.assignmentTask}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions Column */}
                  <div className="flex flex-col items-start md:items-end justify-between gap-3 shrink-0 pt-2 md:pt-0">
                    {isLocked ? (
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-200/80 px-4 py-2 rounded-2xl">
                        <Lock className="w-4 h-4" />
                        <span>{lesson.releaseDate || 'Unlocks Next Week'}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {lesson.googleDriveLink && (
                          <a
                            href={lesson.googleDriveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-300 hover:bg-emerald-50 text-[#0B6B3A] text-xs font-bold shadow-2xs"
                          >
                            <FolderOpen className="w-3.5 h-3.5" />
                            <span>Open Drive Folder</span>
                            <ExternalLink className="w-3 h-3 text-gray-400" />
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() => handleToggle(lesson.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            lesson.completed
                              ? 'bg-emerald-100 text-[#0B6B3A] hover:bg-emerald-200'
                              : 'bg-[#0B6B3A] hover:bg-[#074626] text-white shadow-xs'
                          }`}
                        >
                          {lesson.completed ? 'Mark as Incomplete' : 'Mark Complete'}
                        </button>
                      </div>
                    )}

                    {isStaffOrAdmin && (
                      <button
                        onClick={() => handleOpenEdit(lesson)}
                        className="text-xs text-gray-500 hover:text-[#0B6B3A] font-semibold flex items-center gap-1 cursor-pointer pt-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit Resource (Staff)</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* MODAL: STAFF LESSON EDITOR */}
        {showEditModal && editingLesson && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
            <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-950">
                  {editingLesson.id ? 'Edit Weekly Resource' : 'Add Weekly Resource'}
                </h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveLesson} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1">
                      Week Number
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={12}
                      value={editingLesson.weekNumber || 1}
                      onChange={(e) =>
                        setEditingLesson({ ...editingLesson, weekNumber: Number(e.target.value) })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1">
                      Curriculum Stage
                    </label>
                    <select
                      value={editingLesson.stage || 'Stabilise'}
                      onChange={(e) =>
                        setEditingLesson({ ...editingLesson, stage: e.target.value as any })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden"
                    >
                      <option value="Stabilise">Stabilise</option>
                      <option value="Decentre">Decentre</option>
                      <option value="Equip">Equip</option>
                      <option value="Act">Act</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1">
                    Lesson Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingLesson.title || ''}
                    onChange={(e) => setEditingLesson({ ...editingLesson, title: e.target.value })}
                    placeholder="e.g. ATS Resume Formatting & Action Verbs"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1">
                    Lesson Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingLesson.description || ''}
                    onChange={(e) =>
                      setEditingLesson({ ...editingLesson, description: e.target.value })
                    }
                    placeholder="Brief guide for fellows this week..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1">
                    Google Drive Resource Link
                  </label>
                  <input
                    type="url"
                    value={editingLesson.googleDriveLink || ''}
                    onChange={(e) =>
                      setEditingLesson({ ...editingLesson, googleDriveLink: e.target.value })
                    }
                    placeholder="https://drive.google.com/..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1">
                    Assignment / Deliverable Task
                  </label>
                  <input
                    type="text"
                    value={editingLesson.assignmentTask || ''}
                    onChange={(e) =>
                      setEditingLesson({ ...editingLesson, assignmentTask: e.target.value })
                    }
                    placeholder="e.g. Submit 1 case study link to My Plan"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingLesson.isUnlocked ?? true}
                      onChange={(e) =>
                        setEditingLesson({ ...editingLesson, isUnlocked: e.target.checked })
                      }
                      className="rounded-sm accent-[#0B6B3A]"
                    />
                    <span>Unlocked for fellows immediately</span>
                  </label>
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-xs text-gray-600 hover:text-gray-900 font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#074626] cursor-pointer"
                  >
                    Save & Publish
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
