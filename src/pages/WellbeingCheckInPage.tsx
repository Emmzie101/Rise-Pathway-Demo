import React, { useState } from 'react';
import { PageView, ParticipantProfile } from '../types';
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
  Award,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  Smile,
  ShieldCheck,
  Leaf,
  Sparkles,
} from 'lucide-react';

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
  const [energy, setEnergy] = useState(participant.energyLevel || 4);
  const [confidence, setConfidence] = useState(participant.confidenceLevel || 3);
  const [selectedFrictions, setSelectedFrictions] = useState<string[]>(
    participant.topBarriers || ['Data or steady power', 'Uncertainty about next step']
  );
  const [requestSupport, setRequestSupport] = useState(participant.supportRequested || false);
  const [supportMessage, setSupportMessage] = useState(participant.supportNote || '');
  const [submitted, setSubmitted] = useState(false);

  const barrierOptions = [
    'Data, device, or steady electricity',
    'Heavy university exam / class workload',
    'Financial pressure for living costs',
    'Not sure what career step to take next',
    'Imposter syndrome or feeling behind',
    'Family or personal commitments',
    'Need help with project code or design',
    'Balancing job applications',
  ];

  const toggleBarrier = (item: string) => {
    setSelectedFrictions((prev) =>
      prev.includes(item) ? prev.filter((b) => b !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateParticipant({
      energyLevel: energy,
      confidenceLevel: confidence,
      topBarriers: selectedFrictions,
      supportRequested: requestSupport,
      supportNote: supportMessage,
    });
    setSubmitted(true);
    setTimeout(() => {
      onNavigate('progress');
    }, 800);
  };

  const energyOptions = [
    { level: 1, label: 'Exhausted', icon: BatteryLow, sub: 'Need rest' },
    { level: 2, label: 'Low Energy', icon: Zap, sub: 'Moving slow' },
    { level: 3, label: 'Steady', icon: Sprout, sub: 'Normal pace' },
    { level: 4, label: 'High Focus', icon: Rocket, sub: 'Getting stuff done' },
    { level: 5, label: 'Full Power', icon: Flame, sub: 'Peak flow' },
  ];

  const confidenceOptions = [
    { level: 1, label: 'Overwhelmed', sub: 'Feeling stuck' },
    { level: 2, label: 'Unsure', sub: 'Could use advice' },
    { level: 3, label: 'Doing Okay', sub: 'Step-by-step' },
    { level: 4, label: 'Confident', sub: 'Clear direction' },
    { level: 5, label: '100% Ready', sub: 'Crushing goals' },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#F8FAF8] py-6 sm:py-8 lg:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* HEADER: Friendly, Human, Simple */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight font-sans flex items-center gap-2">
                <span>How I Feel Today</span>
                <Leaf className="w-6 h-6 text-[#0B6B3A]" />
              </h1>
              <span className="px-3 py-1 rounded-full bg-[#FEF9E7] text-[#074524] text-xs font-semibold border border-[#F3C623]/30">
                Safe & Private
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 font-normal">
              A quick 1-minute check-in so your coach knows how to support you. No stress, no judgement!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#0B6B3A] bg-[#EBF5EF] px-3.5 py-2 rounded-2xl flex items-center gap-1.5 shadow-2xs">
              <Heart className="w-4 h-4 fill-[#0B6B3A]" />
              <span>Sprint Day 6 Check-In</span>
            </span>
          </div>
        </div>

        {/* TOP SUMMARY STAT CARDS (High contrast Flowtera / AeuxGlobal style) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Card 1: Energy status */}
          <div className="bg-[#074524] text-white p-5 rounded-3xl shadow-lg flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                My Energy
              </span>
              <div className="text-3xl font-bold font-mono mt-1 text-white flex items-baseline gap-1">
                <span>{energy}</span>
                <span className="text-sm text-gray-400 font-normal">/ 5</span>
              </div>
              <p className="text-[11px] text-gray-300 mt-0.5 font-normal">
                {energyOptions[energy - 1]?.label} ({energyOptions[energy - 1]?.sub})
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
              {React.createElement(energyOptions[energy - 1]?.icon, { className: 'w-6 h-6 text-[#F3C623]' })}
            </div>
          </div>

          {/* Card 2: Confidence */}
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <span>Task Confidence</span>
              <Flame className="w-3.5 h-3.5 text-[#F3C623] fill-[#F3C623]" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {confidenceOptions[confidence - 1]?.label}
            </div>
            <p className="text-[11px] text-gray-500 font-normal mt-0.5">
              {confidenceOptions[confidence - 1]?.sub}
            </p>
          </div>

          {/* Card 3: Coach Support Status */}
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <span>Coach Support</span>
              <MessageCircle className="w-3.5 h-3.5 text-[#0B6B3A]" />
            </div>
            <div className="text-lg font-bold text-gray-900 mt-1">
              {requestSupport ? 'Check-In Requested' : 'Pacing Well'}
            </div>
            <p className="text-[11px] text-[#0B6B3A] font-semibold mt-0.5">
              {requestSupport ? 'Coach will reply within 24h' : 'Coach is standing by if needed'}
            </p>
          </div>

        </div>

        {/* CHECK-IN FORM (Clean visual hierarchy, prioritized what to answer first) */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 space-y-8">
          
          {/* STEP 1: ENERGY LEVEL */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0B6B3A] text-white flex items-center justify-center text-xs font-bold">1</span>
                <span>How is your energy today?</span>
              </label>
              <span className="text-xs font-semibold text-[#0B6B3A] bg-emerald-50 px-2.5 py-0.5 rounded-full">
                {energyOptions[energy - 1]?.label}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {energyOptions.map((item) => {
                const isSelected = energy === item.level;
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.level}
                    type="button"
                    onClick={() => setEnergy(item.level)}
                    className={`p-4 rounded-2xl text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-1.5 ${
                      isSelected
                        ? 'bg-[#0B6B3A] text-white shadow-md shadow-[#0B6B3A]/20 scale-[1.02]'
                        : 'bg-[#F8FAF8] hover:bg-emerald-50/50 text-gray-800 border border-gray-200'
                    }`}
                  >
                    <IconComponent className={`w-6 h-6 ${isSelected ? 'text-[#F3C623]' : 'text-[#0B6B3A]'}`} />
                    <span className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                      {item.label}
                    </span>
                    <span className={`text-[10px] ${isSelected ? 'text-emerald-100' : 'text-gray-400'}`}>
                      {item.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: CONFIDENCE */}
          <div className="space-y-3 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0B6B3A] text-white flex items-center justify-center text-xs font-bold">2</span>
                <span>How confident do you feel about finishing your sprint tasks?</span>
              </label>
              <span className="text-xs font-semibold text-[#0B6B3A] bg-emerald-50 px-2.5 py-0.5 rounded-full">
                {confidenceOptions[confidence - 1]?.label}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {confidenceOptions.map((item) => {
                const isSelected = confidence === item.level;
                return (
                  <button
                    key={item.level}
                    type="button"
                    onClick={() => setConfidence(item.level)}
                    className={`p-3.5 rounded-2xl text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-1 ${
                      isSelected
                        ? 'bg-[#0B6B3A] text-white shadow-md shadow-[#0B6B3A]/20 scale-[1.02]'
                        : 'bg-[#F8FAF8] hover:bg-emerald-50/50 text-gray-800 border border-gray-200'
                    }`}
                  >
                    <span className={`text-xs font-bold font-mono ${isSelected ? 'text-[#F3C623]' : 'text-gray-400'}`}>
                      Level {item.level}
                    </span>
                    <span className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                      {item.label}
                    </span>
                    <span className={`text-[10px] ${isSelected ? 'text-emerald-100' : 'text-gray-400'}`}>
                      {item.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: FRICTION POINTS (Multi-Select Chips) */}
          <div className="space-y-3 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0B6B3A] text-white flex items-center justify-center text-xs font-bold">3</span>
                <span>Is anything slowing you down this week?</span>
              </label>
              <span className="text-xs text-gray-400 font-normal">Select any that apply</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {barrierOptions.map((b) => {
                const isSelected = selectedFrictions.includes(b);
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => toggleBarrier(b)}
                    className={`p-3.5 rounded-2xl text-xs font-medium text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-[#FEF9E7] border border-[#F3C623] text-[#074524] shadow-2xs font-semibold'
                        : 'bg-[#F8FAF8] hover:bg-gray-100 text-gray-700 border border-gray-200'
                    }`}
                  >
                    <span>{b}</span>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#0B6B3A] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 4: COACH CHECK-IN REQUEST (Warm & Easy) */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#F8FAF8] border border-emerald-100 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-[#0B6B3A] flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#F3C623] fill-[#F3C623]" />
                <span>Would you like your coach to check in with you?</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRequestSupport(true)}
                className={`py-3.5 px-4 rounded-2xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  requestSupport
                    ? 'bg-[#0B6B3A] text-white shadow-md shadow-[#0B6B3A]/20'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Check className={`w-4 h-4 ${requestSupport ? 'text-[#F3C623]' : 'hidden'}`} />
                <span>Yes, a quick check-in would help</span>
              </button>

              <button
                type="button"
                onClick={() => setRequestSupport(false)}
                className={`py-3.5 px-4 rounded-2xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  !requestSupport
                    ? 'bg-[#0B6B3A] text-white shadow-md shadow-[#0B6B3A]/20'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Check className={`w-4 h-4 ${!requestSupport ? 'text-[#F3C623]' : 'hidden'}`} />
                <span>Not right now, I'm doing fine</span>
              </button>
            </div>

            {requestSupport && (
              <div className="pt-2 animate-fadeIn space-y-2">
                <label className="block text-xs font-semibold text-gray-700">
                  What would you like to chat about? (Optional):
                </label>
                <input
                  type="text"
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder="e.g. Need help polishing my CV before Friday, or advice on balancing exams..."
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl border border-gray-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0B6B3A] font-normal"
                />
                <p className="text-xs text-[#074524] font-medium">
                  Coach Emmanuel will see this on the coach desk and send you a message!
                </p>
              </div>
            )}
          </div>

          {/* SUBMIT BUTTONS */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => onNavigate('learning')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Practice Lessons</span>
            </button>

            <button
              type="submit"
              disabled={submitted}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#0B6B3A] hover:bg-[#074524] rounded-2xl shadow-md shadow-[#0B6B3A]/20 transition-all cursor-pointer active:translate-y-0.5"
            >
              <span>{submitted ? 'Saved!' : 'Save My Check-In'}</span>
              <Check className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
