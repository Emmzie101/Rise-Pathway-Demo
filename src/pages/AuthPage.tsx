import React, { useState } from 'react';
import { PageView, UserRole, UserAccount } from '../types';
import { demoAccounts } from '../data/mockData';
import { RwefLogo } from '../components/RwefLogo';
import { registerUser, loginUser, switchDemoPersona } from '../services/api';
import {
  User,
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Users,
  Eye,
  EyeOff,
  ShieldAlert,
  Settings,
  ChevronLeft,
} from 'lucide-react';

interface AuthPageProps {
  onNavigate: (view: PageView) => void;
  initialMode?: 'signup' | 'login';
  onAuthSuccess: (user: UserAccount, isNewFellow?: boolean) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  onNavigate,
  initialMode = 'signup',
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<'signup' | 'login'>(initialMode);

  // Form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('fellow');
  const [inviteCode, setInviteCode] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [approvalNotice, setApprovalNotice] = useState<string | null>(null);

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
              `Your ${selectedRole} registration has been logged and is pending administrator clearance.`
          );
          setLoading(false);
          return;
        }

        // Fellow after signing up: taken to the AI pathway check-in
        onAuthSuccess(res.user, selectedRole === 'fellow');
      } else {
        if (!email.trim()) {
          throw new Error('Please enter your email address.');
        }

        const user = await loginUser({ email: email.trim(), password });
        // Logging in: fellow goes to general dashboard (isNewFellow = false)
        onAuthSuccess(user, false);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDemoPersona = async (personaId: string) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const user = await switchDemoPersona(personaId);
      // Demo persona: logging in -> fellow to hub, others to respective pages
      onAuthSuccess(user, false);
    } catch (err: any) {
      setErrorMessage(err.message || 'Could not load demo persona.');
    } finally {
      setLoading(false);
    }
  };

  // Group demo accounts into the 4 requested role categories
  const fellowPersonas = demoAccounts.filter((d) => d.role === 'fellow');
  const staffPersona = demoAccounts.find((d) => d.role === 'staff');
  const adminPersona = demoAccounts.find((d) => d.role === 'admin');
  const safeguardPersona = demoAccounts.find((d) => d.role === 'safeguarding');

  return (
    <div className="min-h-screen bg-[#FAF9F5] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Back to Home & Brand Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('landing')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#0B6B3A] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <RwefLogo size="sm" variant="full" />
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-[#074626] text-white px-6 sm:px-8 py-6 border-b border-[#0B6B3A]">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F3C623] animate-pulse" />
              <span className="text-xs font-mono font-bold text-[#F3C623] uppercase tracking-wider">
                R-WEF · Transition Platform
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1 font-normal">
              {mode === 'signup'
                ? 'Sign up to begin your AI pathway check-in and personal 14-day sprint.'
                : 'Log in to continue your sprint deliverables and access your dashboard.'}
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="flex border-b border-gray-100 bg-[#FAF9F5] p-1.5 gap-2">
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMessage(null);
                setApprovalNotice(null);
              }}
              className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-2xl transition-all cursor-pointer ${
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
              className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-[#0B6B3A] shadow-xs border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Log In
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Feedback Banners */}
            {errorMessage && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 flex items-start gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {approvalNotice && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-amber-950">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Access Pending Authorization</span>
                </div>
                <p className="leading-relaxed">{approvalNotice}</p>
              </div>
            )}

            {/* 1-CLICK DEMO ACCOUNTS PROFILE SECTION */}
            <div className="p-5 bg-emerald-50/60 rounded-3xl border border-emerald-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0B6B3A]" />
                  <span className="text-xs font-bold text-[#074626] uppercase tracking-wider">
                    Instant Demo Login Options:
                  </span>
                </div>
                <span className="text-[11px] text-emerald-700 font-medium">1-Click Access</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                
                {/* 1. Fellow Option */}
                {fellowPersonas[0] && (
                  <button
                    key={fellowPersonas[0].id}
                    type="button"
                    disabled={loading}
                    onClick={() => handleSelectDemoPersona(fellowPersonas[0].id)}
                    className="p-3 bg-white rounded-2xl border border-emerald-200 hover:border-[#0B6B3A] hover:shadow-sm text-left transition-all cursor-pointer flex items-center gap-3 group"
                  >
                    <img
                      src={fellowPersonas[0].avatar}
                      alt={fellowPersonas[0].name}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-xl object-cover shrink-0 ring-1 ring-emerald-300"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-gray-900 group-hover:text-[#0B6B3A] truncate">
                        {fellowPersonas[0].name}
                      </div>
                      <div className="text-[10px] text-emerald-800 font-semibold uppercase">
                        Fellow · Dashboard
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0B6B3A] group-hover:translate-x-0.5 transition-all" />
                  </button>
                )}

                {/* 2. Staff Option */}
                {staffPersona && (
                  <button
                    key={staffPersona.id}
                    type="button"
                    disabled={loading}
                    onClick={() => handleSelectDemoPersona(staffPersona.id)}
                    className="p-3 bg-white rounded-2xl border border-blue-200 hover:border-blue-500 hover:shadow-sm text-left transition-all cursor-pointer flex items-center gap-3 group"
                  >
                    <img
                      src={staffPersona.avatar}
                      alt={staffPersona.name}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-xl object-cover shrink-0 ring-1 ring-blue-300"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-gray-900 group-hover:text-blue-700 truncate">
                        {staffPersona.name}
                      </div>
                      <div className="text-[10px] text-blue-700 font-semibold uppercase">
                        Staff · Coach Desk
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all" />
                  </button>
                )}

                {/* 3. Admin Option */}
                {adminPersona && (
                  <button
                    key={adminPersona.id}
                    type="button"
                    disabled={loading}
                    onClick={() => handleSelectDemoPersona(adminPersona.id)}
                    className="p-3 bg-white rounded-2xl border border-purple-200 hover:border-purple-500 hover:shadow-sm text-left transition-all cursor-pointer flex items-center gap-3 group"
                  >
                    <img
                      src={adminPersona.avatar}
                      alt={adminPersona.name}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-xl object-cover shrink-0 ring-1 ring-purple-300"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-gray-900 group-hover:text-purple-700 truncate">
                        {adminPersona.name}
                      </div>
                      <div className="text-[10px] text-purple-700 font-semibold uppercase">
                        Admin · Console
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-purple-700 group-hover:translate-x-0.5 transition-all" />
                  </button>
                )}

                {/* 4. Safe Focal Point Option */}
                {safeguardPersona && (
                  <button
                    key={safeguardPersona.id}
                    type="button"
                    disabled={loading}
                    onClick={() => handleSelectDemoPersona(safeguardPersona.id)}
                    className="p-3 bg-white rounded-2xl border border-rose-200 hover:border-rose-500 hover:shadow-sm text-left transition-all cursor-pointer flex items-center gap-3 group"
                  >
                    <img
                      src={safeguardPersona.avatar}
                      alt={safeguardPersona.name}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-xl object-cover shrink-0 ring-1 ring-rose-300"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-gray-900 group-hover:text-rose-700 truncate">
                        {safeguardPersona.name}
                      </div>
                      <div className="text-[10px] text-rose-700 font-semibold uppercase">
                        Safe Focal Point · Desk
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-rose-700 group-hover:translate-x-0.5 transition-all" />
                  </button>
                )}

              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-200 w-full" />
              <span className="bg-white px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider absolute">
                Or Continue with Credentials
              </span>
            </div>

            {/* Standard Credentials Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
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
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
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
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
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

              {/* Role Selection (on signup) */}
              {mode === 'signup' && (
                <div className="pt-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Select Account Role
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { role: 'fellow' as UserRole, label: 'Fellow', sub: 'Takes AI check-in' },
                      { role: 'staff' as UserRole, label: 'Coach Staff', sub: 'Cohort desk' },
                      { role: 'admin' as UserRole, label: 'Administrator', sub: 'Console' },
                      { role: 'safeguarding' as UserRole, label: 'Safe Focal Point', sub: 'Confidential desk' },
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

                  {selectedRole !== 'fellow' && (
                    <div className="mt-3 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-1.5">
                      <div className="font-semibold text-amber-950">
                        {selectedRole.toUpperCase()} Authorization Code (Optional for Demo):
                      </div>
                      <input
                        type="text"
                        value={inviteCode}
                        onChange={(e) => setInviteCode(e.target.value)}
                        placeholder={`e.g. ${
                          selectedRole === 'staff'
                            ? 'RWEF-STAFF-2026'
                            : selectedRole === 'admin'
                            ? 'RWEF-ADMIN-PASS'
                            : 'RWEF-SAFEGUARD-CONFIDENTIAL'
                        }`}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-amber-300 text-xs text-gray-900 focus:outline-hidden"
                      />
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-3 py-3.5 rounded-2xl bg-[#0B6B3A] hover:bg-[#074626] text-white font-bold text-sm shadow-md shadow-[#0B6B3A]/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:translate-y-0.5"
              >
                {loading ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <span>
                      {mode === 'signup'
                        ? selectedRole === 'fellow'
                          ? 'Create Account & Begin AI Check-In'
                          : 'Register Account'
                        : 'Sign In to Workspace'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#F3C623]" />
                  </>
                )}
              </button>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
};
