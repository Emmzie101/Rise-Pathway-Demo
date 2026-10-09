import React, { useState } from 'react';
import { PageView, OpportunityPlan, ParticipantProfile } from '../types';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  Check,
  Target,
  Clock,
  Sparkles,
  HelpCircle,
  Zap,
  TrendingUp,
  Award,
  Layers,
  CheckCircle2,
  Calendar,
  Flame,
  FileText,
  BarChart3,
  Sliders,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

interface GoalClarificationPageProps {
  onNavigate: (view: PageView) => void;
  plan: OpportunityPlan;
  onUpdatePlan: (updated: Partial<OpportunityPlan>) => void;
  participant: ParticipantProfile;
  onUpdateParticipant: (updated: Partial<ParticipantProfile>) => void;
}

export const GoalClarificationPage: React.FC<GoalClarificationPageProps> = ({
  onNavigate,
  plan,
  onUpdatePlan,
  participant,
  onUpdateParticipant,
}) => {
  const goalPresets = [
    {
      title: 'Apply to 3 Junior Roles or Paid Fellowships',
      category: 'Get Hired',
      desc: 'Target 3 high-alignment companies or startups across Africa (or remote) with a tailored CV and proof-of-work link.',
      feasibility: 94,
      deliverables: '3 Clean Submissions + 1 Validated CV',
      weeklyHours: '10 hrs/wk',
      milestones: ['Curate 10 actively hiring teams', 'Translate 2 academic projects into portfolio bullet points', 'Submit 3 applications with direct follow-ups'],
    },
    {
      title: 'Package & Publish a 2-Project Portfolio Website',
      category: 'Build Proof',
      desc: 'Select your capstone project and 1 coursework assignment, translating them into a clean live demo link.',
      feasibility: 96,
      deliverables: '1 Live Portfolio Link / Documented Project Demos',
      weeklyHours: '12 hrs/wk',
      milestones: ['Document project problem, solution & impact', 'Deploy demo online with zero hosting cost', 'Gather feedback from 2 cohort peers'],
    },
    {
      title: 'Target 5 African Companies & Build Work Dossier',
      category: 'Industry Research',
      desc: 'Conduct thorough company research, analyze hiring pipelines, and prepare personalized application deliverables.',
      feasibility: 92,
      deliverables: '5 Target Company Profiles + Customized Portfolio Case Study',
      weeklyHours: '6 hrs/wk',
      milestones: ['Select 5 companies matching your field', 'Analyze their product stack and challenges', 'Package 1 targeted case study'],
    },
    {
      title: 'Prepare a Postgraduate or Fellowship Application',
      category: 'Further Study',
      desc: 'Draft a compelling statement of purpose and prepare required recommendations ahead of deadlines.',
      feasibility: 90,
      deliverables: 'Completed Statement of Purpose + 2 Reference Requests',
      weeklyHours: '8 hrs/wk',
      milestones: ['Complete initial statement draft', 'Review narrative with R-WEF advisor', 'Finalize proof-checked submission package'],
    },
    {
      title: 'Validate a Freelance Service with 5 Prospective Clients',
      category: 'Market Testing',
      desc: 'Offer your design, software, research, or content skill to 5 local businesses or online clients.',
      feasibility: 88,
      deliverables: '5 Client Discovery Calls + 1 Paid Project Pilot',
      weeklyHours: '12 hrs/wk',
      milestones: ['Draft a concise 1-page service scope', 'Engage 5 business owners or clients', 'Deliver initial sprint and collect testimonial'],
    },
  ];

  const [selectedGoalTitle, setSelectedGoalTitle] = useState(plan.goal);
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  const [customGoalText, setCustomGoalText] = useState('');
  const [successMetric, setSuccessMetric] = useState(
    participant.successDefinition ||
      'Complete 3 targeted job submissions with my updated CV and secure at least 1 interview callback.'
  );
  const [timeframe, setTimeframe] = useState(participant.timeframe || '14 Days (Recommended)');
  const [aiRefining, setAiRefining] = useState(false);

  // Active preset metadata
  const currentPreset = goalPresets.find((g) => g.title === selectedGoalTitle) || goalPresets[0];

  const handleSelectPreset = (title: string) => {
    setSelectedGoalTitle(title);
  };

  const handleSimulateAiRefine = () => {
    setAiRefining(true);
    setTimeout(() => {
      setAiRefining(false);
      if (customGoalText.trim()) {
        setSelectedGoalTitle(
          `Deliver a complete ${customGoalText.trim()} with verifiable evidence and cohort peer feedback.`
        );
      }
    }, 600);
  };

  const handleProceed = () => {
    onUpdatePlan({
      goal: selectedGoalTitle,
      status: 'In Progress',
    });
    onUpdateParticipant({
      primaryGoal: selectedGoalTitle,
      successDefinition: successMetric,
      timeframe: timeframe,
    });
    onNavigate('plan');
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#FAF9F5] py-6 sm:py-8 lg:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Header Block with Brand Colors & Proper Hierarchy */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#0B6B3A] text-xs font-semibold uppercase tracking-wider mb-2 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-[#0B6B3A] animate-pulse" />
              <span>Step 3 of 6 · Target Milestone</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight font-sans flex items-center gap-2.5">
              <span>Select Your 14-Day Goal</span>
              <Target className="w-6 h-6 text-[#0B6B3A] shrink-0" />
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 font-normal max-w-2xl leading-relaxed">
              Focusing on one concrete finish line makes weekly progress manageable and dramatically increases follow-through.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#074626] bg-[#FEF7DA] px-3.5 py-1.5 rounded-2xl border border-[#F3C623] flex items-center gap-1.5 shadow-xs">
              <Flame className="w-4 h-4 text-[#F3C623] fill-[#F3C623]" />
              <span>14-Day Sprint Cadence</span>
            </span>
          </div>
        </div>

        {/* 3 TOP KPI & FEASIBILITY METRICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          
          {/* Card 1: Goal Success Likelihood */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-emerald-100 flex items-center justify-between gap-4 group hover:shadow-md transition-all">
            <div>
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Feasibility Confidence
              </div>
              <div className="text-3xl font-extrabold text-gray-950 font-mono tracking-tight flex items-baseline gap-1">
                <span>{currentPreset.feasibility}%</span>
                <span className="text-xs text-[#0B6B3A] font-semibold font-sans">· High Fit</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1 font-normal">
                Calibrated to complete in 14 days without burnout.
              </p>
            </div>

            {/* Circular Ring */}
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
                  strokeDasharray={`${currentPreset.feasibility}, 100`}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              </svg>
              <Check className="w-6 h-6 text-[#0B6B3A] absolute" />
            </div>
          </div>

          {/* Card 2: Time Commitment */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-emerald-100 flex flex-col justify-between group hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1 font-semibold uppercase tracking-wider">
                <span>Weekly Time Budget</span>
                <Clock className="w-4 h-4 text-[#0B6B3A]" />
              </div>
              <div className="text-2xl font-bold text-gray-950 tracking-tight">
                {currentPreset.weeklyHours}
              </div>
              <p className="text-[11px] text-gray-500 mt-1 font-normal">
                Approximately 1 to 2 hours daily on mobile or desktop.
              </p>
            </div>
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500 font-normal">Pacing:</span>
              <strong className="text-[#0B6B3A] font-semibold">Sustainable & Measured</strong>
            </div>
          </div>

          {/* Card 3: Tangible Outcome */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-[#F3C623] flex flex-col justify-between group hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1 font-semibold uppercase tracking-wider">
                <span>Deliverable Evidence</span>
                <Award className="w-4 h-4 text-[#074626]" />
              </div>
              <div className="text-sm font-bold text-gray-950 line-clamp-2">
                {currentPreset.deliverables}
              </div>
              <p className="text-[11px] text-gray-500 mt-1 font-normal">
                Peer-reviewed by cohort fellows and facilitators.
              </p>
            </div>
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500 font-normal">Review standard:</span>
              <span className="text-xs font-semibold text-[#0B6B3A] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Coach Supported
              </span>
            </div>
          </div>

        </div>

        {/* MAIN INTERACTIVE WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT 2 COLUMNS: GOAL SELECTION */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 space-y-6">
              
              {/* Presets vs Custom Tab Switcher */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-950 tracking-tight">
                    1. Choose Your 14-Day Sprint Goal
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5 font-normal">
                    Select a curated milestone or define your own custom target.
                  </p>
                </div>

                <div className="inline-flex p-1 bg-[#FAF9F5] rounded-xl border border-gray-200 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('presets')}
                    className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeTab === 'presets'
                        ? 'bg-[#0B6B3A] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-950'
                    }`}
                  >
                    Recommended Goals
                  </button>
                  <button
                    onClick={() => setActiveTab('custom')}
                    className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeTab === 'custom'
                        ? 'bg-[#0B6B3A] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-950'
                    }`}
                  >
                    Custom Goal
                  </button>
                </div>
              </div>

              {/* TAB 1: CURATED PRESETS */}
              {activeTab === 'presets' && (
                <div className="space-y-3.5">
                  {goalPresets.map((preset, idx) => {
                    const isSelected = selectedGoalTitle === preset.title;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectPreset(preset.title)}
                        className={`w-full text-left p-5 rounded-2xl transition-all flex items-start justify-between gap-4 cursor-pointer border ${
                          isSelected
                            ? 'bg-[#0B6B3A] text-white border-[#074626] shadow-sm scale-[1.005]'
                            : 'bg-[#FAF9F5] hover:bg-emerald-50/60 text-gray-800 border-gray-200'
                        }`}
                      >
                        <div className="flex-1 space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                                isSelected
                                  ? 'bg-[#F3C623] text-[#074626]'
                                  : 'bg-emerald-50 text-[#0B6B3A] border border-emerald-200'
                              }`}
                            >
                              {preset.category}
                            </span>
                            <span
                              className={`text-[10px] font-mono font-medium inline-flex items-center gap-1 ${
                                isSelected ? 'text-emerald-100' : 'text-gray-500'
                              }`}
                            >
                              <Clock className="w-3 h-3" />
                              <span>{preset.weeklyHours}</span>
                            </span>
                          </div>

                          <div
                            className={`text-sm sm:text-base font-bold leading-snug ${
                              isSelected ? 'text-white' : 'text-gray-950'
                            }`}
                          >
                            {preset.title}
                          </div>

                          <div
                            className={`text-xs leading-relaxed font-normal ${
                              isSelected ? 'text-emerald-100' : 'text-gray-600'
                            }`}
                          >
                            {preset.desc}
                          </div>
                        </div>

                        <div className="shrink-0 mt-1">
                          {isSelected ? (
                            <div className="w-5 h-5 rounded-full bg-[#F3C623] text-[#074626] flex items-center justify-center font-bold">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border border-gray-300" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* TAB 2: WRITE MY OWN GOAL */}
              {activeTab === 'custom' && (
                <div className="space-y-4 p-5 rounded-2xl bg-[#FAF9F5] border border-gray-200">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-800 mb-1.5">
                      Describe what you want to achieve over the next 14 days:
                    </label>
                    <textarea
                      rows={3}
                      value={customGoalText}
                      onChange={(e) => setCustomGoalText(e.target.value)}
                      placeholder="e.g. Build my design portfolio website and reach out to 5 prospective design clients across Africa..."
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-gray-200 text-xs sm:text-sm font-normal focus:ring-2 focus:ring-[#0B6B3A] focus:outline-hidden"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      disabled={aiRefining || !customGoalText.trim()}
                      onClick={handleSimulateAiRefine}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FEF7DA] hover:bg-amber-100 text-[#074626] text-xs font-semibold border border-[#F3C623] transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#074626]" />
                      <span>{aiRefining ? 'Polishing statement...' : 'Make Wording Job-Ready'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (customGoalText.trim()) {
                          setSelectedGoalTitle(customGoalText.trim());
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-[#0B6B3A] text-white text-xs font-semibold cursor-pointer shadow-xs"
                    >
                      Use This Goal
                    </button>
                  </div>
                </div>
              )}

              {/* Question 2: Success Metric */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-900">
                  2. How will you verify completion?
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    value={successMetric}
                    onChange={(e) => setSuccessMetric(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FAF9F5] border border-gray-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#0B6B3A] focus:outline-hidden"
                  />
                </div>
                <p className="text-[11px] text-gray-500 font-normal">
                  Specify concrete evidence (such as a published URL, 3 confirmation receipts, or written project documentation).
                </p>
              </div>

              {/* Question 3: Timeframe */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-900">
                  3. Select Sprint Duration:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: '14 Days (Recommended)', note: 'Optimized for Cohort 2 Pacing' },
                    { label: '7 Days (Fast Track)', note: 'For urgent application deadlines' },
                    { label: '21 Days (Deep Build)', note: 'For extensive technical builds' },
                  ].map((t) => {
                    const isSelected = timeframe === t.label;
                    return (
                      <button
                        key={t.label}
                        type="button"
                        onClick={() => setTimeframe(t.label)}
                        className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 border-[#0B6B3A] text-[#0B6B3A] font-bold shadow-xs'
                            : 'bg-[#FAF9F5] border-gray-200 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="text-xs font-bold">{t.label}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5 font-normal">{t.note}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: 14-DAY ROADMAP FORECAST */}
          <div className="space-y-6">
            
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#0B6B3A]" />
                  <h3 className="text-sm font-bold text-gray-950 tracking-tight">
                    Sprint Timeline Forecast
                  </h3>
                </div>
                <span className="text-[10px] font-bold uppercase text-[#0B6B3A] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Ready
                </span>
              </div>

              <div className="space-y-4">
                {[
                  {
                    phase: 'Days 1–4',
                    title: 'Source & Frame Evidence',
                    desc: 'Assemble academic project files and draft the initial impact story.',
                  },
                  {
                    phase: 'Days 5–9',
                    title: 'Refine & Document',
                    desc: 'Format project accomplishments into polished bullet points via Language Studio.',
                  },
                  {
                    phase: 'Days 10–12',
                    title: 'Portfolio Review',
                    desc: 'Conduct structured peer review and self-audit for project deliverables.',
                  },
                  {
                    phase: 'Days 13–14',
                    title: 'Submit & Celebrate',
                    desc: 'Ship your 3 applications and share progress with your cohort peers.',
                  },
                ].map((ph, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <span className="w-16 font-mono font-bold text-[#074626] bg-[#FEF7DA] px-2 py-1 rounded-lg border border-[#F3C623] text-[10px] shrink-0 text-center">
                      {ph.phase}
                    </span>
                    <div>
                      <div className="font-bold text-gray-950">
                        {ph.title}
                      </div>
                      <div className="text-[11px] text-gray-600 mt-0.5 leading-snug font-normal">
                        {ph.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coach Advisory Quote in Warm Yellow */}
              <div className="p-4 rounded-2xl bg-[#FEF7DA]/60 border border-[#F3C623] text-xs text-[#074626] space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-4 h-4 text-[#074626]" />
                  <span>Coach Guidance:</span>
                </div>
                <p className="text-[11px] text-gray-700 italic leading-relaxed font-normal">
                  "Fellows who commit to one verified milestone achieve substantially higher response rates than those who disperse their efforts across dozens of unpolished applications."
                </p>
              </div>

              {/* Primary Action Button */}
              <button
                type="button"
                onClick={handleProceed}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#0B6B3A] hover:bg-[#074626] text-white text-xs font-bold shadow-md shadow-[#0B6B3A]/25 transition-all cursor-pointer active:translate-y-0.5 border-b-2 border-[#074626]"
              >
                <span>Lock Goal & Build My Plan</span>
                <ArrowRight className="w-4 h-4 text-[#F3C623]" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('insights')}
                className="w-full text-center text-xs text-gray-500 hover:text-gray-950 font-medium cursor-pointer"
              >
                ← Back to Recommendations
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
