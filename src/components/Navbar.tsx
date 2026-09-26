import React, { useState } from 'react';
import { RwefLogo } from './RwefLogo';
import { PageView, ParticipantProfile } from '../types';
import { ArrowRight, Sparkles, User, Users, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  participant: ParticipantProfile;
  onOpenResponsibleAi: () => void;
}

interface NavLinkItem {
  label: string;
  view?: PageView;
  hash?: string;
  action?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  participant,
  onOpenResponsibleAi,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isPublicPage = currentView === 'landing' || currentView === 'intro';
  const isStaffPage = currentView === 'staff';

  const publicNavLinks: NavLinkItem[] = [
    { label: 'How It Works', view: 'intro' },
    { label: 'Cohort Experience', hash: '#transition-story' },
    { label: 'Ecosystem', hash: '#ecosystem' },
    { label: 'Ethical AI', action: onOpenResponsibleAi },
  ];

  const participantNavLinks: NavLinkItem[] = [
    { label: 'My Plan', view: 'plan' },
    { label: 'Language Studio', view: 'studio' },
    { label: 'Network', view: 'networking' },
    { label: 'Learning', view: 'learning' },
    { label: 'Progress', view: 'progress' },
  ];

  const navLinks: NavLinkItem[] = isPublicPage ? publicNavLinks : participantNavLinks;

  const handleNavClick = (link: NavLinkItem) => {
    if (link.action) {
      link.action();
    } else if (link.hash) {
      if (currentView !== 'landing') {
        onNavigate('landing');
        setTimeout(() => {
          const el = document.querySelector(link.hash!);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        const el = document.querySelector(link.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (link.view) {
      onNavigate(link.view);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Left: Brand Identification - Clean & Uncluttered */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 text-left focus:outline-hidden rounded-xl py-1 transition-opacity hover:opacity-90 cursor-pointer"
            aria-label="RISE Pathway Homepage"
          >
            <RwefLogo size="md" variant="full" />
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-gray-200">
              <span className="text-xs font-bold tracking-wider text-[#0B6B3A] uppercase font-sans">
                RISE
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-[#074626] uppercase bg-[#F3C623] px-2 py-0.5 rounded-full shadow-2xs">
                GBG Cohort 2
              </span>
            </div>
          </button>
        </div>

        {/* Center: Simple, Elegant Text Links (No bulky buttons competing with text) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item, idx) => {
            const isActive = !item.hash && item.view === currentView;
            return (
              <button
                key={idx}
                onClick={() => handleNavClick(item)}
                className={`text-sm font-medium transition-all relative py-1 cursor-pointer ${
                  isActive
                    ? 'text-[#0B6B3A] font-bold'
                    : 'text-gray-600 hover:text-[#0B6B3A]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#0B6B3A] rounded-full animate-fadeIn" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Exactly 2 Balanced Actions - No Text Collision */}
        <div className="flex items-center gap-3">
          {/* Subtle Staff / Fellow Toggle */}
          <button
            onClick={() => onNavigate(isStaffPage ? 'progress' : 'staff')}
            className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all cursor-pointer ${
              isStaffPage
                ? 'bg-[#074626] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            title="Toggle between Fellow View and Staff Dashboard"
          >
            <Users className="w-3.5 h-3.5 text-[#0B6B3A]" />
            <span>{isStaffPage ? 'Fellow View' : 'Staff Desk'}</span>
          </button>

          {/* Primary Action Button */}
          {isPublicPage ? (
            <button
              onClick={() => onNavigate('intro')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B6B3A] text-white text-xs sm:text-sm font-semibold shadow-md shadow-[#0B6B3A]/20 hover:bg-[#074626] transition-all cursor-pointer active:translate-y-0.5 whitespace-nowrap"
            >
              <span>Begin Pathway</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F3C623]" />
            </button>
          ) : (
            <button
              onClick={() => onNavigate('checkin')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#F3C623] text-[#074626] text-xs sm:text-sm font-bold shadow-xs hover:bg-[#e0b418] transition-all cursor-pointer active:translate-y-0.5 whitespace-nowrap"
            >
              <User className="w-3.5 h-3.5 text-[#074626]" />
              <span className="hidden sm:inline">{participant.name.split(' ')[0]}</span>
              <span className="sm:hidden">Check-In</span>
            </button>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Clean Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-5 pt-3 pb-6 shadow-xl animate-fadeIn">
          <div className="flex flex-col gap-2">
            <div className="py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              {isPublicPage ? 'Navigation' : 'Fellow Workspace'}
            </div>
            {navLinks.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item)}
                className="text-left py-2.5 px-3 text-sm font-bold text-gray-800 hover:bg-emerald-50 hover:text-[#0B6B3A] rounded-xl transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}

            <div className="pt-3 mt-2 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => {
                  onNavigate(isStaffPage ? 'progress' : 'staff');
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-bold text-[#0B6B3A] flex items-center gap-1.5 cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>{isStaffPage ? 'Switch to Fellow View' : 'Switch to Staff Desk'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
