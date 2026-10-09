import React, { useState } from 'react';
import { PageView, ParticipantProfile, OpportunityPlan, CheckInResponses, OpportunityItem } from '../types';
import {
  Target,
  FileText,
  BookOpen,
  Heart,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Briefcase,
  Check,
  Calendar,
  ExternalLink,
  Plus,
  Compass,
  AlertCircle,
  FolderOpen,
} from 'lucide-react';

interface WorkspaceHubPageProps {
  onNavigate: (view: PageView) => void;
  participant: ParticipantProfile;
  plan: OpportunityPlan;
  responses: CheckInResponses;
  opportunities?: OpportunityItem[];
  onToggleAction?: (id: string) => void;
}

export const WorkspaceHubPage: React.FC<WorkspaceHubPageProps> = ({
  onNavigate,
  participant,
  plan,
  responses,
  opportunities = [],
  onToggleAction,
}) => {
  const firstName = participant.name.split(' ')[0] || 'Fellow';

  const completedActions = plan.actions.filter((a) => a.completed);
  const pendingActions = plan.actions.filter((a) => !a.completed);
  const progressPercent = Math.round((completedActions.length / (plan.actions.length || 1)) * 100);

  // Identify the immediate next action
  const nextAction = pendingActions[0] || plan.actions[0];

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#F8FAF8] py-6 sm:py-8 lg:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* 1. PERSONAL GREETING & CURRENT FOCUS BANNER */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#0B6B3A] text-xs font-bold uppercase tracking-wider border border-emerald-200">
              <span>Fellow Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
              Welcome back, {firstName}!
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
              <strong>Current Focus:</strong>{' '}
              {plan.goal || participant.primaryGoal || 'Securing an entry-level professional opportunity.'}
            </p>
          </div>

          {/* Progress Indicator Card */}
          <div className="flex items-center gap-4 bg-[#FAF9F5] p-4 rounded-2xl border border-gray-200 shrink-0">
            <div className="text-right">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Plan Completion
              </div>
              <div className="text-base font-black text-gray-950">
                {completedActions.length} of {plan.actions.length} Steps
              </div>
            </div>
            <div className="w-13 h-13 rounded-2xl bg-[#0B6B3A] text-[#F3C623] flex flex-col items-center justify-center font-black text-sm shadow-xs">
              <span>{progressPercent}%</span>
            </div>
          </div>
        </div>

        {/* 2. NEXT ACTION SPOTLIGHT */}
        {nextAction && (
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#074626] to-[#0B6B3A] text-white shadow-lg shadow-[#0B6B3A]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs text-[#F3C623] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Your Immediate Next Priority</span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">{nextAction.title}</h2>
              <p className="text-xs text-emerald-200 font-normal">
                Target: {nextAction.targetDate} · Deliverable: {nextAction.deliverable}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {onToggleAction && !nextAction.completed && (
                <button
                  onClick={() => onToggleAction(nextAction.id)}
                  className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/20 transition-all cursor-pointer"
                >
                  Mark Done
                </button>
              )}
              <button
                onClick={() => onNavigate('plan')}
                className="px-5 py-2.5 rounded-xl bg-[#F3C623] hover:bg-[#e0b418] text-[#074626] text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>View Full Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* TWO-COLUMN WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT 2 COLUMNS: PLAN & TO-DO LIST + OPPORTUNITIES */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* TO-DO LIST */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#0B6B3A]" />
                  <h2 className="text-sm font-bold text-gray-950 uppercase tracking-wide">
                    Active Action Steps
                  </h2>
                </div>
                <button
                  onClick={() => onNavigate('plan')}
                  className="text-xs font-bold text-[#0B6B3A] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Manage Plan</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-2.5">
                {plan.actions.slice(0, 4).map((action) => (
                  <div
                    key={action.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      action.completed
                        ? 'bg-emerald-50/30 border-emerald-100 text-gray-400'
                        : 'bg-[#FAF9F5] border-gray-200 hover:border-emerald-200 text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        type="button"
                        onClick={() => onToggleAction && onToggleAction(action.id)}
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                          action.completed
                            ? 'bg-[#0B6B3A] border-[#074626] text-white'
                            : 'bg-white border-gray-300 hover:border-[#0B6B3A]'
                        }`}
                      >
                        {action.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                      <span
                        className={`text-xs font-bold truncate ${
                          action.completed ? 'line-through text-gray-400' : 'text-gray-900'
                        }`}
                      >
                        {action.title}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#0B6B3A] shrink-0">
                      {action.targetDate}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* TRACKED OPPORTUNITIES PREVIEW */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#0B6B3A]" />
                  <h2 className="text-sm font-bold text-gray-950 uppercase tracking-wide">
                    Opportunities Tracked ({opportunities.length})
                  </h2>
                </div>
                <button
                  onClick={() => onNavigate('plan')}
                  className="text-xs font-bold text-[#0B6B3A] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Tracker</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {opportunities.length === 0 ? (
                <div className="p-6 text-center bg-[#FAF9F5] rounded-2xl border border-gray-100 text-xs text-gray-500">
                  <p>No job or internship opportunities added yet.</p>
                  <button
                    onClick={() => onNavigate('plan')}
                    className="mt-2 text-[#0B6B3A] font-bold underline"
                  >
                    + Add your first opportunity
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {opportunities.slice(0, 3).map((opp) => (
                    <div
                      key={opp.id}
                      className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-gray-200 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0">
                        <div className="font-bold text-gray-950 truncate">{opp.name}</div>
                        <div className="text-[11px] text-gray-500">{opp.organization}</div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          {opp.status}
                        </span>
                        {opp.deadline && (
                          <span className="text-[10px] text-gray-400 font-medium">
                            Due {opp.deadline}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: LEARNING, SUPPORT & TOOLS */}
          <div className="space-y-6">
            
            {/* CURRENT WEEK'S LEARNING RESOURCE */}
            <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-xs font-bold text-[#0B6B3A] uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Curriculum This Week</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#074626]">
                  Week 1 · Stabilise
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-950">
                  Orientation & Calibrating Real Bandwidth
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed font-normal">
                  Audit your realistic weekly hours around power and data limits, and set a baseline sprint cadence.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href="https://drive.google.com/drive/folders/rise-gbg-w1-stabilise"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#0B6B3A] hover:underline flex items-center gap-1"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>Google Drive Folder</span>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </a>

                <button
                  onClick={() => onNavigate('learning')}
                  className="px-3.5 py-1.5 rounded-xl bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#074626] transition-colors cursor-pointer"
                >
                  Open Lesson
                </button>
              </div>
            </div>

            {/* WEEKLY WELLBEING & COACH SUPPORT */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5" />
                  <span>Pacing & Wellbeing</span>
                </span>
                <span className="text-xs font-bold text-gray-500">
                  Energy: {participant.energyLevel || 3}/5
                </span>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed font-normal">
                Facing electricity outages, data caps, or exam stress? Keep your sprint pace healthy and request coach check-ins anytime.
              </p>

              <div className="pt-1 flex items-center gap-2">
                <button
                  onClick={() => onNavigate('wellbeing')}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#0B6B3A] text-xs font-bold text-center border border-emerald-200 transition-colors cursor-pointer"
                >
                  Log Weekly Check-In
                </button>
                <button
                  onClick={() => onNavigate('wellbeing')}
                  className="px-3 py-2.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Ask for Help
                </button>
              </div>
            </div>

            {/* QUICK TOOLS CARD */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs space-y-3">
              <div className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                Professional Readiness Tools
              </div>
              <button
                onClick={() => onNavigate('studio')}
                className="w-full p-3 rounded-2xl bg-[#FAF9F5] hover:bg-emerald-50 border border-gray-200 hover:border-emerald-200 transition-all text-left flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#0B6B3A]" />
                  <div>
                    <div className="text-xs font-bold text-gray-900 group-hover:text-[#0B6B3A]">
                      Two-Panel ATS CV Studio
                    </div>
                    <div className="text-[10px] text-gray-500 font-normal">
                      Polish bullet points with verified metrics
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#0B6B3A]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
