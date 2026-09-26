import React, { useState } from 'react';
import { PageView, LanguageStudioTask } from '../types';
import { sampleLanguageTasks } from '../data/mockData';
import {
  MessageSquare,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Sliders,
  Send,
  Zap,
  Target,
  Award,
  CheckCircle2,
  FileText,
  ThumbsUp,
} from 'lucide-react';

interface LanguageStudioPageProps {
  onNavigate: (view: PageView) => void;
  onOpenResponsibleAi: () => void;
}

export const LanguageStudioPage: React.FC<LanguageStudioPageProps> = ({
  onNavigate,
  onOpenResponsibleAi,
}) => {
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  const activeTask = sampleLanguageTasks[selectedTaskIndex];

  const [inputDraft, setInputDraft] = useState(activeTask.userInput);
  const [targetAudience, setTargetAudience] = useState(activeTask.targetAudience);
  const [refinedOutput, setRefinedOutput] = useState(activeTask.refinedOutput);
  const [whyItWorks, setWhyItWorks] = useState(activeTask.whyItWorks);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toneFilter, setToneFilter] = useState<'standard' | 'concise' | 'natural' | 'leadership'>('standard');

  const handleSelectTaskType = (idx: number) => {
    setSelectedTaskIndex(idx);
    const t = sampleLanguageTasks[idx];
    setInputDraft(t.userInput);
    setTargetAudience(t.targetAudience);
    setRefinedOutput(t.refinedOutput);
    setWhyItWorks(t.whyItWorks);
    setToneFilter('standard');
  };

  const handleRefine = async (style: 'standard' | 'concise' | 'natural' | 'leadership' = 'standard') => {
    if (!inputDraft.trim()) return;
    setIsGenerating(true);
    setToneFilter(style);

    try {
      const response = await fetch('/api/ai/refine-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputDraft,
          taskType: activeTask.type,
          audience: targetAudience,
          style: style,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.refined) {
          setRefinedOutput(data.refined);
          setWhyItWorks(data.whyItWorks || activeTask.whyItWorks);
          setIsGenerating(false);
          return;
        }
      }
    } catch (e) {
      // Local graceful fallback
    }

    setTimeout(() => {
      let polished = inputDraft.trim();
      let reasons = [
        'Uses action verbs at the start so employers see what you did immediately.',
        'Mentions the real numbers so your impact is believable and clear.',
        'Short and easy to read in 5 seconds without confusing technical words.',
      ];

      if (style === 'concise') {
        if (activeTask.type === 'CV Bullet Statement') {
          polished = 'Led 4-person team deploying an offline-first inventory tracker for 35+ local traders, cutting stock auditing time by ~40%.';
        } else if (activeTask.type === 'LinkedIn Headline & About') {
          polished = 'Economics Graduate | African FinTech & Financial Inclusion | Field Research & Data Analysis.';
        } else {
          polished = 'Dear Amara,\n\nFollowing your talk on low-bandwidth UX, I built an offline prototype for local traders. Could I ask for a 15-minute chat to ask 2 brief questions on your early portfolio strategy?\n\nBest,\nKofi Mensah';
        }
      } else if (style === 'natural') {
        if (activeTask.type === 'CV Bullet Statement') {
          polished = 'Collaborated with 3 peers to build and test an offline inventory app for 35 local market traders in Makola, helping them balance stock 40% faster.';
        } else {
          polished = 'Economics graduate focused on African FinTech and practical financial literacy. I combine university data research with direct community engagement to design simpler financial tools.';
        }
      } else if (style === 'leadership') {
        if (activeTask.type === 'CV Bullet Statement') {
          polished = 'Spearheaded product delivery for a 4-person engineering team, piloting an offline inventory system with 35 market vendors and delivering a 40% efficiency gain.';
        } else {
          polished = 'Initiative-driven graduate researcher shaping inclusive digital banking solutions across West Africa.';
        }
      }

      setRefinedOutput(polished);
      setWhyItWorks(reasons);
      setIsGenerating(false);
    }, 500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(refinedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#F8FAF8] py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* HEADER: Simple, Clean, Plain English */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight font-sans">
                CV & Story Studio ✍️
              </h1>
              <span className="px-3 py-1 rounded-full bg-[#E6F5EC] text-[#0B6B3A] text-xs font-black">
                Easy Writing Tool
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">
              Turn your university coursework, final year projects, or campus club work into clear bullet points employers love.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('plan')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Plan</span>
            </button>
          </div>
        </div>

        {/* 4 BOLD VISUAL CARDS (Inspired by AeuxGlobal Reference Dashboard) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Card 1: High Contrast Dark Emerald Card */}
          <div className="lg:col-span-3 bg-[#122119] text-white p-5 sm:p-6 rounded-3xl shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Writing Progress
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#F3C623] animate-pulse" />
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                1 of 3 Ready
              </div>
              <p className="text-xs text-gray-300 mt-1 font-medium">
                CV bullet point is polished and ready to use!
              </p>
            </div>

            {/* Mini high-contrast visual bars */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-end justify-between gap-1.5 h-8">
              {[100, 30, 20].map((h, i) => (
                <div key={i} className="flex-1 bg-white/10 rounded-t h-full flex items-end">
                  <div
                    style={{ height: `${h}%` }}
                    className={`w-full rounded-t ${i === 0 ? 'bg-[#0B6B3A]' : 'bg-[#F3C623]'}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Readability Score */}
          <div className="lg:col-span-3 bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Readability Score
                </span>
                <span className="text-xs font-black text-[#0B6B3A] bg-[#E6F5EC] px-2.5 py-0.5 rounded-full">
                  95% Clear
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-black text-gray-900 font-mono tracking-tight">
                5 Seconds
              </div>
              <p className="text-xs text-gray-500 mt-1 font-medium">
                Fast enough for any busy boss or recruiter to understand quickly
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div className="bg-[#0B6B3A] h-full w-[95%] rounded-full" />
              </div>
            </div>
          </div>

          {/* Card 3: The STAR Method */}
          <div className="lg:col-span-3 bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  How We Polish
                </span>
                <Sparkles className="w-4 h-4 text-[#F3C623]" />
              </div>

              <div className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Action + Number
              </div>
              <p className="text-xs text-gray-500 mt-1 font-medium">
                We take your real project and add the numbers to show real value
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-[#0B6B3A] font-bold">
              <span>What I Did</span>
              <span>→</span>
              <span>The Results</span>
            </div>
          </div>

          {/* Card 4: Active Template Switcher */}
          <div className="lg:col-span-3 bg-[#FAFDFB] p-5 sm:p-6 rounded-3xl shadow-sm border border-emerald-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-[#F3C623] text-[#4A3319] px-2.5 py-0.5 rounded-full shadow-2xs">
                  Active Template
                </span>
                <span className="text-xs font-mono font-bold text-gray-400">
                  {selectedTaskIndex + 1} of {sampleLanguageTasks.length}
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-black text-gray-900 leading-snug truncate mt-1">
                {activeTask.type}
              </h2>
            </div>

            <div className="mt-3 pt-3 border-t border-emerald-100/80 flex items-center justify-between">
              <span className="text-xs text-gray-600 font-medium">Targeting African tech & jobs</span>
              <span className="text-xs font-bold text-[#0B6B3A]">Ready ✓</span>
            </div>
          </div>

        </div>

        {/* TEMPLATE PICKER (3 Big Friendly Buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {sampleLanguageTasks.map((task, idx) => {
            const isSelected = selectedTaskIndex === idx;
            return (
              <button
                key={task.id}
                onClick={() => handleSelectTaskType(idx)}
                className={`px-5 py-3 text-xs sm:text-sm font-bold rounded-2xl whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0B6B3A] text-white shadow-md shadow-[#0B6B3A]/20 scale-[1.01]'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {task.type}
              </button>
            );
          })}
        </div>

        {/* 2-COLUMN SIDE-BY-SIDE EDITOR WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Input Box */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-[#0B6B3A] uppercase tracking-wider">
                  1. What did you do? (Write it in your own words):
                </label>
                <span className="text-xs text-gray-400 font-medium">Don't worry about grammar</span>
              </div>

              <textarea
                rows={7}
                value={inputDraft}
                onChange={(e) => setInputDraft(e.target.value)}
                placeholder="e.g. In our final year project, my friends and I made a simple tool so traders at Makola market could track stock on their phones without using paper books."
                className="w-full p-4 rounded-2xl bg-[#F8FAF8] border border-gray-200 text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B6B3A] focus:bg-white resize-none leading-relaxed font-medium"
              />

              <div className="mt-4">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  2. Who will read this?
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. Tech Boss, Hiring Manager, or Senior Mentor..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8FAF8] border border-gray-200 text-sm font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0B6B3A]"
                />
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setInputDraft(activeTask.userInput)}
                className="text-xs text-gray-500 hover:text-gray-900 font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Sample</span>
              </button>

              <button
                type="button"
                disabled={isGenerating || !inputDraft.trim()}
                onClick={() => handleRefine('standard')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-black text-white bg-[#0B6B3A] hover:bg-[#08522c] disabled:opacity-50 rounded-2xl transition-all shadow-md shadow-[#0B6B3A]/20 cursor-pointer active:translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-[#F3C623]" />
                <span>{isGenerating ? 'Making it sound great...' : 'Make It Sound Great ✨'}</span>
              </button>
            </div>
          </div>

          {/* Right: Polished Output Box */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#0B6B3A] uppercase tracking-wider">
                  3. Your Polished Version (Ready to copy):
                </span>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 text-xs text-[#0B6B3A] font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#0B6B3A]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                </button>
              </div>

              {/* Output Display */}
              <div className="p-5 rounded-2xl bg-[#FAFDFB] border border-emerald-200 text-sm text-gray-900 font-bold leading-relaxed whitespace-pre-line min-h-[140px] flex items-center">
                {isGenerating ? (
                  <div className="w-full text-center py-6 text-sm text-[#0B6B3A] flex items-center justify-center gap-2 font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0B6B3A] animate-ping" />
                    <span>Polishing your words to look professional...</span>
                  </div>
                ) : (
                  refinedOutput
                )}
              </div>

              {/* Variation buttons */}
              <div className="mt-5 pt-4 border-t border-gray-100">
                <div className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#0B6B3A]" />
                  <span>Try different styles:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { style: 'concise', label: 'Short & Punchy' },
                    { style: 'natural', label: 'Simple & Everyday' },
                    { style: 'leadership', label: 'Show Leadership' },
                  ].map((s) => (
                    <button
                      key={s.style}
                      onClick={() => handleRefine(s.style as any)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                        toneFilter === s.style
                          ? 'bg-[#0B6B3A] text-white shadow-xs'
                          : 'bg-[#F8FAF8] text-gray-700 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Why This Works (Simple student checklist) */}
              <div className="mt-5 p-4 rounded-2xl bg-[#FAF7EB] border border-amber-200/80">
                <div className="text-xs font-black text-[#4A3319] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ThumbsUp className="w-3.5 h-3.5 text-[#F3C623]" />
                  <span>Why this helps you get hired:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-gray-800 font-medium">
                  {whyItWorks.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#0B6B3A] font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 pt-3 text-xs text-gray-500 flex items-center gap-1.5 font-medium border-t border-gray-100">
              <span className="font-bold text-gray-700">Good Rule of Thumb:</span>
              <span className="italic">{activeTask.keyPrinciple}</span>
            </div>
          </div>

        </div>

        {/* FOOTER NAVIGATION */}
        <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={() => onNavigate('plan')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to My 14-Day Plan</span>
          </button>

          <button
            onClick={() => onNavigate('networking')}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-black text-white bg-[#0B6B3A] hover:bg-[#08522c] rounded-2xl transition-all shadow-md shadow-[#0B6B3A]/20 cursor-pointer active:translate-y-0.5"
          >
            <span>Next: Meet Real Mentors</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
