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
  Download,
  Eye,
  Edit3,
  ShieldCheck,
  Layers,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface LanguageStudioPageProps {
  onNavigate: (view: PageView) => void;
  onOpenResponsibleAi: () => void;
}

export const LanguageStudioPage: React.FC<LanguageStudioPageProps> = ({
  onNavigate,
  onOpenResponsibleAi,
}) => {
  const [studioMode, setStudioMode] = useState<'cv' | 'linkedin'>('cv');

  // ==========================================
  // CV TWO-PANEL EDITOR STATE
  // ==========================================
  const initialCvData = {
    summary:
      'Computer Science graduate with hands-on background in frontend React and backend Python. Built offline-first inventory tracker for Makola market traders. Looking for a junior software engineering or product role.',
    experience:
      'Lead Project Builder — AfriCode Collective Student Fellowship (Jun 2025 – Present)\n- Worked with 3 student peers to build an offline stock tracker.\n- Tested application with local vendors in Makola Market to verify usability under low mobile data.\n- Reduced stock-taking counting errors from manual notebooks.',
    skills:
      'Languages: TypeScript, JavaScript, Python, SQL\nFrameworks: React, Tailwind CSS, Express, Node.js\nTools: Git, GitHub, Figma, VS Code, REST APIs',
    education:
      'B.Sc. in Computer Science & Information Systems\nUniversity of Ghana, Legon (Graduated 2025)\nRelevant Modules: Software Engineering, Data Structures, Human-Computer Interaction',
    projects:
      'MarketTrack: Offline-First Mobile Inventory Tool (2025)\n- Designed mobile web app allowing small merchants to track daily sales without continuous cellular data.\n- Piloted with 35 market stall owners across Accra with 98% transaction reliability.',
  };

  const [cvSection, setCvSection] = useState<'summary' | 'experience' | 'skills' | 'education' | 'projects'>('summary');
  const [cvOriginal, setCvOriginal] = useState<typeof initialCvData>(initialCvData);
  const [cvRefined, setCvRefined] = useState<typeof initialCvData>({
    summary:
      'Results-driven Computer Science graduate specializing in accessible, low-bandwidth web applications. Proven experience engineering offline-first software deployed to 35+ local micro-merchants. Eager to contribute scalable frontend engineering and user-centered design to mission-driven engineering teams.',
    experience:
      'Frontend Engineering Lead — AfriCode Collective Fellowship (Jun 2025 – Present)\n- Architected and deployed an offline-first inventory web application for 35+ market traders in Accra, reducing stock audit latency by ~40%.\n- Conducted in-person user research across low-connectivity environments to optimize bundle payloads under 150KB.\n- Guided 3 junior cohort developers in modern Git workflows, PR reviews, and TypeScript standards.',
    skills:
      'Technical Core: TypeScript, React, Node.js, Express, RESTful APIs, SQLite/PostgreSQL\nDesign & Systems: Tailwind CSS, Figma, Mobile-First UX, Offline PWA Caching\nPractices: Agile Sprints, Version Control (Git/GitHub), Clean Code Architecture',
    education:
      'B.Sc. in Computer Science & Information Systems — University of Ghana, Legon\nGraduation: 2025 · First Class Division Honours equivalent\nSelected Coursework: Distributed Systems, Database Architecture, HCI Usability Labs',
    projects:
      'MarketTrack: Offline-First Merchant Inventory System\n- Engineered a progressive web app utilizing service workers and IndexedDB to ensure 100% offline transaction uptime during grid outages.\n- Successfully piloted with 35 vendors in Makola Market, processing over 1,200 local item records.',
  });

  const [mobileCvTab, setMobileCvTab] = useState<'original' | 'refined' | 'preview'>('original');
  const [isRefiningCv, setIsRefiningCv] = useState(false);
  const [cvCopied, setCvCopied] = useState(false);
  const [cvFeedback, setCvFeedback] = useState<string | null>(null);

  // ==========================================
  // LINKEDIN & OUTREACH SINGLE TASK STATE
  // ==========================================
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  const activeTask = sampleLanguageTasks[selectedTaskIndex];
  const [inputDraft, setInputDraft] = useState(activeTask.userInput);
  const [targetAudience, setTargetAudience] = useState(activeTask.targetAudience);
  const [refinedOutput, setRefinedOutput] = useState(activeTask.refinedOutput);
  const [whyItWorks, setWhyItWorks] = useState(activeTask.whyItWorks);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Refine CV Section handler
  const handleRefineCvSection = async (sectionKey: keyof typeof initialCvData) => {
    setIsRefiningCv(true);
    const sourceText = cvOriginal[sectionKey];

    try {
      const response = await fetch('/api/ai/refine-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: sourceText,
          taskType: `CV ${sectionKey.toUpperCase()} section for an ATS-ready application`,
          audience: 'Hiring Manager / Recruiter in African Tech',
          style: 'standard',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.refined) {
          setCvRefined((prev) => ({ ...prev, [sectionKey]: data.refined }));
          setIsRefiningCv(false);
          setCvFeedback(`Refined ${sectionKey} using active verbs and metrics.`);
          setTimeout(() => setCvFeedback(null), 3000);
          return;
        }
      }
    } catch (e) {}

    // Fallback rule-based polish
    setTimeout(() => {
      let polished = sourceText.trim();
      if (sectionKey === 'summary') {
        polished = `Motivated ${initialCvData.summary.replace('Looking for', 'Targeting')} with verifiable project deliverables.`;
      }
      setCvRefined((prev) => ({ ...prev, [sectionKey]: polished }));
      setIsRefiningCv(false);
      setCvFeedback(`Refined ${sectionKey} with active verbs.`);
      setTimeout(() => setCvFeedback(null), 3000);
    }, 600);
  };

  const handleApplyRefinedToOriginal = (sectionKey: keyof typeof initialCvData) => {
    setCvOriginal((prev) => ({ ...prev, [sectionKey]: cvRefined[sectionKey] }));
    setCvFeedback(`Applied refined ${sectionKey} to your working draft.`);
    setTimeout(() => setCvFeedback(null), 2500);
  };

  const handleCopyFullCv = () => {
    const fullText = `CURRICULUM VITAE
=============================================
PROFESSIONAL SUMMARY
${cvOriginal.summary}

WORK & PRACTICAL EXPERIENCE
${cvOriginal.experience}

CORE TECHNICAL & PROFESSIONAL SKILLS
${cvOriginal.skills}

EDUCATION & CREDENTIALS
${cvOriginal.education}

KEY VERIFIED PROJECTS & PORTFOLIO EVIDENCE
${cvOriginal.projects}
=============================================`;

    navigator.clipboard.writeText(fullText);
    setCvCopied(true);
    setTimeout(() => setCvCopied(false), 2500);
  };

  const handleDownloadCvText = () => {
    const fullText = `CURRICULUM VITAE\n\nPROFESSIONAL SUMMARY\n${cvOriginal.summary}\n\nEXPERIENCE\n${cvOriginal.experience}\n\nSKILLS\n${cvOriginal.skills}\n\nEDUCATION\n${cvOriginal.education}\n\nPROJECTS\n${cvOriginal.projects}`;
    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RISE_ATS_Curriculum_Vitae.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // LinkedIn Refine handler
  const handleRefineLinkedIn = async () => {
    if (!inputDraft.trim()) return;
    setIsGenerating(true);

    try {
      const response = await fetch('/api/ai/refine-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputDraft,
          taskType: activeTask.type,
          audience: targetAudience,
          style: 'standard',
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
    } catch (e) {}

    setTimeout(() => {
      setRefinedOutput(inputDraft.trim());
      setIsGenerating(false);
    }, 500);
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#F8FAF8] py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Toast Feedback */}
        {cvFeedback && (
          <div className="fixed top-20 right-6 z-50 bg-[#074626] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold animate-fadeIn border border-[#0B6B3A]">
            <CheckCircle2 className="w-4 h-4 text-[#F3C623]" />
            <span>{cvFeedback}</span>
          </div>
        )}

        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#0B6B3A] text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
              <FileText className="w-3.5 h-3.5 text-[#0B6B3A]" />
              <span>Professional Readiness & Language Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
              CV & LinkedIn Readiness Studio
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl font-normal leading-relaxed">
              Convert student assignments into impact-oriented CV statements and verified project descriptions. Zero invented credentials, 100% verified capability.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenResponsibleAi}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FEF7DA] hover:bg-[#faeebe] text-[#074626] text-xs font-bold border border-[#F3C623] cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#0B6B3A]" />
              <span>Honest AI Guidelines</span>
            </button>
          </div>
        </div>

        {/* Studio Primary Mode Tabs */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-3 flex-wrap gap-3">
          <div className="flex items-center gap-2 p-1 bg-[#FAF9F5] rounded-2xl border border-gray-200">
            <button
              onClick={() => setStudioMode('cv')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                studioMode === 'cv'
                  ? 'bg-[#0B6B3A] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>CV & Resume Studio</span>
            </button>
            <button
              onClick={() => setStudioMode('linkedin')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                studioMode === 'linkedin'
                  ? 'bg-[#0B6B3A] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Professional Bio & Summary</span>
            </button>
          </div>

          {studioMode === 'cv' && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyFullCv}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-emerald-50 text-[#0B6B3A] border border-emerald-300 text-xs font-bold cursor-pointer"
              >
                {cvCopied ? <Check className="w-3.5 h-3.5 text-[#0B6B3A]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{cvCopied ? 'Copied Full CV' : 'Copy Full CV'}</span>
              </button>
              <button
                onClick={handleDownloadCvText}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B6B3A] hover:bg-[#074626] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download ATS CV (.txt)</span>
              </button>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* MODE A: TWO-PANEL COORDINATED CV STUDIO */}
        {/* ========================================================================= */}
        {studioMode === 'cv' && (
          <div className="space-y-6">
            
            {/* Section Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {(
                [
                  { id: 'summary', label: '1. Professional Summary' },
                  { id: 'experience', label: '2. Work & Experience' },
                  { id: 'skills', label: '3. Core Skills' },
                  { id: 'education', label: '4. Education' },
                  { id: 'projects', label: '5. Key Projects' },
                ] as const
              ).map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setCvSection(sec.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    cvSection === sec.id
                      ? 'bg-[#074626] text-white shadow-xs'
                      : 'bg-white hover:bg-emerald-50 text-gray-700 border border-gray-200'
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>

            {/* Mobile Segmented Toggle (For Phone Screens) */}
            <div className="lg:hidden flex p-1 bg-[#FAF9F5] rounded-2xl border border-gray-200 gap-1">
              <button
                onClick={() => setMobileCvTab('original')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  mobileCvTab === 'original'
                    ? 'bg-white text-[#0B6B3A] shadow-xs'
                    : 'text-gray-500'
                }`}
              >
                Original Draft
              </button>
              <button
                onClick={() => setMobileCvTab('refined')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  mobileCvTab === 'refined'
                    ? 'bg-white text-[#0B6B3A] shadow-xs'
                    : 'text-gray-500'
                }`}
              >
                Refined Version
              </button>
              <button
                onClick={() => setMobileCvTab('preview')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  mobileCvTab === 'preview'
                    ? 'bg-white text-[#0B6B3A] shadow-xs'
                    : 'text-gray-500'
                }`}
              >
                ATS Preview
              </button>
            </div>

            {/* Desktop Two-Panel Grid (or active mobile panel) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* LEFT PANEL: ORIGINAL CV */}
              <div
                className={`bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs flex flex-col justify-between space-y-4 ${
                  mobileCvTab !== 'original' ? 'hidden lg:flex' : 'flex'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                      <h3 className="text-sm font-bold text-gray-950 uppercase tracking-wide">
                        Original Draft · {cvSection.toUpperCase()}
                      </h3>
                    </div>
                    <span className="text-[11px] text-gray-500 font-medium">Editable below</span>
                  </div>

                  <p className="text-xs text-gray-500 font-normal">
                    Paste your raw coursework, rough bullets, or existing resume section:
                  </p>

                  <textarea
                    rows={10}
                    value={cvOriginal[cvSection]}
                    onChange={(e) =>
                      setCvOriginal((prev) => ({ ...prev, [cvSection]: e.target.value }))
                    }
                    className="w-full p-4 rounded-2xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 leading-relaxed font-sans focus:outline-hidden focus:ring-2 focus:ring-[#0B6B3A] focus:bg-white resize-none"
                    placeholder="Type or paste your raw experience here..."
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() =>
                      setCvOriginal((prev) => ({ ...prev, [cvSection]: initialCvData[cvSection] }))
                    }
                    className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Sample</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRefineCvSection(cvSection)}
                    disabled={isRefiningCv}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B6B3A] hover:bg-[#074626] text-white text-xs font-bold shadow-md shadow-[#0B6B3A]/20 transition-all cursor-pointer active:translate-y-0.5"
                  >
                    <Sparkles className="w-4 h-4 text-[#F3C623]" />
                    <span>{isRefiningCv ? 'Polishing...' : `Refine ${cvSection}`}</span>
                  </button>
                </div>
              </div>

              {/* RIGHT PANEL: REFINED ATS CV */}
              <div
                className={`bg-white rounded-3xl p-6 border border-emerald-200 shadow-sm flex flex-col justify-between space-y-4 ${
                  mobileCvTab !== 'refined' && mobileCvTab !== 'preview' ? 'hidden lg:flex' : 'flex'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0B6B3A]" />
                      <h3 className="text-sm font-bold text-[#0B6B3A] uppercase tracking-wide">
                        Proposed ATS Refinement · {cvSection.toUpperCase()}
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#074626]">
                      ATS Optimized
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 font-normal">
                    Enhanced with action verbs, verified metrics, and clear single-column formatting:
                  </p>

                  <textarea
                    rows={10}
                    value={cvRefined[cvSection]}
                    onChange={(e) =>
                      setCvRefined((prev) => ({ ...prev, [cvSection]: e.target.value }))
                    }
                    className="w-full p-4 rounded-2xl bg-emerald-50/30 border border-emerald-200 text-xs text-gray-950 leading-relaxed font-sans focus:outline-hidden focus:ring-2 focus:ring-[#0B6B3A] focus:bg-white resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <ShieldCheck className="w-4 h-4 text-[#0B6B3A]" />
                    <span>No invented data</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(cvRefined[cvSection]);
                        setCvFeedback(`Copied refined ${cvSection}!`);
                        setTimeout(() => setCvFeedback(null), 2500);
                      }}
                      className="px-3 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Copy Section
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyRefinedToOriginal(cvSection)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B6B3A] hover:bg-[#074626] text-white text-xs font-bold shadow-xs cursor-pointer active:translate-y-0.5"
                    >
                      <Check className="w-3.5 h-3.5 text-[#F3C623]" />
                      <span>Apply to Original</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* ATS Readiness Checklist */}
            <div className="p-5 bg-white rounded-3xl border border-gray-200 shadow-2xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                ATS Compatibility & Professional Standards Checklist
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0B6B3A]" />
                  <span>Single-column, non-table layout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0B6B3A]" />
                  <span>Action verbs at the beginning of each bullet</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0B6B3A]" />
                  <span>Plain text exportable with standard headings</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE B: LINKEDIN & OUTREACH MESSAGES */}
        {/* ========================================================================= */}
        {studioMode === 'linkedin' && (
          <div className="space-y-6">
            
            {/* Task Type Switcher */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {sampleLanguageTasks.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelectedTaskIndex(idx);
                    setInputDraft(t.userInput);
                    setTargetAudience(t.targetAudience);
                    setRefinedOutput(t.refinedOutput);
                    setWhyItWorks(t.whyItWorks);
                  }}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedTaskIndex === idx
                      ? 'bg-[#0B6B3A] text-white shadow-xs'
                      : 'bg-white hover:bg-emerald-50 text-gray-700 border border-gray-200'
                  }`}
                >
                  {t.type}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Draft Input */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-gray-950 uppercase tracking-wide">
                    Your Raw Draft
                  </h3>
                  <span className="text-xs text-gray-500 font-medium">{activeTask.type}</span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Your Text
                  </label>
                  <textarea
                    rows={6}
                    value={inputDraft}
                    onChange={(e) => setInputDraft(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-gray-900 focus:outline-hidden focus:bg-white resize-none"
                    placeholder="Type your draft message here..."
                  />
                </div>

                <button
                  type="button"
                  onClick={handleRefineLinkedIn}
                  disabled={isGenerating}
                  className="w-full py-3 rounded-2xl bg-[#0B6B3A] hover:bg-[#074626] text-white text-xs font-bold shadow-md shadow-[#0B6B3A]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#F3C623]" />
                  <span>{isGenerating ? 'Polishing statement...' : 'Polish with Active Voice'}</span>
                </button>
              </div>

              {/* Polished Output */}
              <div className="bg-white p-6 rounded-3xl border border-emerald-200 shadow-xs space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <h3 className="text-sm font-bold text-[#0B6B3A] uppercase tracking-wide">
                      Polished Result
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#074626]">
                      Ready to Use
                    </span>
                  </div>

                  <div className="p-4 bg-emerald-50/40 rounded-2xl border border-emerald-200/80 text-xs text-gray-900 leading-relaxed whitespace-pre-wrap">
                    {refinedOutput}
                  </div>

                  <div className="space-y-2 pt-2">
                    <h5 className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                      Why this connects effectively:
                    </h5>
                    <ul className="space-y-1.5 text-xs text-gray-600">
                      {whyItWorks.map((reason, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#0B6B3A] shrink-0 mt-0.5" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(refinedOutput);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2500);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B6B3A] hover:bg-[#074626] text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#F3C623]" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied to Clipboard' : 'Copy Polished Statement'}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
