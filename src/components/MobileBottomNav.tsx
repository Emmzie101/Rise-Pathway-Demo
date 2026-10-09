import React from 'react';
import { PageView } from '../types';
import { Home, Target, BookOpen, FileText, Heart, ShieldAlert, Users, Settings } from 'lucide-react';

interface MobileBottomNavProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  userRole?: string;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onNavigate,
  userRole = 'fellow',
}) => {
  // If staff/admin/safeguarding, display role-specific bottom actions
  if (userRole === 'staff') {
    return (
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-3 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => onNavigate('staff')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-bold cursor-pointer transition-colors ${
            currentView === 'staff' ? 'text-[#0B6B3A]' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Fellows</span>
        </button>
        <button
          onClick={() => onNavigate('learning')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-bold cursor-pointer transition-colors ${
            currentView === 'learning' ? 'text-[#0B6B3A]' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>Resources</span>
        </button>
      </nav>
    );
  }

  if (userRole === 'admin') {
    return (
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-3 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => onNavigate('admin')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-bold cursor-pointer transition-colors ${
            currentView === 'admin' ? 'text-[#0B6B3A]' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span>Admin</span>
        </button>
        <button
          onClick={() => onNavigate('staff')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-bold cursor-pointer transition-colors ${
            currentView === 'staff' ? 'text-[#0B6B3A]' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Cohort</span>
        </button>
      </nav>
    );
  }

  if (userRole === 'safeguarding') {
    return (
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-3 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => onNavigate('safeguarding')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-bold cursor-pointer transition-colors ${
            currentView === 'safeguarding' ? 'text-rose-700' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <ShieldAlert className="w-5 h-5 text-rose-600" />
          <span>Confidential</span>
        </button>
      </nav>
    );
  }

  // Fellow Mobile Navigation
  const fellowTabs: { id: PageView; label: string; icon: any }[] = [
    { id: 'hub', label: 'Home', icon: Home },
    { id: 'plan', label: 'My Plan', icon: Target },
    { id: 'learning', label: 'Learning', icon: BookOpen },
    { id: 'studio', label: 'Tools', icon: FileText },
    { id: 'wellbeing', label: 'Support', icon: Heart },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
      {fellowTabs.map((tab) => {
        const isActive = currentView === tab.id;
        const IconComponent = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
              isActive
                ? 'text-[#0B6B3A] font-extrabold'
                : 'text-gray-500 hover:text-gray-900 font-medium'
            }`}
          >
            <div
              className={`p-1 rounded-xl transition-all ${
                isActive ? 'bg-emerald-100/70 text-[#0B6B3A]' : ''
              }`}
            >
              <IconComponent className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
