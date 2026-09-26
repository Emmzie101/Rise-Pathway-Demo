import React, { useState } from 'react';
import { PageView, ParticipantProfile, OpportunityPlan, CheckInResponses } from '../types';
import {
  Search,
  Target,
  FileText,
  BookOpen,
  Users,
  Heart,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Flame,
  Award,
  ShieldCheck,
  Compass,
  ChevronRight,
  ExternalLink,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Calendar,
  MessageCircle,
  HelpCircle,
  Play,
  Check,
} from 'lucide-react';

interface WorkspaceHubPageProps {
  onNavigate: (view: PageView) => void;
  participant: ParticipantProfile;
  plan: OpportunityPlan;
  responses: CheckInResponses;
}

export const WorkspaceHubPage: React.FC<WorkspaceHubPageProps> = ({
  onNavigate,
  participant,
  plan,
  responses,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'sprint' | 'practice' | 'proof'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const firstName = participant.name.split(' ')[0] || 'Fellow';

  // Circular Quick Launch icons (directly inspired by Canva's circle launcher row)
  const quickCategories = [
    {
      id: 'plan' as PageView,
      label: 'Sprint Plan',
      sub: '14-Day Steps',
      icon: Target,
      bg: 'bg-emerald-600',
      textColor: 'text-emerald-700',
      ringColor: 'ring-emerald-200',
    },
    {
      id: 'studio' as PageView,
      label: 'CV & STAR',
      sub: 'Story Polish',
      icon: FileText,
      bg: 'bg-[#0B6B3A]',
      textColor: 'text-[#0B6B3A]',
      ringColor: 'ring-emerald-300',
    },
    {
      id: 'learning' as PageView,
      label: 'Lessons',
      sub: '5-Min LMS',
      icon: BookOpen,
      bg: 'bg-teal-600',
      textColor: 'text-teal-700',
      ringColor: 'ring-teal-200',
    },
    {
      id: 'networking' as PageView,
      label: 'Mentors',
      sub: '15-Min Chats',
      icon: Users,
      bg: 'bg-[#B45309]',
      textColor: 'text-[#B45309]',
      ringColor: 'ring-amber-300',
    },
    {
      id: 'wellbeing' as PageView,
      label: 'Wellbeing',
      sub: 'Pace & Energy',
      icon: Heart,
      bg: 'bg-[#074524]',
      textColor: 'text-[#074524]',
      ringColor: 'ring-emerald-200',
    },
    {
      id: 'progress' as PageView,
      label: 'Wins Log',
      sub: 'Proof Dossier',
      icon: TrendingUp,
      bg: 'bg-[#042D17]',
      textColor: 'text-[#042D17]',
      ringColor: 'ring-emerald-300',
    },
    {
      id: 'insights' as PageView,
      label: 'AI Check',
      sub: 'Diagnostics',
      icon: Sparkles,
      bg: 'bg-[#D97706]',
      textColor: 'text-[#D97706]',
      ringColor: 'ring-amber-200',
    },
    {
      id: 'staff' as PageView,
      label: 'Coach Desk',
      sub: '1:1 Guidance',
      icon: ShieldCheck,
      bg: 'bg-[#0B6B3A]',
      textColor: 'text-[#0B6B3A]',
      ringColor: 'ring-emerald-200',
    },
  ];

  // Visual Canva-style thumbnail preview cards
  const allCards = [
    {
      id: 'plan-card',
      view: 'plan' as PageView,
      category: 'sprint',
      title: '14-Day Opportunity Plan',
      tag: 'Current Roadmap',
      badge: 'Day 6 of 14',
      badgeColor: 'bg-[#F3C623] text-[#074524]',
      description: 'Your step-by-step pathway: 3 of 5 actions done. Next: Reach out to 2 verified African startups.',
      thumbnailBg: 'bg-gradient-to-br from-[#0B6B3A] to-[#074524]',
      accentColor: '#0B6B3A',
      stats: '60% Finished',
      icon: Target,
      cardPreview: (
        <div className="h-full w-full p-4 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
              Active Sprint
            </span>
            <span className="text-xs font-mono font-bold text-[#F3C623]">60%</span>
          </div>
          <div>
            <div className="text-base font-bold tracking-tight">3 of 5 Tasks Done</div>
            <div className="w-full bg-white/20 rounded-full h-1.5 mt-2 overflow-hidden">
              <div className="bg-[#F3C623] h-full rounded-full" style={{ width: '60%' }} />
            </div>
          </div>
          <div className="text-[11px] text-emerald-100 flex items-center justify-between">
            <span>Next: Outreach Brief</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F3C623]" />
          </div>
        </div>
      ),
    },
    {
      id: 'studio-card',
      view: 'studio' as PageView,
      category: 'practice',
      title: 'CV & STAR Story Studio',
      tag: 'Resume & Proof',
      badge: 'Draft 2 Ready',
      badgeColor: 'bg-emerald-100 text-[#0B6B3A]',
      description: 'Turn your real university projects and volunteer work into clear bullet points employers love.',
      thumbnailBg: 'bg-gradient-to-br from-[#042D17] to-[#0B6B3A]',
      accentColor: '#0B6B3A',
      stats: '4 Story Cards',
      icon: FileText,
      cardPreview: (
        <div className="h-full w-full p-4 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
              STAR Polisher
            </span>
            <FileText className="w-4 h-4 text-[#F3C623]" />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold text-[#F3C623]">Situation · Task · Action · Result</div>
            <div className="text-sm font-bold line-clamp-1">Campus Web App Lead</div>
            <div className="text-[10px] text-emerald-200 line-clamp-1">Built 2-project case study with live URL</div>
          </div>
          <div className="text-[11px] text-emerald-100 flex items-center justify-between">
            <span>Export PDF & Docx</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F3C623]" />
          </div>
        </div>
      ),
    },
    {
      id: 'learning-card',
      view: 'learning' as PageView,
      category: 'practice',
      title: '5-Minute Action Lessons',
      tag: 'LMS Academy',
      badge: '6-Day Streak',
      badgeColor: 'bg-amber-100 text-[#B45309]',
      description: 'Short, practical modules: Cold emails that get answers, building proof on GitHub, and pitch decks.',
      thumbnailBg: 'bg-gradient-to-br from-teal-800 to-emerald-900',
      accentColor: '#0D9488',
      stats: '4 Modules',
      icon: BookOpen,
      cardPreview: (
        <div className="h-full w-full p-4 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
              R-WEF Academy
            </span>
            <div className="flex items-center gap-1 text-[11px] text-[#F3C623] font-bold">
              <Flame className="w-3.5 h-3.5 fill-[#F3C623]" />
              <span>6 Days</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-teal-200 font-semibold">Active Course</div>
            <div className="text-sm font-bold">Sending Cold Emails that Land Interviews</div>
          </div>
          <div className="text-[11px] text-emerald-100 flex items-center justify-between">
            <span>5 min practical exercise</span>
            <Play className="w-3.5 h-3.5 fill-[#F3C623] text-[#F3C623]" />
          </div>
        </div>
      ),
    },
    {
      id: 'networking-card',
      view: 'networking' as PageView,
      category: 'sprint',
      title: 'Meet Real Working Mentors',
      tag: 'Mentor Navigator',
      badge: '15-Min Quick Chats',
      badgeColor: 'bg-emerald-100 text-[#074524]',
      description: 'Connect with African tech leads, alumni, and design mentors for friendly, focused career advice.',
      thumbnailBg: 'bg-gradient-to-br from-[#92400E] to-[#B45309]',
      accentColor: '#B45309',
      stats: '2 Chats Done',
      icon: Users,
      cardPreview: (
        <div className="h-full w-full p-4 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
              Practitioners
            </span>
            <Users className="w-4 h-4 text-[#F3C623]" />
          </div>
          <div>
            <div className="text-xs text-amber-200 font-semibold">Next Mentor Session</div>
            <div className="text-sm font-bold">Kwame Mensah · Senior Product Designer</div>
            <div className="text-[10px] text-amber-100">Tomorrow at 3:00 PM GMT</div>
          </div>
          <div className="text-[11px] text-amber-200 flex items-center justify-between">
            <span>View agenda & notes</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F3C623]" />
          </div>
        </div>
      ),
    },
    {
      id: 'wellbeing-card',
      view: 'wellbeing' as PageView,
      category: 'sprint',
      title: 'How I Feel Today',
      tag: 'Wellbeing Check',
      badge: 'Safe & Private',
      badgeColor: 'bg-emerald-100 text-[#0B6B3A]',
      description: 'Quick 1-minute check-in on your energy and pace. Let Coach Emmanuel know if you need any adjustments.',
      thumbnailBg: 'bg-gradient-to-br from-[#074524] to-[#042D17]',
      accentColor: '#074524',
      stats: 'Energy: 4/5',
      icon: Heart,
      cardPreview: (
        <div className="h-full w-full p-4 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
              Pacing Calibration
            </span>
            <Heart className="w-4 h-4 fill-[#F3C623] text-[#F3C623]" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-[#F3C623] flex items-baseline gap-1">
              <span>{participant.energyLevel || 4}</span>
              <span className="text-xs text-emerald-300 font-normal">/ 5 Energy</span>
            </div>
            <div className="text-xs text-emerald-100 mt-0.5">High Focus · Pacing Well</div>
          </div>
          <div className="text-[11px] text-emerald-200 flex items-center justify-between">
            <span>Log daily check-in (1 min)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F3C623]" />
          </div>
        </div>
      ),
    },
    {
      id: 'progress-card',
      view: 'progress' as PageView,
      category: 'proof',
      title: 'Wins & Evidence Log',
      tag: 'Portfolio Dossier',
      badge: '142 Cohort Proofs',
      badgeColor: 'bg-teal-100 text-teal-800',
      description: 'Your real-world proof gallery. Log completed projects, published GitHub repos, and mentor sign-offs.',
      thumbnailBg: 'bg-gradient-to-br from-[#0B6B3A] to-emerald-900',
      accentColor: '#0B6B3A',
      stats: '3 Logged Proofs',
      icon: TrendingUp,
      cardPreview: (
        <div className="h-full w-full p-4 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
              Verified Proof
            </span>
            <Award className="w-4 h-4 text-[#F3C623]" />
          </div>
          <div>
            <div className="text-xs text-emerald-200 font-semibold">Latest Achievement</div>
            <div className="text-sm font-bold">2-Project Live Portfolio Published</div>
            <div className="text-[10px] text-emerald-100">Reviewed by Coach Grace</div>
          </div>
          <div className="text-[11px] text-emerald-200 flex items-center justify-between">
            <span>View shareable dossier</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F3C623]" />
          </div>
        </div>
      ),
    },
    {
      id: 'insights-card',
      view: 'insights' as PageView,
      category: 'sprint',
      title: 'AI Pathway Diagnostics',
      tag: 'Readiness Diagnostic',
      badge: '94% Accuracy',
      badgeColor: 'bg-amber-100 text-[#B45309]',
      description: 'See your foundation scores across technical curiosity, STAR articulation, and professional network.',
      thumbnailBg: 'bg-gradient-to-br from-[#042D17] to-teal-900',
      accentColor: '#042D17',
      stats: 'Diagnostics Ready',
      icon: Sparkles,
      cardPreview: (
        <div className="h-full w-full p-4 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
              Diagnostic Match
            </span>
            <Sparkles className="w-4 h-4 text-[#F3C623]" />
          </div>
          <div>
            <div className="text-xs text-emerald-200 font-semibold">Strongest Foundation</div>
            <div className="text-sm font-bold">Technical Curiosity (85%)</div>
            <div className="text-[10px] text-emerald-100">Primary growth: Network outreach</div>
          </div>
          <div className="text-[11px] text-emerald-200 flex items-center justify-between">
            <span>Review diagnostic breakdown</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F3C623]" />
          </div>
        </div>
      ),
    },
    {
      id: 'staff-card',
      view: 'staff' as PageView,
      category: 'proof',
      title: 'Coach Desk & Support',
      tag: 'Human Guidance',
      badge: 'Coach Online',
      badgeColor: 'bg-emerald-100 text-[#0B6B3A]',
      description: 'Direct access to your dedicated coach. Get advice on applications, balancing exams, and next steps.',
      thumbnailBg: 'bg-gradient-to-br from-[#074524] to-[#0B6B3A]',
      accentColor: '#074524',
      stats: 'Reply < 24h',
      icon: ShieldCheck,
      cardPreview: (
        <div className="h-full w-full p-4 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
              Human Coach
            </span>
            <ShieldCheck className="w-4 h-4 text-[#F3C623]" />
          </div>
          <div>
            <div className="text-xs text-emerald-200 font-semibold">Assigned Cohort Coach</div>
            <div className="text-sm font-bold">Coach Emmanuel & Coach Grace</div>
            <div className="text-[10px] text-emerald-100">Office hours: Thu 4:00 PM GMT</div>
          </div>
          <div className="text-[11px] text-emerald-200 flex items-center justify-between">
            <span>Send a quick note</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F3C623]" />
          </div>
        </div>
      ),
    },
  ];

  const filteredCards = allCards.filter((card) => {
    const matchesSearch =
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.tag.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = activeTab === 'all' || card.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#F8FAF8] pb-16">
      
      {/* 1. TOP CANVA-STYLE SEARCH BAR HEADER */}
      <div className="bg-white border-b border-gray-200/80 sticky top-0 z-20 px-4 sm:px-6 lg:px-8 py-3.5 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Centered Search Input Pill (like Canva's top search) */}
          <div className="flex-1 max-w-2xl mx-auto relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your sprint tools, lessons, proof templates, or coach notes..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0B6B3A] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Action Button */}
          <button
            onClick={() => onNavigate('plan')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B6B3A] text-white text-xs font-semibold hover:bg-[#074524] transition-all shadow-xs cursor-pointer active:translate-y-0.5 shrink-0"
          >
            <Target className="w-3.5 h-3.5 text-[#F3C623]" />
            <span>Open Sprint Plan</span>
          </button>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-8">
        
        {/* 2. HERO WELCOME BILLBOARD BANNER (Canva-style wide gradient billboard) */}
        <div className="relative rounded-3xl sm:rounded-[2rem] bg-gradient-to-r from-[#042D17] via-[#074524] to-[#0B6B3A] p-6 sm:p-8 lg:p-10 text-white shadow-lg overflow-hidden border border-emerald-600/30">
          
          {/* Subtle decorative glowing motifs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#F3C623]/20 via-[#0B6B3A]/30 to-transparent rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#F3C623] text-xs font-semibold border border-white/15">
              <Compass className="w-3.5 h-3.5" />
              <span>Growth Beyond Grades · Cohort 2</span>
            </div>

            {/* Main Greeting */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              Welcome to your Growth Space, {firstName}!
            </h1>

            {/* Easy English Subtitle */}
            <p className="text-xs sm:text-sm lg:text-base text-emerald-100 font-normal leading-relaxed max-w-2xl">
              Everything you need for your 14-day career sprint is set up right here. Pick up where you left off, polish your CV, or practice a 5-minute action lesson.
            </p>

            {/* Quick Metrics Bar on Banner */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-xs font-medium text-white backdrop-blur-xs">
                <Target className="w-3.5 h-3.5 text-[#F3C623]" />
                <span className="font-semibold text-[#F3C623]">Sprint 2</span>
                <span className="text-emerald-200">· Day 6 of 14</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-xs font-medium text-white backdrop-blur-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span className="font-semibold text-white">3 of 5 Actions Done</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-xs font-medium text-white backdrop-blur-xs">
                <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300" />
                <span className="text-emerald-200">Energy:</span>
                <span className="font-semibold text-white">High Focus (4/5)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => onNavigate('plan')}
                className="px-5 py-2.5 rounded-xl bg-[#F3C623] hover:bg-[#ebd56e] text-[#074524] text-xs sm:text-sm font-semibold transition-all shadow-md cursor-pointer active:translate-y-0.5 flex items-center gap-2"
              >
                <span>Continue Sprint Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('wellbeing')}
                className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/20 text-white text-xs sm:text-sm font-medium transition-all backdrop-blur-xs cursor-pointer flex items-center gap-2 border border-white/20"
              >
                <Heart className="w-4 h-4 text-[#F3C623]" />
                <span>Today's 1-Min Check-In</span>
              </button>
            </div>

          </div>
        </div>

        {/* 3. CIRCULAR QUICK LAUNCH BAR (Directly inspired by Canva's round app icon strip) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900 tracking-tight flex items-center gap-2">
              <span>Quick Launch Tools</span>
            </h2>
            <span className="text-xs text-gray-500 font-normal">Click any tool to open immediately</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4">
            {quickCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => onNavigate(cat.id)}
                  className="flex flex-col items-center gap-2 p-2.5 rounded-2xl bg-white hover:bg-emerald-50/50 border border-gray-200/80 hover:border-emerald-200 transition-all cursor-pointer group shadow-2xs hover:shadow-sm"
                >
                  <div className={`w-12 h-12 rounded-full ${cat.bg} text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-center">
                    <span className="block text-xs font-semibold text-gray-900 group-hover:text-[#0B6B3A] line-clamp-1">
                      {cat.label}
                    </span>
                    <span className="block text-[10px] text-gray-400 font-normal line-clamp-1">
                      {cat.sub}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. RECENT & ESSENTIAL WORKSPACE ITEMS (Canva-style Card Thumbnails Grid) */}
        <div className="space-y-4">
          
          {/* Section Toolbar: Title, Filter Pills, View Mode */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                Everything You Need at a Glance
              </h2>
              <p className="text-xs text-gray-500 font-normal mt-0.5">
                All your verified pathways, practice studios, and coach support in one unified dashboard.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex p-1 rounded-xl bg-gray-100 border border-gray-200 text-xs font-medium">
                {(['all', 'sprint', 'practice', 'proof'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded-lg capitalize transition-all cursor-pointer ${
                      activeTab === tab
                        ? 'bg-white text-gray-900 font-semibold shadow-2xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab === 'all' ? 'All Modules' : tab}
                  </button>
                ))}
              </div>

              {/* Grid / List toggle */}
              <div className="hidden sm:inline-flex p-1 rounded-xl bg-gray-100 border border-gray-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === 'grid' ? 'bg-white text-[#0B6B3A] shadow-2xs' : 'text-gray-400 hover:text-gray-600'
                  }`}
                  title="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === 'list' ? 'bg-white text-[#0B6B3A] shadow-2xs' : 'text-gray-400 hover:text-gray-600'
                  }`}
                  title="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Cards Container */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {filteredCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.id}
                    onClick={() => onNavigate(card.view)}
                    className="group bg-white rounded-2xl border border-gray-200/90 hover:border-emerald-300 shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col cursor-pointer hover:-translate-y-1"
                  >
                    {/* Visual Card Thumbnail (Inspired by Canva colorful design preview) */}
                    <div className={`h-40 ${card.thumbnailBg} relative rounded-t-2xl`}>
                      {card.cardPreview}
                    </div>

                    {/* Card Body & Metadata */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${card.badgeColor}`}>
                            {card.badge}
                          </span>
                          <span className="text-[11px] text-gray-400 font-mono">
                            {card.stats}
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#0B6B3A] transition-colors leading-snug">
                          {card.title}
                        </h3>

                        <p className="text-xs text-gray-500 font-normal leading-relaxed line-clamp-2">
                          {card.description}
                        </p>
                      </div>

                      {/* Card Footer Action */}
                      <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#0B6B3A]">
                        <span>Open {card.tag}</span>
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View Alternative */
            <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 shadow-2xs overflow-hidden">
              {filteredCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.id}
                    onClick={() => onNavigate(card.view)}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-emerald-50/40 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`w-12 h-12 rounded-xl ${card.thumbnailBg} text-white flex items-center justify-center shrink-0 shadow-2xs`}>
                        <Icon className="w-5 h-5 text-[#F3C623]" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#0B6B3A] truncate">
                            {card.title}
                          </h3>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${card.badgeColor}`}>
                            {card.badge}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {card.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-mono font-medium text-gray-400 hidden sm:inline-block">
                        {card.stats}
                      </span>
                      <button className="px-3.5 py-1.5 rounded-xl bg-gray-100 group-hover:bg-[#0B6B3A] group-hover:text-white text-xs font-semibold text-gray-700 transition-all flex items-center gap-1">
                        <span>Open</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* 5. HELPFUL COACH NOTICE / BOTTOM FOOTER WIDGET */}
        <div className="p-5 rounded-2xl bg-[#EBF5EF] border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0B6B3A] text-white flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5 text-[#F3C623]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#074524]">
                Next Recommended Step for You
              </h4>
              <p className="text-xs text-[#0B6B3A] mt-0.5 font-normal">
                Finish Task 4 of your 14-Day Opportunity Plan: Draft your 2nd STAR story in the CV Studio before Friday.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('studio')}
            className="px-4 py-2 rounded-xl bg-[#0B6B3A] hover:bg-[#074524] text-white text-xs font-semibold transition-all shadow-2xs cursor-pointer shrink-0 self-start sm:self-center flex items-center gap-1.5"
          >
            <span>Go to CV Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
