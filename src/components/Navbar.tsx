import React, { useState } from 'react';
import { RwefLogo } from './RwefLogo';
import { PageView, ParticipantProfile, UserAccount } from '../types';
import { ArrowRight, User, Users, Menu, X, ShieldCheck, Sparkles, LogIn, UserPlus, LogOut } from 'lucide-react';

interface NavbarProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  participant: ParticipantProfile;
  onOpenResponsibleAi: () => void;
  onOpenSignUp?: () => void;
  onOpenLogIn?: () => void;
  onOpenExploreDemo?: () => void;
  currentUser?: UserAccount | null;
  onSignOut?: () => void;
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
  onOpenSignUp,
  onOpenLogIn,
  onOpenExploreDemo,
  currentUser,
  onSignOut,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isPublicPage = currentView === 'landing' || currentView === 'intro';

  const publicNavLinks: NavLinkItem[] = [
    { label: 'How It Works', view: 'intro' },
    { label: 'Cohort Experience', hash: '#transition-story' },
    { label: 'Ecosystem', hash: '#ecosystem' },
    { label: 'Ethical AI', action: onOpenResponsibleAi },
  ];

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
        
        {/* Left: Brand Identification */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 text-left focus:outline-hidden rounded-xl py-1 transition-opacity hover:opacity-90 cursor-pointer"
            aria-label="RISE Pathway Homepage"
          >
            <RwefLogo size="md" variant="full" />
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-gray-200">
              <span className="text-xs font-bold tracking-wider text-[#0B6B3A] uppercase font-sans">
                RISE Pathway
              </span>
            </div>
          </button>
        </div>

        {/* Center: Clean Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {publicNavLinks.map((item, idx) => {
            const isActive = !item.hash && item.view === currentView;
            return (
              <button
                key={idx}
                onClick={() => handleNavClick(item)}
                className={`text-sm font-medium transition-all relative py-1 cursor-pointer ${
                  isActive ? 'text-[#0B6B3A] font-bold' : 'text-gray-600 hover:text-[#0B6B3A]'
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

        {/* Right: Exactly Adjusted Authentication & Demo Actions */}
        <div className="flex items-center gap-2.5">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (currentUser.role === 'staff') onNavigate('staff');
                  else if (currentUser.role === 'admin') onNavigate('admin');
                  else if (currentUser.role === 'safeguarding') onNavigate('safeguarding');
                  else onNavigate('hub');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#074626] transition-colors cursor-pointer"
              >
                <span>My Workspace</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F3C623]" />
              </button>

              {onSignOut && (
                <button
                  onClick={onSignOut}
                  className="p-2 rounded-xl text-gray-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Explore Demo link */}
              <button
                onClick={onOpenExploreDemo}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-gray-700 hover:text-[#0B6B3A] hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F3C623]" />
                <span>Explore Demo</span>
              </button>

              {/* Secondary Log In button */}
              <button
                onClick={onOpenLogIn}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gray-800 hover:text-gray-950 border border-gray-200 hover:border-gray-300 rounded-xl transition-all cursor-pointer bg-white"
              >
                <LogIn className="w-3.5 h-3.5 text-gray-500" />
                <span>Log In</span>
              </button>

              {/* Primary Sign Up button */}
              <button
                onClick={onOpenSignUp}
                className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl bg-[#0B6B3A] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#0B6B3A]/20 hover:bg-[#074626] transition-all cursor-pointer active:translate-y-0.5 whitespace-nowrap"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#F3C623]" />
                <span>Sign Up</span>
              </button>
            </>
          )}

          {/* Mobile hamburger */}
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
        <div className="md:hidden border-t border-gray-100 bg-white px-5 pt-3 pb-6 shadow-xl animate-fadeIn space-y-3">
          <div className="flex flex-col gap-1">
            <div className="py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Navigation
            </div>
            {publicNavLinks.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item)}
                className="text-left py-2 px-3 text-xs font-bold text-gray-800 hover:bg-emerald-50 hover:text-[#0B6B3A] rounded-xl transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            {!currentUser && (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenExploreDemo && onOpenExploreDemo();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-50 text-[#074626] text-xs font-bold flex items-center justify-center gap-2 border border-amber-200"
                >
                  <Sparkles className="w-4 h-4 text-[#F3C623]" />
                  <span>Explore Demo Personas</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenLogIn && onOpenLogIn();
                    }}
                    className="py-2.5 px-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-800 text-center"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenSignUp && onOpenSignUp();
                    }}
                    className="py-2.5 px-3 rounded-xl bg-[#0B6B3A] text-white text-xs font-bold text-center"
                  >
                    Sign Up
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
