import React from 'react';
import { PageView, ParticipantProfile } from '../types';
import { RwefLogo } from './RwefLogo';
import {
  Home,
  Target,
  FileText,
  BookOpen,
  Heart,
  TrendingUp,
  ShieldCheck,
  ShieldAlert,
  Settings,
  Users,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
  Lock,
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
  userRole?: string;
  onSignOut?: () => void;
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
  userRole = 'fellow',
  onSignOut,
}) => {
  // ROLE-SPECIFIC NAVIGATION CONFIGURATION
  let navItems: { id: PageView; label: string; icon: any; badge?: string }[] = [];

  if (userRole === 'staff') {
    navItems = [
      { id: 'staff', label: 'Cohort Fellows', icon: Users, badge: 'Staff' },
      { id: 'learning', label: 'Curriculum Resources', icon: BookOpen },
    ];
  } else if (userRole === 'admin') {
    navItems = [
      { id: 'admin', label: 'User & Access Control', icon: Settings, badge: 'Admin' },
      { id: 'staff', label: 'Cohort Overview', icon: Users },
      { id: 'learning', label: 'Learning Resources', icon: BookOpen },
    ];
  } else if (userRole === 'safeguarding') {
    navItems = [
      { id: 'safeguarding', label: 'Confidential Dossiers', icon: ShieldAlert, badge: 'Restricted' },
    ];
  } else {
    // Fellow Navigation
    navItems = [
      { id: 'hub', label: 'Workspace Home', icon: Home },
      { id: 'plan', label: 'My Plan & Opps', icon: Target },
      { id: 'learning', label: 'Learning Hub', icon: BookOpen },
      { id: 'studio', label: 'CV & Story Studio', icon: FileText },
      { id: 'wellbeing', label: 'Weekly Wellbeing', icon: Heart },
      { id: 'progress', label: 'Wins & Evidence', icon: TrendingUp },
    ];
  }

  const handleItemClick = (view: PageView) => {
    onNavigate(view);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between bg-white border-r border-gray-200">
      
      {/* Brand Header */}
      <div>
        <div
          className={`flex items-center justify-between border-b border-gray-100 transition-all ${
            isCollapsed ? 'p-3 flex-col gap-3' : 'p-4 sm:p-5'
          }`}
        >
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
                <span className="text-[10px] font-bold text-[#4A3319] bg-[#F3C623] px-2 py-0.5 rounded-full w-fit">
                  {userRole.toUpperCase()}
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
        </div>

        {/* Navigation Items */}
        <div className="p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0B6B3A] text-white shadow-sm shadow-[#0B6B3A]/20'
                    : 'text-gray-600 hover:bg-emerald-50/60 hover:text-gray-900'
                } ${isCollapsed ? 'justify-center px-2' : ''}`}
                title={item.label}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#F3C623]' : 'text-gray-500'}`} />
                {!isCollapsed && (
                  <div className="flex items-center justify-between w-full">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase ${
                          isActive
                            ? 'bg-[#074626] text-[#F3C623]'
                            : 'bg-emerald-100 text-[#0B6B3A]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Profile & Actions */}
      <div className="p-3 border-t border-gray-100 space-y-2">
        {!isCollapsed && (
          <div className="p-3 bg-[#FAF9F5] rounded-2xl border border-gray-200/80 flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <div className="text-xs font-bold text-gray-900 truncate">
                {participant.name}
              </div>
              <div className="text-[10px] text-gray-500 capitalize">{userRole} Account</div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <button
            onClick={onOpenResponsibleAi}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-emerald-50 hover:text-[#0B6B3A] transition-colors cursor-pointer ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title="Ethical AI Guidelines"
          >
            <ShieldCheck className="w-4 h-4 text-[#0B6B3A] shrink-0" />
            {!isCollapsed && <span>Responsible AI</span>}
          </button>

          {onSignOut && (
            <button
              onClick={onSignOut}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-700 bg-rose-50/80 hover:bg-rose-100 hover:text-rose-800 transition-colors cursor-pointer border border-rose-200/60 ${
                isCollapsed ? 'justify-center' : ''
              }`}
              title="Sign Out"
            >
              <LogOut className="w-4 h-4 shrink-0 text-rose-600" />
              {!isCollapsed && <span>Sign Out</span>}
            </button>
          )}
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden lg:block h-screen sticky top-0 transition-all duration-300 z-40 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Offcanvas Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex animate-fadeIn">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[85vw] h-full z-10 animate-slideRight">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
