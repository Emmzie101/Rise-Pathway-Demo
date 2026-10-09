import React, { useState } from 'react';
import { PageView, ParticipantProfile, UserRole, UserAccount } from '../types';
import { demoAccounts } from '../data/mockData';
import {
  Compass,
  FileText,
  BookOpen,
  Heart,
  TrendingUp,
  Users,
  ChevronUp,
  ChevronDown,
  Layers,
  RotateCcw,
  Home,
  ShieldAlert,
  Settings,
  Target,
  LogIn,
  UserPlus,
  LogOut,
  User,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface DemoSwitcherProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  currentParticipant: ParticipantProfile;
  currentUser?: UserAccount | null;
  currentRole: UserRole;
  onSelectPersona: (personaId: string) => void;
  onResetDemoData: () => void;
  onOpenSignUp?: () => void;
  onOpenLogIn?: () => void;
  onSignOut?: () => void;
}

export const DemoSwitcher: React.FC<DemoSwitcherProps> = ({
  currentView,
  onNavigate,
  currentParticipant,
  currentUser,
  currentRole,
  onSelectPersona,
  onResetDemoData,
  onOpenSignUp,
  onOpenLogIn,
  onSignOut,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // 12 MVP Journey Steps
  const steps: { view: PageView; label: string; num: string; icon: any; roleReq?: UserRole }[] = [
    { view: 'landing', label: '1. Landing Page', num: '01', icon: Layers },
    { view: 'checkin', label: '2. Baseline Check-In', num: '02', icon: FileText },
    { view: 'assessment', label: '3. Pathway Assessment', num: '03', icon: Compass },
    { view: 'hub', label: '4. Fellow Workspace Home', num: '04', icon: Home },
    { view: 'plan', label: '5. Plan & Opportunities', num: '05', icon: Target },
    { view: 'studio', label: '6. CV & Story Studio', num: '06', icon: FileText },
    { view: 'learning', label: '7. Weekly Learning Hub', num: '07', icon: BookOpen },
    { view: 'wellbeing', label: '8. Wellbeing & Support', num: '08', icon: Heart },
    { view: 'progress', label: '9. Wins & Proof Dossier', num: '09', icon: TrendingUp },
    { view: 'staff', label: '10. Coach Staff Desk', num: '10', icon: Users, roleReq: 'staff' },
    { view: 'admin', label: '11. Admin Console', num: '11', icon: Settings, roleReq: 'admin' },
    { view: 'safeguarding', label: '12. Safeguarding Desk', num: '12', icon: ShieldAlert, roleReq: 'safeguarding' },
  ];

  const handleStepClick = (step: typeof steps[0]) => {
    // If navigating to an elevated role page and user does not have that role, auto-align persona
    if (step.roleReq && currentRole !== step.roleReq) {
      if (step.roleReq === 'staff') onSelectPersona('demo-staff-amara');
      else if (step.roleReq === 'admin') onSelectPersona('demo-admin-kwame');
      else if (step.roleReq === 'safeguarding') onSelectPersona('demo-safeguarding-grace');
    } else if (!step.roleReq && currentRole !== 'fellow' && step.view !== 'landing') {
      // If clicking fellow views while on staff/admin/safeguarding, switch to Fellow Kofi
      onSelectPersona('demo-fellow-kofi');
    }

    onNavigate(step.view);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 lg:bottom-4 right-4 z-50">
      {/* Floating Pill Toggle Button */}
      <div className="bg-[#0B6B3A] text-white p-1 rounded-2xl shadow-2xl border border-emerald-400/40 flex items-center gap-1.5 backdrop-blur-md">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold hover:bg-white/15 rounded-xl transition-all cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-[#F3C623] animate-pulse" />
          <span>Demo Controller</span>
          <span className="text-[10px] text-emerald-200 font-mono">
            ({steps.find((s) => s.view === currentView)?.num || '01'}/12)
          </span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>

        <span className="px-2.5 py-1 text-[11px] font-black uppercase rounded-xl bg-[#F3C623] text-[#074626] shadow-xs">
          {currentUser ? currentUser.role : 'GUEST'}
        </span>
      </div>

      {/* Expanded Modal Dock */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-84 sm:w-96 bg-white rounded-3xl border border-emerald-100 shadow-2xl p-5 text-gray-900 animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-[#0B6B3A] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F3C623]" />
                <span>Prototype Controller</span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium">
                Test authentication, switch 4 roles & explore 12 MVP views
              </p>
            </div>
            <button
              onClick={onResetDemoData}
              className="p-2 rounded-xl text-gray-500 hover:text-[#0B6B3A] hover:bg-emerald-50 transition-colors cursor-pointer"
              title="Reset prototype state to defaults"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Current Auth / Session Status Card */}
          <div className="mb-3 p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Current Auth Session:
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  currentUser
                    ? 'bg-[#0B6B3A] text-white'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {currentUser ? (currentUser.isDemo ? 'Demo Logged-In' : 'Registered User') : 'Guest (Logged Out)'}
              </span>
            </div>

            {currentUser ? (
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={currentUser.avatar || '/images/hero/hero_african_youth.jpg'}
                    alt={currentUser.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = '/images/hero/hero_african_youth.jpg';
                    }}
                    className="w-8 h-8 rounded-xl object-cover ring-1 ring-emerald-300 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-gray-900 truncate">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] text-gray-500 truncate">
                      {currentUser.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {onOpenLogIn && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onOpenLogIn();
                      }}
                      className="px-2 py-1 text-[11px] font-bold text-[#0B6B3A] bg-white border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors"
                    >
                      Switch
                    </button>
                  )}
                  {onSignOut && (
                    <button
                      onClick={() => {
                        onSignOut();
                      }}
                      className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Sign Out"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs text-gray-600 font-medium">
                  Public mode (Not logged in)
                </div>
                <div className="flex items-center gap-1.5">
                  {onOpenLogIn && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onOpenLogIn();
                      }}
                      className="px-2.5 py-1 text-xs font-bold text-gray-800 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Log In
                    </button>
                  )}
                  {onOpenSignUp && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onOpenSignUp();
                      }}
                      className="px-2.5 py-1 text-xs font-bold text-white bg-[#0B6B3A] rounded-xl hover:bg-[#074626] transition-colors cursor-pointer"
                    >
                      Sign Up
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Persona & Role Selector */}
          <div className="mb-3 p-3 bg-[#FAF9F5] rounded-2xl border border-gray-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                1-Click Switch Persona:
              </span>
              <span className="text-[10px] text-gray-400">6 Pan-African Personas</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {demoAccounts.map((persona) => {
                const isSelected =
                  currentUser?.id === persona.id ||
                  (currentUser?.role === persona.role &&
                    persona.role === 'fellow' &&
                    currentParticipant.name === persona.name);

                return (
                  <button
                    key={persona.id}
                    onClick={() => {
                      onSelectPersona(persona.id);
                    }}
                    className={`text-left p-2 rounded-xl text-xs transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#0B6B3A] text-white border-[#074626] shadow-2xs font-bold'
                        : 'bg-white hover:bg-emerald-50 text-gray-800 border-gray-200'
                    }`}
                  >
                    <div className="truncate font-bold text-[11px]">{persona.name}</div>
                    <div
                      className={`text-[9px] uppercase font-semibold truncate ${
                        isSelected ? 'text-[#F3C623]' : 'text-gray-500'
                      }`}
                    >
                      {persona.roleTitle.split('(')[0].trim()}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 12-Step Journey Grid */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Jump to MVP Step (12 Views):
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
            {steps.map((step) => {
              const isCurrent = currentView === step.view;
              const Icon = step.icon;

              return (
                <button
                  key={step.view}
                  onClick={() => handleStepClick(step)}
                  className={`flex items-center gap-2 p-2 rounded-xl text-left text-xs transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-emerald-100/70 border border-emerald-300 text-[#0B6B3A] font-bold'
                      : 'bg-[#FAF9F5] hover:bg-gray-100 text-gray-700 border border-transparent'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0 text-[#0B6B3A]" />
                  <span className="truncate">{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
