import React, { useState } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  HelpCircle, 
  Layers, 
  Info, 
  Lock, 
  Play, 
  Award, 
  Sliders, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  Search,
  Filter,
  Check,
  RotateCcw
} from 'lucide-react';

export default function RouteScreen({ 
  profile, 
  routeOptimizationMode, 
  setRouteOptimizationMode, 
  onSwitchToGraphView, 
  onOpenProofModal,
  userState,
  onUpdateResourceState
}) {
  const [expandedReasonId, setExpandedReasonId] = useState(null);
  const [filterType, setFilterType] = useState('all'); // all, pending, verified

  const toggleReasonExpand = (rid) => {
    setExpandedReasonId(expandedReasonId === rid ? null : rid);
  };

  const handleOpenCourseLink = (resource) => {
    // Record 'Opened' state per C19
    if (resource.completionState === 'Unread') {
      onUpdateResourceState(resource.id, 'Opened');
    }
    window.open(resource.url, '_blank', 'noopener,noreferrer');
  };

  const handleToggleCompleted = (resource) => {
    // Toggle between Opened/Unread and Self-marked Completed
    if (resource.completionState === 'Completed') {
      onUpdateResourceState(resource.id, 'Opened');
    } else {
      onUpdateResourceState(resource.id, 'Completed');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 flex flex-col gap-6">
      {/* Top Telemetry Header & Navigation Controls */}
      <div className="w-full rounded-2xl bg-surface-container border border-outline-variant/60 p-5 shadow-xl flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-outline-variant/40">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-on-surface font-headline-md">{profile.role} Phased Route</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-tertiary-container/30 text-tertiary border border-tertiary/30 font-bold">
                PREREQUISITE LOCKED
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-1">
              Phased greedy set-cover route optimized against your 10 hrs/week budget and live market demand.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onSwitchToGraphView}
              className="px-4 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs flex items-center gap-2 hover:bg-primary/90 transition-all shadow-md shadow-indigo-900/30 cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>Open Skill Completion Graph (C18)</span>
            </button>
          </div>
        </div>

        {/* FR11 Single Source of Truth Telemetry Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-surface-container-high border border-outline-variant/40 flex flex-col gap-0.5">
            <span className="text-[11px] text-outline font-semibold uppercase">Hours Progress</span>
            <div className="text-lg font-bold text-on-surface font-mono">
              {userState.hoursCompleted} <span className="text-xs text-outline font-normal">/ {userState.hoursTotal} hrs</span>
            </div>
            <span className="text-[10px] text-tertiary font-medium">{userState.hoursTotal - userState.hoursCompleted} hrs remaining</span>
          </div>

          <div className="p-3 rounded-xl bg-surface-container-high border border-outline-variant/40 flex flex-col gap-0.5">
            <span className="text-[11px] text-outline font-semibold uppercase">Weeks Horizon</span>
            <div className="text-lg font-bold text-on-surface font-mono">
              {userState.weeksRemaining} <span className="text-xs text-outline font-normal">weeks</span>
            </div>
            <span className="text-[10px] text-secondary font-medium">ETA: {userState.targetEta}</span>
          </div>

          <div className="p-3 rounded-xl bg-surface-container-high border border-outline-variant/40 flex flex-col gap-0.5">
            <span className="text-[11px] text-outline font-semibold uppercase">Readiness Band (N6)</span>
            <div className="text-lg font-bold text-secondary font-mono">
              {userState.readinessBand.min}% – {userState.readinessBand.max}%
            </div>
            <span className="text-[10px] text-outline">±4% Uncertainty range</span>
          </div>

          <div className="p-3 rounded-xl bg-surface-container-high border border-outline-variant/40 flex flex-col gap-0.5">
            <span className="text-[11px] text-outline font-semibold uppercase">Prerequisite Violations</span>
            <div className="text-lg font-bold text-tertiary font-mono">
              0 <span className="text-xs text-tertiary font-normal">Violations</span>
            </div>
            <span className="text-[10px] text-tertiary font-medium">FR1 Verified Strict</span>
          </div>
        </div>

        {/* Route Optimization Mode Switcher (PRD Question 5) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-secondary" />
            <span className="text-xs font-bold text-on-surface uppercase tracking-wide">Route Optimization Mode:</span>
          </div>

          <div className="flex items-center gap-1.5 bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/50">
            {[
              { id: 'Balanced', label: 'Balanced (Default)', desc: 'Optimal phase spread' },
              { id: 'Fast', label: 'Fast Track', desc: 'Fewer, longer resources' },
              { id: 'Deep', label: 'Deep Mastery', desc: 'Extra practice items' }
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setRouteOptimizationMode(mode.id)}
                type="button"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  routeOptimizationMode === mode.id
                    ? 'bg-primary-container text-white border border-indigo-400 shadow'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60'
                }`}
                title={mode.desc}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Phased Route Timeline */}
      <div className="flex flex-col gap-6">
        {profile.phases.map((phase) => (
          <div key={phase.id} className="flex flex-col gap-4">
            {/* Phase Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-outline-variant/50">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-primary-container text-white font-bold text-sm flex items-center justify-center border border-indigo-400/40">
                  P{phase.phaseNum}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-on-surface font-headline-sm">{phase.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-on-surface-variant mt-0.5">
                    <span>{phase.durationWeeks} Weeks</span>
                    <span>•</span>
                    <span>{phase.hoursTotal} Hours Total</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {phase.skillCoverage.map((sc, i) => (
                  <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-md bg-surface-container-highest text-on-surface-variant font-medium">
                    {sc}
                  </span>
                ))}
              </div>
            </div>

            {/* Resources List in Phase */}
            <div className="flex flex-col gap-4">
              {phase.resources.map((res) => {
                const isExpanded = expandedReasonId === res.id;
                const state = res.completionState; // Verified, Completed, Opened, Unread

                return (
                  <div 
                    key={res.id}
                    className={`rounded-2xl border transition-all shadow-md ${
                      state === 'Verified'
                        ? 'bg-surface-container/90 border-tertiary/40'
                        : state === 'Completed'
                        ? 'bg-surface-container/90 border-secondary/40'
                        : 'bg-surface-container border-outline-variant/60'
                    }`}
                  >
                    <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Left info */}
                      <div className="flex flex-col gap-2 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-secondary bg-secondary-container/20 px-2.5 py-0.5 rounded border border-secondary/30">
                            {res.provider}
                          </span>
                          <span className="text-xs text-outline flex items-center gap-1">
                            <Clock className="w-3 h-3 text-outline" /> {res.duration}
                          </span>
                          <span className="text-xs text-outline">{res.format}</span>

                          {/* Trust Score Badge N5 */}
                          <span className="text-xs font-mono font-bold text-tertiary bg-tertiary-container/30 px-2 py-0.5 rounded border border-tertiary/30 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> Trust Score: {res.trustScore.overall}/100
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-on-surface hover:text-primary transition-colors cursor-pointer" onClick={() => handleOpenCourseLink(res)}>
                          {res.title}
                        </h4>

                        <div className="text-xs text-on-surface-variant flex items-center gap-2">
                          <span>Target Skill: <strong className="text-primary font-semibold">{res.targetSkillName}</strong></span>
                        </div>
                      </div>

                      {/* Right Actions & Completion States (FR4 & C19) */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        {/* Course Launch Button C19 */}
                        <button
                          onClick={() => handleOpenCourseLink(res)}
                          className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/60 text-on-surface font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                          title="Open course material in new tab (Records Opened state)"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-secondary" />
                          <span>Open Course</span>
                          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" title="Link Health: 100% Active" />
                        </button>

                        {/* Self Mark Completed */}
                        <button
                          onClick={() => handleToggleCompleted(res)}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
                            state === 'Completed' || state === 'Verified'
                              ? 'bg-secondary-container/30 text-secondary border-secondary/40'
                              : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant border-outline-variant/50'
                          }`}
                          title="Self-mark completed"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{state === 'Completed' || state === 'Verified' ? 'Completed (Self)' : 'Mark Done'}</span>
                        </button>

                        {/* Proof of Skill / Quiz Button (FR10 Unlock Rule) */}
                        <button
                          onClick={() => onOpenProofModal(res)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow ${
                            state === 'Verified'
                              ? 'bg-tertiary text-on-tertiary border border-tertiary-fixed'
                              : 'bg-primary-container text-white hover:bg-indigo-600 border border-indigo-400/40'
                          }`}
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>{state === 'Verified' ? 'Verified (Passed)' : 'Verify Mastery'}</span>
                        </button>

                        {/* Why/Why-not toggle */}
                        <button
                          onClick={() => toggleReasonExpand(res.id)}
                          className="p-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/50 text-on-surface-variant text-xs flex items-center justify-center"
                          title="View 100% Explainability & Counterfactual Rationale"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* FR10 Unlock Rule Warning notice */}
                    {state === 'Completed' && (
                      <div className="px-5 py-2 bg-amber-950/30 border-t border-amber-500/30 text-[11px] text-amber-300 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span><strong>FR10 Unlock Rule:</strong> Self-marking "Completed" shows progress, but ONLY "Verified" unlocks downstream prerequisites.</span>
                        </div>
                        <button onClick={() => onOpenProofModal(res)} className="font-bold underline text-amber-200">
                          Verify now →
                        </button>
                      </div>
                    )}

                    {/* Expandable Explainer Drawer C10 & C11 */}
                    {isExpanded && (
                      <div className="p-5 bg-surface-container-lowest/90 border-t border-outline-variant/50 rounded-b-2xl flex flex-col gap-4 animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Reason Codes */}
                          <div className="flex flex-col gap-2">
                            <span className="text-xs font-bold text-secondary flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" /> Emitted Reason Codes (Why Chosen):
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {res.reasonCodes.map((rc, idx) => (
                                <span key={idx} className="text-[11px] font-mono px-2.5 py-1 rounded bg-surface-container-high text-on-surface border border-outline-variant/40">
                                  {rc}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Trust Score Breakdown */}
                          <div className="flex flex-col gap-2">
                            <span className="text-xs font-bold text-tertiary flex items-center gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5" /> Resource Trust Score Audit (N5):
                            </span>
                            <div className="grid grid-cols-2 gap-2 text-[11px]">
                              <div className="p-2 rounded bg-surface-container-high border border-outline-variant/40">
                                <span className="text-outline">Link Health:</span> <strong className="text-tertiary">{res.trustScore.linkHealth}</strong>
                              </div>
                              <div className="p-2 rounded bg-surface-container-high border border-outline-variant/40">
                                <span className="text-outline">Recency:</span> <strong className="text-on-surface">{res.trustScore.recency}</strong>
                              </div>
                              <div className="p-2 rounded bg-surface-container-high border border-outline-variant/40">
                                <span className="text-outline">Authority:</span> <strong className="text-secondary">{res.trustScore.authority}</strong>
                              </div>
                              <div className="p-2 rounded bg-surface-container-high border border-outline-variant/40">
                                <span className="text-outline">Cross-Source:</span> <strong className="text-on-surface">{res.trustScore.crossSource}</strong>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Why-Not Counterfactual C11 */}
                        <div className="p-3 rounded-xl bg-surface-container-high/60 border border-outline-variant/40 text-xs">
                          <span className="font-bold text-primary">Why-Not Counterfactual Rationale: </span>
                          <span className="text-on-surface-variant">{res.counterfactual}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
