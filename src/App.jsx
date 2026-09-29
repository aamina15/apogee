import React, { useState } from 'react';
import Header from './components/Header';
import IntakeScreen from './components/IntakeScreen';
import DiagnosticQuizModal from './components/DiagnosticQuizModal';
import RouteScreen from './components/RouteScreen';
import CompletionGraph from './components/CompletionGraph';
import ProofOfSkillModal from './components/ProofOfSkillModal';
import MarketPulseModal from './components/MarketPulseModal';
import CalendarRePlanModal from './components/CalendarRePlanModal';
import CareerPackModal from './components/CareerPackModal';
import GroundedChatDrawer from './components/GroundedChatDrawer';

import { MISSION_PROFILES, INITIAL_USER_STATE } from './data/mockData';
import { MessageSquare } from 'lucide-react';

export default function App() {
  const [profiles, setProfiles] = useState(MISSION_PROFILES);
  const [activeProfileId, setActiveProfileId] = useState("ml-cv");
  const [activeStep, setActiveStep] = useState(1); // 1: Intake, 2: Diagnostic, 3: Route, 4: Career Pack
  const [userState, setUserState] = useState(INITIAL_USER_STATE);
  const [routeOptimizationMode, setRouteOptimizationMode] = useState("Balanced");
  const [graphViewMode, setGraphViewMode] = useState("skills"); // skills vs courses

  // Modals state
  const [isMarketPulseOpen, setIsMarketPulseOpen] = useState(false);
  const [isCalendarRePlanOpen, setIsCalendarRePlanOpen] = useState(false);
  const [isCareerPackOpen, setIsCareerPackOpen] = useState(false);
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [proofTargetItem, setProofTargetItem] = useState(null);
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];

  const handleSelectProfile = (profileId) => {
    setActiveProfileId(profileId);
  };

  const handleStartDiagnostic = () => {
    setActiveStep(2);
  };

  const handleCompleteDiagnostic = (updatedMasteryVector) => {
    // Narrow readiness band per N6
    setUserState((prev) => ({
      ...prev,
      readinessBand: { min: 72, max: 76 }
    }));
    setActiveStep(3);
  };

  const handleSkipDiagnostic = () => {
    setActiveStep(3);
  };

  const handleOpenProofModal = (item) => {
    setProofTargetItem(item);
    setIsProofModalOpen(true);
  };

  const handleVerifySuccess = (targetItem) => {
    // Update resource or skill node state to 'Verified'
    const targetSkillId = targetItem?.targetSkillId || targetItem?.id;

    setProfiles((prevProfiles) =>
      prevProfiles.map((prof) => {
        if (prof.id !== activeProfileId) return prof;

        const updatedSkillNodes = prof.skillNodes.map((n) => {
          if (n.id === targetSkillId || n.id === targetItem?.id) {
            return { ...n, status: 'Verified', mastery: 95 };
          }
          // Also check if any locked node dependent on this skill becomes 'Available'
          if (n.deps.includes(targetSkillId) && n.status === 'Locked') {
            return { ...n, status: 'Available' };
          }
          return n;
        });

        const updatedPhases = prof.phases.map((ph) => ({
          ...ph,
          resources: ph.resources.map((r) => {
            if (r.id === targetItem?.id || r.targetSkillId === targetSkillId) {
              return { ...r, completionState: 'Verified' };
            }
            return r;
          })
        }));

        return {
          ...prof,
          skillNodes: updatedSkillNodes,
          phases: updatedPhases
        };
      })
    );

    // Update user readiness band
    setUserState((prev) => ({
      ...prev,
      hoursCompleted: prev.hoursCompleted + 12,
      readinessBand: { min: Math.min(95, prev.readinessBand.min + 5), max: Math.min(98, prev.readinessBand.max + 3) }
    }));
  };

  const handleUpdateResourceState = (resourceId, newState) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((prof) => {
        if (prof.id !== activeProfileId) return prof;

        const updatedPhases = prof.phases.map((ph) => ({
          ...ph,
          resources: ph.resources.map((r) => {
            if (r.id === resourceId) {
              return { ...r, completionState: newState };
            }
            return r;
          })
        }));

        return { ...prof, phases: updatedPhases };
      })
    );
  };

  const handleApplyRePlan = (receipt) => {
    setUserState((prev) => ({
      ...prev,
      routeChangeReceipts: [receipt, ...prev.routeChangeReceipts]
    }));
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface flex flex-col relative selection:bg-primary-container selection:text-white">
      {/* Top Header Navigation */}
      <Header
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        onOpenMarketPulse={() => setIsMarketPulseOpen(true)}
        onOpenCalendarRePlan={() => setIsCalendarRePlanOpen(true)}
        onOpenCareerPack={() => setIsCareerPackOpen(true)}
        userName={userState.userName}
        readinessBand={userState.readinessBand}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {activeStep === 1 && (
          <IntakeScreen
            currentProfile={activeProfile}
            onSelectProfile={handleSelectProfile}
            onStartDiagnostic={handleStartDiagnostic}
            onExploreDemoRoute={() => setActiveStep(3)}
          />
        )}

        {activeStep === 2 && (
          <DiagnosticQuizModal
            profile={activeProfile}
            onCompleteDiagnostic={handleCompleteDiagnostic}
            onSkipDiagnostic={handleSkipDiagnostic}
          />
        )}

        {activeStep === 3 && (
          <div className="flex flex-col gap-6">
            <RouteScreen
              profile={activeProfile}
              routeOptimizationMode={routeOptimizationMode}
              setRouteOptimizationMode={setRouteOptimizationMode}
              onSwitchToGraphView={() => setActiveStep(4)} // switches to graph or step 4
              onOpenProofModal={handleOpenProofModal}
              userState={userState}
              onUpdateResourceState={handleUpdateResourceState}
            />

            {/* In-page Completion Graph View section */}
            <section className="border-t border-outline-variant/40 pt-6">
              <CompletionGraph
                profile={activeProfile}
                graphViewMode={graphViewMode}
                setGraphViewMode={setGraphViewMode}
                onSelectNodeForProof={handleOpenProofModal}
                userState={userState}
              />
            </section>
          </div>
        )}

        {activeStep === 4 && (
          <CareerPackModal
            profile={activeProfile}
            userState={userState}
            onClose={() => setActiveStep(3)}
          />
        )}
      </main>

      {/* Floating Grounded Chat Button */}
      <button
        onClick={() => setIsChatDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-primary text-on-primary shadow-2xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer border border-white/20 group"
        title="Open Grounded Assistant (C15)"
      >
        <MessageSquare className="w-5 h-5 text-on-primary group-hover:rotate-12 transition-transform" />
      </button>

      {/* Modals & Drawers */}
      {isMarketPulseOpen && (
        <MarketPulseModal
          profile={activeProfile}
          onClose={() => setIsMarketPulseOpen(false)}
        />
      )}

      {isCalendarRePlanOpen && (
        <CalendarRePlanModal
          userState={userState}
          onClose={() => setIsCalendarRePlanOpen(false)}
          onApplyRePlan={handleApplyRePlan}
        />
      )}

      {isCareerPackOpen && (
        <CareerPackModal
          profile={activeProfile}
          userState={userState}
          onClose={() => setIsCareerPackOpen(false)}
        />
      )}

      {isProofModalOpen && (
        <ProofOfSkillModal
          resourceOrNode={proofTargetItem}
          onClose={() => setIsProofModalOpen(false)}
          onVerifySuccess={handleVerifySuccess}
        />
      )}

      <GroundedChatDrawer
        profile={activeProfile}
        userState={userState}
        isOpen={isChatDrawerOpen}
        onClose={() => setIsChatDrawerOpen(false)}
      />
    </div>
  );
}
