import React, { useState } from 'react';
import { PageView, ParticipantProfile, SupportRequest } from '../types';
import {
  Heart,
  Zap,
  BatteryCharging,
  BatteryLow,
  Sprout,
  Rocket,
  Flame,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  Send,
  MessageSquare,
  Lock,
} from 'lucide-react';
import { sendSupportRequest } from '../services/api';

interface WellbeingCheckInPageProps {
  onNavigate: (view: PageView) => void;
  participant: ParticipantProfile;
  onUpdateParticipant: (updated: Partial<ParticipantProfile>) => void;
}

export const WellbeingCheckInPage: React.FC<WellbeingCheckInPageProps> = ({
  onNavigate,
  participant,
  onUpdateParticipant,
}) => {
  const [energy, setEnergy] = useState(participant.energyLevel || 3);
  const [confidence, setConfidence] = useState(participant.confidenceLevel || 3);
  const [selectedFrictions, setSelectedFrictions] = useState<string[]>(
    participant.topBarriers || ['Data or steady power', 'Uncertainty about next step']
  );
  const [reflectionNote, setReflectionNote] = useState('');

  // Human support request state
  const [requestSupport, setRequestSupport] = useState(participant.supportRequested || false);
  const [supportCategory, setSupportCategory] = useState<SupportRequest['category']>('Academic & Career');
  const [supportUrgency, setSupportUrgency] = useState<'Normal' | 'Urgent'>('Normal');
  const [supportMessage, setSupportMessage] = useState(participant.supportNote || '');
  const [submitted, setSubmitted] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const barrierOptions = [
    'Data, mobile plan, or steady electricity',
    'Heavy university exam / coursework pressure',
    'Financial pressure for urgent living costs',
    'Not sure what career step to take next',
    'Imposter syndrome or feeling behind peers',
    'Family or domestic commitments',
    'Need technical project feedback',
    'Balancing job applications with life',
  ];

  const toggleBarrier = (item: string) => {
    setSelectedFrictions((prev) =>
      prev.includes(item) ? prev.filter((b) => b !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    onUpdateParticipant({
      energyLevel: energy,
      confidenceLevel: confidence,
      topBarriers: selectedFrictions,
      supportRequested: requestSupport,
      supportNote: supportMessage,
    });

    if (requestSupport && supportMessage.trim()) {
      await sendSupportRequest({
        category: supportCategory,
        message: supportMessage.trim(),
        urgency: supportUrgency,
      });
    }

    setSubmitted(true);
    setToastMsg('Weekly check-in logged successfully!');
    setTimeout(() => {
      onNavigate('hub');
    }, 1200);
  };

  const energyOptions = [
    { level: 1, label: 'Exhausted', icon: BatteryLow, sub: 'Need rest & reset' },
    { level: 2, label: 'Low Energy', icon: Zap, sub: 'Moving slowly' },
    { level: 3, label: 'Steady', icon: Sprout, sub: 'Sustainable pace' },
    { level: 4, label: 'High Focus', icon: Rocket, sub: 'Clear momentum' },
    { level: 5, label: 'Peak Flow', icon: Flame, sub: 'Full bandwidth' },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#F8FAF8] py-6 sm:py-8 lg:py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {toastMsg && (
          <div className="fixed top-20 right-6 z-50 bg-[#074626] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold animate-fadeIn border border-[#0B6B3A]">
            <CheckCircle2 className="w-4 h-4 text-[#F3C623]" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#0B6B3A] text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
              <Heart className="w-3.5 h-3.5 text-[#0B6B3A]" />
              <span>Pacing & Capacity Check-In</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
              Weekly Wellbeing & Support Check
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl font-normal leading-relaxed">
              Real progress respects your real life. Audit your current stamina, flag environmental hurdles, and request human coach support.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* SECTION 1: PHYSICAL & MENTAL ENERGY */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4">
            <div>
              <h2 className="text-base font-bold text-gray-950">
                1. How is your energy level this week?
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Select the capacity that best reflects your mental stamina right now:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {energyOptions.map((opt) => {
                const isSelected = energy === opt.level;
                const IconComponent = opt.icon;
                return (
                  <button
                    key={opt.level}
                    type="button"
                    onClick={() => setEnergy(opt.level)}
                    className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#0B6B3A] border-[#074626] text-white shadow-xs scale-[1.02]'
                        : 'bg-[#FAF9F5] border-gray-200 hover:bg-emerald-50/50 text-gray-700'
                    }`}
                  >
                    <IconComponent
                      className={`w-5 h-5 ${isSelected ? 'text-[#F3C623]' : 'text-gray-500'}`}
                    />
                    <div className="text-xs font-bold">{opt.label}</div>
                    <div
                      className={`text-[10px] ${isSelected ? 'text-emerald-100' : 'text-gray-400'}`}
                    >
                      {opt.sub}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: CONFIDENCE & ACTION READINESS */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-950">
                  2. Confidence in taking forward action
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  How prepared do you feel to complete your planned milestones?
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-[#0B6B3A] border border-emerald-200">
                {confidence}/5 Score
              </span>
            </div>

            <input
              type="range"
              min={1}
              max={5}
              value={confidence}
              onChange={(e) => setConfidence(Number(e.target.value))}
              className="w-full accent-[#0B6B3A] cursor-pointer h-2 bg-gray-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-gray-500 font-medium">
              <span>1 - Overwhelmed / Need Advice</span>
              <span>3 - Steady & Manageable</span>
              <span>5 - Fully Prepared & Locked In</span>
            </div>
          </div>

          {/* SECTION 3: ENVIRONMENTAL BARRIERS */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4">
            <div>
              <h2 className="text-base font-bold text-gray-950">
                3. What friction are you navigating right now?
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Select all that are currently affecting your time or headspace:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {barrierOptions.map((item) => {
                const selected = selectedFrictions.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleBarrier(item)}
                    className={`p-3 rounded-2xl border text-left text-xs font-medium transition-all flex items-start justify-between gap-2 cursor-pointer ${
                      selected
                        ? 'bg-[#FEF7DA] border-[#F3C623] text-[#074626] font-bold shadow-2xs'
                        : 'bg-[#FAF9F5] border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{item}</span>
                    {selected && (
                      <div className="w-4 h-4 rounded-full bg-[#074626] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 4: HUMAN SUPPORT REQUEST */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h2 className="text-base font-bold text-gray-950">
                  4. Request Human Support
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Would you value a supportive message or check-in from our team?
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={requestSupport}
                  onChange={(e) => setRequestSupport(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B6B3A]"></div>
              </label>
            </div>

            {requestSupport && (
              <div className="space-y-4 pt-1 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1">
                      Support Category
                    </label>
                    <select
                      value={supportCategory}
                      onChange={(e) => setSupportCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden font-medium"
                    >
                      <option value="Academic & Career">Academic & Career Direction</option>
                      <option value="Connectivity & Electricity">Connectivity & Power Extension</option>
                      <option value="Personal Wellbeing & Pace">Personal Wellbeing & Burnout Pacing</option>
                      <option value="Technical & Project Help">Technical Project / Code Review</option>
                      <option value="Confidential Safeguarding">Confidential Safeguarding (Strict Isolation)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1">
                      Urgency
                    </label>
                    <select
                      value={supportUrgency}
                      onChange={(e) => setSupportUrgency(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden font-medium"
                    >
                      <option value="Normal">Normal — Within 24 to 48 Hours</option>
                      <option value="Urgent">Urgent — Priority Response</option>
                    </select>
                  </div>
                </div>

                {/* Safeguarding Reassurance Notice if selected */}
                {supportCategory === 'Confidential Safeguarding' && (
                  <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-900 flex items-start gap-2.5">
                    <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-bold block">Strict Confidentiality Guarantee:</span>
                      <p className="leading-relaxed">
                        This message will <strong>never</strong> appear on ordinary cohort dashboards or general staff logs. It routes exclusively to Sister Grace Osei, our designated Safeguarding Focal Person.
                      </p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1">
                    Describe what you need support with:
                  </label>
                  <textarea
                    rows={4}
                    required={requestSupport}
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    placeholder="Share what is on your mind. A coach or focal person will review and follow up with care..."
                    className="w-full p-4 rounded-2xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden focus:bg-white resize-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Form Submit Footer */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => onNavigate('hub')}
              className="text-xs font-bold text-gray-500 hover:text-gray-900 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>

            <button
              type="submit"
              disabled={submitted}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#0B6B3A] hover:bg-[#074626] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#0B6B3A]/20 transition-all cursor-pointer active:translate-y-0.5"
            >
              <span>{submitted ? 'Saved!' : 'Submit Weekly Check-In'}</span>
              <ArrowRight className="w-4 h-4 text-[#F3C623]" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
