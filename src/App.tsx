/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageView, ParticipantProfile, CheckInResponses, AiPathwayInsight, OpportunityPlan } from './types';
import {
  initialParticipantProfile,
  initialCheckInResponses,
  defaultAiInsight,
  initialActivationPlan,
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { UserSidebar } from './components/UserSidebar';
import { UserTopBar } from './components/UserTopBar';
import { DemoSwitcher } from './components/DemoSwitcher';
import { ResponsibleAiModal } from './components/ResponsibleAiModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { RiseIntroPage } from './pages/RiseIntroPage';
import { PathwayCheckInPage } from './pages/PathwayCheckInPage';
import { WorkspaceHubPage } from './pages/WorkspaceHubPage';
import { AiInsightsPage } from './pages/AiInsightsPage';
import { GoalClarificationPage } from './pages/GoalClarificationPage';
import { ActivationPlanPage } from './pages/ActivationPlanPage';
import { LanguageStudioPage } from './pages/LanguageStudioPage';
import { NetworkingNavigatorPage } from './pages/NetworkingNavigatorPage';
import { LearningPage } from './pages/LearningPage';
import { WellbeingCheckInPage } from './pages/WellbeingCheckInPage';
import { ProgressPage } from './pages/ProgressPage';
import { StaffDashboardPage } from './pages/StaffDashboardPage';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('landing');
  const [responsibleAiOpen, setResponsibleAiOpen] = useState(false);

  // Sidebar states for user-facing and staff side
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Core application state
  const [participant, setParticipant] = useState<ParticipantProfile>(initialParticipantProfile);
  const [responses, setResponses] = useState<CheckInResponses>(initialCheckInResponses);
  const [insight, setInsight] = useState<AiPathwayInsight>(defaultAiInsight);
  const [plan, setPlan] = useState<OpportunityPlan>(initialActivationPlan);

  const isPublicPage = currentView === 'landing' || currentView === 'intro';

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

  const handleSelectParticipant = (profile: ParticipantProfile) => {
    setParticipant(profile);
    setPlan((prev) => ({
      ...prev,
      goal: profile.primaryGoal,
    }));
  };

  const handleResetDemoData = () => {
    setParticipant(initialParticipantProfile);
    setResponses(initialCheckInResponses);
    setInsight(defaultAiInsight);
    setPlan(initialActivationPlan);
    setCurrentView('landing');
  };

  const handleNavigate = (view: PageView) => {
    setCurrentView(view);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          />

          <main className="flex-1">
            {currentView === 'landing' && (
              <LandingPage
                onNavigate={handleNavigate}
                onOpenResponsibleAi={() => setResponsibleAiOpen(true)}
              />
            )}

            {currentView === 'intro' && (
              <RiseIntroPage
                onNavigate={handleNavigate}
                onOpenResponsibleAi={() => setResponsibleAiOpen(true)}
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
          />

          {/* Main User Content Container */}
          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            
            {/* Top Bar for User / Admin View */}
            <UserTopBar
              currentView={currentView}
              onNavigate={handleNavigate}
              participant={participant}
              onOpenMobileMenu={() => setMobileSidebarOpen(true)}
              onOpenResponsibleAi={() => setResponsibleAiOpen(true)}
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

              {currentView === 'networking' && (
                <NetworkingNavigatorPage onNavigate={handleNavigate} />
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
            </main>
          </div>

        </div>
      )}

      {/* Floating Demo Controller & Persona Stepper */}
      <DemoSwitcher
        currentView={currentView}
        onNavigate={handleNavigate}
        currentParticipant={participant}
        onSelectParticipant={handleSelectParticipant}
        onResetDemoData={handleResetDemoData}
      />

      {/* Responsible AI Modal */}
      <ResponsibleAiModal
        isOpen={responsibleAiOpen}
        onClose={() => setResponsibleAiOpen(false)}
      />
    </div>
  );
}
