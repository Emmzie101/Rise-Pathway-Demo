import React from 'react';
import { PageView } from '../types';
import {
  ArrowRight,
  Compass,
  Sparkles,
  FileCheck,
  Users,
  Target,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Clock,
  Check,
  Briefcase,
  PenLine,
} from 'lucide-react';

interface RiseIntroPageProps {
  onNavigate: (view: PageView) => void;
  onOpenResponsibleAi: () => void;
}

export const RiseIntroPage: React.FC<RiseIntroPageProps> = ({
  onNavigate,
  onOpenResponsibleAi,
}) => {
  const steps = [
    {
      num: '1',
      title: 'Quick Check-In',
      lead: 'Where are you starting from right now?',
      desc: 'Tell us about your course of study, your daily access to power or data, and how much energy you have today.',
      time: '3–5 mins',
      aiRole: 'Listens thoughtfully with zero testing or grades.',
      badgeColor: 'bg-[#0B6B3A] text-white',
      borderColor: 'border-emerald-300',
      bgColor: 'bg-[#EBF5EF]',
    },
    {
      num: '2',
      title: 'What We Found',
      lead: 'What are your hidden superpowers?',
      desc: 'Discover the skills you developed through classes and student initiatives, and pinpoint your primary direction.',
      time: 'Instant',
      aiRole: 'Synthesizes your genuine strengths and recommends your strongest path.',
      badgeColor: 'bg-[#074626] text-white',
      borderColor: 'border-[#F3C623]',
      bgColor: 'bg-[#FEF7DA]',
    },
    {
      num: '3',
      title: 'My 14-Day Plan',
      lead: 'What will you accomplish this sprint?',
      desc: 'Receive 5 clear, bite-sized tasks for the next 14 days. Check them off one by one to see measurable growth.',
      time: '5 mins',
      aiRole: 'Breaks large career milestones into achievable daily checklists.',
      badgeColor: 'bg-[#0B6B3A] text-white',
      borderColor: 'border-emerald-300',
      bgColor: 'bg-[#F2F9F5]',
    },
    {
      num: '4',
      title: 'CV & Story Studio',
      lead: 'How do you describe your school projects?',
      desc: 'Convert your academic coursework, volunteer initiatives, and projects into professional bullet points for your CV.',
      time: 'Self-paced',
      aiRole: 'Refines your raw notes into phrasing employers respect — with zero fabricated claims.',
      badgeColor: 'bg-[#074626] text-white',
      borderColor: 'border-emerald-300',
      bgColor: 'bg-white',
    },
    {
      num: '5',
      title: 'Talk to Mentors',
      lead: 'Who can answer your career questions?',
      desc: 'Connect with experienced African professionals across leading firms. We provide 3 courteous questions to guide your call.',
      time: '15-min chat',
      aiRole: 'Provides outreach conversation guides so networking feels natural.',
      badgeColor: 'bg-[#074626] text-white',
      borderColor: 'border-[#F3C623]',
      bgColor: 'bg-[#FEF7DA]/70',
    },
    {
      num: '6',
      title: 'Energy & Coach Care',
      lead: 'How are you feeling mentally and physically?',
      desc: 'Track your weekly pace. If you experience fatigue or feel stuck, request a 1:1 check-in with an R-WEF coach.',
      time: 'Weekly check',
      aiRole: 'Connects you with human coaches whenever you need personal guidance.',
      badgeColor: 'bg-[#0B6B3A] text-white',
      borderColor: 'border-emerald-300',
      bgColor: 'bg-[#EBF5EF]',
    },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-[#FAF9F5] py-10 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block with Brand Colors & Proper Hierarchy */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBF5EF] text-[#0B6B3A] text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-300 shadow-xs">
            <Compass className="w-4 h-4 text-[#0B6B3A]" />
            <span>Orientation · How RISE Works</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-950">
            A structured roadmap for <br />
            <span className="text-[#0B6B3A] underline decoration-[#F3C623] decoration-wavy">your next career milestone.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mt-4 leading-relaxed font-normal">
            No grading. No complicated jargon. Just 6 clear steps to help you prepare, build confidence, and get hired.
          </p>
        </div>

        {/* 3 Core Questions Before You Begin - Clean Brand Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-[#EBF5EF] rounded-3xl p-6 sm:p-8 shadow-xs border border-emerald-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0B6B3A] text-[#F3C623] flex items-center justify-center mb-4 shadow-xs">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-950 mb-2">What is RISE?</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                A 100% free pathway built by R-WEF for African graduates to help you land your first real job or paid internship without feeling lost.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-200 text-xs font-semibold text-[#0B6B3A] flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#0B6B3A]" />
              <span>Free for Cohort 2 Fellows</span>
            </div>
          </div>

          <div className="bg-[#FEF7DA] rounded-3xl p-6 sm:p-8 shadow-xs border border-[#F3C623] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#074626] text-[#F3C623] flex items-center justify-center mb-4 shadow-xs">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-950 mb-2">How does AI help me?</h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                AI assists you with articulating your coursework, structuring your tasks, and reaching out to mentors. It never invents false claims.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-300/80 text-xs font-semibold text-[#074626] flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#074626]" />
              <span>Your authentic words, polished</span>
            </div>
          </div>

          <div className="bg-[#074626] text-white rounded-3xl p-6 sm:p-8 shadow-xs border border-[#0B6B3A] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0B6B3A] text-white flex items-center justify-center mb-4 shadow-xs border border-emerald-500/50">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Do I get real human help?</h3>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">
                Yes. Experienced practitioners across leading African tech firms and dedicated R-WEF coaches are available whenever you need support.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-800 text-xs font-semibold text-[#F3C623] flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#F3C623]" />
              <span>100% Real human coaches</span>
            </div>
          </div>

        </div>

        {/* Visual 6-Step Pathway Roadmap - Brand Cards */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-md border border-emerald-100 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-gray-100 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">The 6 Steps on Your Journey</h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 font-normal">
                You will progress through each milestone supported by your cohort peers and R-WEF coaching team.
              </p>
            </div>
            <button
              onClick={onOpenResponsibleAi}
              className="text-xs font-semibold text-[#0B6B3A] hover:underline flex items-center gap-1.5 self-start sm:self-auto cursor-pointer bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200"
            >
              <ShieldCheck className="w-4 h-4 text-[#0B6B3A]" />
              <span>Our Honest AI Promise</span>
            </button>
          </div>

          <div className="space-y-4">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-1 md:grid-cols-12 gap-4 p-5 rounded-2xl ${s.bgColor} border ${s.borderColor} hover:shadow-xs transition-all items-center`}
              >
                <div className="md:col-span-1 flex md:flex-col items-center justify-center">
                  <span className={`w-11 h-11 rounded-2xl ${s.badgeColor} font-mono font-bold text-sm flex items-center justify-center shadow-xs`}>
                    0{s.num}
                  </span>
                </div>

                <div className="md:col-span-4">
                  <div className="text-xs font-semibold text-[#0B6B3A] uppercase tracking-wider">
                    Step {s.num}: {s.title}
                  </div>
                  <div className="text-sm font-bold text-gray-950 mt-0.5">{s.lead}</div>
                  <div className="text-xs font-medium text-gray-700 mt-1 bg-white/90 px-2.5 py-0.5 rounded-md inline-flex items-center gap-1.5 border border-gray-200">
                    <Clock className="w-3.5 h-3.5 text-[#0B6B3A]" />
                    <span>Takes {s.time}</span>
                  </div>
                </div>

                <div className="md:col-span-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  {s.desc}
                </div>

                <div className="md:col-span-3 text-xs bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs">
                  <span className="font-bold text-[#0B6B3A] block mb-0.5">How It Works:</span>
                  <div className="text-[11px] text-gray-600 leading-snug font-normal">{s.aiRole}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-gray-700 font-medium">
              Ready to start? The first step is your 3-minute Quick Check-In.
            </div>
            <button
              onClick={() => onNavigate('checkin')}
              className="inline-flex items-center gap-2 px-7 py-4 text-xs sm:text-sm font-bold text-white bg-[#0B6B3A] hover:bg-[#074626] rounded-2xl shadow-lg shadow-[#0B6B3A]/25 transition-all cursor-pointer active:translate-y-0.5 border-b-4 border-[#074626]"
            >
              <span>Start My Quick Check-In</span>
              <ArrowRight className="w-4 h-4 text-[#F3C623]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
