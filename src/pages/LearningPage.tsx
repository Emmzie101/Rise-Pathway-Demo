import React, { useState } from 'react';
import { PageView, LearningModule } from '../types';
import { sampleLearningModules } from '../data/mockData';
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Circle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  Zap,
  Play,
  Pause,
  Volume2,
  Award,
  Flame,
  Search,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  MessageCircle,
  Share2,
  Sliders,
  ExternalLink,
  ThumbsUp,
  Bookmark,
  Calendar,
  Grid,
  List,
} from 'lucide-react';

interface LearningPageProps {
  onNavigate: (view: PageView) => void;
}

export const LearningPage: React.FC<LearningPageProps> = ({ onNavigate }) => {
  const [modules, setModules] = useState<LearningModule[]>(sampleLearningModules);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'dashboard' | 'lesson'>('dashboard');
  const [filterTab, setFilterTab] = useState<'all' | 'in_progress' | 'completed'>('all');

  const activeModule = modules[activeModuleIndex];

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<string>('1.0x');

  // Lesson task reflection
  const [reflectionAnswer, setReflectionAnswer] = useState('');
  const [taskSaved, setTaskSaved] = useState(false);

  // Accordion open/close state for lesson syllabus
  const [openSection, setOpenSection] = useState<number>(1);

  const completedCount = modules.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / (modules.length || 1)) * 100);

  const handleOpenLesson = (index: number) => {
    setActiveModuleIndex(index);
    setViewMode('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleComplete = (index: number) => {
    const updated = [...modules];
    updated[index] = { ...updated[index], completed: !updated[index].completed };
    setModules(updated);
    setTaskSaved(true);
    setTimeout(() => setTaskSaved(false), 2500);
  };

  const filteredModules = modules.filter((m) => {
    if (filterTab === 'completed') return m.completed;
    if (filterTab === 'in_progress') return !m.completed;
    return true;
  });

  const courseCovers = [
    '/images/learning/course_networking.jpg',
    '/images/learning/course_portfolio.jpg',
    '/images/learning/course_interview.jpg',
    '/images/learning/course_deliverables.jpg',
  ];

  const courseCategories = [
    'NETWORKING & OUTREACH',
    'PORTFOLIO & CV WRITING',
    'INTERVIEW & PITCHING',
    'REAL WORK DELIVERABLES',
  ];

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#F8FAF8] py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* ========================================================================= */}
        {/* VIEW 1: LMS DASHBOARD & COURSE BROWSER (Inspired by EduSphere, Scholarly & Skillery) */}
        {/* ========================================================================= */}
        {viewMode === 'dashboard' ? (
          <>
            {/* HERO BANNER (Skillery & EduSphere style) */}
            <div className="bg-gradient-to-r from-[#122119] via-[#0B6B3A] to-[#122119] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full bg-[#F3C623]/15 blur-2xl pointer-events-none" />

              <div className="space-y-2 max-w-xl z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#F3C623] text-xs font-black uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>R-WEF Practice Academy</span>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                    Ready to keep learning?
                  </h1>
                  <Sparkles className="w-6 h-6 text-[#F3C623]" />
                </div>
                <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                  Short 5-minute action guides that turn into real portfolio proof. No long lectures—just practical steps.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 z-10">
                <button
                  onClick={() => handleOpenLesson(activeModuleIndex)}
                  className="px-5 py-3 rounded-2xl bg-[#F3C623] text-[#4A3319] text-xs sm:text-sm font-black hover:bg-[#ebd56e] transition-all shadow-md active:translate-y-0.5 cursor-pointer flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-[#4A3319]" />
                  <span>Resume Active Lesson</span>
                </button>
              </div>
            </div>

            {/* TOP 4 STATS ROW (EduSphere & Skillery inspired) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              
              <div className="bg-white p-5 rounded-3xl shadow-sm border border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Enrolled Courses</span>
                  <div className="text-2xl font-black text-gray-900 font-mono mt-1">4 Courses</div>
                  <p className="text-[11px] text-gray-400 mt-0.5 font-medium">Curated for Cohort 2</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0B6B3A] flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl shadow-sm border border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Completed</span>
                  <div className="text-2xl font-black text-gray-900 font-mono mt-1">{completedCount} of {modules.length}</div>
                  <p className="text-[11px] text-[#0B6B3A] mt-0.5 font-bold">{progressPercent}% Finished</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl shadow-sm border border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Learning Streak</span>
                  <div className="text-2xl font-black text-gray-900 font-mono mt-1">6 Days</div>
                  <div className="flex items-center gap-1 text-[11px] text-[#0B6B3A] mt-0.5 font-semibold">
                    <span>Active every day</span>
                    <Flame className="w-3.5 h-3.5 fill-[#F3C623] text-[#0B6B3A]" />
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#4A3319] flex items-center justify-center font-bold">
                  <Flame className="w-5 h-5 text-[#F3C623] fill-[#F3C623]" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl shadow-sm border border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Skills Verified</span>
                  <div className="text-2xl font-black text-gray-900 font-mono mt-1">+{completedCount * 50 + 100} XP</div>
                  <p className="text-[11px] text-gray-400 mt-0.5 font-medium">Sprint Badge Level 2</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0B6B3A] flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
              </div>

            </div>

            {/* FEATURED: "CONTINUE LEARNING" CARD (Image 4 Skillery Style) */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-emerald-100 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={courseCovers[activeModuleIndex % courseCovers.length]}
                  alt="Current lesson"
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shrink-0 ring-2 ring-emerald-100"
                />
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#122119] text-[#F3C623]">
                      CONTINUE LEARNING
                    </span>
                    <span className="text-xs text-gray-400 font-mono">{activeModule.durationMinutes} Mins</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-gray-900 truncate">
                    {activeModule.title}
                  </h3>
                  <p className="text-xs text-gray-500 truncate max-w-md font-medium">
                    {activeModule.description}
                  </p>
                  <div className="w-48 bg-gray-100 h-2 rounded-full overflow-hidden mt-1">
                    <div
                      style={{ width: `${activeModule.completed ? 100 : 50}%` }}
                      className="bg-[#0B6B3A] h-full rounded-full"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleOpenLesson(activeModuleIndex)}
                className="px-5 py-3 rounded-2xl bg-[#0B6B3A] hover:bg-[#08522c] text-white text-xs sm:text-sm font-black transition-all shadow-md shadow-[#0B6B3A]/20 shrink-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Resume Lesson</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* COURSE DIRECTORY & TABS (Image 3 Scholarly & Image 2 EduSphere style) */}
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black text-gray-900 tracking-tight">
                    My Course Library
                  </h2>
                  <p className="text-xs text-gray-500 font-medium">
                    Each module takes 5 minutes and includes an action exercise for your portfolio
                  </p>
                </div>

                {/* Filter tabs */}
                <div className="flex items-center bg-white p-1 rounded-2xl border border-gray-200 text-xs font-bold shadow-2xs">
                  <button
                    onClick={() => setFilterTab('all')}
                    className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                      filterTab === 'all'
                        ? 'bg-[#0B6B3A] text-white shadow-2xs font-bold'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    All ({modules.length})
                  </button>
                  <button
                    onClick={() => setFilterTab('in_progress')}
                    className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                      filterTab === 'in_progress'
                        ? 'bg-[#0B6B3A] text-white shadow-2xs font-bold'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    In Progress ({modules.length - completedCount})
                  </button>
                  <button
                    onClick={() => setFilterTab('completed')}
                    className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                      filterTab === 'completed'
                        ? 'bg-[#0B6B3A] text-white shadow-2xs font-bold'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Completed ({completedCount})
                  </button>
                </div>
              </div>

              {/* Course Cards Grid (Scholarly / EduSphere clean style) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredModules.map((course, idx) => {
                  const globalIdx = modules.findIndex((m) => m.id === course.id);
                  const isDone = course.completed;
                  const progressPct = isDone ? 100 : 50;

                  return (
                    <div
                      key={course.id}
                      onClick={() => handleOpenLesson(globalIdx)}
                      className="bg-white rounded-3xl p-4 shadow-sm border border-gray-200 hover:border-[#0B6B3A] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                    >
                      <div>
                        {/* Course Cover Image with Category Tag */}
                        <div className="relative rounded-2xl overflow-hidden aspect-16/10 bg-gray-100 mb-3.5">
                          <img
                            src={courseCovers[globalIdx % courseCovers.length]}
                            alt={course.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-2.5 left-2.5 text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-md">
                            {courseCategories[globalIdx % courseCategories.length]}
                          </span>
                          <span className="absolute bottom-2.5 right-2.5 text-[10px] font-bold font-mono px-2 py-0.5 rounded-md bg-white/90 text-gray-900 backdrop-blur-sm">
                            {course.durationMinutes} Mins
                          </span>
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-sm sm:text-base font-black text-gray-900 leading-snug line-clamp-2 group-hover:text-[#0B6B3A] transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2 mt-1 font-medium">
                          {course.description}
                        </p>

                        {/* Lessons & Quizzes info */}
                        <div className="flex items-center gap-3 text-[11px] text-gray-400 font-medium mt-3 pt-3 border-t border-gray-100">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5 text-[#0B6B3A]" />
                            <span>3 Lessons</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F3C623]" />
                            <span>1 Task</span>
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-3 space-y-1">
                          <div className="flex justify-between text-[11px] font-bold">
                            <span className="text-gray-500">Progress</span>
                            <span className={isDone ? 'text-[#0B6B3A]' : 'text-gray-700'}>{progressPct}%</span>
                          </div>
                          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${progressPct}%` }}
                              className={`h-full rounded-full transition-all ${
                                isDone ? 'bg-[#0B6B3A]' : 'bg-[#F3C623]'
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenLesson(globalIdx);
                        }}
                        className={`w-full mt-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                          isDone
                            ? 'bg-emerald-50 text-[#0B6B3A] hover:bg-emerald-100'
                            : 'bg-[#0B6B3A] text-white hover:bg-[#08522c]'
                        }`}
                      >
                        <span>{isDone ? 'Review Lesson ✓' : 'Continue Lesson →'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          /* ========================================================================= */
          /* VIEW 2: FULL INTERACTIVE LMS LESSON VIEWER (Exact layout from Image 5) */
          /* ========================================================================= */
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top Bar with Back Button & Progress */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
              <button
                onClick={() => setViewMode('dashboard')}
                className="inline-flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-[#0B6B3A] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Course Library</span>
              </button>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-500 font-mono">
                  Lesson {activeModuleIndex + 1} of {modules.length}
                </span>
                <button
                  onClick={() => handleToggleComplete(activeModuleIndex)}
                  className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                    activeModule.completed
                      ? 'bg-emerald-100 text-[#0B6B3A]'
                      : 'bg-[#0B6B3A] text-white hover:bg-[#08522c]'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{activeModule.completed ? 'Completed ✓' : 'Mark as Done'}</span>
                </button>
              </div>
            </div>

            {/* TWO-COLUMN LMS PLAYER WORKSPACE (Image 5 style) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column (8 cols): Media Player, Lesson Notes, & Action Task */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Audio Masterclass Player Widget (Clean high contrast bar) */}
                <div className="bg-[#122119] text-white p-5 sm:p-6 rounded-3xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-12 h-12 rounded-2xl bg-[#F3C623] hover:bg-[#ebd56e] text-[#4A3319] flex items-center justify-center shrink-0 shadow-md transition-transform active:scale-95 cursor-pointer"
                      aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 fill-[#4A3319]" />
                      ) : (
                        <Play className="w-5 h-5 fill-[#4A3319] ml-0.5" />
                      )}
                    </button>

                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#F3C623] tracking-wider mb-0.5">
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>3-Min Audio Guide · Coach Emmanuel</span>
                      </div>
                      <h2 className="text-base font-bold text-white line-clamp-1">
                        {activeModule.title}
                      </h2>
                      <div className="text-xs text-gray-300 font-mono mt-0.5">
                        {isPlaying ? 'Playing · 01:24 / 03:45' : 'Ready to listen · 03:45 mins'}
                      </div>
                    </div>
                  </div>

                  {/* Audio waveform */}
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-1 h-6">
                      {[40, 70, 30, 90, 60, 100, 45, 80, 50, 95, 30, 75, 60, 40].map((h, i) => (
                        <div
                          key={i}
                          style={{ height: `${isPlaying ? Math.max(20, Math.round(h * Math.random())) : h}%` }}
                          className={`w-1 rounded-full transition-all duration-300 ${
                            i < 6 ? 'bg-[#F3C623]' : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        const speeds = ['1.0x', '1.25x', '1.5x'];
                        const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                        setPlaybackSpeed(next);
                      }}
                      className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
                    >
                      {playbackSpeed}
                    </button>
                  </div>
                </div>

                {/* Lesson Overview & Core Content */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-emerald-100 space-y-6">
                  <div>
                    <span className="text-xs font-bold text-[#0B6B3A] uppercase tracking-wider">
                      About this Lesson
                    </span>
                    <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mt-1">
                      {activeModule.title}
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed font-medium">
                      {activeModule.description}
                    </p>
                  </div>

                  {/* What You Will Learn (Bullet points like Image 5) */}
                  <div className="p-5 rounded-2xl bg-[#FAFDFB] border border-emerald-100">
                    <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider mb-3">
                      What Will You Learn?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeModule.learnContent.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-gray-800 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#0B6B3A] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reflection Question / Practical Task Box */}
                  <div className="p-5 rounded-2xl bg-[#FAF7EB] border border-amber-200 space-y-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#F3C623] fill-[#F3C623]" />
                      <h3 className="text-xs font-black text-[#4A3319] uppercase tracking-wider">
                        Your Action Step for This Lesson:
                      </h3>
                    </div>

                    <p className="text-xs text-gray-800 font-semibold leading-relaxed">
                      {activeModule.practicalTask}
                    </p>

                    <div>
                      <textarea
                        rows={3}
                        value={reflectionAnswer}
                        onChange={(e) => setReflectionAnswer(e.target.value)}
                        placeholder="Write your quick notes or deliverable link here..."
                        className="w-full p-3 rounded-xl bg-white border border-gray-200 text-xs text-gray-900 font-medium focus:ring-2 focus:ring-[#0B6B3A] resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-gray-500">Takes 2 minutes</span>
                      <button
                        onClick={() => handleToggleComplete(activeModuleIndex)}
                        className="px-5 py-2.5 rounded-xl bg-[#0B6B3A] hover:bg-[#08522c] text-white text-xs font-black transition-all shadow-xs cursor-pointer"
                      >
                        {taskSaved ? 'Task Saved ✓' : 'Save & Complete Lesson ✓'}
                      </button>
                    </div>
                  </div>

                  {/* Navigation footer */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <button
                      disabled={activeModuleIndex === 0}
                      onClick={() => setActiveModuleIndex(activeModuleIndex - 1)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Previous Lesson</span>
                    </button>

                    <button
                      disabled={activeModuleIndex === modules.length - 1}
                      onClick={() => setActiveModuleIndex(activeModuleIndex + 1)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-black text-white bg-[#0B6B3A] hover:bg-[#08522c] rounded-xl transition-all cursor-pointer shadow-xs disabled:opacity-30"
                    >
                      <span>Next Lesson</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column (4 cols): Course Syllabus Accordion & Instructor Card (Image 5 style) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Course Syllabus Accordion (Exact layout from Image 5) */}
                <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-emerald-100 space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <h3 className="text-sm font-black text-gray-900">
                      Lesson Modules
                    </h3>
                    <span className="text-xs font-mono font-bold text-[#0B6B3A]">
                      {activeModule.completed ? '100% Done' : 'In Progress'}
                    </span>
                  </div>

                  {/* Modules Accordion Items */}
                  <div className="space-y-2">
                    {[
                      { num: '01', title: 'Lesson Overview & Framing', time: '1m 30s', done: true },
                      { num: '02', title: 'The Core Action Framework', time: '2m 15s', active: true },
                      { num: '03', title: 'Real-World African Example', time: '1m 45s' },
                      { num: '04', title: 'Action Task & Proof Submission', time: '2m 00s' },
                    ].map((step, i) => (
                      <div
                        key={i}
                        className={`p-3.5 rounded-2xl border transition-all ${
                          step.active
                            ? 'bg-emerald-50/70 border-emerald-200'
                            : 'bg-[#F8FAF8] border-gray-100 hover:bg-gray-100/60'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="font-mono font-bold text-gray-400 text-[10px]">
                              {step.num}
                            </span>
                            <span className={`font-bold truncate ${step.active ? 'text-[#0B6B3A]' : 'text-gray-800'}`}>
                              {step.title}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-gray-400 shrink-0 ml-2">
                            {step.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-center">
                    <button
                      onClick={() => onNavigate('plan')}
                      className="text-xs font-bold text-[#0B6B3A] hover:underline"
                    >
                      Connect this to My 14-Day Plan →
                    </button>
                  </div>
                </div>

                {/* Instructor Card (Image 5 style) */}
                <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-emerald-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    COURSE INSTRUCTOR
                  </span>

                  <div className="flex items-center gap-3.5 mt-3">
                    <img
                      src="/images/learning/coach_emmanuel.jpg"
                      alt="Coach Emmanuel"
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-100"
                    />
                    <div>
                      <h4 className="text-sm font-black text-gray-900">Coach Emmanuel</h4>
                      <p className="text-xs text-gray-500 font-medium">R-WEF GBG Cohort 2 Lead</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-600 font-medium leading-relaxed">
                    "Every lesson in this academy is stripped of academic filler. Apply the action step right away!"
                  </div>

                  <button
                    onClick={() => onNavigate('wellbeing')}
                    className="w-full mt-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Ask Coach a Question
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
