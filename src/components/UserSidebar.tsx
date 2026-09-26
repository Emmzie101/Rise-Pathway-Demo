import React, { useState } from 'react';
import { PageView, ParticipantProfile } from '../types';
import { RwefLogo } from './RwefLogo';
import {
  Compass,
  CheckCircle2,
  FileText,
  MessageSquare,
  Sparkles,
  BookOpen,
  Heart,
  TrendingUp,
  Users,
  Target,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Home,
  LogOut,
  Zap,
  Menu,
  X,
  User,
  Settings,
  Plus,
} from 'lucide-react';

interface UserSidebarProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  participant: ParticipantProfile;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenResponsibleAi: () => void;
}

export const UserSidebar: React.FC<UserSidebarProps> = ({
  currentView,
  onNavigate,
  participant,
  isCollapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
  onOpenResponsibleAi,
}) => {
  const navSections = [
    {
      heading: 'Home & Roadmap',
      items: [
        { id: 'hub' as PageView, label: 'Workspace Home', icon: Home, badge: 'Hub' },
        { id: 'plan' as PageView, label: 'My 14-Day Plan', icon: Target, badge: 'Active' },
        { id: 'progress' as PageView, label: 'My Wins & Proof', icon: TrendingUp },
      ],
    },
    {
      heading: 'Practice & Tools',
      items: [
        { id: 'studio' as PageView, label: 'CV & Story Studio', icon: FileText },
        { id: 'learning' as PageView, label: 'Action Lessons', icon: BookOpen },
        { id: 'networking' as PageView, label: 'Meet Mentors', icon: Users },
        { id: 'wellbeing' as PageView, label: 'How I Feel', icon: Heart },
        { id: 'insights' as PageView, label: 'AI Diagnostics', icon: Sparkles },
      ],
    },
    {
      heading: 'Staff Area',
      items: [
        { id: 'staff' as PageView, label: 'Coach Desk', icon: ShieldCheck, badge: 'Staff' },
      ],
    },
  ];

  const handleItemClick = (view: PageView) => {
    onNavigate(view);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between bg-white border-r border-gray-200">
      
      {/* Top Brand Header */}
      <div>
        <div className={`flex items-center justify-between border-b border-gray-100 transition-all ${
          isCollapsed ? 'p-3 flex-col gap-3' : 'p-4 sm:p-5'
        }`}>
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
            title="Return to Public Homepage"
          >
            <RwefLogo size={isCollapsed ? 'sm' : 'md'} variant={isCollapsed ? 'mark' : 'full'} />
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-xs font-black tracking-wider text-[#0B6B3A] uppercase font-sans">
                  RISE Pathway
                </span>
                <span className="text-[10px] font-bold text-[#4A3319] bg-[#F3C623] px-2 py-0.2 rounded-full w-fit">
                  GBG Cohort 2
                </span>
              </div>
            )}
          </button>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex w-7 h-7 rounded-xl bg-gray-100 hover:bg-emerald-50 hover:text-[#0B6B3A] items-center justify-center text-gray-500 transition-colors cursor-pointer"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-xl text-gray-500 hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Canva-style Big Action Button */}
        <div className="p-3 pb-0">
          <button
            onClick={() => handleItemClick('plan')}
            className={`w-full rounded-2xl bg-[#0B6B3A] hover:bg-[#074524] text-white font-semibold transition-all shadow-md shadow-[#0B6B3A]/20 cursor-pointer active:translate-y-0.5 flex items-center justify-center gap-2 ${
              isCollapsed ? 'p-3' : 'px-4 py-2.5 text-xs'
            }`}
            title="Start Next Action"
          >
            <Plus className="w-4 h-4 text-[#F3C623] stroke-[3]" />
            {!isCollapsed && <span>Start Next Action</span>}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-250px)] no-scrollbar">
          {navSections.map((sec, secIdx) => (
            <div key={secIdx} className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                  {sec.heading}
                </div>
              )}

              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center gap-3 rounded-2xl transition-all cursor-pointer group ${
                      isCollapsed ? 'p-3 justify-center' : 'px-3.5 py-2.5 justify-between'
                    } ${
                      isActive
                        ? 'bg-[#0B6B3A] text-white shadow-md shadow-[#0B6B3A]/20 font-bold'
                        : 'text-gray-700 hover:bg-emerald-50/60 hover:text-[#0B6B3A] font-medium'
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-[#F3C623]' : 'text-gray-500 group-hover:text-[#0B6B3A]'
                      }`} />
                      {!isCollapsed && (
                        <span className="text-xs">{item.label}</span>
                      )}
                    </div>

                    {!isCollapsed && item.badge && (
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-[#F3C623] text-[#4A3319]'
                          : 'bg-emerald-100 text-[#0B6B3A]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Profile & Utilities */}
      <div className="p-3 border-t border-gray-100 bg-[#F8FAF8]">
        {/* Responsible AI quick link */}
        <button
          onClick={onOpenResponsibleAi}
          className={`w-full flex items-center gap-2 rounded-xl text-gray-600 hover:text-[#0B6B3A] hover:bg-white transition-all mb-2 cursor-pointer ${
            isCollapsed ? 'p-2 justify-center' : 'px-3 py-2 text-xs font-semibold'
          }`}
          title="Ethical AI Charter"
        >
          <ShieldCheck className="w-4 h-4 text-[#0B6B3A] shrink-0" />
          {!isCollapsed && <span>Responsible AI Charter</span>}
        </button>

        {/* Participant Mini Card */}
        <div className={`rounded-2xl bg-white border border-gray-200/80 transition-all ${
          isCollapsed ? 'p-2 flex flex-col items-center gap-2' : 'p-3 flex items-center justify-between gap-3'
        }`}>
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <img
                src={participant.avatar || '/src/assets/images/hero_african_youth_1790382182353.jpg'}
                alt={participant.name}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-xl object-cover ring-2 ring-emerald-200"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#0B6B3A] border-2 border-white" />
            </div>

            {!isCollapsed && (
              <div className="min-w-0">
                <div className="text-xs font-bold text-gray-900 truncate">{participant.name}</div>
                <div className="text-[10px] text-gray-500 truncate">{participant.location.split(',')[0]}</div>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <button
              onClick={() => onNavigate('landing')}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
              title="Return to Public Homepage"
            >
              <Home className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className={`hidden lg:block shrink-0 sticky top-0 h-screen transition-all duration-300 z-40 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}>
        {sidebarContent}
      </aside>

      {/* Mobile Drawer with Backdrop */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
            onClick={onCloseMobile}
          />
          {/* Drawer Content */}
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-slideRight">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
