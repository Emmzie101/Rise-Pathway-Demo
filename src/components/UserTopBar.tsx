import React from 'react';
import { PageView, ParticipantProfile } from '../types';
import {
  Menu,
  ShieldCheck,
  Flame,
} from 'lucide-react';

interface UserTopBarProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  participant: ParticipantProfile;
  onOpenMobileMenu: () => void;
  onOpenResponsibleAi: () => void;
  userRole?: string;
  onSignOut?: () => void;
}

export const UserTopBar: React.FC<UserTopBarProps> = ({
  currentView,
  onNavigate,
  participant,
  onOpenMobileMenu,
  onOpenResponsibleAi,
  userRole = 'fellow',
}) => {
  const viewTitles: Record<PageView, string> = {
    landing: 'Welcome to RISE',
    intro: 'How RISE Works',
    auth: 'Sign In / Register',
    checkin: 'Pathway Check-In',
    assessment: 'Career Pathway Assessment',
    hub: 'Workspace Home',
    insights: 'Pathway Recommendations',
    goal: 'Sprint Goal Calibration',
    plan: 'Personal Action Plan',
    studio: 'CV & Story Studio',
    learning: 'Weekly Learning Hub',
    wellbeing: 'Weekly Wellbeing Check',
    progress: 'My Wins & Proof Dossier',
    staff: 'Coach Staff Desk',
    admin: 'Administrator Console',
    safeguarding: 'Safeguarding Focal Desk',
  };

  const title = viewTitles[currentView] || 'Fellow Workspace';

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between transition-all">
      {/* Left: Mobile hamburger & clean Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 -ml-1 rounded-xl text-gray-700 hover:bg-emerald-50 hover:text-[#0B6B3A] transition-colors cursor-pointer shrink-0"
          aria-label="Open navigation sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 truncate">
          {title}
        </h1>
      </div>

      {/* Right: Clean, un-cluttered responsive actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Streak / Sprint pill - hidden on small mobile to prevent any overflow */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7EB] border border-amber-200 text-xs font-bold text-[#4A3319]">
          <Flame className="w-3.5 h-3.5 text-[#F3C623] fill-[#F3C623]" />
          <span>Sprint Day 6 of 14</span>
        </div>

        {/* Responsible AI prompt button - hidden on small screens */}
        <button
          onClick={onOpenResponsibleAi}
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-[#0B6B3A] bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-100 transition-colors cursor-pointer"
          title="Ethical AI Charter"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Ethical AI</span>
        </button>

        {/* User Avatar & Energy indicator */}
        <button
          onClick={() => onNavigate('progress')}
          className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          title="View Momentum"
        >
          <div className="relative">
            <img
              src={participant.avatar || '/images/hero/hero_african_youth.jpg'}
              alt={participant.name}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = '/images/hero/hero_african_youth.jpg';
              }}
              className="w-8 h-8 rounded-xl object-cover ring-2 ring-emerald-200"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#0B6B3A] border-2 border-white" />
          </div>
        </button>
      </div>
    </header>
  );
};
