import React, { useState } from 'react';
import { PageView, CheckInResponses, ParticipantProfile } from '../types';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Shield,
  HelpCircle,
  BatteryCharging,
  Zap,
  Check,
  Compass,
  Smile,
  Heart,
  Target,
} from 'lucide-react';

interface PathwayCheckInPageProps {
  onNavigate: (view: PageView) => void;
  responses: CheckInResponses;
  onUpdateResponses: (updated: Partial<CheckInResponses>) => void;
  participant: ParticipantProfile;
  onUpdateParticipant: (updated: Partial<ParticipantProfile>) => void;
}

export const PathwayCheckInPage: React.FC<PathwayCheckInPageProps> = ({
  onNavigate,
  responses,
  onUpdateResponses,
  participant,
  onUpdateParticipant,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const stageOptions = [
    'Final Year Student in University / Polytechnic / College',
    'National Youth Service / Internship / Gap Year',
    'Recent Graduate (Finished within 1 year)',
    'Self-Taught or Transitioning Careers',
    'Starting My Own Small Business / Initiative',
  ];

  const strengthOptions = [
    'I love building practical projects (coding, design, tech, fixing stuff)',
    'I have organized or led activities with student groups or community clubs',
    'I am strong at research, synthesis, and writing clear documentation',
    'I stay disciplined even when power cuts or data limits interrupt work',
    'I communicate clearly and connect well with peers and team members',
    'I consistently complete deliverables ahead of deadlines',
  ];

  const readinessOptions = [
    'Translating academic coursework into job-ready portfolio evidence',
    'Messaging hiring managers and working professionals with confidence',
    'Structuring a concise, impact-oriented CV that receives interview calls',
    'Practicing realistic responses for behavioral and technical interviews',
    'Pacing my weekly workload to avoid burnout and stress',
    'Finding freelance client opportunities and remote junior roles',
  ];

  const frictionOptions = [
    'High mobile internet and data costs',
    'Frequent power blackouts and load shedding',
    'Demanding academic commitments or exam pressure',
    'Urgent pressure to earn income to meet personal living needs',
    'High family expectations to secure stable employment immediately',
    'Imposter syndrome or anxiety about not meeting job requirements',
  ];

  const toggleStrength = (item: string) => {
    const exists = responses.existingStrengths.includes(item);
    const updated = exists
      ? responses.existingStrengths.filter((s) => s !== item)
      : [...responses.existingStrengths, item];
    onUpdateResponses({ existingStrengths: updated });
  };

  const toggleReadiness = (item: string) => {
    const exists = responses.readinessNeeds.includes(item);
    const updated = exists
      ? responses.readinessNeeds.filter((s) => s !== item)
      : [...responses.readinessNeeds, item];
    onUpdateResponses({ readinessNeeds: updated });
  };

  const toggleFriction = (item: string) => {
    const exists = responses.frictionFactors.includes(item);
    const updated = exists
      ? responses.frictionFactors.filter((s) => s !== item)
      : [...responses.frictionFactors, item];
    onUpdateResponses({ frictionFactors: updated });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Completed - update participant summary and navigate to welcome workspace hub
      onUpdateParticipant({
        energyLevel: responses.energyLevel,
        confidenceLevel: responses.confidenceLevel,
        topBarriers: responses.frictionFactors.slice(0, 3),
        supportRequested: responses.supportPreference === 'staff_checkin',
      });
      onNavigate('hub');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigate('intro');
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-[#FAF9F5] py-8 lg:py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        {/* Step Indicator Header with Brand Green Spectrum */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-gray-700 mb-2 font-medium">
            <span className="inline-flex items-center gap-1.5 text-[#0B6B3A] font-semibold">
              <Compass className="w-4 h-4 text-[#0B6B3A]" />
              <span>GBG Cohort 2 · Quick Check-In</span>
            </span>
            <span className="font-mono font-bold text-[#0B6B3A] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Step {currentStep} of {totalSteps}
            </span>
          </div>

          {/* Stepper bar segments */}
          <div className="grid grid-cols-5 gap-2 h-2">
            {[1, 2, 3, 4, 5].map((st) => (
              <div
                key={st}
                className={`h-full rounded-full transition-all duration-300 ${
                  st <= currentStep ? 'bg-[#0B6B3A]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-emerald-100 relative overflow-hidden">
          
          {/* STEP 1: ABOUT YOU */}
          {currentStep === 1 && (
            <div className="animate-fadeIn">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#0B6B3A] text-xs font-semibold uppercase tracking-wider mb-2 border border-emerald-200">
                <span>01. Current Academic & Career Context</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mb-2 tracking-tight">
                Where are you starting from today?
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 font-normal">
                Share your current academic or training situation so we can build a sprint that respects your schedule.
              </p>

              <div className="space-y-5 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-2.5">
                    Select Your Current Stage:
                  </label>
                  <div className="space-y-2.5">
                    {stageOptions.map((opt) => {
                      const isSelected = responses.currentStage === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => onUpdateResponses({ currentStage: opt })}
                          className={`w-full text-left p-4 rounded-2xl text-sm font-medium transition-all flex items-center justify-between cursor-pointer border ${
                            isSelected
                              ? 'bg-[#0B6B3A] text-white border-[#074626] shadow-sm font-semibold'
                              : 'bg-[#FAF9F5] hover:bg-emerald-50/60 text-gray-800 border-gray-200'
                          }`}
                        >
                          <span>{opt}</span>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-[#F3C623] text-[#074626] flex items-center justify-center shrink-0">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-2">
                    Course of Study or Primary Field of Interest:
                  </label>
                  <input
                    type="text"
                    value={responses.fieldOfStudyOrWork}
                    onChange={(e) => onUpdateResponses({ fieldOfStudyOrWork: e.target.value })}
                    placeholder="e.g. Computer Science, Accounting, Graphic Design, Electrical Engineering..."
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#FAF9F5] border border-gray-200 text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B6B3A] focus:bg-white font-normal"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: CURRENT DIRECTION */}
          {currentStep === 2 && (
            <div className="animate-fadeIn">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF7DA] text-[#074626] text-xs font-semibold uppercase tracking-wider mb-2 border border-[#F3C623]">
                <span>02. Your Target Direction</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mb-2 tracking-tight">
                What career goal are you aiming for?
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 font-normal">
                Be candid. It is completely natural if you are still deciding between a couple of paths.
              </p>

              <div className="space-y-6 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-2">
                    What type of work would you like to pursue?
                  </label>
                  <textarea
                    rows={3}
                    value={responses.hopedDirection}
                    onChange={(e) => onUpdateResponses({ hopedDirection: e.target.value })}
                    placeholder="e.g. Securing an entry software role, designing digital products for clients, or working in marketing operations..."
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#FAF9F5] border border-gray-200 text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B6B3A] focus:bg-white resize-none font-normal"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-gray-800 uppercase tracking-wider">
                      How clear do you feel about your next steps?
                    </label>
                    <span className="text-xs font-bold text-[#0B6B3A] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {responses.clarityScore === 1 && '1/5 · Uncertain / In Need of Direction'}
                      {responses.clarityScore === 2 && '2/5 · Exploring Options'}
                      {responses.clarityScore === 3 && '3/5 · Moderately Clear'}
                      {responses.clarityScore === 4 && '4/5 · Pretty Clear'}
                      {responses.clarityScore === 5 && '5/5 · Very Clear & Focused'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={responses.clarityScore}
                    onChange={(e) => onUpdateResponses({ clarityScore: Number(e.target.value) })}
                    className="w-full accent-[#0B6B3A] cursor-pointer h-2 bg-gray-200 rounded-lg"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1 font-normal">
                    <span>Still exploring</span>
                    <span>Fully committed</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-2">
                    What is your most pressing concern right now?
                  </label>
                  <input
                    type="text"
                    value={responses.biggestUncertainty}
                    onChange={(e) => onUpdateResponses({ biggestUncertainty: e.target.value })}
                    placeholder="e.g. How to prove capability when postings ask for 2+ years of prior work..."
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#FAF9F5] border border-gray-200 text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B6B3A] focus:bg-white font-normal"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: READINESS & STRENGTHS */}
          {currentStep === 3 && (
            <div className="animate-fadeIn">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#0B6B3A] text-xs font-semibold uppercase tracking-wider mb-2 border border-emerald-200">
                <span>03. Your Real Assets</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mb-2 tracking-tight">
                What strengths do you already bring?
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 font-normal">
                Academic projects and student initiatives build genuine value. Select the traits that apply to you:
              </p>

              <div className="space-y-6 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-2.5">
                    Your Core Strengths:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {strengthOptions.map((st) => {
                      const selected = responses.existingStrengths.includes(st);
                      return (
                        <button
                          key={st}
                          type="button"
                          onClick={() => toggleStrength(st)}
                          className={`text-left p-3.5 rounded-2xl text-xs font-medium transition-all flex items-start justify-between gap-2 cursor-pointer border ${
                            selected
                              ? 'bg-[#0B6B3A] text-white border-[#074626] font-semibold shadow-xs'
                              : 'bg-[#FAF9F5] text-gray-800 hover:bg-emerald-50/60 border-gray-200'
                          }`}
                        >
                          <span className="leading-snug">{st}</span>
                          {selected && (
                            <div className="w-4 h-4 rounded-full bg-[#F3C623] text-[#074626] flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-2.5">
                    What would you like to strengthen this sprint?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {readinessOptions.map((rn) => {
                      const selected = responses.readinessNeeds.includes(rn);
                      return (
                        <button
                          key={rn}
                          type="button"
                          onClick={() => toggleReadiness(rn)}
                          className={`text-left p-3.5 rounded-2xl text-xs font-medium transition-all flex items-start justify-between gap-2 cursor-pointer border ${
                            selected
                              ? 'bg-[#FEF7DA] text-[#074626] border-[#F3C623] font-semibold shadow-xs'
                              : 'bg-[#FAF9F5] text-gray-800 hover:bg-amber-50/60 border-gray-200'
                          }`}
                        >
                          <span className="leading-snug">{rn}</span>
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
              </div>
            </div>
          )}

          {/* STEP 4: REAL-WORLD ENERGY & DAILY LIFE */}
          {currentStep === 4 && (
            <div className="animate-fadeIn">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#0B6B3A] text-xs font-semibold uppercase tracking-wider mb-2 border border-emerald-200">
                <span>04. Energy & Daily Context</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mb-2 tracking-tight">
                How is your energy right now?
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 font-normal">
                We calibrate your milestone pacing to prevent burnout. Share your real daily capacity:
              </p>

              <div className="space-y-6 mb-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-[#F3C623] fill-[#F3C623]" />
                      <span>Physical and mental stamina today:</span>
                    </label>
                    <span className="text-xs font-bold text-[#0B6B3A] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {responses.energyLevel === 1 && '1/5 · Fatigued / Need Rest'}
                      {responses.energyLevel === 2 && '2/5 · Lower Bandwidth'}
                      {responses.energyLevel === 3 && '3/5 · Steady & Moderate'}
                      {responses.energyLevel === 4 && '4/5 · High Energy'}
                      {responses.energyLevel === 5 && '5/5 · Energized & Ready'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={responses.energyLevel}
                    onChange={(e) => onUpdateResponses({ energyLevel: Number(e.target.value) })}
                    className="w-full accent-[#0B6B3A] cursor-pointer h-2 bg-gray-200 rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                      <BatteryCharging className="w-4 h-4 text-[#0B6B3A]" />
                      <span>Confidence in taking forward action:</span>
                    </label>
                    <span className="text-xs font-bold text-[#0B6B3A] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {responses.confidenceLevel === 1 && '1/5 · Hesitant / Seeking Clarity'}
                      {responses.confidenceLevel === 2 && '2/5 · Slightly Shaky'}
                      {responses.confidenceLevel === 3 && '3/5 · Balanced'}
                      {responses.confidenceLevel === 4 && '4/5 · Confident'}
                      {responses.confidenceLevel === 5 && '5/5 · Fully Prepared'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={responses.confidenceLevel}
                    onChange={(e) => onUpdateResponses({ confidenceLevel: Number(e.target.value) })}
                    className="w-full accent-[#0B6B3A] cursor-pointer h-2 bg-gray-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-2.5">
                    Frictional factors in your environment (Select all that apply):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {frictionOptions.map((fc) => {
                      const selected = responses.frictionFactors.includes(fc);
                      return (
                        <button
                          key={fc}
                          type="button"
                          onClick={() => toggleFriction(fc)}
                          className={`text-left p-3.5 rounded-2xl text-xs font-medium transition-all flex items-start justify-between gap-2 cursor-pointer border ${
                            selected
                              ? 'bg-[#FEF7DA] border-[#F3C623] text-[#074626] font-semibold shadow-xs'
                              : 'bg-[#FAF9F5] text-gray-800 hover:bg-amber-50/50 border-gray-200'
                          }`}
                        >
                          <span className="leading-snug">{fc}</span>
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
              </div>
            </div>
          )}

          {/* STEP 5: SUPPORT PREFERENCE */}
          {currentStep === 5 && (
            <div className="animate-fadeIn">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#0B6B3A] text-xs font-semibold uppercase tracking-wider mb-2 border border-emerald-200">
                <span>05. Coaching & Peer Preference</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mb-2 tracking-tight">
                How would you prefer to receive support?
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 font-normal">
                Choose the support format that matches your working style. We are here to support you at your pace.
              </p>

              <div className="space-y-3 mb-6">
                {[
                  {
                    id: 'independent',
                    title: 'Self-guided with platform sprints',
                    desc: 'I will progress through my 14-day checklist and use the CV studio independently at my own pace.',
                  },
                  {
                    id: 'peer',
                    title: 'Peer study buddy connection',
                    desc: 'Pair me with another fellow in Cohort 2 for a brief weekly 15-minute voice sync.',
                  },
                  {
                    id: 'staff_checkin',
                    title: 'Direct check-in with an R-WEF coach',
                    desc: 'I am navigating a hurdle and would value a supportive voice note or guidance message from an R-WEF coach.',
                  },
                ].map((item) => {
                  const isSelected = responses.supportPreference === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onUpdateResponses({ supportPreference: item.id as any })}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all flex items-start justify-between gap-3 cursor-pointer border ${
                        isSelected
                          ? 'bg-[#0B6B3A] text-white border-[#074626] shadow-sm scale-[1.005]'
                          : 'bg-[#FAF9F5] hover:bg-emerald-50/60 text-gray-800 border-gray-200'
                      }`}
                    >
                      <div>
                        <div className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-gray-950'}`}>{item.title}</div>
                        <div className={`text-xs mt-1 leading-relaxed font-normal ${isSelected ? 'text-emerald-100' : 'text-gray-600'}`}>
                          {item.desc}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#F3C623] text-[#074626] flex items-center justify-center shrink-0 mt-1">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {responses.supportPreference === 'staff_checkin' && (
                <div className="p-4 bg-[#FEF7DA] rounded-2xl border border-[#F3C623] text-xs text-[#074626] mb-4 flex items-center gap-2 font-medium">
                  <Heart className="w-4 h-4 text-[#0B6B3A] shrink-0" />
                  <span>Coach Notification: An R-WEF coach will review your notes and reach out within 24 hours.</span>
                </div>
              )}
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-950 rounded-xl transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{currentStep === 1 ? 'Back to Intro' : 'Previous'}</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#0B6B3A] hover:bg-[#074626] rounded-2xl shadow-lg shadow-[#0B6B3A]/25 transition-all cursor-pointer active:translate-y-0.5 border-b-2 border-[#074626]"
            >
              <span>{currentStep === totalSteps ? 'Enter My Workspace Hub' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4 text-[#F3C623]" />
            </button>
          </div>

        </div>

        {/* Quiet Reassurance */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 font-normal">
          <Shield className="w-4 h-4 text-[#0B6B3A]" />
          <span>Your responses are private to the R-WEF team and never shared with employers without explicit consent.</span>
        </div>

      </div>
    </div>
  );
};
