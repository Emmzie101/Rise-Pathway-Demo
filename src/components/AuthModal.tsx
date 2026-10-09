import React, { useState } from 'react';
import { UserRole, UserAccount } from '../types';
import { demoAccounts } from '../data/mockData';
import {
  X,
  User,
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Key,
  Users,
  Eye,
  EyeOff,
  Compass,
} from 'lucide-react';
import { registerUser, loginUser, switchDemoPersona } from '../services/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signup' | 'login' | 'demo';
  onAuthSuccess: (user: UserAccount, isNewFellow?: boolean) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signup',
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<'signup' | 'login' | 'demo'>(initialMode);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('fellow');
  const [inviteCode, setInviteCode] = useState('');

  // UI feedback states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [approvalNotice, setApprovalNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setApprovalNotice(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!name.trim() || !email.trim()) {
          throw new Error('Please provide your name and email address.');
        }

        const res = await registerUser({
          name: name.trim(),
          email: email.trim(),
          role: selectedRole,
          inviteCode: inviteCode.trim(),
          password,
        });

        if (!res.isApproved) {
          setApprovalNotice(
            res.approvalMessage ||
              `Your ${selectedRole} registration has been received. Elevated access requires administrator approval before you can access staff tools.`
          );
          setLoading(false);
          return;
        }

        onAuthSuccess(res.user, selectedRole === 'fellow');
        onClose();
      } else if (mode === 'login') {
        if (!email.trim()) {
          throw new Error('Please enter your email address.');
        }

        const user = await loginUser({ email: email.trim(), password });
        onAuthSuccess(user, false);
        onClose();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDemoPersona = async (personaId: string) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const user = await switchDemoPersona(personaId);
      onAuthSuccess(user, false);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Could not load demo persona.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner in Brand Green */}
        <div className="bg-[#074626] text-white px-6 py-5 flex items-center justify-between border-b border-[#0B6B3A]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#F3C623] flex items-center justify-center text-[#074626] font-black text-sm">
              R
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                {mode === 'signup' && 'Create Your RISE Account'}
                {mode === 'login' && 'Sign In to RISE Pathway'}
                {mode === 'demo' && 'Explore Demo Personas'}
              </h2>
              <p className="text-xs text-emerald-200">
                Growth Beyond Grades · Pan-African Transition
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-100 bg-[#FAF9F5] p-1.5 gap-1.5">
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMessage(null);
              setApprovalNotice(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-white text-[#0B6B3A] shadow-xs border border-gray-200'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage(null);
              setApprovalNotice(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-[#0B6B3A] shadow-xs border border-gray-200'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('demo');
              setErrorMessage(null);
              setApprovalNotice(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              mode === 'demo'
                ? 'bg-white text-[#0B6B3A] shadow-xs border border-gray-200'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Explore Demo
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 flex items-start gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {approvalNotice && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-amber-950">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Account Awaiting Verification</span>
              </div>
              <p className="leading-relaxed">{approvalNotice}</p>
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setMode('demo')}
                  className="px-3 py-1.5 bg-[#0B6B3A] text-white rounded-xl text-xs font-bold hover:bg-[#074626] transition-colors"
                >
                  Explore via Demo Role Instead
                </button>
              </div>
            </div>
          )}

          {/* MODE: SIGN UP OR LOG IN */}
          {(mode === 'signup' || mode === 'login') && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Kwame Mensah"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF9F5] border border-gray-200 text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B6B3A] focus:bg-white"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. fellow@alumni.edu"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF9F5] border border-gray-200 text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B6B3A] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-[#FAF9F5] border border-gray-200 text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B6B3A] focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* ROLE SELECTION (SIGN UP ONLY) */}
              {mode === 'signup' && (
                <div className="pt-1">
                  <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-2">
                    Select Account Role
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      {
                        role: 'fellow' as UserRole,
                        label: 'Fellow / Student',
                        sub: 'Open registration',
                      },
                      {
                        role: 'staff' as UserRole,
                        label: 'Programme Staff',
                        sub: 'Requires authorization',
                      },
                      {
                        role: 'admin' as UserRole,
                        label: 'Administrator',
                        sub: 'Requires clearance',
                      },
                      {
                        role: 'safeguarding' as UserRole,
                        label: 'Safeguarding Focal',
                        sub: 'Restricted role',
                      },
                    ].map((item) => {
                      const isSelected = selectedRole === item.role;
                      return (
                        <button
                          key={item.role}
                          type="button"
                          onClick={() => setSelectedRole(item.role)}
                          className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-50 border-[#0B6B3A] text-[#0B6B3A] font-bold shadow-2xs'
                              : 'bg-[#FAF9F5] border-gray-200 text-gray-700 hover:bg-emerald-50/40'
                          }`}
                        >
                          <div className="text-xs font-bold">{item.label}</div>
                          <div className="text-[10px] text-gray-500 font-normal">{item.sub}</div>
                        </button>
                      );
                    })}
                  </div>

                  {/* SECURITY NOTICE & INVITE CODE FOR ELEVATED ROLES */}
                  {selectedRole !== 'fellow' && (
                    <div className="mt-3 p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-2">
                      <div className="flex items-center gap-1.5 font-semibold text-amber-950">
                        <ShieldCheck className="w-4 h-4 text-amber-700" />
                        <span>Security Check: {selectedRole.toUpperCase()} Role</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-amber-800">
                        Selecting this role will not automatically grant access without verified administrative approval or an invite code.
                      </p>
                      <div>
                        <input
                          type="text"
                          value={inviteCode}
                          onChange={(e) => setInviteCode(e.target.value)}
                          placeholder="Optional Invite Code (e.g. RWEF-STAFF-2026)"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-amber-300 text-xs text-gray-900 focus:outline-hidden focus:ring-1 focus:ring-[#0B6B3A]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 rounded-2xl bg-[#0B6B3A] hover:bg-[#074626] text-white font-bold text-sm shadow-md shadow-[#0B6B3A]/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:translate-y-0.5"
              >
                {loading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>
                      {mode === 'signup'
                        ? selectedRole === 'fellow'
                          ? 'Create Account & Begin Baseline'
                          : 'Register for Access Review'
                        : 'Sign In'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#F3C623]" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* MODE: DEMO PERSONAS EXPLORER */}
          {mode === 'demo' && (
            <div className="space-y-3">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-[#074626] flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#0B6B3A] shrink-0 mt-0.5" />
                <span>
                  <strong>Prototype Evaluator Mode:</strong> Instant sign-in with realistic pre-populated data across all 4 platform roles. Real participant data is never exposed.
                </span>
              </div>

              <div className="space-y-2">
                {demoAccounts.map((persona) => {
                  return (
                    <button
                      key={persona.id}
                      type="button"
                      onClick={() => handleSelectDemoPersona(persona.id)}
                      disabled={loading}
                      className="w-full p-3.5 rounded-2xl bg-[#FAF9F5] hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 transition-all flex items-center justify-between text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={persona.avatar}
                          alt={persona.name}
                          className="w-10 h-10 rounded-xl object-cover ring-1 ring-emerald-200"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-900 group-hover:text-[#0B6B3A]">
                              {persona.name}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                persona.role === 'fellow'
                                  ? 'bg-emerald-100 text-[#0B6B3A]'
                                  : persona.role === 'staff'
                                  ? 'bg-blue-100 text-blue-800'
                                  : persona.role === 'admin'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {persona.roleTitle}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 font-normal line-clamp-1 mt-0.5">
                            {persona.description}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#0B6B3A] group-hover:translate-x-0.5 transition-all" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Reassurance */}
        <div className="bg-[#FAF9F5] px-6 py-3.5 border-t border-gray-100 text-[11px] text-gray-500 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#0B6B3A]" />
            <span>256-Bit Encrypted Data & RBAC</span>
          </div>
          <span>R-WEF GBG Cohort 2</span>
        </div>
      </div>
    </div>
  );
};
