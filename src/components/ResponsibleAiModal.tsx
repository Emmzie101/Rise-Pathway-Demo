import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, X, HeartHandshake, Check } from 'lucide-react';

interface ResponsibleAiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResponsibleAiModal: React.FC<ResponsibleAiModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-emerald-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF5EF] text-[#0B6B3A] flex items-center justify-center shadow-xs border border-emerald-300">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight">
              Our Honest AI Standard
            </h2>
            <p className="text-xs text-[#0B6B3A] font-semibold">
              R-WEF Ethical Principles for Youth Transition & Wellbeing
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 font-normal">
          RISE is built on a clear governing foundation: <strong className="text-gray-950 font-semibold">AI is a writing and reflection partner, never an automated gatekeeper.</strong> You maintain complete agency over every decision and output.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* What AI Does */}
          <div className="p-5 rounded-2xl bg-[#EBF5EF] border border-emerald-200">
            <div className="flex items-center gap-2 mb-3 text-[#0B6B3A] font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-[#0B6B3A]" />
              <span>What AI Does for You</span>
            </div>
            <ul className="text-xs text-gray-700 space-y-2.5 font-normal">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#0B6B3A] shrink-0 mt-0.5" />
                <span>Helps uncover capability evidence from your coursework.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#0B6B3A] shrink-0 mt-0.5" />
                <span>Deconstructs large career goals into 5 weekly tasks.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#0B6B3A] shrink-0 mt-0.5" />
                <span>Polishes project summaries into recruiter-friendly phrasing.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#0B6B3A] shrink-0 mt-0.5" />
                <span>Provides thoughtful conversation guides for mentor calls.</span>
              </li>
            </ul>
          </div>

          {/* What AI Does NOT Do */}
          <div className="p-5 rounded-2xl bg-[#FEF7DA]/70 border border-[#F3C623]">
            <div className="flex items-center gap-2 mb-3 text-[#074626] font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-[#074626]" />
              <span>What AI Never Does</span>
            </div>
            <ul className="text-xs text-gray-700 space-y-2.5 font-normal">
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>Never dictates what career path you must pursue.</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>Never creates fabricated credentials or false claims.</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>Never replaces real human mentors and community peers.</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>Never acts as a clinical medical or therapy provider.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF9F5] border border-emerald-200 flex items-start gap-3.5 mb-6">
          <HeartHandshake className="w-5 h-5 text-[#0B6B3A] shrink-0 mt-0.5" />
          <div className="text-xs text-gray-700 leading-relaxed font-normal">
            <strong className="text-gray-950 font-semibold">Human Support Guarantee:</strong> Whenever you feel stuck or overloaded, you can request a dedicated check-in with an R-WEF human coach. An experienced person will always listen and support you.
          </div>
        </div>

        <div className="text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#074626] transition-colors cursor-pointer shadow-sm"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
