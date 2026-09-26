import React from 'react';
import { PageView, ParticipantProfile } from '../types';
import {
  Menu,
  Bell,
  Search,
  Users,
  Compass,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Flame,
} from 'lucide-react';

interface UserTopBarProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  participant: ParticipantProfile;
  onOpenMobileMenu: () => void;
  onOpenResponsibleAi: () => void;
}

export const UserTopBar: React.FC<UserTopBarProps> = ({
  currentView,
  onNavigate,
  participant,
  onOpenMobileMenu,
  onOpenResponsibleAi,
}) => {
  const isStaffPage = currentView === 'staff';

  const viewTitles: Record<PageView, { title: string; subtitle: string }> = {
    landing: { title: 'Welcome to RISE', subtitle: 'Public Homepage' },
    intro: { title: 'How RISE Works', subtitle: 'Step-by-Step Overview' },
    checkin: { title: 'Quick Check-In', subtitle: 'Tell us where you are starting from' },
    hub: { title: 'Workspace Home', subtitle: 'Everything at a glance' },
    insights: { title: 'My Recommendations', subtitle: 'Helpful advice based on your check-in' },
    goal: { title: 'Pick Your 14-Day Goal', subtitle: 'Choose what to focus on this week' },
    plan: { title: 'My 14-Day Plan', subtitle: '5 simple steps to get job-ready' },
    studio: { title: 'CV & Story Studio', subtitle: 'Turn school projects into strong CV points' },
    networking: { title: 'Meet Real Mentors', subtitle: '15-minute friendly chats with working pros' },
    learning: { title: 'Short Practice Lessons', subtitle: 'Quick 5-minute guides for real work' },
    wellbeing: { title: 'How I Feel Today', subtitle: 'Check your stress and get coach support' },
    progress: { title: 'My Wins & Proof', subtitle: 'Everything you completed so far' },
    staff: { title: 'Cohort 2 Coach Desk', subtitle: 'Coach view of student progress' },
  };

  const currentInfo = viewTitles[currentView] || { title: 'Fellow Workspace', subtitle: 'GBG Cohort 2' };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between transition-all">
      
      {/* Left: Mobile hamburger & breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-emerald-50 hover:text-[#0B6B3A] transition-colors cursor-pointer"
          aria-label="Open navigation sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            <span>GBG Cohort 2</span>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-[#0B6B3A]">{currentInfo.subtitle}</span>
          </div>
          <h1 className="text-base sm:text-lg font-black text-gray-900 leading-none mt-0.5">
            {currentInfo.title}
          </h1>
        </div>
      </div>

      {/* Right: Quick actions & user status */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        
        {/* Streak / Sprint pill */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7EB] border border-amber-200 text-xs font-black text-[#4A3319]">
          <Flame className="w-3.5 h-3.5 text-[#F3C623] fill-[#F3C623]" />
          <span>Sprint Day 6 of 14</span>
        </div>

        {/* Responsible AI prompt button */}
        <button
          onClick={onOpenResponsibleAi}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#0B6B3A] bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-100 transition-colors cursor-pointer"
          title="Ethical AI Charter"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Ethical AI</span>
        </button>

        {/* Quick Staff / Fellow View Switcher */}
        <button
          onClick={() => onNavigate(isStaffPage ? 'plan' : 'staff')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            isStaffPage
              ? 'bg-[#4A3319] text-white shadow-xs'
              : 'bg-white text-gray-700 hover:text-gray-900 border border-gray-200 hover:bg-gray-50'
          }`}
          title={isStaffPage ? 'Return to Participant Fellow Workspace' : 'Switch to Coach Staff Desk'}
        >
          <Users className="w-3.5 h-3.5 text-[#0B6B3A]" />
          <span className="hidden sm:inline">{isStaffPage ? 'Fellow View' : 'Staff Desk'}</span>
        </button>

        {/* User Avatar & Energy indicator */}
        <button
          onClick={() => onNavigate('progress')}
          className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          title="View Momentum"
        >
          <div className="relative">
            <img
              src={participant.avatar || '/src/assets/images/hero_african_youth_1790382182353.jpg'}
              alt={participant.name}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-xl object-cover ring-2 ring-emerald-200"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#0B6B3A] border-2 border-white" />
          </div>
        </button>

      </div>
    </header>
  );
};
