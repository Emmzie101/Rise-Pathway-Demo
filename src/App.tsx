/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  PageView,
  ParticipantProfile,
  CheckInResponses,
  AiPathwayInsight,
  OpportunityPlan,
  UserAccount,
  UserRole,
} from './types';
import {
  initialParticipantProfile,
  initialCheckInResponses,
  defaultAiInsight,
  initialActivationPlan,
  demoAccounts,
  alternateProfiles,
} from './data/mockData';
import { getCachedUser, logoutUser, switchDemoPersona } from './services/api';
import { Navbar } from './components/Navbar';
import { UserSidebar } from './components/UserSidebar';
import { UserTopBar } from './components/UserTopBar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { DemoSwitcher } from './components/DemoSwitcher';
import { AuthModal } from './components/AuthModal';
import { ResponsibleAiModal } from './components/ResponsibleAiModal';

// Pages (all 12 MVP views + intro + landing)
import { LandingPage } from './pages/LandingPage';
import { RiseIntroPage } from './pages/RiseIntroPage';
import { PathwayCheckInPage } from './pages/PathwayCheckInPage';
import { PathwayAssessmentPage } from './pages/PathwayAssessmentPage';
import { WorkspaceHubPage } from './pages/WorkspaceHubPage';
import { AiInsightsPage } from './pages/AiInsightsPage';
import { GoalClarificationPage } from './pages/GoalClarificationPage';
import { ActivationPlanPage } from './pages/ActivationPlanPage';
import { LanguageStudioPage } from './pages/LanguageStudioPage';
import { AuthPage } from './pages/AuthPage';
import { LearningPage } from './pages/LearningPage';
import { WellbeingCheckInPage } from './pages/WellbeingCheckInPage';
import { ProgressPage } from './pages/ProgressPage';
import { StaffDashboardPage } from './pages/StaffDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { SafeguardingDeskPage } from './pages/SafeguardingDeskPage';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('landing');
  const [responsibleAiOpen, setResponsibleAiOpen] = useState(false);

  // Auth modal states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signup' | 'login' | 'demo'>('signup');

  // Active User session state (defaults to Kofi Mensah fellow for seamless initial exploration)
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const cached = getCachedUser();
    if (cached) return cached;
    const defaultFellow = demoAccounts[0];
    return {
      id: defaultFellow.id,
      email: defaultFellow.email,
      name: defaultFellow.name,
      role: defaultFellow.role,
      avatar: defaultFellow.avatar,
      isApproved: defaultFellow.isApproved,
      isDemo: true,
      cohort: 'GBG Cohort 2',
      createdAt: '2026-10-01T00:00:00Z',
    };
  });

  // Sidebar states for dashboard views
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Core fellow profile and sprint state
  const [participant, setParticipant] = useState<ParticipantProfile>(initialParticipantProfile);
  const [responses, setResponses] = useState<CheckInResponses>(initialCheckInResponses);
  const [insight, setInsight] = useState<AiPathwayInsight>(defaultAiInsight);
  const [plan, setPlan] = useState<OpportunityPlan>(initialActivationPlan);

  const isPublicPage = currentView === 'landing' || currentView === 'intro' || currentView === 'auth';

  const handleUpdateParticipant = (updated: Partial<ParticipantProfile>) => {
    setParticipant((prev) => ({ ...prev, ...updated }));
  };

  const handleUpdateResponses = (updated: Partial<CheckInResponses>) => {
    setResponses((prev) => ({ ...prev, ...updated }));
  };

  const handleUpdateInsight = (updated: Partial<AiPathwayInsight>) => {
    setInsight((prev) => ({ ...prev, ...updated }));
  };

  const handleUpdatePlan = (updated: Partial<OpportunityPlan>) => {
    setPlan((prev) => ({ ...prev, ...updated }));
  };

  const handleNavigate = (view: PageView) => {
    setCurrentView(view);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth Action Handlers
  const handleOpenSignUp = () => {
    setAuthModalMode('signup');
    handleNavigate('auth');
  };

  const handleOpenLogIn = () => {
    setAuthModalMode('login');
    handleNavigate('auth');
  };

  const handleOpenExploreDemo = () => {
    setAuthModalMode('login');
    handleNavigate('auth');
  };

  const handleSignOut = () => {
    logoutUser();
    setCurrentUser(null);
    handleNavigate('landing');
  };

  const handleAuthSuccess = (user: UserAccount, isNewFellow?: boolean) => {
    setCurrentUser(user);
    if (user.role === 'staff') {
      handleNavigate('staff');
    } else if (user.role === 'admin') {
      handleNavigate('admin');
    } else if (user.role === 'safeguarding') {
      handleNavigate('safeguarding');
    } else {
      // Fellow Role
      if (isNewFellow) {
        setParticipant((prev) => ({
          ...prev,
          id: user.id,
          name: user.name,
          primaryGoal: '',
          baselineCompleted: false,
        }));
        handleNavigate('checkin');
      } else {
        const matchingProfile = [initialParticipantProfile, ...alternateProfiles].find(
          (p) => p.id === user.id || p.name.toLowerCase() === user.name.toLowerCase()
        );
        if (matchingProfile) {
          setParticipant(matchingProfile);
          setPlan((prev) => ({
            ...prev,
            goal: matchingProfile.primaryGoal,
          }));
        } else {
          setParticipant((prev) => ({
            ...prev,
            id: user.id,
            name: user.name,
          }));
        }
        handleNavigate('hub');
      }
    }
  };

  // 1-Click Persona Switching from Demo Switcher
  const handleSelectPersona = async (personaId: string) => {
    try {
      const user = await switchDemoPersona(personaId);
      setCurrentUser(user);

      if (user.role === 'fellow') {
        const matchingProfile = [initialParticipantProfile, ...alternateProfiles].find(
          (p) => p.id === personaId || p.name.toLowerCase() === user.name.toLowerCase()
        );
        if (matchingProfile) {
          setParticipant(matchingProfile);
          setPlan((prev) => ({
            ...prev,
            goal: matchingProfile.primaryGoal,
          }));
        }
        if (['staff', 'admin', 'safeguarding'].includes(currentView)) {
          handleNavigate('hub');
        }
      } else if (user.role === 'staff') {
        handleNavigate('staff');
      } else if (user.role === 'admin') {
        handleNavigate('admin');
      } else if (user.role === 'safeguarding') {
        handleNavigate('safeguarding');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetDemoData = () => {
    logoutUser();
    localStorage.removeItem('rise_local_store_v1');
    setParticipant(initialParticipantProfile);
    setResponses(initialCheckInResponses);
    setInsight(defaultAiInsight);
    setPlan(initialActivationPlan);
    setCurrentUser(null);
    handleNavigate('landing');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF8] text-[#192A24] font-sans antialiased">
      {/* PUBLIC MODE: Sticky Top Navigation Bar */}
      {isPublicPage ? (
        <>
          <Navbar
            currentView={currentView}
            onNavigate={handleNavigate}
            participant={participant}
            onOpenResponsibleAi={() => setResponsibleAiOpen(true)}
            onOpenSignUp={handleOpenSignUp}
            onOpenLogIn={handleOpenLogIn}
            onOpenExploreDemo={handleOpenExploreDemo}
            currentUser={currentUser}
            onSignOut={handleSignOut}
          />

          <main className="flex-1">
            {currentView === 'landing' && (
              <LandingPage
                onNavigate={handleNavigate}
                onOpenResponsibleAi={() => setResponsibleAiOpen(true)}
                onOpenSignUp={handleOpenSignUp}
                onOpenLogIn={handleOpenLogIn}
                currentUser={currentUser}
              />
            )}

            {currentView === 'intro' && (
              <RiseIntroPage
                onNavigate={handleNavigate}
                onOpenResponsibleAi={() => setResponsibleAiOpen(true)}
              />
            )}

            {currentView === 'auth' && (
              <AuthPage
                onNavigate={handleNavigate}
                initialMode={authModalMode === 'login' ? 'login' : 'signup'}
                onAuthSuccess={handleAuthSuccess}
              />
            )}
          </main>
        </>
      ) : (
        /* USER & ADMIN DASHBOARD MODE: Modern Collapsible Sidebar Layout */
        <div className="min-h-screen flex flex-row w-full bg-[#F8FAF8]">
          {/* Collapsible Left Sidebar */}
          <UserSidebar
            currentView={currentView}
            onNavigate={handleNavigate}
            participant={participant}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            mobileOpen={mobileSidebarOpen}
            onCloseMobile={() => setMobileSidebarOpen(false)}
            onOpenResponsibleAi={() => setResponsibleAiOpen(true)}
            userRole={currentUser?.role || 'fellow'}
            onSignOut={handleSignOut}
          />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto pb-16 lg:pb-0">
            {/* Top Bar */}
            <UserTopBar
              currentView={currentView}
              onNavigate={handleNavigate}
              participant={participant}
              onOpenMobileMenu={() => setMobileSidebarOpen(true)}
              onOpenResponsibleAi={() => setResponsibleAiOpen(true)}
              userRole={currentUser?.role || 'fellow'}
              onSignOut={handleSignOut}
            />

            <main className="flex-1">
              {currentView === 'checkin' && (
                <PathwayCheckInPage
                  onNavigate={handleNavigate}
                  responses={responses}
                  onUpdateResponses={handleUpdateResponses}
                  participant={participant}
                  onUpdateParticipant={handleUpdateParticipant}
                />
              )}

              {currentView === 'assessment' && (
                <PathwayAssessmentPage
                  onNavigate={handleNavigate}
                  responses={responses}
                  participant={participant}
                  plan={plan}
                  onUpdatePlan={handleUpdatePlan}
                />
              )}

              {currentView === 'hub' && (
                <WorkspaceHubPage
                  onNavigate={handleNavigate}
                  participant={participant}
                  plan={plan}
                  responses={responses}
                />
              )}

              {currentView === 'insights' && (
                <AiInsightsPage
                  onNavigate={handleNavigate}
                  insight={insight}
                  onUpdateInsight={handleUpdateInsight}
                  responses={responses}
                />
              )}

              {currentView === 'goal' && (
                <GoalClarificationPage
                  onNavigate={handleNavigate}
                  plan={plan}
                  onUpdatePlan={handleUpdatePlan}
                  participant={participant}
                  onUpdateParticipant={handleUpdateParticipant}
                />
              )}

              {currentView === 'plan' && (
                <ActivationPlanPage
                  onNavigate={handleNavigate}
                  plan={plan}
                  onUpdatePlan={handleUpdatePlan}
                />
              )}

              {currentView === 'studio' && (
                <LanguageStudioPage
                  onNavigate={handleNavigate}
                  onOpenResponsibleAi={() => setResponsibleAiOpen(true)}
                />
              )}

              {currentView === 'learning' && (
                <LearningPage onNavigate={handleNavigate} />
              )}

              {currentView === 'wellbeing' && (
                <WellbeingCheckInPage
                  onNavigate={handleNavigate}
                  participant={participant}
                  onUpdateParticipant={handleUpdateParticipant}
                />
              )}

              {currentView === 'progress' && (
                <ProgressPage
                  onNavigate={handleNavigate}
                  participant={participant}
                  plan={plan}
                />
              )}

              {currentView === 'staff' && (
                <StaffDashboardPage onNavigate={handleNavigate} />
              )}

              {currentView === 'admin' && (
                <AdminDashboardPage onNavigate={handleNavigate} />
              )}

              {currentView === 'safeguarding' && (
                <SafeguardingDeskPage onNavigate={handleNavigate} />
              )}
            </main>
          </div>

          {/* Role-adaptive Mobile Bottom Navigation */}
          <MobileBottomNav
            currentView={currentView}
            onNavigate={handleNavigate}
            userRole={currentUser?.role || 'fellow'}
          />
        </div>
      )}

      {/* Floating Demo Controller with Auth, Personas & 12 Views */}
      <DemoSwitcher
        currentView={currentView}
        onNavigate={handleNavigate}
        currentParticipant={participant}
        currentUser={currentUser}
        currentRole={currentUser?.role || 'fellow'}
        onSelectPersona={handleSelectPersona}
        onResetDemoData={handleResetDemoData}
        onOpenSignUp={handleOpenSignUp}
        onOpenLogIn={handleOpenLogIn}
        onSignOut={handleSignOut}
      />

      {/* Authentication Modal (Sign Up, Log In, Demo Personas) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Responsible AI Modal */}
      <ResponsibleAiModal
        isOpen={responsibleAiOpen}
        onClose={() => setResponsibleAiOpen(false)}
      />
    </div>
  );
}
