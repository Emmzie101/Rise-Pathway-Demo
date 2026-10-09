import React, { useState } from 'react';
import { PageView, ParticipantProfile, CheckInResponses, OpportunityPlan, PlanAction } from '../types';
import {
  Compass,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Plus,
  Trash2,
  Edit2,
  Check,
  ShieldCheck,
  Zap,
  BatteryCharging,
  Target,
  Award,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { saveOpportunityPlan } from '../services/api';

interface PathwayAssessmentPageProps {
  onNavigate: (view: PageView) => void;
  responses: CheckInResponses;
  participant: ParticipantProfile;
  plan: OpportunityPlan;
  onUpdatePlan: (updated: Partial<OpportunityPlan>) => void;
}

export const PathwayAssessmentPage: React.FC<PathwayAssessmentPageProps> = ({
  onNavigate,
  responses,
  participant,
  plan,
  onUpdatePlan,
}) => {
  const [activeStage, setActiveStage] = useState<'30' | '60' | '90'>('30');
  const [isSaving, setIsSaving] = useState(false);
  const [editingGoal, setEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState(plan.goal || responses.hopedDirection || participant.primaryGoal);

  // New action modal / inline add
  const [showAddAction, setShowAddAction] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDeliverable, setNewDeliverable] = useState('');
  const [newCategory, setNewCategory] = useState<PlanAction['category']>('Portfolio & Work');

  // Categorize actions into 30, 60, 90 day buckets
  const day30Actions = plan.actions.filter(
    (a) => a.targetDate.includes('Day 1') || a.targetDate.includes('Day 2') || a.targetDate.includes('Day 3') || a.targetDate.includes('Day 4') || a.targetDate.includes('Day 5') || a.targetDate.includes('Day 7') || a.targetDate.includes('Day 10') || a.targetDate.includes('Day 14') || a.targetDate.includes('30')
  );

  const day60Actions = plan.actions.filter(
    (a) => a.targetDate.includes('60') || a.targetDate.includes('Month 2') || a.targetDate.includes('Week 6') || a.targetDate.includes('Day 45')
  );

  const day90Actions = plan.actions.filter(
    (a) => a.targetDate.includes('90') || a.targetDate.includes('Month 3') || a.targetDate.includes('Week 10') || a.targetDate.includes('Day 75')
  );

  // Fallback initial population if 60/90 are empty
  const currentActions =
    activeStage === '30'
      ? day30Actions.length > 0
        ? day30Actions
        : plan.actions.slice(0, 3)
      : activeStage === '60'
      ? day60Actions.length > 0
        ? day60Actions
        : [
            {
              id: 'act-60-1',
              title: `Complete second project deliverable and client pitch case study`,
              category: 'Portfolio & Work' as const,
              targetDate: 'Day 60',
              deliverable: 'Live repository link, Figma case study, or client report',
              completed: false,
            },
            {
              id: 'act-60-2',
              title: 'Hold 2 informational chats with sector alumni',
              category: 'Outreach & Network' as const,
              targetDate: 'Day 50',
              deliverable: 'Notes logged from 15-minute syncs',
              completed: false,
            },
          ]
      : day90Actions.length > 0
      ? day90Actions
      : [
          {
            id: 'act-90-1',
            title: `Submit 5 well-targeted applications for ${goalInput.slice(0, 30) || 'roles'}`,
            category: 'Applications' as const,
            targetDate: 'Day 90',
            deliverable: 'Application confirmation emails and follow-up tracker entries',
            completed: false,
          },
          {
            id: 'act-90-2',
            title: 'Present completed milestone showcase at Cohort Demo Hour',
            category: 'Skill Readiness' as const,
            targetDate: 'Day 85',
            deliverable: '3-minute presentation slides or recorded walkthrough',
            completed: false,
          },
        ];

  const handleToggleAction = (id: string) => {
    const updated = plan.actions.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a));
    onUpdatePlan({ actions: updated });
  };

  const handleDeleteAction = (id: string) => {
    const updated = plan.actions.filter((a) => a.id !== id);
    onUpdatePlan({ actions: updated });
  };

  const handleAddAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newAction: PlanAction = {
      id: `act-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      targetDate: `Day ${activeStage}`,
      deliverable: newDeliverable.trim() || 'Proof screenshot or link',
      completed: false,
    };

    onUpdatePlan({ actions: [...plan.actions, newAction] });
    setNewTitle('');
    setNewDeliverable('');
    setShowAddAction(false);
  };

  const handleSaveAndProceed = async () => {
    setIsSaving(true);
    const updatedPlan: OpportunityPlan = {
      ...plan,
      goal: goalInput.trim(),
    };
    onUpdatePlan(updatedPlan);

    await saveOpportunityPlan(participant.id, updatedPlan);
    setIsSaving(false);
    onNavigate('hub');
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#F8FAF8] py-8 lg:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#0B6B3A] text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
                <Compass className="w-3.5 h-3.5 text-[#0B6B3A]" />
                <span>Personal Career Pathway Assessment</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
                Your Initial Pathway Calibration, {participant.name.split(' ')[0]}
              </h1>
              <p className="text-sm text-gray-600 mt-1 font-normal max-w-2xl leading-relaxed">
                Based on your actual baseline responses, here is an honest interpretation of where you stand and a customizable 30-, 60-, and 90-day roadmap designed for your real bandwidth.
              </p>
            </div>

            <button
              onClick={handleSaveAndProceed}
              disabled={isSaving}
              className="px-6 py-3.5 rounded-2xl bg-[#0B6B3A] hover:bg-[#074626] text-white text-sm font-bold shadow-lg shadow-[#0B6B3A]/25 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer active:translate-y-0.5"
            >
              <span>{isSaving ? 'Saving Plan...' : 'Confirm Plan & Go to Dashboard'}</span>
              <ArrowRight className="w-4 h-4 text-[#F3C623]" />
            </button>
          </div>
        </div>

        {/* Section 1: Fellow Inputs Interpretation Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Column 1: Core Stated Goal */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                1. Stated Direction
              </span>
              <button
                onClick={() => setEditingGoal(!editingGoal)}
                className="text-xs text-[#0B6B3A] font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                <Edit2 className="w-3 h-3" />
                <span>{editingGoal ? 'Done' : 'Edit'}</span>
              </button>
            </div>

            {editingGoal ? (
              <textarea
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-xl border border-emerald-300 text-xs text-gray-900 focus:outline-hidden"
              />
            ) : (
              <p className="text-sm font-bold text-gray-900 leading-snug">
                {goalInput || 'Securing an entry-level professional opportunity.'}
              </p>
            )}

            <div className="text-xs text-gray-500 pt-1 border-t border-gray-100">
              <span className="font-semibold text-gray-700">Context: </span>
              <span>{responses.fieldOfStudyOrWork || participant.educationContext || 'Graduate'}</span>
            </div>
          </div>

          {/* Column 2: Strengths & Readiness Needs */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs space-y-3">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              2. Identified Strengths
            </span>
            <div className="flex flex-wrap gap-1.5">
              {responses.existingStrengths && responses.existingStrengths.length > 0 ? (
                responses.existingStrengths.slice(0, 2).map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-emerald-50 text-[#074626] px-2.5 py-1 rounded-xl border border-emerald-200 font-medium"
                  >
                    {s.slice(0, 36)}...
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-500">Practical project skills & discipline.</span>
              )}
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Readiness Focus
              </span>
              <div className="text-xs text-gray-700 font-medium">
                {responses.readinessNeeds && responses.readinessNeeds[0]
                  ? responses.readinessNeeds[0]
                  : 'Converting academic projects into verified proof'}
              </div>
            </div>
          </div>

          {/* Column 3: Energy & Friction Calibration */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs space-y-3">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              3. Bandwidth Calibration
            </span>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-gray-600">
                  <Zap className="w-3.5 h-3.5 text-[#F3C623]" />
                  <span>Stamina / Energy</span>
                </span>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {responses.energyLevel || 3}/5 Steady
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-gray-600">
                  <BatteryCharging className="w-3.5 h-3.5 text-[#0B6B3A]" />
                  <span>Action Confidence</span>
                </span>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {responses.confidenceLevel || 3}/5 Balanced
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500">
              <span className="font-semibold text-gray-700">Friction factors noted: </span>
              {responses.frictionFactors && responses.frictionFactors.length > 0
                ? responses.frictionFactors.slice(0, 2).join(', ')
                : 'Data pacing & power stability.'}
            </div>
          </div>
        </div>

        {/* Section 2: 30-, 60-, and 90-Day Editable Action Plan */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-bold text-gray-950">
                Your 30-, 60-, and 90-Day Roadmap
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Review and customize the suggested milestones. You can edit, add, or delete any step.
              </p>
            </div>

            {/* Stage Selector Tabs - Horizontally Scrollable without misalignment */}
            <div className="flex items-center p-1.5 bg-[#FAF9F5] rounded-2xl border border-gray-200 gap-1 overflow-x-auto max-w-full no-scrollbar shrink-0">
              <button
                onClick={() => setActiveStage('30')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeStage === '30'
                    ? 'bg-[#0B6B3A] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                1st 30 Days (Momentum)
              </button>
              <button
                onClick={() => setActiveStage('60')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeStage === '60'
                    ? 'bg-[#0B6B3A] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                By Day 60 (Demonstrate)
              </button>
              <button
                onClick={() => setActiveStage('90')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeStage === '90'
                    ? 'bg-[#0B6B3A] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                By Day 90 (Apply & Move)
              </button>
            </div>
          </div>

          {/* Active Stage Description: Text on top, Add Custom Step at bottom right */}
          <div className="p-5 bg-[#FEF7DA]/60 border border-[#F3C623]/70 rounded-2xl flex flex-col justify-between gap-4">
            <div className="text-xs sm:text-sm text-[#074626] leading-relaxed">
              {activeStage === '30' && (
                <span>
                  <strong>First 30 Days — Establish Direction & Build Momentum:</strong> Focus on achievable quick wins, polishing your core CV bullet points, and creating verified project evidence.
                </span>
              )}
              {activeStage === '60' && (
                <span>
                  <strong>By Day 60 — Develop & Demonstrate:</strong> Focus on practical skill demonstration, completing a polished portfolio case study, and having initial low-pressure informational conversations.
                </span>
              )}
              {activeStage === '90' && (
                <span>
                  <strong>By Day 90 — Apply & Move Forward:</strong> Focus on submitting 5 well-aligned applications with evidence, presenting completed work, and reviewing your transition readiness.
                </span>
              )}
            </div>

            <div className="flex justify-end items-center pt-1 border-t border-[#F3C623]/40">
              <button
                onClick={() => setShowAddAction(!showAddAction)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-300 hover:bg-emerald-50 text-[#0B6B3A] text-xs font-bold shadow-2xs cursor-pointer transition-all active:translate-y-0.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddAction ? 'Cancel' : 'Add Custom Step'}</span>
              </button>
            </div>
          </div>

          {/* Add custom action form */}
          {showAddAction && (
            <form onSubmit={handleAddAction} className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3 animate-fadeIn">
              <div className="text-xs font-bold text-[#0B6B3A] uppercase tracking-wider">
                Add Step for Day {activeStage}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Task title (e.g. Publish GitHub case study)"
                  className="px-3.5 py-2.5 rounded-xl bg-white border border-gray-300 text-xs text-gray-900 focus:outline-hidden"
                />
                <input
                  type="text"
                  value={newDeliverable}
                  onChange={(e) => setNewDeliverable(e.target.value)}
                  placeholder="Deliverable (e.g. Link or screenshot)"
                  className="px-3.5 py-2.5 rounded-xl bg-white border border-gray-300 text-xs text-gray-900 focus:outline-hidden"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddAction(false)}
                  className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0B6B3A] text-white text-xs font-bold rounded-xl hover:bg-[#074626] cursor-pointer"
                >
                  Add Step
                </button>
              </div>
            </form>
          )}

          {/* Actions List */}
          <div className="space-y-3">
            {currentActions.map((act) => {
              return (
                <div
                  key={act.id}
                  className="p-4 rounded-2xl border border-gray-200 bg-[#FAF9F5] hover:bg-white hover:border-emerald-200 transition-all flex items-start justify-between gap-4 group"
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => handleToggleAction(act.id)}
                      className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                        act.completed
                          ? 'bg-[#0B6B3A] border-[#074626] text-white'
                          : 'bg-white border-gray-300 hover:border-[#0B6B3A]'
                      }`}
                    >
                      {act.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${act.completed ? 'line-through text-gray-400' : 'text-gray-950'}`}>
                          {act.title}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-[#0B6B3A]">
                          {act.targetDate}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 font-normal">
                        Deliverable: {act.deliverable}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteAction(act.id)}
                    className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors opacity-70 group-hover:opacity-100 cursor-pointer"
                    title="Delete step"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Save Action */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-[#0B6B3A]" />
              <span>This plan belongs to you and can be adjusted anytime from your dashboard.</span>
            </div>

            <button
              onClick={handleSaveAndProceed}
              disabled={isSaving}
              className="px-6 py-3 rounded-2xl bg-[#0B6B3A] hover:bg-[#074626] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#0B6B3A]/20 transition-all flex items-center gap-2 cursor-pointer active:translate-y-0.5"
            >
              <span>{isSaving ? 'Saving...' : 'Save Plan & Go to Dashboard'}</span>
              <ArrowRight className="w-4 h-4 text-[#F3C623]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
