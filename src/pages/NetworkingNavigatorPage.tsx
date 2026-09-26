import React, { useState } from 'react';
import { PageView, NetworkConnection } from '../types';
import { sampleConnections } from '../data/mockData';
import {
  Users,
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Check,
  Clock,
  Bookmark,
  Copy,
  Mail,
  Star,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface NetworkingNavigatorPageProps {
  onNavigate: (view: PageView) => void;
}

export const NetworkingNavigatorPage: React.FC<NetworkingNavigatorPageProps> = ({
  onNavigate,
}) => {
  const [connections, setConnections] = useState<NetworkConnection[]>(sampleConnections);
  const [activeConnectionIndex, setActiveConnectionIndex] = useState(0);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [savedBookmarks, setSavedBookmarks] = useState<{ [id: string]: boolean }>({
    'net-1': true,
  });

  const activeConn = connections[activeConnectionIndex];

  // Logging and prep states
  const [showLogModal, setShowLogModal] = useState(false);
  const [logNotes, setLogNotes] = useState('');
  const [logNextAction, setLogNextAction] = useState('');
  const [prepChecked, setPrepChecked] = useState<{ [key: string]: boolean }>({
    'prep-1': true,
    'prep-2': true,
    'prep-3': false,
  });

  const checkedCount = Object.values(prepChecked).filter(Boolean).length;
  const completedCount = connections.filter((c) => c.status === 'completed').length;

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedBookmarks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyInMail = () => {
    const template = `Hi ${activeConn.name.split(' ')[0]},\n\nI’ve followed your work at ${activeConn.companyOrOrg} and love what you do in ${activeConn.expertise[0] || 'tech'}.\n\nAs a fellow in R-WEF Cohort 2, I'm working on a 14-day project. Could I ask for a quick 15-minute chat next week to ask 2 questions about your career journey?\n\nThank you for your time,\n[Your Name]`;
    navigator.clipboard.writeText(template);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2400);
  };

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logNotes.trim()) return;

    const updated = [...connections];
    updated[activeConnectionIndex] = {
      ...activeConn,
      status: 'completed',
      loggedNotes: {
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        keyTakeaways: logNotes,
        nextAgreedStep: logNextAction || 'Send a short thank-you note.',
      },
    };
    setConnections(updated);
    setShowLogModal(false);
    setLogNotes('');
    setLogNextAction('');
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#F8FAF8] py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* HEADER: Clean, Friendly & Plain English */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight font-sans">
                Meet Real Mentors
              </h1>
              <Users className="w-6 h-6 text-[#0B6B3A]" />
              <span className="px-3 py-1 rounded-full bg-[#EBF5EF] text-[#0B6B3A] text-xs font-semibold">
                15-Min Quick Chats
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 font-normal">
              Have a friendly, structured 15-minute chat with working African tech leads and alumni. No awkward small talk!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#074524] bg-[#FEF9E7] px-3.5 py-2 rounded-2xl border border-[#F3C623]/30 flex items-center gap-1.5 shadow-2xs">
              <Users className="w-4 h-4 text-[#0B6B3A]" />
              <span>{completedCount} of {connections.length} Chats Done</span>
            </span>
          </div>
        </div>

        {/* 4 TOP BOLD STAT CARDS (AeuxGlobal inspired) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          
          <div className="lg:col-span-3 bg-[#122119] text-white p-5 sm:p-6 rounded-3xl shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Time Limit</span>
              <Clock className="w-4 h-4 text-[#F3C623]" />
            </div>
            <div>
              <div className="text-3xl font-black text-white font-mono">15 Mins</div>
              <p className="text-xs text-gray-300 mt-1">Short and respectful of busy mentors</p>
            </div>
            <div className="mt-3 pt-3 border-t border-white/10 text-xs text-emerald-300 font-bold">
              ✓ 2 specific questions only
            </div>
          </div>

          <div className="lg:col-span-3 bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Goal</span>
              <span className="text-xs font-black text-[#0B6B3A] bg-[#E6F5EC] px-2.5 py-0.5 rounded-full">Active</span>
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">Project Advice</div>
              <p className="text-xs text-gray-500 mt-1">Show what you built and ask for quick feedback</p>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-[#0B6B3A] font-bold">
              Target: 1 chat this week
            </div>
          </div>

          <div className="lg:col-span-3 bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Checklist</span>
              <span className="text-xs font-mono font-bold text-[#0B6B3A]">{checkedCount}/3 Ready</span>
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">{Math.round((checkedCount / 3) * 100)}% Ready</div>
              <p className="text-xs text-gray-500 mt-1">Check off the 3 quick steps before you call</p>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div
                  style={{ width: `${(checkedCount / 3) * 100}%` }}
                  className="bg-[#0B6B3A] h-full rounded-full transition-all"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-[#FAFDFB] p-5 sm:p-6 rounded-3xl shadow-sm border border-emerald-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-[#F3C623] text-[#4A3319] px-2.5 py-0.5 rounded-full">
                Selected Mentor
              </span>
              <span className="text-xs font-mono text-gray-400">1 of {connections.length}</span>
            </div>
            <div>
              <div className="text-lg font-black text-gray-900 truncate">{activeConn.name}</div>
              <p className="text-xs text-gray-500 truncate mt-0.5">{activeConn.role}</p>
            </div>
            <div className="mt-3 pt-3 border-t border-emerald-100/80 flex items-center justify-between text-xs font-bold text-[#0B6B3A]">
              <span>Ready for Intro</span>
              <span>Available ✓</span>
            </div>
          </div>

        </div>

        {/* SECTION 1: PRACTITIONER PROFILES (EXACT VISUAL STYLE FROM UPLOADED REFERENCE IMAGE!) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div>
              <h2 className="text-base font-black text-gray-900 tracking-tight">
                Recommended Mentors for Your Sprint
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Click any profile to select them and prepare your 15-minute conversation
              </p>
            </div>
            <span className="text-xs font-bold text-gray-400">
              {connections.length} Mentors Available
            </span>
          </div>

          {/* Cards Grid: Styled after Reference Image Style A */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {connections.map((mentor, idx) => {
              const isSelected = activeConnectionIndex === idx;
              const isSaved = !!savedBookmarks[mentor.id];

              return (
                <div
                  key={mentor.id}
                  onClick={() => setActiveConnectionIndex(idx)}
                  className={`bg-white rounded-3xl p-4 shadow-sm border transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:shadow-xl hover:-translate-y-1 ${
                    isSelected
                      ? 'ring-3 ring-[#0B6B3A] border-[#0B6B3A] shadow-md'
                      : 'border-gray-200'
                  }`}
                >
                  <div>
                    {/* Top: Large Photo with Bookmark Button Overlay (Reference Image Style A) */}
                    <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-gray-100 mb-4">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = '/images/hero/hero_african_youth.jpg';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Bookmark Icon Button in top right */}
                      <button
                        onClick={(e) => toggleBookmark(mentor.id, e)}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer ${
                          isSaved
                            ? 'bg-[#F3C623] text-[#4A3319] shadow-sm'
                            : 'bg-black/30 text-white hover:bg-black/50'
                        }`}
                        title="Save for later"
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>

                      {mentor.status === 'completed' && (
                        <div className="absolute bottom-3 left-3 bg-[#0B6B3A] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Chat Done</span>
                        </div>
                      )}
                    </div>

                    {/* Name with Verified Blue Badge (Reference Image Style) */}
                    <div className="flex items-center gap-1.5 mb-1">
                      <h3 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">
                        {mentor.name}
                      </h3>
                      <span className="w-4 h-4 rounded-full bg-[#1E88E5] text-white flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                    </div>

                    {/* Tagline / Friendly Bio */}
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed font-medium mb-4">
                      {mentor.role} at {mentor.companyOrOrg}. {mentor.whyConnect}
                    </p>

                    {/* 3 Key Stats with Vertical Dividers (Exact Layout from Reference Image) */}
                    <div className="grid grid-cols-3 py-3 border-y border-gray-100 mb-4 text-center">
                      <div>
                        <div className="flex items-center justify-center gap-1 text-xs font-black text-gray-900">
                          <Star className="w-3.5 h-3.5 text-[#F3C623] fill-[#F3C623]" />
                          <span>4.9</span>
                        </div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">Rating</div>
                      </div>

                      <div className="border-x border-gray-100">
                        <div className="text-xs font-black text-gray-900 font-mono">18+</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">Fellows</div>
                      </div>

                      <div>
                        <div className="text-xs font-black text-[#0B6B3A]">Free</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">15-Mins</div>
                      </div>
                    </div>
                  </div>

                  {/* Tactile Action Button: [ ✉ Get In Touch / Prepare ] */}
                  <button
                    onClick={() => setActiveConnectionIndex(idx)}
                    className={`w-full py-3 px-4 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                      isSelected
                        ? 'bg-[#0B6B3A] text-white hover:bg-[#08522c] shadow-[#0B6B3A]/25'
                        : 'bg-[#122119] text-white hover:bg-black'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    <span>{isSelected ? 'Prepare Intro Note ↓' : 'Get In Touch'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: THE 15-MINUTE PLAYBOOK & PRE-CALL PREP FOR SELECTED MENTOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
          
          {/* Left: Quick Intro Note (1-Click Copy) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-base font-black text-gray-900">
                    Your Intro Note to {activeConn.name.split(' ')[0]}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Send this on LinkedIn, WhatsApp, or Email to book your 15 minutes
                  </p>
                </div>

                <button
                  onClick={handleCopyInMail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-xs text-[#0B6B3A] font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  {copiedTemplate ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTemplate ? 'Copied!' : 'Copy Note'}</span>
                </button>
              </div>

              {/* Note Display */}
              <div className="p-4 rounded-2xl bg-[#FAFDFB] border border-emerald-100 text-xs sm:text-sm text-gray-800 font-medium leading-relaxed whitespace-pre-line">
                {`Hi ${activeConn.name.split(' ')[0]},\n\nI’ve followed your work at ${activeConn.companyOrOrg} and love what you do in ${activeConn.expertise[0] || 'tech'}.\n\nAs a fellow in R-WEF Cohort 2, I'm working on a 14-day project. Could I ask for a quick 15-minute chat next week to ask 2 questions about your career journey?\n\nThank you for your time,\n[Your Name]`}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">Takes less than 30 seconds to send</span>
              <button
                onClick={() => setShowLogModal(true)}
                className="text-xs font-bold text-[#0B6B3A] hover:underline cursor-pointer"
              >
                Already talked? Log notes here →
              </button>
            </div>
          </div>

          {/* Right: The 15-Minute Game Plan & Checklist */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-black text-gray-900">
                    What to Say During the 15 Minutes
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Follow these 4 simple steps so you don't feel nervous
                  </p>
                </div>
                <span className="text-xs font-bold text-[#4A3319] bg-[#FAF7EB] px-2.5 py-1 rounded-full border border-amber-200">
                  Strict 15-Min Cap
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  { time: '0–2 Mins', step: 'Say Hello & Thank Them', tip: 'Thank them for taking 15 minutes of their busy day.' },
                  { time: '3–7 Mins', step: 'Show Your Project Demo', tip: 'Share your 1 link or 2-minute demo of what you built.' },
                  { time: '8–12 Mins', step: 'Ask 2 Specific Questions', tip: '"How would you make this portfolio stronger for hiring leads?"' },
                  { time: '13–15 Mins', step: 'Wrap Up on Time', tip: 'Thank them, leave right at 15 minutes. They will respect you for it!' },
                ].map((s, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-[#F8FAF8] border border-gray-100 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-[#0B6B3A] bg-emerald-50 px-2 py-0.5 rounded-lg">
                        {s.time}
                      </span>
                      <div>
                        <div className="font-bold text-gray-900">{s.step}</div>
                        <div className="text-[11px] text-gray-500">{s.tip}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 3-Step Pre-Call Checklist */}
              <div className="mt-4 p-4 rounded-2xl bg-[#FAF7EB] border border-amber-200">
                <div className="text-xs font-black text-[#4A3319] uppercase tracking-wider mb-2">
                  Quick 3-Point Checklist:
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    { id: 'prep-1', text: 'I tested my project link and it opens publicly' },
                    { id: 'prep-2', text: 'I wrote down my 2 specific questions on paper' },
                    { id: 'prep-3', text: 'My microphone and internet are ready' },
                  ].map((item) => (
                    <label key={item.id} className="flex items-center gap-2 cursor-pointer font-medium text-gray-800">
                      <input
                        type="checkbox"
                        checked={prepChecked[item.id] || false}
                        onChange={() => setPrepChecked({ ...prepChecked, [item.id]: !prepChecked[item.id] })}
                        className="w-4 h-4 rounded accent-[#0B6B3A]"
                      />
                      <span>{item.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">Ready to talk to {activeConn.name.split(' ')[0]}?</span>
              <button
                onClick={() => setShowLogModal(true)}
                className="px-4 py-2 rounded-xl bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#08522c] cursor-pointer"
              >
                Log Finished Call ✓
              </button>
            </div>
          </div>

        </div>

        {/* FOOTER NAVIGATION */}
        <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={() => onNavigate('studio')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to CV Studio</span>
          </button>

          <button
            onClick={() => onNavigate('progress')}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-black text-white bg-[#0B6B3A] hover:bg-[#08522c] rounded-2xl transition-all shadow-md shadow-[#0B6B3A]/20 cursor-pointer active:translate-y-0.5"
          >
            <span>See My Wins & Proof</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* MODAL: LOG NOTES AFTER CALL */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-black text-gray-900">
                Log Chat with {activeConn.name}
              </h3>
              <button
                onClick={() => setShowLogModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveLog} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  What was the best advice they gave you?
                </label>
                <textarea
                  rows={3}
                  value={logNotes}
                  onChange={(e) => setLogNotes(e.target.value)}
                  placeholder="e.g. She liked the Makola market app, but advised making the demo video 1 minute shorter..."
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#0B6B3A] resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  What is your next step?
                </label>
                <input
                  type="text"
                  value={logNextAction}
                  onChange={(e) => setLogNextAction(e.target.value)}
                  placeholder="e.g. Send updated link on Friday"
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#0B6B3A]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0B6B3A] text-white text-xs font-black hover:bg-[#08522c] cursor-pointer shadow-sm"
                >
                  Save to My Record ✓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
