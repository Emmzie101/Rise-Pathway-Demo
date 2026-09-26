import React, { useState } from 'react';
import { PageView, ParticipantProfile, OpportunityPlan } from '../types';
import {
  TrendingUp,
  CheckCircle2,
  Calendar,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  Heart,
  Flame,
  Star,
  Plus,
  Filter,
  Download,
  Check,
  Clock,
  Briefcase,
  QrCode,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Bookmark,
  Mail,
  Award,
} from 'lucide-react';

interface ProgressPageProps {
  onNavigate: (view: PageView) => void;
  participant: ParticipantProfile;
  plan: OpportunityPlan;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  onNavigate,
  participant,
  plan,
}) => {
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [proofInput, setProofInput] = useState('');
  const [selectedActionId, setSelectedActionId] = useState(plan.actions[0]?.id || '');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [activeDayBar, setActiveDayBar] = useState<string>('Thu');

  // Collapsible section toggles
  const [mentorsCollapsed, setMentorsCollapsed] = useState(false);
  const [evidenceCollapsed, setEvidenceCollapsed] = useState(false);

  const completedActions = plan.actions.filter((a) => a.completed);
  const pendingActions = plan.actions.filter((a) => !a.completed);
  const percentComplete = Math.round(
    (completedActions.length / (plan.actions.length || 1)) * 100
  );

  const handleSaveProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proofInput.trim()) return;
    const action = plan.actions.find((a) => a.id === selectedActionId);
    if (action) {
      action.completed = true;
      action.evidenceNote = proofInput.trim();
    }
    setLogModalOpen(false);
    setProofInput('');
    setFeedbackMsg('New proof milestone logged to your GBG Cohort record!');
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#F8FAF8] py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* TOP WELCOME & CONTROLS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight font-sans">
                Good Day, {participant.name.split(' ')[0]}!
              </h1>
              <div className="w-8 h-8 rounded-full bg-[#EBF5EF] flex items-center justify-center text-[#0B6B3A]">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">
              Look at what you have finished so far. Keep going—you are making real progress!
            </p>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            {/* Filter Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border border-gray-200 text-xs font-bold text-gray-700 shadow-2xs">
              <Filter className="w-3.5 h-3.5 text-[#0B6B3A]" />
              <span>Day 6 of 14</span>
            </div>

            {/* Export Portfolio */}
            <button
              onClick={() => {
                setFeedbackMsg('Your work link was copied to clipboard!');
                setTimeout(() => setFeedbackMsg(null), 2500);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-700 shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#0B6B3A]" />
              <span className="hidden sm:inline">Copy Portfolio Link</span>
            </button>

            {/* + Log Milestone Action Pill */}
            <button
              onClick={() => setLogModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#0B6B3A] text-white text-xs font-black shadow-md shadow-[#0B6B3A]/20 hover:bg-[#08522c] transition-all cursor-pointer active:translate-y-0.5"
            >
              <Plus className="w-4 h-4 text-[#F3C623]" />
              <span>Save Finished Work</span>
            </button>
          </div>
        </div>

        {/* FEEDBACK BANNER */}
        {feedbackMsg && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-[#0B6B3A] font-bold flex items-center gap-2 animate-fadeIn shadow-xs">
            <Check className="w-4 h-4" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* TOP BENTO GRID ROW: 4 CARDS (Inspired by AeuxGlobal & Youcare) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Card 1: Deliverables Status Curve (3 cols) */}
          <div className="lg:col-span-3 bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Work Finished
                </span>
                <span className="text-[10px] font-bold text-[#0B6B3A] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  This Week
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-black text-gray-900 font-mono">
                  {completedActions.length} Done
                </span>
                <span className="text-xs text-gray-400 font-medium">/ {pendingActions.length} to go</span>
              </div>

              {/* Legend pills */}
              <div className="flex items-center gap-3 text-[11px] font-bold mb-4">
                <span className="flex items-center gap-1.5 text-[#0B6B3A]">
                  <span className="w-2 h-2 rounded-full bg-[#0B6B3A]" />
                  <span>Finished</span>
                </span>
                <span className="flex items-center gap-1.5 text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-gray-300" />
                  <span>Not Yet</span>
                </span>
              </div>
            </div>

            {/* Smooth dual-wave SVG lines */}
            <div className="h-16 w-full pt-1">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 35" preserveAspectRatio="none">
                <path
                  d="M0,28 Q25,32 50,24 T75,18 T100,14"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M0,32 Q25,28 50,16 T75,8 T100,4"
                  fill="none"
                  stroke="#0B6B3A"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <div className="flex justify-between text-[10px] font-mono text-gray-400 mt-1">
                <span>Start</span>
                <span>Midpoint</span>
                <span>End</span>
              </div>
            </div>
          </div>

          {/* Card 2: Vibrant Accent Highlight Card */}
          <div className="lg:col-span-3 bg-gradient-to-br from-[#0B6B3A] via-[#0E7A43] to-[#0B6B3A] text-white p-5 sm:p-6 rounded-3xl shadow-lg shadow-[#0B6B3A]/20 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 rounded-full bg-[#F3C623]/20 blur-xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-[#F3C623]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-[#F3C623] text-[#4A3319] px-2.5 py-0.5 rounded-full shadow-2xs">
                  Next Task
                </span>
              </div>

              <h3 className="text-base font-black tracking-tight text-white leading-snug mb-2">
                {pendingActions[0]?.title || 'Make Project Demo'}
              </h3>
              <p className="text-xs text-emerald-100 font-medium leading-relaxed line-clamp-3">
                {pendingActions[0]?.deliverable || 'Show what you built so an employer can understand your skills.'}
              </p>
            </div>

            <div className="pt-4 border-t border-white/20 flex items-center justify-between">
              <span className="text-xs text-emerald-200">Ready to do this?</span>
              <button
                onClick={() => onNavigate('plan')}
                className="text-xs font-black text-white hover:text-[#F3C623] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Go to Steps</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Momentum Trend Chart */}
          <div className="lg:col-span-3 bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Overall Score
                </span>
                <span className="w-2 h-2 rounded-full bg-[#0B6B3A] animate-ping" />
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-black text-gray-900 font-mono">
                  {percentComplete}%
                </span>
                <span className="text-xs font-bold text-[#0B6B3A] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  ▲ Moving fast
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium">You are ahead of schedule this week</p>
            </div>

            <div className="h-16 w-full pt-1">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 35" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="momentumGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0B6B3A" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0B6B3A" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,30 Q25,26 50,18 T75,10 T100,4 L100,35 L0,35 Z"
                  fill="url(#momentumGradient)"
                />
                <path
                  d="M0,30 Q25,26 50,18 T75,10 T100,4"
                  fill="none"
                  stroke="#0B6B3A"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <div className="flex justify-between text-[10px] font-mono text-gray-400 mt-1">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
                <span>Sun</span>
              </div>
            </div>
          </div>

          {/* Card 4: Upcoming Deadlines */}
          <div className="lg:col-span-3 bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Due Soon
                </span>
                <Calendar className="w-4 h-4 text-[#0B6B3A]" />
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-800">1. Finish Project Demo</span>
                    <span className="text-[10px] font-mono text-[#0B6B3A] font-bold">In 2 days</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#0B6B3A] h-full w-4/5 rounded-full" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-800">2. Chat with a Mentor</span>
                    <span className="text-[10px] font-mono text-gray-500">In 6 days</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#F3C623] h-full w-2/5 rounded-full" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-800">3. Show Work to Coach</span>
                    <span className="text-[10px] font-mono text-gray-500">Nov 29</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gray-300 h-full w-1/5 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('plan')}
              className="mt-3 pt-2 border-t border-gray-100 text-xs font-bold text-[#0B6B3A] hover:underline flex items-center justify-between cursor-pointer"
            >
              <span>See Full Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* MIDDLE ROW: FELLOW DOSSIER & WEEKLY ACTIVITY BAR CHART */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Fellow Dossier (5 cols) */}
          <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  My Profile Pass
                </span>
                <span className="text-xs font-bold text-[#0B6B3A] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                  Cohort 2 Fellow
                </span>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={participant.avatar || '/images/hero/hero_african_youth.jpg'}
                    alt={participant.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-200 shadow-sm"
                  />
                  <div>
                    <h3 className="text-sm font-black text-gray-900">{participant.name}</h3>
                    <p className="text-[11px] text-gray-500 font-medium">{participant.location}</p>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-700" title="Verifiable Portfolio Pass">
                  <QrCode className="w-5 h-5 text-[#0B6B3A]" />
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Sprint Focus:</span>
                  <span className="font-bold text-gray-900 truncate max-w-[200px]">{plan.goal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Energy Level:</span>
                  <span className="font-mono font-bold text-[#0B6B3A]">
                    {participant.energyLevel}/5 Steady
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Next Review:</span>
                  <span className="font-mono font-bold text-gray-900">{plan.reviewDate}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('checkin')}
              className="mt-4 pt-3 border-t border-gray-100 text-xs font-bold text-gray-600 hover:text-[#0B6B3A] flex items-center justify-between cursor-pointer"
            >
              <span>Update My Check-In Answers</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Weekly Energy & Output Bar Chart (7 cols) */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    My Daily Work Output
                  </h3>
                  <p className="text-xs text-gray-900 font-bold mt-0.5">
                    Steps finished Monday to Sunday
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-400 font-medium">Hover on any bar</span>
                </div>
              </div>

              <div className="relative h-36 flex items-end justify-between gap-3 px-3 pt-6 pb-1">
                {[
                  { day: 'Mon', count: 1, energy: 3, height: '40%' },
                  { day: 'Tue', count: 2, energy: 4, height: '65%' },
                  { day: 'Wed', count: 1, energy: 4, height: '45%' },
                  { day: 'Thu', count: 3, energy: 5, height: '90%', isPeak: true },
                  { day: 'Fri', count: 2, energy: 4, height: '60%' },
                  { day: 'Sat', count: 1, energy: 3, height: '35%' },
                  { day: 'Sun', count: 0, energy: 4, height: '20%' },
                ].map((bar) => {
                  const isHovered = activeDayBar === bar.day;
                  return (
                    <div
                      key={bar.day}
                      onMouseEnter={() => setActiveDayBar(bar.day)}
                      className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                    >
                      {isHovered && (
                        <div className="mb-2 px-2.5 py-1 rounded-xl bg-[#122119] text-white text-[10px] font-bold shadow-md animate-fadeIn whitespace-nowrap">
                          {bar.count} Finished · Energy {bar.energy}/5
                        </div>
                      )}
                      <div
                        style={{ height: bar.height }}
                        className={`w-full max-w-[32px] rounded-t-xl transition-all duration-300 ${
                          bar.isPeak
                            ? 'bg-[#0B6B3A] shadow-md shadow-[#0B6B3A]/20'
                            : isHovered
                            ? 'bg-[#F3C623]'
                            : 'bg-emerald-100 hover:bg-emerald-200'
                        }`}
                      />
                      <span className={`text-[11px] mt-2 font-bold ${
                        isHovered ? 'text-[#0B6B3A]' : 'text-gray-400'
                      }`}>
                        {bar.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
              <span>Status: <strong>Steady & Consistent</strong></span>
              <span className="text-[#0B6B3A] font-bold">100% On-Track</span>
            </div>
          </div>

        </div>

        {/* COLLAPSIBLE SECTION 1: SUPPORT AND MENTORS (NOW USING REFERENCE IMAGE CARDS!) */}
        <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 overflow-hidden transition-all">
          
          {/* Collapsible Header */}
          <button
            onClick={() => setMentorsCollapsed(!mentorsCollapsed)}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#0B6B3A] flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-gray-900 tracking-tight">
                    Support & Mentors
                  </h2>
                  <span className="text-[10px] font-black bg-[#E6F5EC] text-[#0B6B3A] px-2.5 py-0.5 rounded-full">
                    2 Active Mentors
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">
                  Experienced working professionals assigned to help you with advice and feedback
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-500 font-bold text-xs">
              <span className="hidden sm:inline">{mentorsCollapsed ? 'Show Mentors' : 'Hide'}</span>
              {mentorsCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
            </div>
          </button>

          {/* Collapsible Body with User-Requested Profile Cards (Image Style) */}
          {!mentorsCollapsed && (
            <div className="p-6 pt-0 border-t border-gray-100 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                
                {/* Mentor 1: Amara Nwosu (Exact Reference Image Card Style) */}
                <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all group">
                  <div>
                    <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-gray-100 mb-4">
                      <img
                        src="/images/networking/creative_mentor.jpg"
                        alt="Amara Nwosu"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/50 transition-colors">
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 mb-1">
                      <h3 className="text-base font-black text-gray-900">Amara Nwosu</h3>
                      <span className="w-4 h-4 rounded-full bg-[#1E88E5] text-white flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2 font-medium mb-4">
                      Lead Product Designer at Paystack. Helping fellows polish projects for job interviews.
                    </p>

                    <div className="grid grid-cols-3 py-3 border-y border-gray-100 mb-4 text-center">
                      <div>
                        <div className="flex items-center justify-center gap-1 text-xs font-black text-gray-900">
                          <Star className="w-3.5 h-3.5 text-[#F3C623] fill-[#F3C623]" />
                          <span>4.9</span>
                        </div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">Rating</div>
                      </div>
                      <div className="border-x border-gray-100">
                        <div className="text-xs font-black text-gray-900 font-mono">18+</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">Fellows</div>
                      </div>
                      <div>
                        <div className="text-xs font-black text-[#0B6B3A]">Free</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">15-Mins</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('networking')}
                    className="w-full py-3 rounded-2xl bg-[#0B6B3A] text-white text-xs font-black hover:bg-[#08522c] transition-all flex items-center justify-center gap-2 shadow-md shadow-[#0B6B3A]/20 cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Get In Touch</span>
                  </button>
                </div>

                {/* Mentor 2: Coach Emmanuel */}
                <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all group">
                  <div>
                    <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-gray-100 mb-4">
                      <img
                        src="/images/pathway/cohort_meeting.jpg"
                        alt="Coach Emmanuel"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/50 transition-colors">
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 mb-1">
                      <h3 className="text-base font-black text-gray-900">Coach Emmanuel</h3>
                      <span className="w-4 h-4 rounded-full bg-[#1E88E5] text-white flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2 font-medium mb-4">
                      R-WEF GBG Cohort 2 Lead Coach. Guides your 14-day transition sprint and wellbeing.
                    </p>

                    <div className="grid grid-cols-3 py-3 border-y border-gray-100 mb-4 text-center">
                      <div>
                        <div className="flex items-center justify-center gap-1 text-xs font-black text-gray-900">
                          <Star className="w-3.5 h-3.5 text-[#F3C623] fill-[#F3C623]" />
                          <span>5.0</span>
                        </div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">Rating</div>
                      </div>
                      <div className="border-x border-gray-100">
                        <div className="text-xs font-black text-gray-900 font-mono">50</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">Fellows</div>
                      </div>
                      <div>
                        <div className="text-xs font-black text-[#0B6B3A]">Coach</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">Weekly</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('wellbeing')}
                    className="w-full py-3 rounded-2xl bg-[#122119] text-white text-xs font-black hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#F3C623]" />
                    <span>Ask Coach for Advice</span>
                  </button>
                </div>

                {/* Mentor 3: Kwesi Appiah */}
                <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all group">
                  <div>
                    <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-gray-100 mb-4">
                      <img
                        src="/images/hero/hero_african_youth.jpg"
                        alt="Kwesi Appiah"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/50 transition-colors">
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 mb-1">
                      <h3 className="text-base font-black text-gray-900">Kwesi Appiah</h3>
                      <span className="w-4 h-4 rounded-full bg-[#1E88E5] text-white flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2 font-medium mb-4">
                      Software Engineer at M-Pharma. Helping students navigate remote contracts & interviews.
                    </p>

                    <div className="grid grid-cols-3 py-3 border-y border-gray-100 mb-4 text-center">
                      <div>
                        <div className="flex items-center justify-center gap-1 text-xs font-black text-gray-900">
                          <Star className="w-3.5 h-3.5 text-[#F3C623] fill-[#F3C623]" />
                          <span>4.8</span>
                        </div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">Rating</div>
                      </div>
                      <div className="border-x border-gray-100">
                        <div className="text-xs font-black text-gray-900 font-mono">14+</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">Fellows</div>
                      </div>
                      <div>
                        <div className="text-xs font-black text-[#0B6B3A]">Free</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">15-Mins</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('networking')}
                    className="w-full py-3 rounded-2xl bg-[#0B6B3A] text-white text-xs font-black hover:bg-[#08522c] transition-all flex items-center justify-center gap-2 shadow-md shadow-[#0B6B3A]/20 cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Get In Touch</span>
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* COLLAPSIBLE SECTION 2: VERIFIED DELIVERABLES LOG */}
        <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 overflow-hidden transition-all">
          
          {/* Collapsible Header */}
          <button
            onClick={() => setEvidenceCollapsed(!evidenceCollapsed)}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#0B6B3A] flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-gray-900 tracking-tight">
                    Finished Work Log
                  </h2>
                  <span className="text-[10px] font-black bg-[#E6F5EC] text-[#0B6B3A] px-2.5 py-0.5 rounded-full">
                    {completedActions.length} Shipped · {pendingActions.length} Remaining
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">
                  All your completed steps and proof links ready to show employers
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-500 font-bold text-xs">
              <span className="hidden sm:inline">{evidenceCollapsed ? 'Show Log' : 'Hide'}</span>
              {evidenceCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
            </div>
          </button>

          {/* Collapsible Table Content */}
          {!evidenceCollapsed && (
            <div className="divide-y divide-gray-100 border-t border-gray-100 animate-fadeIn">
              {plan.actions.map((act) => (
                <div
                  key={act.id}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-[#FAFDFB] transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      act.completed
                        ? 'bg-emerald-100 text-[#0B6B3A]'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {act.completed ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold truncate ${act.completed ? 'text-gray-900' : 'text-gray-600'}`}>
                          {act.title}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                          {act.targetDate}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-500 truncate mt-0.5">
                        What was done: <strong className="text-gray-700">{act.deliverable}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                      act.completed
                        ? 'bg-emerald-100 text-[#0B6B3A]'
                        : 'bg-amber-100 text-[#4A3319]'
                    }`}>
                      {act.completed ? 'Done ✓' : 'In Progress'}
                    </span>
                  </div>
                </div>
              ))}

              <div className="p-4 bg-[#F8FAF8] flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">Want to edit or add new steps?</span>
                <button
                  onClick={() => onNavigate('plan')}
                  className="font-bold text-[#0B6B3A] hover:underline flex items-center gap-1"
                >
                  <span>Go to My 14-Day Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* QUICK LOG MILESTONE MODAL */}
      {logModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-black text-gray-900">Save Finished Work</h3>
              <button
                onClick={() => setLogModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProof} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Which step did you finish?
                </label>
                <select
                  value={selectedActionId}
                  onChange={(e) => setSelectedActionId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#0B6B3A]"
                >
                  {plan.actions.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.targetDate} · {a.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Link or description of what you did:
                </label>
                <textarea
                  rows={3}
                  value={proofInput}
                  onChange={(e) => setProofInput(e.target.value)}
                  placeholder="e.g. My GitHub link, or bullet points polished in the CV Studio..."
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#0B6B3A] resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setLogModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0B6B3A] text-white text-xs font-black hover:bg-[#08522c] transition-colors cursor-pointer shadow-sm"
                >
                  Save as Done ✓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
