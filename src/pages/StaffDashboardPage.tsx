import React, { useState } from 'react';
import { PageView, StaffFellowRecord } from '../types';
import { sampleStaffFellows } from '../data/mockData';
import {
  Users,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Eye,
  MessageSquare,
  Calendar,
  X,
  ShieldCheck,
  Check,
  UserCheck,
  Flame,
  Heart,
  TrendingUp,
  Download,
  Plus,
  Sliders,
  Send,
  MoreVertical,
  Activity,
  FileText,
  Briefcase,
  ChevronDown,
} from 'lucide-react';

interface StaffDashboardPageProps {
  onNavigate: (view: PageView) => void;
}

export const StaffDashboardPage: React.FC<StaffDashboardPageProps> = ({
  onNavigate,
}) => {
  const [fellows, setFellows] = useState<StaffFellowRecord[]>(sampleStaffFellows);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'On Track' | 'Needs Attention' | 'Action Overdue' | 'Review Ready'>('All');
  const [supportFilter, setSupportFilter] = useState<'All' | 'Flagged'>('All');

  const [selectedFellow, setSelectedFellow] = useState<StaffFellowRecord | null>(null);
  const [coachNoteInput, setCoachNoteInput] = useState('');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Time range state
  const [timeRange, setTimeRange] = useState<'7days' | '14days' | 'month'>('7days');
  const [activeDayHover, setActiveDayHover] = useState<string | null>('Thu');

  // Filter fellows
  const filteredFellows = fellows.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.primaryGoal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.stage.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || f.planStatus === statusFilter;
    const matchesSupport =
      supportFilter === 'All' || (supportFilter === 'Flagged' && f.supportFlag !== 'None');

    return matchesSearch && matchesStatus && matchesSupport;
  });

  const supportFlagCount = fellows.filter((f) => f.supportFlag !== 'None').length;

  const handleOpenFellow = (fellow: StaffFellowRecord) => {
    setSelectedFellow(fellow);
    setCoachNoteInput(fellow.staffNotes);
  };

  const handleSaveNotes = () => {
    if (!selectedFellow) return;
    const updated = fellows.map((f) =>
      f.id === selectedFellow.id ? { ...f, staffNotes: coachNoteInput } : f
    );
    setFellows(updated);
    setSelectedFellow({ ...selectedFellow, staffNotes: coachNoteInput });
    showFeedback('Staff notes saved successfully to fellow dossier');
  };

  const handleResolveSupport = () => {
    if (!selectedFellow) return;
    const updated = fellows.map((f) =>
      f.id === selectedFellow.id ? { ...f, supportFlag: 'None' as const } : f
    );
    setFellows(updated);
    setSelectedFellow({ ...selectedFellow, supportFlag: 'None' });
    showFeedback('Support flag marked as resolved');
  };

  const showFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 2500);
  };

  // Weekly bar data (Inspired by CRM reference Image 3 & Image 2)
  const weeklyData = [
    { day: 'Mon', count: 18, height: '45%' },
    { day: 'Tue', count: 24, height: '60%' },
    { day: 'Wed', count: 28, height: '70%' },
    { day: 'Thu', count: 38, height: '95%', isPeak: true },
    { day: 'Fri', count: 22, height: '55%' },
    { day: 'Sat', count: 14, height: '35%' },
    { day: 'Sun', count: 9, height: '22%' },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#F8FAF8] py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* TOP GREETING & CONTROLS HEADER (Inspired by Reference Image 3: "Bonjour, Camille!") */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Good day, Coach Emmanuel!
              </h1>
              <div className="w-8 h-8 rounded-full bg-[#EBF5EF] flex items-center justify-center text-[#0B6B3A]">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
              Here is your holistic performance and momentum overview for Growth Beyond Grades Cohort 2 today.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Sprint time filter dropdown */}
            <div className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-gray-200 text-xs font-bold text-gray-700 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-[#0B6B3A]" />
              <span>Sprint 2 (Day 6 of 14)</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </div>

            <button
              onClick={() => showFeedback('Cohort progress summary exported to CSV')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-700 shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#0B6B3A]" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => onNavigate('plan')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#0B6B3A] text-white text-xs font-black shadow-md shadow-[#0B6B3A]/20 hover:bg-[#08522c] transition-all cursor-pointer"
            >
              <span>Fellow View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 TOP KPI CARDS WITH SPARKLINES (Exact visual structure from Reference Image 3) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          
          {/* Card 1: Enrolled Fellows */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-emerald-100/80 border-t-4 border-t-[#0B6B3A] relative overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Enrolled Fellows
                </span>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#EBF5EF] to-emerald-100 text-[#0B6B3A] shadow-xs flex items-center justify-center font-bold">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-gray-900 font-mono tracking-tight">
                50
              </div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B6B3A] mt-1">
                <span>▲ +100%</span>
                <span className="text-gray-400 font-normal">active in RISE</span>
              </div>
            </div>

            {/* Sparkline curve SVG */}
            <div className="mt-4 h-9 w-full">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradGreen" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0B6B3A" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0B6B3A" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,20 Q20,15 40,18 T80,8 T100,4 L100,25 L0,25 Z"
                  fill="url(#gradGreen)"
                />
                <path
                  d="M0,20 Q20,15 40,18 T80,8 T100,4"
                  fill="none"
                  stroke="#0B6B3A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Card 2: Activation Velocity */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-amber-100/80 border-t-4 border-t-[#F3C623] relative overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Activation Velocity
                </span>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FEF9E7] to-amber-100 text-[#B45309] shadow-xs flex items-center justify-center font-bold">
                  <Flame className="w-4 h-4 text-[#F3C623] fill-[#F3C623]" />
                </div>
              </div>
              <div className="text-3xl font-black text-gray-900 font-mono tracking-tight">
                85.4%
              </div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B6B3A] mt-1">
                <span>▲ +12%</span>
                <span className="text-gray-400 font-normal">vs Cohort 1 pace</span>
              </div>
            </div>

            {/* Sparkline curve SVG */}
            <div className="mt-4 h-9 w-full">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradGold" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F3C623" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#F3C623" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,22 Q25,20 50,12 T75,10 T100,5 L100,25 L0,25 Z"
                  fill="url(#gradGold)"
                />
                <path
                  d="M0,22 Q25,20 50,12 T75,10 T100,5"
                  fill="none"
                  stroke="#F3C623"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Card 3: Deliverables Completed */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-emerald-100/80 border-t-4 border-t-[#074524] relative overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Shipped Artifacts
                </span>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-100 text-[#074524] shadow-xs flex items-center justify-center font-bold">
                  <Briefcase className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-gray-900 font-mono tracking-tight">
                142
              </div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B6B3A] mt-1">
                <span>Avg 3.1</span>
                <span className="text-gray-400 font-normal">proofs / fellow</span>
              </div>
            </div>

            {/* Sparkline curve SVG */}
            <div className="mt-4 h-9 w-full">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradTeal" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#074524" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#074524" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,18 Q30,22 60,10 T85,6 T100,2 L100,25 L0,25 Z"
                  fill="url(#gradTeal)"
                />
                <path
                  d="M0,18 Q30,22 60,10 T85,6 T100,2"
                  fill="none"
                  stroke="#074524"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Card 4: Support Interventions (Flagged) */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-amber-100/80 border-t-4 border-t-amber-500 relative overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Support Flags
                </span>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-100 to-rose-100 text-amber-800 shadow-xs flex items-center justify-center font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                </div>
              </div>
              <div className="text-3xl font-black text-amber-600 font-mono tracking-tight">
                {supportFlagCount}
              </div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 mt-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Coach outreach required</span>
              </div>
            </div>

            {/* Sparkline curve SVG */}
            <div className="mt-4 h-9 w-full">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradAmber" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#D97706" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#D97706" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,10 Q20,12 40,6 T70,18 T100,14 L100,25 L0,25 Z"
                  fill="url(#gradAmber)"
                />
                <path
                  d="M0,10 Q20,12 40,6 T70,18 T100,14"
                  fill="none"
                  stroke="#D97706"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

        </div>

        {/* MIDDLE SECTION: INTERACTIVE CHARTS & VISUALIZATIONS (Exact layout from Reference Image 3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Évolution de l'activité (Interactive Weekly Bar Chart - 7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-emerald-50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-black text-gray-900 tracking-tight">
                    Weekly Milestone Activity
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Daily deliverables submitted across all 50 cohort fellows
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400">Peak:</span>
                  <span className="text-xs font-black text-[#0B6B3A] bg-[#EBF5EF] px-2.5 py-1 rounded-xl border border-emerald-200 shadow-2xs">
                    Thu (38 proofs)
                  </span>
                </div>
              </div>

              {/* Bar Chart Container */}
              <div className="relative pt-6 pb-2">
                {/* Y-axis indicator lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-gray-300 font-mono">
                  <div className="border-b border-gray-100 w-full flex justify-between"><span>40</span></div>
                  <div className="border-b border-gray-100 w-full flex justify-between"><span>25</span></div>
                  <div className="border-b border-gray-100 w-full flex justify-between"><span>10</span></div>
                  <div className="border-b border-gray-100 w-full flex justify-between"><span>0</span></div>
                </div>

                {/* Bars */}
                <div className="relative h-44 flex items-end justify-between gap-3 sm:gap-6 px-4 z-10">
                  {weeklyData.map((bar) => {
                    const isHovered = activeDayHover === bar.day;
                    return (
                      <div
                        key={bar.day}
                        onMouseEnter={() => setActiveDayHover(bar.day)}
                        className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                      >
                        {/* Tooltip on active */}
                        {isHovered && (
                          <div className="mb-2 px-2.5 py-1 rounded-lg bg-[#074524] text-[#F3C623] text-[10px] font-bold shadow-md animate-fadeIn whitespace-nowrap border border-[#F3C623]/30">
                            {bar.count} Shipped
                          </div>
                        )}
                        <div
                          style={{ height: bar.height }}
                          className={`w-full max-w-[36px] rounded-t-xl transition-all duration-300 ${
                            bar.isPeak
                              ? 'bg-gradient-to-t from-[#042D17] via-[#0B6B3A] to-[#10B981] shadow-md shadow-[#0B6B3A]/30 ring-1 ring-[#F3C623]'
                              : isHovered
                              ? 'bg-[#F3C623] shadow-md shadow-[#F3C623]/30'
                              : 'bg-emerald-100/90 hover:bg-emerald-200 border-t-2 border-emerald-300'
                          }`}
                        />
                        <span className={`text-xs mt-2 font-bold ${
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

            {/* Bottom mini-bar highlight */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#0B6B3A]" />
                <span>Sprint Milestone Review: This Friday, 4:00 PM GMT</span>
              </span>
              <span className="font-bold text-[#0B6B3A] hover:underline cursor-pointer">View Schedule →</span>
            </div>
          </div>

          {/* Right: Répartition des livrables (Donut Chart & Breakdown - 5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-emerald-50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-black text-gray-900 tracking-tight">
                    Deliverable Distribution
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Breakdown by output category
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-[#EBF5EF] px-2 py-0.5 rounded-lg border border-emerald-200">142 Total</span>
              </div>

              {/* Donut Chart Visual */}
              <div className="flex items-center justify-center py-3">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-40 h-40 -rotate-90" viewBox="0 0 36 36">
                    {/* Ring background */}
                    <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#F1F5F2" strokeWidth="4.2" />
                    
                    {/* Segment 1: Case Studies (42%) - Forest Green */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      stroke="#0B6B3A"
                      strokeWidth="4.2"
                      strokeDasharray="42, 100"
                      strokeDashoffset="0"
                    />

                    {/* Segment 2: Cold Outreach (28%) - Warm Gold */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      stroke="#F3C623"
                      strokeWidth="4.2"
                      strokeDasharray="28, 100"
                      strokeDashoffset="-42"
                    />

                    {/* Segment 3: CV & Pitches (18%) - Deep Evergreen */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      stroke="#042D17"
                      strokeWidth="4.2"
                      strokeDasharray="18, 100"
                      strokeDashoffset="-70"
                    />

                    {/* Segment 4: Reviews (12%) - Mint / Light Green */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="4.2"
                      strokeDasharray="12, 100"
                      strokeDashoffset="-88"
                    />
                  </svg>

                  {/* Inner text */}
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-black text-gray-900 font-mono leading-none">142</span>
                    <span className="text-[10px] text-[#0B6B3A] font-bold uppercase tracking-wider mt-1">Shipped</span>
                  </div>
                </div>
              </div>

              {/* Legend with percentages */}
              <div className="grid grid-cols-2 gap-2.5 mt-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0B6B3A] shrink-0" />
                  <span className="text-gray-700 font-medium">Case Studies</span>
                  <span className="font-bold text-gray-900 ml-auto">42%</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F3C623] shrink-0" />
                  <span className="text-gray-700 font-medium">Outreach Chats</span>
                  <span className="font-bold text-gray-900 ml-auto">28%</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#042D17] shrink-0" />
                  <span className="text-gray-700 font-medium">CV & STAR</span>
                  <span className="font-bold text-gray-900 ml-auto">18%</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0" />
                  <span className="text-gray-700 font-medium">Peer Reviews</span>
                  <span className="font-bold text-gray-900 ml-auto">12%</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
              <span>Goal: 200 by Sprint End</span>
              <span className="text-[#0B6B3A] font-bold">71% Reached</span>
            </div>
          </div>

        </div>

        {/* 3 STATUS PILL QUICK METRICS (High contrast colorful cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50/60 to-white border border-emerald-100 border-l-4 border-l-[#0B6B3A] shadow-2xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EBF5EF] to-emerald-100 text-[#0B6B3A] shadow-xs flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Active Milestone Reviews</div>
              <div className="text-sm font-bold text-gray-900">8 pending coach sign-off</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50/60 to-white border border-amber-100 border-l-4 border-l-[#F3C623] shadow-2xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FEF9E7] to-amber-100 text-[#B45309] shadow-xs flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-[#B45309]" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Coach Intervention Response Time</div>
              <div className="text-sm font-bold text-gray-900">96% resolved under 24 hours</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-50/60 to-white border border-teal-100 border-l-4 border-l-teal-600 shadow-2xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 text-teal-700 shadow-xs flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Cohort Holistic Wellbeing Index</div>
              <div className="text-sm font-bold text-gray-900">4.4 / 5.0 (High Stability)</div>
            </div>
          </div>
        </div>

        {/* GESTION DES BOURSIERS / FELLOWS DIRECTORY (Exact structure from Reference Image 3 bottom table) */}
        <div className="bg-white rounded-3xl shadow-sm border border-emerald-50 overflow-hidden">
          
          {/* Table Header & Controls */}
          <div className="p-5 sm:p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-gray-900 tracking-tight">
                Fellow Directory & Sprint Health
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Monitoring 50 GBG Cohort 2 fellows across Accra, Lagos, Nairobi, and Abuja
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => showFeedback('New cohort action broadcast dispatched to WhatsApp community')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#08522c] transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Cohort Broadcast</span>
              </button>
            </div>
          </div>

          {/* Filter Toolbar with status pills */}
          <div className="px-5 sm:px-6 py-3 bg-[#F8FAF8] border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Status Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto no-scrollbar">
              {(['All', 'On Track', 'Needs Attention', 'Action Overdue', 'Review Ready'] as const).map(
                (st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      statusFilter === st
                        ? 'bg-[#0B6B3A] text-white shadow-xs'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {st}
                  </button>
                )
              )}

              <div className="h-4 w-px bg-gray-300 mx-1 hidden sm:block" />

              <button
                onClick={() => setSupportFilter(supportFilter === 'All' ? 'Flagged' : 'All')}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  supportFilter === 'Flagged'
                    ? 'bg-[#FAF7EB] text-[#4A3319] border border-amber-300 shadow-xs'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <AlertTriangle className="w-3 h-3 text-[#F3C623]" />
                <span>Flagged Only ({supportFlagCount})</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search fellow or goal..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0B6B3A]"
              />
            </div>

          </div>

          {/* Feedback message banner if present */}
          {actionFeedback && (
            <div className="m-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-[#0B6B3A] font-bold flex items-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4" />
              <span>{actionFeedback}</span>
            </div>
          )}

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAFDFB] text-gray-400 text-[10px] font-black uppercase tracking-wider border-b border-gray-100">
                  <th className="py-3.5 px-6">Fellow</th>
                  <th className="py-3.5 px-4">Sprint Goal</th>
                  <th className="py-3.5 px-4">Deliverables Progress</th>
                  <th className="py-3.5 px-4">Energy</th>
                  <th className="py-3.5 px-4">Last Check-In</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Support Flag</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filteredFellows.map((fellow) => {
                  const progressPct = Math.round((fellow.actionsCompleted / fellow.totalActions) * 100);
                  return (
                    <tr
                      key={fellow.id}
                      className="hover:bg-emerald-50/20 transition-colors group"
                    >
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={fellow.id === 'fel-1' ? '/src/assets/images/hero_african_youth_1790382182353.jpg' : '/src/assets/images/african_student_reflection_1790382202440.jpg'}
                            alt={fellow.name}
                            referrerPolicy="no-referrer"
                            className="w-8 h-8 rounded-xl object-cover ring-1 ring-emerald-100 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-gray-900">{fellow.name}</div>
                            <div className="text-[10px] text-gray-400">{fellow.stage} · {fellow.location}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs truncate text-gray-700">
                        {fellow.primaryGoal}
                      </td>

                      {/* Progress bar column */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${progressPct}%` }}
                              className="bg-[#0B6B3A] h-full rounded-full transition-all"
                            />
                          </div>
                          <span className="font-mono font-bold text-[11px] text-[#0B6B3A]">
                            {fellow.actionsCompleted}/{fellow.totalActions}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1 font-mono font-bold text-gray-800">
                          <span className="w-2 h-2 rounded-full bg-[#0B6B3A]" />
                          <span>{fellow.energy}/5</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-gray-500 font-mono text-[11px]">
                        {fellow.lastCheckInDaysAgo === 0 ? 'Today' : `${fellow.lastCheckInDaysAgo}d ago`}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            fellow.planStatus === 'On Track'
                              ? 'bg-emerald-100 text-[#0B6B3A]'
                              : fellow.planStatus === 'Review Ready'
                              ? 'bg-blue-100 text-blue-800'
                              : fellow.planStatus === 'Needs Attention'
                              ? 'bg-amber-100 text-[#4A3319]'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {fellow.planStatus}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        {fellow.supportFlag !== 'None' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF7EB] text-[#4A3319] border border-amber-200">
                            <AlertTriangle className="w-3 h-3 text-[#F3C623]" />
                            <span>{fellow.supportFlag}</span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-gray-400">Clear</span>
                        )}
                      </td>

                      <td className="py-3.5 px-6 text-right">
                        <button
                          onClick={() => handleOpenFellow(fellow)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-[#0B6B3A] hover:text-white transition-all text-xs font-bold text-gray-700 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Dossier</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-[#F8FAF8] border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
            <span>Showing {filteredFellows.length} of 50 fellows in Cohort 2</span>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 font-bold text-gray-700">Page 1 of 1</span>
            </div>
          </div>
        </div>

      </div>

      {/* FELLOW DETAIL SLIDE-OVER DRAWER */}
      {selectedFellow && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg h-full overflow-y-auto p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0B6B3A]">
                    Fellow Coaching Dossier
                  </div>
                  <h2 className="text-xl font-black text-gray-900 mt-0.5">
                    {selectedFellow.name}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedFellow(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status info */}
              <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-emerald-100 space-y-3 mb-6">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 font-medium">Stage & Location:</span>
                  <span className="font-bold text-gray-900">{selectedFellow.stage} · {selectedFellow.location}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 font-medium">Primary 14-Day Goal:</span>
                  <span className="font-bold text-gray-900 max-w-[240px] text-right truncate">{selectedFellow.primaryGoal}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 font-medium">Shipped Deliverables:</span>
                  <span className="font-mono font-bold text-[#0B6B3A]">{selectedFellow.actionsCompleted} of {selectedFellow.totalActions}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 font-medium">Energy / Confidence:</span>
                  <span className="font-mono font-bold text-gray-900">{selectedFellow.energy}/5 · {selectedFellow.confidence}/5</span>
                </div>
              </div>

              {/* Support Flag Resolution if flagged */}
              {selectedFellow.supportFlag !== 'None' && (
                <div className="p-5 rounded-2xl bg-[#FAF7EB] border border-amber-300 mb-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-[#4A3319] uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-[#F3C623]" />
                    <span>Support Flag: {selectedFellow.supportFlag}</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed font-medium">
                    This fellow flagged friction during their wellbeing check-in.
                  </p>
                  <button
                    onClick={handleResolveSupport}
                    className="w-full py-2.5 rounded-xl bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#08522c] transition-colors cursor-pointer"
                  >
                    Mark Support as Resolved
                  </button>
                </div>
              )}

              {/* Coach Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Coach Guidance Notes:
                </label>
                <textarea
                  rows={4}
                  value={coachNoteInput}
                  onChange={(e) => setCoachNoteInput(e.target.value)}
                  placeholder="Record observations, follow-up commitments, or next cohort check-in agenda..."
                  className="w-full p-4 rounded-2xl bg-[#F8FAF8] border border-gray-200 text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B6B3A] resize-none font-medium"
                />
                <button
                  onClick={handleSaveNotes}
                  className="mt-3 w-full py-3 rounded-2xl bg-[#0B6B3A] text-white text-xs font-black hover:bg-[#08522c] transition-all shadow-md shadow-[#0B6B3A]/20 cursor-pointer active:translate-y-0.5"
                >
                  Save Notes to Fellow Record
                </button>
              </div>

            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
              <span>R-WEF GBG Cohort 2 Coaching Desk</span>
              <button
                onClick={() => setSelectedFellow(null)}
                className="text-gray-700 hover:text-gray-900 font-bold cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
