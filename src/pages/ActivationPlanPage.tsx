import React, { useState } from 'react';
import { PageView, OpportunityPlan, PlanAction } from '../types';
import {
  CheckCircle2,
  Circle,
  Plus,
  ArrowRight,
  Trash2,
  MessageSquare,
  Users,
  Check,
  Clock,
  Target,
  Flame,
  ChevronRight,
  Heart,
  Calendar,
  Sparkles,
  Zap,
} from 'lucide-react';

interface ActivationPlanPageProps {
  onNavigate: (view: PageView) => void;
  plan: OpportunityPlan;
  onUpdatePlan: (updated: Partial<OpportunityPlan>) => void;
}

export const ActivationPlanPage: React.FC<ActivationPlanPageProps> = ({
  onNavigate,
  plan,
  onUpdatePlan,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [saveBanner, setSaveBanner] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [activeBarDay, setActiveBarDay] = useState<string>('Thu');

  // Form state for adding a task
  const [newTitle, setNewTitle] = useState('');
  const [newDeliverable, setNewDeliverable] = useState('');
  const [newTargetDate, setNewTargetDate] = useState('Day 10');

  const completedCount = plan.actions.filter((a) => a.completed).length;
  const progressPercent = Math.round((completedCount / (plan.actions.length || 1)) * 100);

  const toggleAction = (id: string) => {
    const updated = plan.actions.map((act) =>
      act.id === id ? { ...act, completed: !act.completed } : act
    );
    onUpdatePlan({ actions: updated });
    triggerSaveFeedback('Step updated!');
  };

  const handleAddAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newAct: PlanAction = {
      id: `act-${Date.now()}`,
      title: newTitle.trim(),
      category: 'Portfolio & Work',
      targetDate: newTargetDate,
      deliverable: newDeliverable.trim() || 'Link or screenshot of work',
      completed: false,
    };

    onUpdatePlan({ actions: [...plan.actions, newAct] });
    setNewTitle('');
    setNewDeliverable('');
    setShowAddModal(false);
    triggerSaveFeedback('New step added to your plan!');
  };

  const handleDeleteAction = (id: string) => {
    const updated = plan.actions.filter((a) => a.id !== id);
    onUpdatePlan({ actions: updated });
    triggerSaveFeedback('Step removed.');
  };

  const triggerSaveFeedback = (msg: string) => {
    setSaveBanner(msg);
    setTimeout(() => setSaveBanner(null), 2500);
  };

  const filteredActions = plan.actions.filter((act) => {
    if (activeFilter === 'completed') return act.completed;
    if (activeFilter === 'pending') return !act.completed;
    return true;
  });

  // Weekly bar data with bold visual contrast (inspired by AeuxGlobal)
  const weeklyActivity = [
    { day: 'Mon', count: 1, height: '35%' },
    { day: 'Tue', count: 2, height: '65%' },
    { day: 'Wed', count: 1, height: '40%' },
    { day: 'Thu', count: 3, height: '95%', isPeak: true },
    { day: 'Fri', count: 2, height: '60%' },
    { day: 'Sat', count: 1, height: '30%' },
    { day: 'Sun', count: 0, height: '15%' },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#F8FAF8] py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* HEADER: Clean, Simple, Easy to Read for Any Student */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight font-sans">
                My 14-Day Plan
              </h1>
              <span className="px-3 py-1 rounded-full bg-[#E6F5EC] text-[#0B6B3A] text-xs font-black">
                Step-by-Step
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">
              5 simple things to do this week to get ready for real work. Check them off as you finish!
            </p>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            {/* Filter pills */}
            <div className="flex items-center bg-white p-1 rounded-2xl border border-gray-200 text-xs font-bold shadow-2xs">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-[#0B6B3A] text-white shadow-2xs font-bold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All ({plan.actions.length})
              </button>
              <button
                onClick={() => setActiveFilter('pending')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  activeFilter === 'pending'
                    ? 'bg-[#0B6B3A] text-white shadow-2xs font-bold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                To Do ({plan.actions.length - completedCount})
              </button>
              <button
                onClick={() => setActiveFilter('completed')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  activeFilter === 'completed'
                    ? 'bg-[#0B6B3A] text-white shadow-2xs font-bold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Done ({completedCount})
              </button>
            </div>

            {/* + Add Step button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#0B6B3A] text-white text-xs font-black shadow-md shadow-[#0B6B3A]/20 hover:bg-[#08522c] transition-all cursor-pointer active:translate-y-0.5"
            >
              <Plus className="w-4 h-4 text-[#F3C623]" />
              <span>Add a Step</span>
            </button>
          </div>
        </div>

        {/* FEEDBACK BANNER */}
        {saveBanner && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-[#0B6B3A] font-bold flex items-center gap-2 animate-fadeIn shadow-xs">
            <Check className="w-4 h-4" />
            <span>{saveBanner}</span>
          </div>
        )}

        {/* TOP ROW: 4 BOLD VISUAL CARDS (Inspired by the AeuxGlobal Reference Dashboard) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Card 1: High Contrast Dark Emerald Card (like top-left dark widget in AeuxGlobal) */}
          <div className="lg:col-span-3 bg-[#122119] text-white p-5 sm:p-6 rounded-3xl shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Days Remaining
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#F3C623] animate-pulse" />
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                8 Days
              </div>
              <p className="text-xs text-gray-300 mt-1 font-medium">
                Next coach review is this Friday!
              </p>
            </div>

            {/* Mini high-contrast 5-bar visualization */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-end justify-between gap-1.5 h-8">
              {[40, 65, 85, 100, 30].map((h, i) => (
                <div key={i} className="flex-1 bg-white/10 rounded-t h-full flex items-end">
                  <div
                    style={{ height: `${h}%` }}
                    className={`w-full rounded-t ${i === 3 ? 'bg-[#F3C623]' : 'bg-[#0B6B3A]'}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Steps Completed Card (Clean, Bold, High Contrast) */}
          <div className="lg:col-span-3 bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Steps Finished
                </span>
                <span className="text-xs font-black text-[#0B6B3A] bg-[#E6F5EC] px-2.5 py-0.5 rounded-full">
                  {progressPercent}% Done
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-black text-gray-900 font-mono tracking-tight">
                {completedCount} <span className="text-lg text-gray-400 font-normal">of {plan.actions.length}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1 font-medium">
                {plan.actions.length - completedCount === 0
                  ? 'All steps completed! Great work.'
                  : `${plan.actions.length - completedCount} steps left to finish this week`}
              </p>
            </div>

            {/* Solid bold progress bar */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div
                  style={{ width: `${progressPercent}%` }}
                  className="bg-[#0B6B3A] h-full rounded-full transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Daily Activity Streak */}
          <div className="lg:col-span-3 bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Daily Streak
                </span>
                <Flame className="w-4 h-4 text-[#F3C623] fill-[#F3C623]" />
              </div>

              <div className="text-3xl sm:text-4xl font-black text-gray-900 font-mono tracking-tight flex items-baseline gap-1">
                <span>6</span>
                <span className="text-lg text-gray-500 font-normal">Days</span>
              </div>
              <p className="text-xs text-gray-500 mt-1 font-medium">
                You checked in every day this week!
              </p>
            </div>

            {/* 7-day pill dots */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-1">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black ${
                    i < 6
                      ? 'bg-[#0B6B3A] text-white shadow-2xs'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {i < 6 ? '✓' : d}
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Main Target Goal (Bold Card like 99,681m card in AeuxGlobal) */}
          <div className="lg:col-span-3 bg-[#FAFDFB] p-5 sm:p-6 rounded-3xl shadow-sm border border-emerald-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-[#F3C623] text-[#4A3319] px-2.5 py-0.5 rounded-full shadow-2xs">
                  My Main Goal
                </span>
                <button
                  onClick={() => onNavigate('goal')}
                  className="text-xs font-bold text-[#0B6B3A] hover:underline cursor-pointer"
                >
                  Change Goal
                </button>
              </div>

              <h2 className="text-base sm:text-lg font-black text-gray-900 leading-snug line-clamp-2 mt-1">
                {plan.goal}
              </h2>
            </div>

            <div className="mt-3 pt-3 border-t border-emerald-100/80 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0B6B3A]" />
                <span className="truncate">Makola Trader Case Study (Done ✓)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F3C623]" />
                <span className="truncate">Talk to Amara (In Progress)</span>
              </div>
            </div>
          </div>

        </div>

        {/* MIDDLE SECTION: BOLD WEEKLY ACTIVITY BAR CHART (AeuxGlobal Center Chart Style) */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-emerald-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-base font-black text-gray-900 tracking-tight">
                My Weekly Activity
              </h2>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">
                How many steps you took each day from Monday to Sunday
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-400">Most active:</span>
              <span className="text-xs font-black text-[#0B6B3A] bg-[#E6F5EC] px-3 py-1 rounded-xl border border-emerald-200">
                Thursday (3 actions completed)
              </span>
            </div>
          </div>

          {/* High-Contrast Bold Bars with Clean Gridlines */}
          <div className="relative pt-6 pb-2">
            {/* Background gridlines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-gray-300 font-mono">
              <div className="border-b border-gray-100 w-full flex justify-between"><span>3 Steps</span></div>
              <div className="border-b border-gray-100 w-full flex justify-between"><span>2 Steps</span></div>
              <div className="border-b border-gray-100 w-full flex justify-between"><span>1 Step</span></div>
              <div className="border-b border-gray-100 w-full flex justify-between"><span>0</span></div>
            </div>

            {/* Bars container */}
            <div className="relative h-44 flex items-end justify-between gap-3 sm:gap-8 px-4 sm:px-8 z-10">
              {weeklyActivity.map((bar) => {
                const isHovered = activeBarDay === bar.day;
                return (
                  <div
                    key={bar.day}
                    onMouseEnter={() => setActiveBarDay(bar.day)}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                  >
                    {isHovered && (
                      <div className="mb-2 px-2.5 py-1 rounded-xl bg-[#122119] text-white text-[11px] font-bold shadow-md animate-fadeIn whitespace-nowrap">
                        {bar.count} {bar.count === 1 ? 'Step Done' : 'Steps Done'}
                      </div>
                    )}
                    <div
                      style={{ height: bar.height }}
                      className={`w-full max-w-[42px] rounded-t-xl transition-all duration-300 ${
                        bar.isPeak
                          ? 'bg-[#0B6B3A] shadow-md shadow-[#0B6B3A]/25 ring-2 ring-[#0B6B3A]/30'
                          : isHovered
                          ? 'bg-[#F3C623]'
                          : 'bg-[#D6EBE0] hover:bg-[#BDE0CD]'
                      }`}
                    />
                    <span className={`text-xs mt-3 font-black ${
                      isHovered ? 'text-[#0B6B3A]' : 'text-gray-500'
                    }`}>
                      {bar.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: 5 SIMPLE STEP CARDS (Crystal clear, plain English, no walls of text!) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div>
              <h2 className="text-base font-black text-gray-900 tracking-tight">
                My Action Steps
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Click any circle to mark it as done or un-done
              </p>
            </div>
            <span className="text-xs font-bold text-gray-400">
              {completedCount} of {plan.actions.length} Completed
            </span>
          </div>

          <div className="space-y-3">
            {filteredActions.map((action, index) => (
              <div
                key={action.id}
                className={`p-4 sm:p-5 rounded-3xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  action.completed
                    ? 'bg-[#FAFDFB] border-emerald-200 shadow-2xs'
                    : 'bg-white border-gray-200/90 shadow-sm hover:border-[#0B6B3A]'
                }`}
              >
                {/* Left: Check circle and simple text */}
                <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                  {/* Big Clickable Checkbox */}
                  <button
                    onClick={() => toggleAction(action.id)}
                    className="mt-0.5 sm:mt-0 shrink-0 cursor-pointer transition-transform active:scale-90"
                    aria-label={action.completed ? 'Mark step not done' : 'Mark step done'}
                  >
                    {action.completed ? (
                      <CheckCircle2 className="w-7 h-7 text-[#0B6B3A] fill-emerald-100" />
                    ) : (
                      <Circle className="w-7 h-7 text-gray-300 hover:text-[#0B6B3A]" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-[#122119] text-[#F3C623]">
                        Step {index + 1}
                      </span>
                      <span className="text-[10px] font-bold text-gray-500 font-mono">
                        Target: {action.targetDate}
                      </span>
                      {action.completed && (
                        <span className="text-[10px] font-black text-[#0B6B3A] bg-[#E6F5EC] px-2 py-0.5 rounded-full">
                          Done ✓
                        </span>
                      )}
                    </div>

                    <h3
                      className={`text-sm sm:text-base font-bold ${
                        action.completed ? 'line-through text-gray-400' : 'text-gray-900'
                      }`}
                    >
                      {action.title}
                    </h3>

                    {/* Simple clear deliverable label */}
                    <p className="text-xs text-gray-600 mt-0.5 font-medium">
                      What to show: <strong className="text-gray-800">{action.deliverable}</strong>
                    </p>
                  </div>
                </div>

                {/* Right: Helpful contextual button & delete */}
                <div className="flex items-center gap-2.5 sm:self-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  {action.category === 'Portfolio & Work' && (
                    <button
                      onClick={() => onNavigate('studio')}
                      className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#0B6B3A] text-xs font-bold transition-colors cursor-pointer"
                    >
                      Open CV Tool →
                    </button>
                  )}

                  {action.category === 'Outreach & Network' && (
                    <button
                      onClick={() => onNavigate('networking')}
                      className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#4A3319] text-xs font-bold transition-colors cursor-pointer"
                    >
                      Open Mentor Guide →
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteAction(action.id)}
                    className="p-2 text-gray-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                    title="Delete step"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 HELPFUL QUICK-ACTION BOXES (Simple, Human, Straightforward) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          <div className="p-5 rounded-3xl bg-white border border-emerald-100 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#0B6B3A] flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-gray-900">Need help with your CV?</h4>
                <p className="text-[11px] text-gray-500">Turn raw school projects into strong bullets</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('studio')}
              className="px-3 py-1.5 rounded-xl bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#08522c] transition-colors cursor-pointer shrink-0"
            >
              Open
            </button>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-amber-200/80 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FAF7EB] text-[#4A3319] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-[#F3C623]" />
              </div>
              <div>
                <h4 className="text-xs font-black text-gray-900">Talk to real pros</h4>
                <p className="text-[11px] text-gray-500">Have a quick 15-min chat with a mentor</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('networking')}
              className="px-3 py-1.5 rounded-xl bg-[#F3C623] text-[#4A3319] text-xs font-black hover:bg-[#ebd56e] transition-colors cursor-pointer shrink-0"
            >
              Connect
            </button>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-gray-200 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gray-50 text-gray-700 flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 text-[#0B6B3A]" />
              </div>
              <div>
                <h4 className="text-xs font-black text-gray-900">Feeling stuck?</h4>
                <p className="text-[11px] text-gray-500">Ask your coach for advice or check in</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('wellbeing')}
              className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors cursor-pointer shrink-0"
            >
              Ask Coach
            </button>
          </div>

        </div>

      </div>

      {/* SIMPLE ADD STEP MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-black text-gray-900">Add a New Step</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddAction} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  What will you do? (Keep it simple):
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Put my project on GitHub and record a 2-minute demo"
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#0B6B3A]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  When will you finish it?
                </label>
                <select
                  value={newTargetDate}
                  onChange={(e) => setNewTargetDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#0B6B3A]"
                >
                  <option value="Day 7">Day 7 (This Week)</option>
                  <option value="Day 9">Day 9</option>
                  <option value="Day 11">Day 11</option>
                  <option value="Day 14">Day 14 (Final Review)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  What proof will you have?
                </label>
                <input
                  type="text"
                  value={newDeliverable}
                  onChange={(e) => setNewDeliverable(e.target.value)}
                  placeholder="e.g. GitHub link, screenshot, or CV bullet points"
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#0B6B3A]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0B6B3A] text-white text-xs font-black hover:bg-[#08522c] transition-colors cursor-pointer shadow-sm"
                >
                  Save Step
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
