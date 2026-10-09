import React, { useState } from 'react';
import { PageView, AiPathwayInsight, CheckInResponses } from '../types';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Edit2,
  RefreshCw,
  Compass,
  Zap,
  Target,
  Check,
  TrendingUp,
  BarChart3,
  Layers,
  Award,
  ShieldCheck,
  Flame,
  Lightbulb,
  Rocket,
} from 'lucide-react';

interface AiInsightsPageProps {
  onNavigate: (view: PageView) => void;
  insight: AiPathwayInsight;
  onUpdateInsight: (updated: Partial<AiPathwayInsight>) => void;
  responses: CheckInResponses;
}

export const AiInsightsPage: React.FC<AiInsightsPageProps> = ({
  onNavigate,
  insight,
  onUpdateInsight,
  responses,
}) => {
  const [isEditingFocus, setIsEditingFocus] = useState(false);
  const [customFocus, setCustomFocus] = useState(insight.currentFocus);

  const handleSaveFocus = () => {
    onUpdateInsight({ currentFocus: customFocus });
    setIsEditingFocus(false);
  };

  // Readiness dimension scores in exact brand palette
  const readinessMetrics = [
    { label: 'School Projects & Hands-On Skills', score: 85, color: 'bg-[#0B6B3A]', text: 'Strong Foundation' },
    { label: 'Writing Validated Proof on Your CV', score: 45, color: 'bg-[#F3C623]', text: 'Sprint Target' },
    { label: 'Building Industry-Ready Portfolio', score: 50, color: 'bg-[#074626]', text: 'Ready to Start' },
    { label: 'Weekly Pacing & Energy Balance', score: 78, color: 'bg-[#0E7A43]', text: 'Steady & Healthy' },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#FAF9F5] py-6 sm:py-8 lg:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Navigation kicker */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#0B6B3A] text-xs font-semibold uppercase tracking-wider mb-2 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-[#0B6B3A] animate-pulse" />
              <span>Step 2 of 6 · What We Found</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight font-sans flex items-center gap-2.5">
              <span>Your Strengths & Priority Next Steps</span>
              <Sparkles className="w-6 h-6 text-[#F3C623] shrink-0" />
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 font-normal max-w-2xl leading-relaxed">
              Here are the assets you already bring to the table, and the highest-leverage focus areas for your upcoming 14-day sprint.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white border border-emerald-200 text-xs font-semibold text-[#0B6B3A] shadow-xs self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4 text-[#0B6B3A]" />
            <span>Verified AI Recommendation</span>
          </div>
        </div>

        {/* 3 TOP TELEMETRY METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          
          {/* Card 1: Synthesis Alignment Score */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-emerald-100 flex items-center justify-between gap-4 group hover:shadow-md transition-all">
            <div>
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Accuracy Fit
              </div>
              <div className="text-3xl font-extrabold text-gray-950 font-mono tracking-tight flex items-baseline gap-1">
                <span>94%</span>
                <span className="text-xs text-[#0B6B3A] font-semibold font-sans">· High Fit</span>
              </div>
              <p className="text-[11px] text-[#0B6B3A] font-medium mt-1">
                Calibrated to your check-in answers
              </p>
            </div>

            <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#EBF5EF" strokeWidth="3.6" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke="#0B6B3A"
                  strokeWidth="3.6"
                  strokeDasharray="94, 100"
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              </svg>
              <ShieldCheck className="w-5 h-5 text-[#0B6B3A] absolute" />
            </div>
          </div>

          {/* Card 2: Core Capital Assets */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-emerald-100 flex flex-col justify-between group hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1 font-semibold uppercase tracking-wider">
                <span>Identified Assets</span>
                <Award className="w-4 h-4 text-[#0B6B3A]" />
              </div>
              <div className="text-2xl font-bold text-gray-950 tracking-tight">
                {insight.readyAssets.length} Ready Strengths
              </div>
              <p className="text-[11px] text-gray-500 mt-1 font-normal">
                Solid academic curiosity & technical initiative.
              </p>
            </div>
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500 font-normal">Portfolio Status:</span>
              <strong className="text-[#0B6B3A] font-semibold">Ready for CV Framing</strong>
            </div>
          </div>

          {/* Card 3: Growth Lever */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-[#F3C623] flex flex-col justify-between group hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1 font-semibold uppercase tracking-wider">
                <span>Top Sprint Focus</span>
                <Flame className="w-4 h-4 text-[#F3C623] fill-[#F3C623]" />
              </div>
              <div className="text-xl font-bold text-gray-950 tracking-tight">
                Work Evidence
              </div>
              <p className="text-[11px] text-gray-500 mt-1 font-normal">
                Translate coursework into live links & clear numbers.
              </p>
            </div>
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500 font-normal">Sprint Horizon:</span>
              <span className="text-xs font-semibold text-[#0B6B3A]">14-Day Sprint</span>
            </div>
          </div>

        </div>

        {/* Narrative Banner: What We Heard */}
        <div className="bg-gradient-to-br from-[#074626] via-[#0B6B3A] to-[#074626] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-500/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#F3C623]/15 blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3C623] text-[#074626] text-xs font-bold uppercase tracking-wider mb-3.5 shadow-xs">
              <Zap className="w-3.5 h-3.5 fill-[#074626]" />
              <span>Synthesis Insights</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight mb-3 text-white">
              "{insight.themeTitle}"
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed max-w-3xl font-normal">
              You are navigating <strong className="text-white font-semibold">{responses.currentStage}</strong> in <strong className="text-white font-semibold">{responses.fieldOfStudyOrWork || 'your chosen field'}</strong>. You already have demonstrated discipline and aptitude. The highest-leverage move right now is packaging your class projects so prospective employers see concrete proof of your problem-solving.
            </p>

            <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs text-emerald-200 font-normal">14-Day Recommended Milestone:</span>
                {isEditingFocus ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={customFocus}
                      onChange={(e) => setCustomFocus(e.target.value)}
                      className="px-3 py-1.5 text-xs text-gray-900 bg-white rounded-xl font-medium shadow-xs"
                    />
                    <button
                      onClick={handleSaveFocus}
                      className="text-xs bg-[#F3C623] text-[#074626] font-bold px-3.5 py-1.5 rounded-xl cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <span className="text-xs font-bold text-[#074626] bg-[#F3C623] px-3.5 py-1.5 rounded-full shadow-xs">
                    {insight.currentFocus}
                  </span>
                )}
              </div>

              {!isEditingFocus && (
                <button
                  onClick={() => setIsEditingFocus(true)}
                  className="text-xs text-emerald-200 hover:text-white flex items-center gap-1.5 underline cursor-pointer font-medium"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Customize Milestone Name</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* READINESS VISUALIZATION BARS */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-emerald-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-950 tracking-tight flex items-center gap-2">
                <span>Baseline Readiness Dimensions</span>
                <BarChart3 className="w-4 h-4 text-[#0B6B3A]" />
              </h3>
              <p className="text-xs text-gray-500 mt-0.5 font-normal">
                How your readiness profiles across core transition pillars today.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#0B6B3A] bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
              Evaluation Completed
            </span>
          </div>

          <div className="space-y-4">
            {readinessMetrics.map((m, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-gray-900 font-semibold">{m.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 font-normal">{m.text}</span>
                    <span className="font-mono text-gray-950 font-bold text-sm">{m.score}%</span>
                  </div>
                </div>
                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${m.score}%` }}
                    className={`h-full ${m.color} rounded-full transition-all duration-700`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2-COLUMN: READY ASSETS VS GROWTH FOCUS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Ready Assets */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-base font-bold text-[#0B6B3A] mb-4 pb-3 border-b border-gray-100">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[#0B6B3A]" />
                </div>
                <span>Identified Strengths & Assets</span>
              </div>
              <ul className="space-y-3.5">
                {insight.readyAssets.map((asset, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                    <span className="w-2 h-2 rounded-full bg-[#0B6B3A] mt-1.5 shrink-0" />
                    <span>{asset}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-[#0B6B3A] font-medium flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#0B6B3A]" />
              <span>Ready for translation into CV bullet points</span>
            </div>
          </div>

          {/* What Needs Attention */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#F3C623] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-base font-bold text-[#074626] mb-4 pb-3 border-b border-gray-100">
                <div className="w-8 h-8 rounded-xl bg-[#FEF7DA] flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-[#074626]" />
                </div>
                <span>High-Leverage Growth Levers</span>
              </div>
              <ul className="space-y-3.5">
                {insight.growthAreas.map((area, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                    <span className="w-2 h-2 rounded-full bg-[#F3C623] mt-1.5 shrink-0" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-[#074626] font-medium flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#F3C623] fill-[#F3C623]" />
              <span>Supported by guided tool templates and coach reviews</span>
            </div>
          </div>

        </div>

        {/* SUGGESTED NEXT MOVE BANNER */}
        <div className="bg-[#FEF7DA]/60 rounded-3xl p-6 sm:p-8 border border-[#F3C623] flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#074626] mb-1">
              Recommended Next Move
            </div>
            <div className="text-sm sm:text-base font-bold text-gray-950 leading-snug">
              {insight.suggestedNextMove}
            </div>
          </div>
          <button
            onClick={() => onNavigate('goal')}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#0B6B3A] hover:bg-[#074626] rounded-2xl shrink-0 transition-all shadow-md shadow-[#0B6B3A]/25 cursor-pointer active:translate-y-0.5 border-b-2 border-[#074626]"
          >
            <span>Lock Goal & Build Plan</span>
            <ArrowRight className="w-4 h-4 text-[#F3C623]" />
          </button>
        </div>

        {/* AI Disclaimer Footer */}
        <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-normal">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#0B6B3A]" />
            <span>{insight.disclaimer}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('checkin')}
              className="text-gray-700 hover:text-gray-950 font-medium cursor-pointer"
            >
              Review My Check-In Answers
            </button>
            <span className="text-gray-300">·</span>
            <button
              onClick={() => onNavigate('plan')}
              className="text-[#0B6B3A] font-semibold hover:underline cursor-pointer"
            >
              Jump Direct to Plan
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
