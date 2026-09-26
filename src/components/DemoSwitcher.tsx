import React, { useState } from 'react';
import { PageView, ParticipantProfile } from '../types';
import { alternateProfiles } from '../data/mockData';
import {
  Compass,
  CheckCircle,
  FileText,
  MessageSquare,
  Sparkles,
  BookOpen,
  Heart,
  TrendingUp,
  Users,
  ChevronUp,
  ChevronDown,
  Layers,
  RotateCcw,
  Zap,
  Home,
} from 'lucide-react';

interface DemoSwitcherProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  currentParticipant: ParticipantProfile;
  onSelectParticipant: (profile: ParticipantProfile) => void;
  onResetDemoData: () => void;
}

export const DemoSwitcher: React.FC<DemoSwitcherProps> = ({
  currentView,
  onNavigate,
  currentParticipant,
  onSelectParticipant,
  onResetDemoData,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const steps: { view: PageView; label: string; num: string; icon: any }[] = [
    { view: 'landing', label: '1. Landing Page', num: '01', icon: Layers },
    { view: 'intro', label: '2. RISE Intro', num: '02', icon: Compass },
    { view: 'checkin', label: '3. Pathway Check-In', num: '03', icon: FileText },
    { view: 'hub', label: '4. Workspace Home', num: '04', icon: Home },
    { view: 'insights', label: '5. AI Insights', num: '05', icon: Sparkles },
    { view: 'goal', label: '6. Clarify Goal', num: '06', icon: Compass },
    { view: 'plan', label: '7. Activation Plan', num: '07', icon: CheckCircle },
    { view: 'studio', label: '8. Language Studio', num: '08', icon: MessageSquare },
    { view: 'networking', label: '9. Network Navigator', num: '09', icon: Users },
    { view: 'learning', label: '10. Action Learning', num: '10', icon: BookOpen },
    { view: 'wellbeing', label: '11. Wellbeing Check-In', num: '11', icon: Heart },
    { view: 'progress', label: '12. Participant Progress', num: '12', icon: TrendingUp },
    { view: 'staff', label: '13. Staff / GBG View', num: '13', icon: Users },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Pill Toggle Button */}
      <div className="bg-[#0B6B3A] text-white p-1 rounded-2xl shadow-2xl border border-emerald-400/30 flex items-center gap-1.5 backdrop-blur-md">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-black hover:bg-white/15 rounded-xl transition-all cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-[#F3C623] animate-pulse" />
          <span>Demo Controller</span>
          <span className="text-[10px] text-emerald-200 font-mono">
            ({steps.find((s) => s.view === currentView)?.num || '01'}/13)
          </span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={() => onNavigate(currentView === 'staff' ? 'progress' : 'staff')}
          className="px-2.5 py-1 text-xs font-black bg-[#F3C623] hover:bg-[#ebd56e] text-[#4A3319] rounded-xl transition-all flex items-center gap-1 shadow-sm cursor-pointer"
          title="Direct toggle Staff / Fellow View"
        >
          <Users className="w-3 h-3 text-[#4A3319]" />
          <span>{currentView === 'staff' ? 'Fellow' : 'Staff'}</span>
        </button>
      </div>

      {/* Expanded Modal Dock */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-80 sm:w-96 bg-white rounded-3xl border border-emerald-100 shadow-2xl p-5 text-gray-900 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-[#0B6B3A]">
                Guided Prototype Stepper
              </div>
              <p className="text-[11px] text-gray-500 font-medium">
                Jump to any step or simulate diverse fellow personas
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

          {/* Persona selector */}
          <div className="mb-4 p-3 bg-[#F8FAF8] rounded-2xl border border-gray-100">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
              Active Fellow Profile:
            </div>
            <div className="flex items-center gap-1.5">
              {alternateProfiles.map((p) => {
                const isSelected = currentParticipant.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => onSelectParticipant(p)}
                    className={`flex-1 text-left px-2.5 py-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0B6B3A] text-white shadow-xs'
                        : 'bg-white hover:bg-emerald-50 text-gray-700 border border-gray-200'
                    }`}
                  >
                    <div className="truncate">{p.name.split(' ')[0]}</div>
                    <div className={`text-[9px] truncate font-normal ${isSelected ? 'text-emerald-100' : 'text-gray-400'}`}>
                      {p.location.split(',')[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 12-Step Journey Grid */}
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
            Journey Flow (12 Steps):
          </div>
          <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
            {steps.map((step) => {
              const isCurrent = currentView === step.view;
              return (
                <button
                  key={step.view}
                  onClick={() => {
                    onNavigate(step.view);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2 rounded-xl text-left text-xs transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-emerald-50 border border-emerald-300 text-[#0B6B3A] font-black'
                      : 'bg-[#F8FAF8] hover:bg-gray-100 text-gray-700 border border-transparent'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 ${
                      isCurrent ? 'bg-[#0B6B3A] text-[#F3C623]' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {step.num}
                  </span>
                  <span className="truncate text-xs font-semibold">{step.label.split('. ')[1]}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
            <span>R-WEF GBG Cohort 2</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#0B6B3A] font-black hover:underline cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
