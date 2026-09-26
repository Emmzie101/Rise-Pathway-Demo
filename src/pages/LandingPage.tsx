import React, { useState } from 'react';
import { PageView } from '../types';
import { RwefLogo } from '../components/RwefLogo';
import {
  ArrowRight,
  Sparkles,
  Compass,
  CheckCircle2,
  Users,
  ShieldCheck,
  Heart,
  Target,
  BookOpen,
  Send,
  Layers,
  Zap,
  TrendingUp,
  Clock,
  Check,
  Star,
  Award,
  Lock,
  Flame,
  FileText,
  Briefcase,
  PenLine,
  Brain,
  Coins,
  Handshake,
  Rocket,
  AlertTriangle,
  Globe2,
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (view: PageView) => void;
  onOpenResponsibleAi: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenResponsibleAi,
}) => {
  // Interactive preview tabs inside the floating software preview window
  const [heroTab, setHeroTab] = useState<'plan' | 'language' | 'mentor'>('plan');
  const [task1Done, setTask1Done] = useState(true);
  const [task2Done, setTask2Done] = useState(false);

  return (
    <div className="w-full bg-[#FAF9F5] text-[#074626] overflow-hidden">
      
      {/* 1. HERO SECTION - PURE WHITE BACKGROUND WITH 2D DIAGONAL SNEAKPEEK TILT */}
      <section className="relative pt-10 sm:pt-16 pb-28 sm:pb-36 bg-white overflow-visible border-b border-gray-100 z-10">
        
        {/* Soft, crisp ambient lighting */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#EBF5EF]/50 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Top Storytelling Copy - Clean Typographic Hierarchy, Pan-African & Clear */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            
            {/* Context Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B6B3A] text-white text-xs font-semibold uppercase tracking-wider mb-6 shadow-md shadow-[#0B6B3A]/20">
              <span className="w-2 h-2 rounded-full bg-[#F3C623] animate-pulse" />
              <span>R-WEF · Growth Beyond Grades Cohort 2 · 100% Free</span>
            </div>

            {/* Main Headline with Brand Green & Yellow Underline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 leading-[1.1] mb-6">
              Finish school without <br />
              <span className="text-[#0B6B3A] bg-gradient-to-r from-[#074626] via-[#0B6B3A] to-[#0E7A43] bg-clip-text text-transparent underline decoration-[#F3C623] decoration-wavy decoration-4">
                feeling lost or stressed.
              </span>
            </h1>

            {/* Inclusive Pan-African Narrative with Proper Visual Hierarchy */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
              Finishing university, polytechnic, college, or national youth service is tough when callbacks are slow. RISE gives you a structured 14-day game plan to convert your coursework into concrete job proof, polish your CV, and connect with caring African mentors.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <button
                onClick={() => onNavigate('intro')}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#0B6B3A] text-white text-base font-bold shadow-lg shadow-[#0B6B3A]/30 hover:bg-[#074626] hover:scale-[1.02] transition-all cursor-pointer active:translate-y-0.5 border-b-4 border-[#074626]"
              >
                <span>Start My 14-Day Plan</span>
                <ArrowRight className="w-5 h-5 text-[#F3C623]" />
              </button>

              <button
                onClick={() => onNavigate('checkin')}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-[#F3C623] text-[#074626] text-base font-bold shadow-lg shadow-[#F3C623]/30 hover:bg-[#e0b418] hover:scale-[1.02] transition-all cursor-pointer active:translate-y-0.5 border-b-4 border-[#C99B08]"
              >
                <Sparkles className="w-5 h-5 text-[#074626]" />
                <span>Take 3-Minute Check-In</span>
              </button>
            </div>

            {/* High-trust proof markers - Zero Pill Clutter, Clean Unboxed Text with Separators */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600 font-medium">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#0B6B3A]" />
                <span className="font-bold text-[#0B6B3A]">50 African Fellows</span>
                <span>in Active Pilot</span>
              </div>
              <span className="text-gray-300">·</span>
              <div className="flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-[#0B6B3A]" />
                <span>East, West, North, Central & Southern Africa</span>
              </div>
              <span className="text-gray-300">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0B6B3A]" />
                <span className="font-semibold text-gray-800">Verified Proof · Honest AI</span>
              </div>
            </div>

          </div>

          {/* FLOATING SOFTWARE PREVIEW SNEAKPEEK - 2D DIAGONAL TILT */}
          <div className="max-w-5xl mx-auto relative">
            
            {/* Ambient halo glow */}
            <div className="absolute -inset-3 bg-gradient-to-r from-[#0B6B3A]/15 via-[#F3C623]/20 to-[#0B6B3A]/15 blur-2xl rounded-[3rem] -z-10 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

            {/* Elevated Window Container with 2-Dimensional Diagonal Tilt */}
            <div className="sneakpeek-2d-tilt relative rounded-3xl sm:rounded-[2.5rem] bg-white border-2 border-emerald-200/90 shadow-[0_25px_60px_-15px_rgba(11,107,58,0.18)] overflow-hidden origin-center">
              
              {/* Window Chrome Titlebar in Brand Dark Green */}
              <div className="bg-[#074626] text-white px-5 sm:px-7 py-3.5 flex items-center justify-between gap-4 border-b border-[#0B6B3A]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#F3C623]" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-600" />
                </div>

                {/* Simulated URL pill */}
                <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-emerald-100 font-mono max-w-xs truncate">
                  <Lock className="w-3 h-3 text-[#F3C623]" />
                  <span>rise.r-wef.org/gbg-cohort-2/my-workspace</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B6B3A] text-white text-xs font-semibold border border-emerald-500/50">
                    <span className="w-2 h-2 rounded-full bg-[#F3C623] animate-ping" />
                    <span>Interactive Workspace</span>
                  </span>
                </div>
              </div>

              {/* Inside Live Interactive Snippet */}
              <div className="p-6 sm:p-8 bg-gradient-to-b from-white to-[#F9FAF8]">
                
                {/* Top Fellow Profile & Metrics */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src="/src/assets/images/hero_african_youth_1790382282353.jpg"
                        alt="Fellow Kofi Mensah"
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#0B6B3A] shadow-md"
                        onError={(e) => {
                          // Fallback container if specific file missing
                          e.currentTarget.src = '/src/assets/images/hero_african_youth_1790382182353.jpg';
                        }}
                      />
                      <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0B6B3A] border-2 border-white flex items-center justify-center text-[#F3C623] shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-950">Kofi Mensah</h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#0B6B3A] text-xs font-semibold border border-emerald-200">
                          Cohort 2 Fellow
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-normal mt-0.5">
                        Pan-African Graduate Fellow · Computer Science & Tech Builder
                      </p>
                    </div>
                  </div>

                  {/* High-Impact Stat Badges (Brand Palette: Green, Yellow & White) */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#FEF7DA] border border-[#F3C623] text-xs text-[#074626] shadow-xs">
                      <Flame className="w-5 h-5 text-[#F3C623] fill-[#F3C623]" />
                      <div>
                        <div className="text-[10px] text-gray-600 uppercase font-bold">Daily Streak</div>
                        <div className="text-sm font-bold text-gray-950">6 Days</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-[#0B6B3A] text-white px-4 py-2 rounded-2xl shadow-sm border border-[#074626]">
                      <div className="relative w-11 h-11 flex items-center justify-center">
                        <svg className="w-11 h-11 -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-[#074626]"
                            strokeWidth="4"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="text-[#F3C623]"
                            strokeDasharray="80, 100"
                            strokeWidth="4"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className="absolute text-xs font-bold text-[#F3C623]">80%</span>
                      </div>
                      <div className="text-left">
                        <div className="text-[10px] font-medium text-emerald-200 uppercase">Week 2 Pace</div>
                        <div className="text-xs font-bold text-white">4 of 5 Done</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Tool Switcher Tabs - Lucide Icons, Brand Clean Styles */}
                <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 no-scrollbar">
                  {[
                    { id: 'plan', icon: Target, label: '1. My 14-Day Plan' },
                    { id: 'language', icon: PenLine, label: '2. CV Story Maker' },
                    { id: 'mentor', icon: Users, label: '3. Talk to Mentors' },
                  ].map((t) => {
                    const isSelected = heroTab === t.id;
                    const IconComponent = t.icon;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setHeroTab(t.id as any)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                          isSelected
                            ? 'bg-[#0B6B3A] text-white shadow-md shadow-[#0B6B3A]/25 scale-[1.01]'
                            : 'bg-white hover:bg-emerald-50 text-gray-700 border border-gray-200'
                        }`}
                      >
                        <IconComponent className={`w-4 h-4 ${isSelected ? 'text-[#F3C623]' : 'text-[#0B6B3A]'}`} />
                        <span>{t.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab 1: 14-Day Action Plan Preview */}
                {heroTab === 'plan' && (
                  <div className="space-y-4 animate-fadeIn">
                    
                    {/* Road progress banner */}
                    <div className="bg-[#074626] text-white p-4 rounded-2xl border border-[#0B6B3A] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#F3C623] animate-pulse" />
                          <span className="text-xs font-semibold text-[#F3C623] uppercase tracking-wider">
                            Current Sprint: Days 1 to 14
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1">
                          Goal: Package 1 Case Study & Reach Out to 2 Mentors
                        </h4>
                      </div>
                      <div className="text-xs font-medium text-emerald-200 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                        8 Days Remaining
                      </div>
                    </div>

                    {/* Step-by-step interactive task cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      
                      {/* Task 1 */}
                      <div
                        onClick={() => setTask1Done(!task1Done)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          task1Done
                            ? 'bg-emerald-50/80 border-emerald-300'
                            : 'bg-white border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                              task1Done ? 'bg-[#0B6B3A] text-white' : 'border-2 border-gray-300 text-gray-400'
                            }`}
                          >
                            {task1Done && <Check className="w-4 h-4 stroke-[3]" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className={`text-xs font-semibold ${task1Done ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                                Write Community App Project
                              </span>
                              <span className="text-[10px] font-bold text-[#0B6B3A] bg-emerald-100 px-2 py-0.5 rounded-md">
                                Done
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-500 mt-0.5 font-normal">
                              Turned coursework into a 1-page evidence story for employers
                            </p>
                          </div>
                        </div>
                        <span className="text-[11px] font-semibold text-[#0B6B3A] shrink-0">Tap to toggle</span>
                      </div>

                      {/* Task 2 */}
                      <div
                        onClick={() => setTask2Done(!task2Done)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          task2Done
                            ? 'bg-emerald-50/80 border-emerald-300'
                            : 'bg-[#FEF7DA]/60 border-[#F3C623] hover:border-amber-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                              task2Done ? 'bg-[#0B6B3A] text-white' : 'border-2 border-amber-400 bg-white text-gray-400'
                            }`}
                          >
                            {task2Done && <Check className="w-4 h-4 stroke-[3]" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className={`text-xs font-semibold ${task2Done ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                                15-Minute Chat with Mentor
                              </span>
                              <span className="text-[10px] font-bold text-[#074626] bg-[#F3C623] px-2 py-0.5 rounded-md">
                                In 2 Days
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-600 mt-0.5 font-normal">
                              Ask Amara (Fintech Lead) 3 guided questions about entry hiring
                            </p>
                          </div>
                        </div>
                        <span className="text-[11px] font-semibold text-[#074626] shrink-0">Tap to toggle</span>
                      </div>

                    </div>
                  </div>
                )}

                {/* Tab 2: Language Studio STAR Polish Preview */}
                {heroTab === 'language' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                    
                    {/* Before */}
                    <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span>How Students Usually Write It:</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed font-normal italic bg-white p-3 rounded-xl border border-gray-200">
                        "I did a small final year school project making a website for market vendors so they could track their inventory without pen and paper."
                      </p>
                      <div className="mt-3 text-[11px] text-amber-700 font-medium flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Employers often skip this because it sounds like generic homework.</span>
                      </div>
                    </div>

                    {/* After */}
                    <div className="p-5 rounded-2xl bg-[#0B6B3A] text-white border border-[#074626] shadow-md">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F3C623]">
                          <Sparkles className="w-4 h-4 text-[#F3C623]" />
                          <span>How RISE Rewrites It for Your CV:</span>
                        </div>
                        <span className="text-[10px] font-bold bg-[#F3C623] text-[#074626] px-2.5 py-0.5 rounded-full">
                          Job Ready
                        </span>
                      </div>
                      <p className="text-xs text-emerald-50 leading-relaxed font-medium bg-[#074626]/70 p-3 rounded-xl border border-emerald-400/30">
                        "Engineered an offline-first inventory tracker adopted by 35 local merchant traders, reducing weekly bookkeeping time by 4 hours with zero mobile data required."
                      </p>
                      <div className="mt-3 text-[11px] text-emerald-200 font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F3C623] shrink-0" />
                        <span>100% True facts, expressed with the concrete outcomes employers seek.</span>
                      </div>
                    </div>

                  </div>
                )}

                {/* Tab 3: Practitioner Mentorship Guide Preview */}
                {heroTab === 'mentor' && (
                  <div className="p-5 rounded-2xl bg-[#FEF7DA]/60 border border-[#F3C623] flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
                    <div className="flex items-center gap-4">
                      <img
                        src="/src/assets/images/african_creative_mentor_1790382211346.jpg"
                        alt="Practitioner Mentor"
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#0B6B3A] shadow-md"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-gray-950">Amara Nwosu</h4>
                          <span className="text-[10px] font-bold bg-[#0B6B3A] text-white px-2 py-0.5 rounded-md">
                            Fintech Lead
                          </span>
                        </div>
                        <div className="text-xs text-gray-700 font-normal mt-0.5">
                          "I love helping young Africans. We practice mock interview questions in 15 minutes."
                        </div>
                        <div className="text-[11px] text-[#074626] font-semibold mt-1">
                          • 14 Cohort Fellows Mentored • Fast 24-hr reply
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate('networking')}
                      className="px-5 py-3 rounded-2xl bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#074626] transition-all shrink-0 shadow-md cursor-pointer border-b-2 border-[#074626]"
                    >
                      See Friendly Mentors →
                    </button>
                  </div>
                )}

                {/* Bottom Helper Bar */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-gray-700 font-medium">
                    <Heart className="w-4 h-4 text-[#0B6B3A] fill-[#0B6B3A]" />
                    <span>Energy status: <strong className="text-gray-950 font-semibold">Steady & Focused</strong> · R-WEF Coach Assigned</span>
                  </div>
                  <button
                    onClick={() => onNavigate('plan')}
                    className="font-bold text-[#0B6B3A] hover:underline flex items-center gap-1.5 cursor-pointer bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200"
                  >
                    <span>Open Full 14-Day Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 2. THE REALITY SECTION - PARALLAX OVERLAP DESIGN (SLIDES OVER SNEAKPEEK DURING SCROLL) */}
      <section
        id="transition-story"
        className="relative z-20 -mt-16 sm:-mt-24 rounded-t-[3rem] sm:rounded-t-[4.5rem] bg-[#074626] text-white border-t-2 border-[#0E7A43]/50 shadow-[0_-30px_70px_rgba(0,0,0,0.35)] pt-20 sm:pt-28 pb-24 overflow-hidden"
      >
        {/* Glow ambient background elements in exact brand spectrum */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0B6B3A]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#F3C623]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#074626] bg-[#F3C623] px-4 py-1 rounded-full shadow-md">
              Chapter 01 · Navigating the Graduate Transition
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-5 tracking-tight leading-tight">
              Leaving school isn't the finish line. <br />
              <span className="text-[#F3C623]">It is often where the uncertainty starts.</span>
            </h2>
            <p className="text-base text-emerald-100 mt-4 leading-relaxed font-normal">
              You graduate with high hopes, but entry roles demand 3 years of prior experience, electricity fluctuates, data tariffs are high, and job searches can feel isolating. Here is how RISE helps you navigate each reality:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Reality Card 1 - Yellow / Gold Focus */}
            <div className="p-8 rounded-3xl bg-white text-gray-950 border border-emerald-100 shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FEF7DA] text-[#074626] flex items-center justify-center font-bold text-lg mb-6 shadow-xs border border-[#F3C623]">
                  01
                </div>
                <h3 className="text-xl font-bold text-gray-950 mb-3">
                  Advice Not Tailored for Africa
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-normal">
                  Online career advice frequently assumes unlimited fast Wi-Fi, constant power, and zero family financial duties. It rarely addresses local African realities.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-gray-100 text-xs font-medium text-[#0B6B3A] flex items-start gap-2 bg-emerald-50/80 p-3 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-[#0B6B3A] shrink-0 mt-0.5" />
                <span><strong className="text-gray-900 font-semibold">How RISE helps:</strong> Low-data, mobile-optimized sprints you can complete even with intermittent power.</span>
              </div>
            </div>

            {/* Reality Card 2 - Exact Brand Green Surface */}
            <div className="p-8 rounded-3xl bg-[#0B6B3A] text-white border border-emerald-500 shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white text-[#0B6B3A] flex items-center justify-center font-bold text-lg mb-6 shadow-xs">
                  02
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  "Must Have 3 Years Experience"
                </h3>
                <p className="text-sm text-emerald-100 leading-relaxed font-normal">
                  You just graduated from school. How can you demonstrate 3 years of commercial experience when entry opportunities require proof upfront?
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-emerald-600/60 text-xs font-medium text-white flex items-start gap-2 bg-[#074626]/70 p-3 rounded-xl border border-emerald-400/30">
                <CheckCircle2 className="w-4 h-4 text-[#F3C623] shrink-0 mt-0.5" />
                <span><strong className="text-[#F3C623] font-semibold">How RISE helps:</strong> We extract and translate your academic projects and coursework into validated portfolio proof.</span>
              </div>
            </div>

            {/* Reality Card 3 - Deep Forest Green Spectrum Card */}
            <div className="p-8 rounded-3xl bg-[#123B24] text-white border border-emerald-700 shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#F3C623] text-[#074626] flex items-center justify-center font-bold text-lg mb-6 shadow-xs">
                  03
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  The Weight of Job Search Fatigue
                </h3>
                <p className="text-sm text-emerald-100 leading-relaxed font-normal">
                  Sending out dozens of CVs into silence creates self-doubt. Combined with family expectations, the transition period can impact mental wellbeing.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-emerald-800 text-xs font-medium text-emerald-100 flex items-start gap-2 bg-[#074626]/90 p-3 rounded-xl border border-emerald-700/60">
                <CheckCircle2 className="w-4 h-4 text-[#F3C623] shrink-0 mt-0.5" />
                <span><strong className="text-white font-semibold">How RISE helps:</strong> Structured weekly pacing, peer cohort check-ins, and dedicated human coaching from R-WEF.</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. WHOLE-HUMAN ECOSYSTEM - 7 PILLARS IN BRAND PALETTE (GREEN, YELLOW & WHITE) */}
      <section id="ecosystem" className="py-20 sm:py-24 bg-[#FAF9F5] border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0B6B3A] bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
              Chapter 02 · Whole-Person Support
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 mt-4 tracking-tight">
              A meaningful career is not just about CVs. <br />
              <span className="text-[#0B6B3A]">It requires peace of mind and resilience.</span>
            </h2>
            <p className="text-base text-gray-600 mt-3 font-normal">
              In African contexts, career decisions are deeply linked to daily realities, family support, and personal energy. We care for all 7 interconnected areas:
            </p>
          </div>

          {/* 7 Orbiting Clean Cards - Strictly Brand Green, Yellow & Crisp White with Real Lucide Icons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-10">
            {[
              { label: 'Peace of Mind', icon: Brain, desc: 'Calm, steady mental clarity.', highlight: false },
              { label: 'Authentic Self', icon: Sparkles, desc: 'Confidence in your unique story.', highlight: true },
              { label: 'Work Evidence', icon: Briefcase, desc: 'Tangible projects you can show.', highlight: false },
              { label: 'Clear Direction', icon: Target, desc: 'Focus on 1 achievable milestone.', highlight: false },
              { label: 'Financial Reality', icon: Coins, desc: 'Honest budget & data awareness.', highlight: true },
              { label: 'Mentors & Allies', icon: Handshake, desc: 'Warm connections across Africa.', highlight: false },
              { label: 'Daily Momentum', icon: Rocket, desc: '14 days of bite-sized action.', highlight: false },
            ].map((facet, i) => {
              const IconComp = facet.icon;
              return (
                <div
                  key={i}
                  className={`p-4 rounded-2xl border transition-all hover:scale-105 shadow-xs text-center flex flex-col justify-between ${
                    facet.highlight
                      ? 'bg-[#FEF7DA]/70 border-[#F3C623] text-gray-950'
                      : 'bg-white border-emerald-200/80 text-gray-950'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 mx-auto flex items-center justify-center mb-2 text-[#0B6B3A]">
                    <IconComp className={`w-5 h-5 ${facet.highlight ? 'text-[#074626]' : 'text-[#0B6B3A]'}`} />
                  </div>
                  <div className="text-xs font-bold text-gray-950">{facet.label}</div>
                  <div className="text-[11px] mt-1 text-gray-500 leading-tight font-normal">{facet.desc}</div>
                </div>
              );
            })}
          </div>

          {/* Central Showcase Card with Authentic Pan-African Photography */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-emerald-100">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7">
                <span className="text-xs font-semibold text-[#0B6B3A] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
                  Built for African Youth
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-3 mb-3 tracking-tight">
                  Replace anxiety with a predictable next step
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 font-normal">
                  We don't overwhelm you with corporate jargon. We help you translate what you accomplished during your studies into language that hiring teams and clients respect: <em>"Here is what I built, here is who used it, and here is how it works."</em>
                </p>

                {/* Quantitative Impact Points in Brand Green & Yellow */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-emerald-50/80 text-center border border-emerald-200">
                    <div className="text-3xl font-extrabold text-[#0B6B3A]">50</div>
                    <div className="text-xs font-semibold text-[#0B6B3A] mt-0.5">Fellows in Cohort 2</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FEF7DA] text-center border border-[#F3C623]">
                    <div className="text-3xl font-extrabold text-[#074626]">14 Days</div>
                    <div className="text-xs font-semibold text-[#074626] mt-0.5">Manageable Sprints</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-100/70 text-center border border-emerald-300">
                    <div className="text-3xl font-extrabold text-[#0B6B3A]">100%</div>
                    <div className="text-xs font-semibold text-[#0B6B3A] mt-0.5">Human Coaching</div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="rounded-3xl overflow-hidden shadow-xl aspect-4/3 relative group border-2 border-emerald-100">
                  <img
                    src="/src/assets/images/african_student_reflection_1790382202440.jpg"
                    alt="African fellow reflecting"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#074626]/95 via-transparent to-transparent flex items-end p-6">
                    <span className="text-white text-sm font-semibold leading-snug">
                      "RISE gave me the structure to stop second-guessing my background and put real projects forward."
                      <span className="block text-xs font-medium text-[#F3C623] mt-1">
                        — Amina K., Pan-African Graduate Fellow
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. THE 6 SIMPLE STEPS TO GET READY - CLEAN BRAND STYLING & REAL ICONS */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0B6B3A] bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
              Chapter 03 · The 6 Easy Steps
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 mt-4 tracking-tight">
              From uncertainty to ready in 6 clear milestones
            </h2>
            <p className="text-base text-gray-600 mt-2 font-normal">
              Every step is structured and accessible. No grading, no pressure. Just steady progress toward your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: 'Quick Check-In',
                time: '3 minutes',
                desc: 'Answer 5 quick questions about where you are right now. Tell us about your course, schedule, and daily realities.',
                route: 'checkin' as PageView,
                cta: 'Start Check-In →',
                bgColor: 'bg-[#EBF5EF]',
                borderColor: 'border-emerald-300',
                badgeBg: 'bg-[#0B6B3A] text-white',
              },
              {
                num: '02',
                title: 'What We Found',
                time: 'Instant',
                desc: 'Uncover your hidden strengths and discover roles that match your existing skills. Clear and direct.',
                route: 'insights' as PageView,
                cta: 'See Strengths →',
                bgColor: 'bg-[#FEF7DA]',
                borderColor: 'border-[#F3C623]',
                badgeBg: 'bg-[#074626] text-white',
              },
              {
                num: '03',
                title: 'My 14-Day Plan',
                time: '5 minutes',
                desc: 'Receive 5 concrete tasks tailored to this sprint with simple check-offs. Track your growth day by day.',
                route: 'plan' as PageView,
                cta: 'Open 14-Day Plan →',
                bgColor: 'bg-[#F2F9F5]',
                borderColor: 'border-emerald-300',
                badgeBg: 'bg-[#0B6B3A] text-white',
              },
              {
                num: '04',
                title: 'CV & Story Studio',
                time: '10 minutes',
                desc: 'Input your school projects or student initiatives. We help you polish them into bullet points employers respect.',
                route: 'studio' as PageView,
                cta: 'Polish CV Bullet Points →',
                bgColor: 'bg-white',
                borderColor: 'border-emerald-200',
                badgeBg: 'bg-[#074626] text-white',
              },
              {
                num: '05',
                title: 'Talk to Mentors',
                time: '15-min chat',
                desc: 'Connect with experienced African professionals across leading firms. We provide exact questions to ask.',
                route: 'networking' as PageView,
                cta: 'Meet Friendly Mentors →',
                bgColor: 'bg-[#FEF7DA]/60',
                borderColor: 'border-[#F3C623]',
                badgeBg: 'bg-[#074626] text-white',
              },
              {
                num: '06',
                title: 'Energy & Coach Support',
                time: 'Weekly check',
                desc: 'Check in on how you are feeling. Whenever you need guidance, an R-WEF human coach is available to help.',
                route: 'wellbeing' as PageView,
                cta: 'Check My Energy →',
                bgColor: 'bg-[#EBF5EF]',
                borderColor: 'border-emerald-300',
                badgeBg: 'bg-[#0B6B3A] text-white',
              },
            ].map((stage, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl ${stage.bgColor} border ${stage.borderColor} shadow-xs flex flex-col justify-between hover:-translate-y-1 transition-all`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${stage.badgeBg} shadow-xs`}>
                      STEP {stage.num}
                    </span>
                    <span className="text-xs font-medium text-gray-700 bg-white/90 px-2.5 py-0.5 rounded-full border border-gray-200 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#0B6B3A]" />
                      <span>{stage.time}</span>
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-950 mb-2">{stage.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 font-normal">
                    {stage.desc}
                  </p>
                </div>
                <button
                  onClick={() => onNavigate(stage.route)}
                  className="py-3 px-4 text-xs font-bold inline-flex items-center justify-center gap-2 w-full rounded-2xl bg-[#0B6B3A] hover:bg-[#074626] text-white transition-all cursor-pointer shadow-sm active:translate-y-0.5 border-b-2 border-[#074626]"
                >
                  <span>{stage.cta}</span>
                  <ArrowRight className="w-4 h-4 text-[#F3C623]" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. GBG COHORT 2 PILOT CONTEXT & R-WEF (Deep Brand Green with Yellow Accent) */}
      <section id="gbg-cohort" className="py-20 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#074626] via-[#0B6B3A] to-[#074626] text-white rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-14 overflow-hidden relative shadow-2xl border border-emerald-500/40">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3C623] text-[#074626] text-xs font-bold uppercase tracking-wider mb-4 shadow-md">
                  <span>Reboot Wellbeing & Empowerment Foundation</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-white leading-tight">
                  Designed for Growth Beyond Grades (GBG) Cohort 2
                </h2>
                <p className="text-sm sm:text-base text-emerald-100 leading-relaxed mb-8 font-normal">
                  R-WEF champions African youth potential across the continent. We are currently actively piloting this platform with 50 selected fellows across Africa. Every feature is tuned to run swiftly on mobile devices with zero clutter.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onNavigate('staff')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#F3C623] text-[#074626] text-xs font-bold hover:bg-[#e0b418] transition-all shadow-md cursor-pointer active:translate-y-0.5 border-b-2 border-[#C99B08]"
                  >
                    <Users className="w-4 h-4 text-[#074626]" />
                    <span>Open Cohort 2 Coach Desk</span>
                  </button>
                  <button
                    onClick={onOpenResponsibleAi}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs border border-white/20 transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#F3C623]" />
                    <span>Our Honest AI Promise</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 aspect-4/3 bg-[#074626]">
                  <img
                    src="/src/assets/images/african_young_professionals_meeting_1790382192146.jpg"
                    alt="GBG Cohort fellows in collaboration"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Glowing background halo */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#F3C623]/20 blur-3xl pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 6. ETHICAL AI PROMISE - CLEAN TYPOGRAPHIC HIERARCHY */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-[#0B6B3A] flex items-center justify-center mx-auto mb-5 shadow-xs border border-emerald-200">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mb-4 tracking-tight">
            Smart tools to assist your writing. <br />
            <span className="text-[#0B6B3A]">Real human coaches always beside you.</span>
          </h2>
          <p className="text-base text-gray-600 leading-relaxed mb-8 font-normal">
            RISE helps you organize your thoughts and present your work professionally. But we <strong className="text-gray-950 font-semibold">never</strong> fabricate credentials, we <strong className="text-gray-950 font-semibold">never</strong> create untruthful claims on your CV, and we <strong className="text-gray-950 font-semibold">never</strong> substitute an automated system when you need human guidance.
          </p>
          <div className="p-4 sm:p-5 rounded-2xl bg-[#EBF5EF] border border-emerald-200 text-left inline-flex items-center gap-3.5 shadow-xs">
            <span className="w-3 h-3 rounded-full bg-[#0B6B3A] shrink-0 animate-pulse" />
            <div className="text-xs sm:text-sm text-gray-800 font-medium">
              <strong className="text-[#0B6B3A] font-bold">Our Foundation Standard:</strong> You review and edit every suggestion RISE provides. Your authentic voice remains primary.
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-[#FAF9F5] to-[#EBF5EF] text-center border-t border-emerald-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0B6B3A] bg-white px-4 py-1.5 rounded-full border border-emerald-200 shadow-xs mb-4 inline-block">
            Take Your Next Step Today
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 mb-4 tracking-tight">
            Ready to build momentum?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-8 font-normal">
            Start with the 3-minute check-in. No grades, no exams, and no pressure. Just a clear roadmap for your life.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('intro')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#0B6B3A] text-white text-base font-bold shadow-lg shadow-[#0B6B3A]/30 hover:bg-[#074626] transition-all cursor-pointer active:translate-y-0.5 border-b-4 border-[#074626]"
            >
              <span>Begin My Pathway</span>
              <ArrowRight className="w-5 h-5 text-[#F3C623]" />
            </button>
            <button
              onClick={() => onNavigate('plan')}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[#F3C623] text-[#074626] text-base font-bold shadow-md hover:bg-[#e0b418] transition-all cursor-pointer active:translate-y-0.5 border-b-4 border-[#C99B08]"
            >
              <span>See Sample 14-Day Plan</span>
            </button>
          </div>
        </div>
      </section>

      {/* 8. QUIET FOOTER */}
      <footer className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <RwefLogo size="sm" variant="full" />
            <span className="text-xs text-gray-500 font-normal">
              © {new Date().getFullYear()} Reboot Wellbeing and Empowerment Foundation.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-gray-700 font-semibold">
            <button onClick={onOpenResponsibleAi} className="hover:text-[#0B6B3A] transition-colors cursor-pointer">
              Our Honest AI Promise
            </button>
            <button onClick={() => onNavigate('staff')} className="hover:text-[#0B6B3A] transition-colors cursor-pointer">
              GBG Coach Desk
            </button>
            <span className="text-[#0B6B3A] bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200 font-semibold">
              Cohort 2 Active
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
};
