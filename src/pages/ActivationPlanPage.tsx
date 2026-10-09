import React, { useState } from 'react';
import { PageView, OpportunityPlan, PlanAction, OpportunityItem } from '../types';
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
  Briefcase,
  ExternalLink,
  Filter,
  Link,
  Edit2,
  Search,
} from 'lucide-react';

interface ActivationPlanPageProps {
  onNavigate: (view: PageView) => void;
  plan: OpportunityPlan;
  onUpdatePlan: (updated: Partial<OpportunityPlan>) => void;
  opportunities?: OpportunityItem[];
  onAddOpportunity?: (opp: Omit<OpportunityItem, 'id' | 'createdAt'>) => void;
  onUpdateOpportunity?: (id: string, updates: Partial<OpportunityItem>) => void;
  onDeleteOpportunity?: (id: string) => void;
}

export const ActivationPlanPage: React.FC<ActivationPlanPageProps> = ({
  onNavigate,
  plan,
  onUpdatePlan,
  opportunities = [],
  onAddOpportunity,
  onUpdateOpportunity,
  onDeleteOpportunity,
}) => {
  const [activeTab, setActiveTab] = useState<'plan' | 'opportunities'>('plan');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddOppModal, setShowAddOppModal] = useState(false);
  const [saveBanner, setSaveBanner] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [oppStatusFilter, setOppStatusFilter] = useState<string>('All');

  // Task form state
  const [newTitle, setNewTitle] = useState('');
  const [newDeliverable, setNewDeliverable] = useState('');
  const [newTargetDate, setNewTargetDate] = useState('Day 10');
  const [newCategory, setNewCategory] = useState<PlanAction['category']>('Portfolio & Work');

  // Opportunity form state
  const [oppName, setOppName] = useState('');
  const [oppOrg, setOppOrg] = useState('');
  const [oppLink, setOppLink] = useState('');
  const [oppDeadline, setOppDeadline] = useState('');
  const [oppType, setOppType] = useState<OpportunityItem['type']>('Job');
  const [oppStatus, setOppStatus] = useState<OpportunityItem['status']>('Interested');
  const [oppNextAction, setOppNextAction] = useState('');
  const [oppNotes, setOppNotes] = useState('');

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
      category: newCategory,
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

  const handleCreateOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oppName.trim() || !oppOrg.trim()) return;

    if (onAddOpportunity) {
      onAddOpportunity({
        name: oppName.trim(),
        organization: oppOrg.trim(),
        link: oppLink.trim(),
        deadline: oppDeadline,
        type: oppType,
        status: oppStatus,
        nextAction: oppNextAction.trim(),
        notes: oppNotes.trim(),
      });
    }

    setOppName('');
    setOppOrg('');
    setOppLink('');
    setOppDeadline('');
    setOppNextAction('');
    setOppNotes('');
    setShowAddOppModal(false);
    triggerSaveFeedback('Opportunity saved to your tracker!');
  };

  const handleAddOppToTasks = (opp: OpportunityItem) => {
    const newAct: PlanAction = {
      id: `act-${Date.now()}`,
      title: `Submit application for ${opp.name} at ${opp.organization}`,
      category: 'Applications',
      targetDate: opp.deadline || 'Upcoming',
      deliverable: 'Application confirmation screenshot',
      completed: false,
    };
    onUpdatePlan({ actions: [...plan.actions, newAct] });
    triggerSaveFeedback(`Added "${opp.name}" application step to your Action Plan!`);
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

  const filteredOpportunities = opportunities.filter((opp) => {
    if (oppStatusFilter === 'All') return true;
    return opp.status === oppStatusFilter;
  });

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#F8FAF8] py-6 sm:py-8 lg:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Save confirmation toast */}
        {saveBanner && (
          <div className="fixed top-20 right-6 z-50 bg-[#074626] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold animate-fadeIn border border-[#0B6B3A]">
            <CheckCircle2 className="w-4 h-4 text-[#F3C623]" />
            <span>{saveBanner}</span>
          </div>
        )}

        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#0B6B3A] text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
              <Target className="w-3.5 h-3.5 text-[#0B6B3A]" />
              <span>Personal Action Plan & Opportunity Tracker</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
              Action Steps & Applications
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl font-normal leading-relaxed">
              Maintain momentum by managing your active sprint milestones and keeping track of jobs, traineeships, and fellowships in one place.
            </p>
          </div>

          {/* Progress ring & stats */}
          <div className="flex items-center gap-4 bg-[#FAF9F5] p-3.5 rounded-2xl border border-gray-200 shrink-0">
            <div className="text-right">
              <div className="text-xs font-bold text-gray-500 uppercase">Sprint Pace</div>
              <div className="text-lg font-black text-gray-950">
                {completedCount} of {plan.actions.length} Done
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#0B6B3A] text-[#F3C623] flex items-center justify-center font-black text-sm shadow-xs">
              {progressPercent}%
            </div>
          </div>
        </div>

        {/* Primary View Switcher Tabs */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-3 flex-wrap gap-4">
          <div className="flex items-center gap-2 p-1 bg-[#FAF9F5] rounded-2xl border border-gray-200">
            <button
              onClick={() => setActiveTab('plan')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'plan'
                  ? 'bg-[#0B6B3A] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>My Action Plan ({plan.actions.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('opportunities')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'opportunities'
                  ? 'bg-[#0B6B3A] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Opportunity Tracker ({opportunities.length})</span>
            </button>
          </div>

          {activeTab === 'plan' ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-[#FAF9F5] p-1 rounded-xl border border-gray-200 text-xs font-medium">
                {(['all', 'pending', 'completed'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-3 py-1.5 rounded-lg capitalize cursor-pointer transition-all ${
                      activeFilter === f
                        ? 'bg-white font-bold text-[#0B6B3A] shadow-2xs'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B6B3A] hover:bg-[#074626] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Step</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <select
                value={oppStatusFilter}
                onChange={(e) => setOppStatusFilter(e.target.value)}
                className="px-3 py-2 bg-[#FAF9F5] rounded-xl border border-gray-200 text-xs font-bold text-gray-700 focus:outline-hidden"
              >
                <option value="All">All Statuses</option>
                <option value="Interested">Interested</option>
                <option value="Preparing">Preparing</option>
                <option value="Applied">Applied</option>
                <option value="Interview / Next Stage">Interview</option>
                <option value="Successful">Successful</option>
                <option value="Not Successful">Not Successful</option>
              </select>
              <button
                onClick={() => setShowAddOppModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B6B3A] hover:bg-[#074626] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Opportunity</span>
              </button>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: ACTION PLAN & MILESTONES */}
        {/* ========================================================================= */}
        {activeTab === 'plan' && (
          <div className="space-y-4">
            {/* Goal reminder bar */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-[#074626]">
                <Sparkles className="w-4 h-4 text-[#0B6B3A] shrink-0" />
                <span>
                  <strong>Target Goal:</strong> {plan.goal}
                </span>
              </div>
              <button
                onClick={() => onNavigate('assessment')}
                className="text-xs font-bold text-[#0B6B3A] hover:underline cursor-pointer flex items-center gap-1 shrink-0"
              >
                <span>Re-calibrate 30-60-90 Roadmap</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Actions list */}
            <div className="space-y-3">
              {filteredActions.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-gray-200 text-gray-500 text-xs space-y-2">
                  <p>No action steps match this filter.</p>
                  <button
                    onClick={() => setActiveFilter('all')}
                    className="text-[#0B6B3A] font-bold underline"
                  >
                    View All Steps
                  </button>
                </div>
              ) : (
                filteredActions.map((action) => (
                  <div
                    key={action.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      action.completed
                        ? 'bg-emerald-50/40 border-emerald-200/80 text-gray-500'
                        : 'bg-white border-gray-200 hover:border-emerald-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                      <button
                        type="button"
                        onClick={() => toggleAction(action.id)}
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all cursor-pointer shrink-0 mt-0.5 sm:mt-0 ${
                          action.completed
                            ? 'bg-[#0B6B3A] border-[#074626] text-white'
                            : 'bg-white border-gray-300 hover:border-[#0B6B3A]'
                        }`}
                        aria-label={action.completed ? 'Mark incomplete' : 'Mark complete'}
                      >
                        {action.completed && <Check className="w-4 h-4 stroke-[3]" />}
                      </button>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`text-sm font-bold truncate ${
                              action.completed ? 'line-through text-gray-400' : 'text-gray-900'
                            }`}
                          >
                            {action.title}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#0B6B3A]">
                            {action.targetDate}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                            {action.category}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 font-normal truncate">
                          Deliverable: {action.deliverable}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 justify-end shrink-0">
                      <button
                        type="button"
                        onClick={() => handleDeleteAction(action.id)}
                        className="p-2 text-gray-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete step"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: OPPORTUNITY APPLICATION TRACKER */}
        {/* ========================================================================= */}
        {activeTab === 'opportunities' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOpportunities.length === 0 ? (
                <div className="col-span-full p-12 text-center bg-white rounded-3xl border border-gray-200 text-gray-500 text-xs space-y-3">
                  <Briefcase className="w-8 h-8 text-gray-400 mx-auto" />
                  <p className="font-semibold text-gray-700">No opportunities tracked yet.</p>
                  <p className="max-w-md mx-auto text-gray-500">
                    When you spot a job, traineeship, fellowship, or freelance opening, record it here so you never miss a deadline.
                  </p>
                  <button
                    onClick={() => setShowAddOppModal(true)}
                    className="px-4 py-2 rounded-xl bg-[#0B6B3A] text-white font-bold text-xs hover:bg-[#074626] transition-colors"
                  >
                    Add First Opportunity
                  </button>
                </div>
              ) : (
                filteredOpportunities.map((opp) => {
                  const statusColors: Record<OpportunityItem['status'], string> = {
                    Interested: 'bg-blue-50 text-blue-800 border-blue-200',
                    Preparing: 'bg-amber-50 text-amber-800 border-amber-200',
                    Applied: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                    'Interview / Next Stage': 'bg-purple-50 text-purple-800 border-purple-200',
                    Successful: 'bg-[#0B6B3A] text-white border-[#074626]',
                    'Not Successful': 'bg-gray-100 text-gray-700 border-gray-200',
                    Withdrawn: 'bg-gray-100 text-gray-500 border-gray-200',
                  };

                  return (
                    <div
                      key={opp.id}
                      className="bg-white p-5 rounded-3xl border border-gray-200 hover:border-emerald-300 shadow-2xs flex flex-col justify-between space-y-4 transition-all"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                            {opp.type}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                              statusColors[opp.status] || 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {opp.status}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-gray-950 leading-snug">{opp.name}</h3>
                          <p className="text-xs text-gray-600 font-semibold">{opp.organization}</p>
                        </div>

                        {opp.deadline && (
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            <span>Deadline: {opp.deadline}</span>
                          </div>
                        )}

                        {opp.nextAction && (
                          <div className="p-2.5 bg-[#FAF9F5] rounded-xl text-xs text-gray-700 border border-gray-100">
                            <span className="font-bold text-gray-900 block text-[10px] uppercase">
                              Next Action:
                            </span>
                            <span className="text-gray-600 line-clamp-2">{opp.nextAction}</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                        {opp.link ? (
                          <a
                            href={opp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#0B6B3A] hover:underline"
                          >
                            <span>Link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-[11px] text-gray-400">No link added</span>
                        )}

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleAddOppToTasks(opp)}
                            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-50 text-[#0B6B3A] hover:bg-emerald-100 transition-colors"
                            title="Add application deadline to My Action Plan"
                          >
                            + To Plan
                          </button>
                          {onDeleteOpportunity && (
                            <button
                              type="button"
                              onClick={() => onDeleteOpportunity(opp.id)}
                              className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                              title="Delete opportunity"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* MODAL: ADD ACTION STEP */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-950">Add Step to Action Plan</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddAction} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1">
                    Task Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Polish CV bullet points for Paystack application"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1">
                      Target Timeframe
                    </label>
                    <select
                      value={newTargetDate}
                      onChange={(e) => setNewTargetDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden"
                    >
                      <option value="Day 3">Day 3</option>
                      <option value="Day 7">Day 7</option>
                      <option value="Day 10">Day 10</option>
                      <option value="Day 14">Day 14</option>
                      <option value="Day 30">Day 30</option>
                      <option value="Day 60">Day 60</option>
                      <option value="Day 90">Day 90</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden"
                    >
                      <option value="Portfolio & Work">Portfolio & Work</option>
                      <option value="Outreach & Network">Outreach & Network</option>
                      <option value="Applications">Applications</option>
                      <option value="Skill Readiness">Skill Readiness</option>
                      <option value="Wellbeing & Reflection">Wellbeing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1">
                    Deliverable / Proof
                  </label>
                  <input
                    type="text"
                    value={newDeliverable}
                    onChange={(e) => setNewDeliverable(e.target.value)}
                    placeholder="e.g. Exported PDF or GitHub commit"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-xs text-gray-600 hover:text-gray-900 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#074626]"
                  >
                    Add Step
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD OPPORTUNITY */}
        {showAddOppModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
            <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-950">Track New Opportunity</h3>
                <button
                  onClick={() => setShowAddOppModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateOpportunity} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1">
                      Opportunity Title
                    </label>
                    <input
                      type="text"
                      required
                      value={oppName}
                      onChange={(e) => setOppName(e.target.value)}
                      placeholder="e.g. Junior Design Trainee"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1">
                      Organisation / Company
                    </label>
                    <input
                      type="text"
                      required
                      value={oppOrg}
                      onChange={(e) => setOppOrg(e.target.value)}
                      placeholder="e.g. Paystack"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1">
                      Type
                    </label>
                    <select
                      value={oppType}
                      onChange={(e) => setOppType(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden"
                    >
                      <option value="Job">Job</option>
                      <option value="Internship">Internship</option>
                      <option value="Traineeship">Traineeship</option>
                      <option value="Fellowship">Fellowship</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Grant">Grant</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1">
                      Application Status
                    </label>
                    <select
                      value={oppStatus}
                      onChange={(e) => setOppStatus(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden"
                    >
                      <option value="Interested">Interested</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Applied">Applied</option>
                      <option value="Interview / Next Stage">Interview</option>
                      <option value="Successful">Successful</option>
                      <option value="Not Successful">Not Successful</option>
                      <option value="Withdrawn">Withdrawn</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1">
                      Deadline
                    </label>
                    <input
                      type="date"
                      value={oppDeadline}
                      onChange={(e) => setOppDeadline(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1">
                    Opportunity URL
                  </label>
                  <input
                    type="url"
                    value={oppLink}
                    onChange={(e) => setOppLink(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1">
                    Immediate Next Action
                  </label>
                  <input
                    type="text"
                    value={oppNextAction}
                    onChange={(e) => setOppNextAction(e.target.value)}
                    placeholder="e.g. Polish portfolio case study and write custom motivation"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1">
                    Notes
                  </label>
                  <textarea
                    rows={2}
                    value={oppNotes}
                    onChange={(e) => setOppNotes(e.target.value)}
                    placeholder="Key requirements, contact person, or notes..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddOppModal(false)}
                    className="px-4 py-2 text-xs text-gray-600 hover:text-gray-900 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#074626]"
                  >
                    Save Opportunity
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
