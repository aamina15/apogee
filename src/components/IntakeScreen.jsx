import React, { useState } from 'react';
import { 
  Sparkles, 
  Route, 
  Database, 
  Code2, 
  Edit3, 
  Check, 
  Clock, 
  Calendar, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  DollarSign, 
  BookOpen, 
  Globe, 
  RotateCcw,
  Zap,
  Target,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { MISSION_PROFILES } from '../data/mockData';

export default function IntakeScreen({ 
  currentProfile, 
  onSelectProfile, 
  onStartDiagnostic, 
  onExploreDemoRoute 
}) {
  const [promptText, setPromptText] = useState(currentProfile.prompt);
  const [isParsing, setIsParsing] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState(currentProfile.format);
  const [selectedLanguage, setSelectedLanguage] = useState(currentProfile.language);
  const [selectedBudget, setSelectedBudget] = useState(currentProfile.budgetType);
  const [budgetCapInput, setBudgetCapInput] = useState(currentProfile.budgetCap || 50);

  const handleProfileChipClick = (profile) => {
    onSelectProfile(profile.id);
    setPromptText(profile.prompt);
    setSelectedFormat(profile.format);
    setSelectedLanguage(profile.language);
    setSelectedBudget(profile.budgetType);
    setBudgetCapInput(profile.budgetCap || 0);
    setIsParsing(true);
    setTimeout(() => setIsParsing(false), 400);
  };

  const handlePromptChange = (e) => {
    setPromptText(e.target.value);
    setIsParsing(true);
    setTimeout(() => setIsParsing(false), 500);
  };

  const handleReset = () => {
    setPromptText(currentProfile.prompt);
    setIsParsing(true);
    setTimeout(() => setIsParsing(false), 300);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 flex flex-col gap-6 relative">
      {/* Background ambient glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-container/20 blur-3xl pointer-events-none rounded-full -z-10" />
      <div className="absolute top-80 right-10 w-64 h-64 bg-secondary/10 blur-3xl pointer-events-none rounded-full -z-10" />

      {/* Progress Bar Header */}
      <section className="w-full">
        <div className="grid grid-cols-3 gap-3">
          {/* Step 1: Active */}
          <div className="flex flex-col gap-1.5">
            <div className="h-2 w-full rounded-full bg-primary shadow-[0_0_12px_rgba(79,70,229,0.7)]" />
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-primary text-on-primary font-mono text-[10px] flex items-center justify-center font-bold">1</span>
              <span className="text-xs text-on-surface font-bold">Goal Intake</span>
            </div>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col gap-1.5 opacity-60">
            <div className="h-2 w-full rounded-full bg-surface-container-highest" />
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-surface-container-highest text-on-surface-variant font-mono text-[10px] flex items-center justify-center font-medium">2</span>
              <span className="text-xs text-on-surface-variant font-medium">Diagnostic</span>
            </div>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col gap-1.5 opacity-60">
            <div className="h-2 w-full rounded-full bg-surface-container-highest" />
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-surface-container-highest text-on-surface-variant font-mono text-[10px] flex items-center justify-center font-medium">3</span>
              <span className="text-xs text-on-surface-variant font-medium">Phased Route</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="w-full flex flex-col gap-2">
        <h1 className="text-2xl md:text-4xl font-headline-xl font-bold tracking-tight text-on-surface">
          Turn ambition into an{' '}
          <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
            evidence-backed
          </span>{' '}
          learning route.
        </h1>
        <p className="text-sm md:text-base text-on-surface-variant leading-relaxed max-w-3xl">
          APOGEE diagnoses your capabilities, eliminates bottleneck prerequisites, and navigates you to career mastery using live market data and verified evidence.
        </p>
      </section>

      {/* Popular Mission Profiles Chips */}
      <section className="w-full flex flex-col gap-2">
        <span className="text-[11px] font-bold text-outline uppercase tracking-wider flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-secondary" />
          Popular Preset Mission Profiles
        </span>
        <div className="flex flex-wrap gap-2">
          {MISSION_PROFILES.map((profile) => {
            const isSelected = profile.id === currentProfile.id;
            return (
              <button
                key={profile.id}
                onClick={() => handleProfileChipClick(profile)}
                type="button"
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all border ${
                  isSelected
                    ? 'bg-primary-container text-white border-indigo-400 shadow-md shadow-indigo-900/40'
                    : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface border-outline-variant/60'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-secondary animate-pulse' : 'bg-outline'}`} />
                <span>{profile.title}</span>
                <span className="text-[10px] opacity-75 font-normal">({profile.track})</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Natural Language Goal Intake TextArea */}
      <section className="w-full flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label htmlFor="promptInput" className="text-sm font-semibold text-on-surface flex items-center gap-2">
            <Cpu className="w-4 h-4 text-secondary" />
            Describe your destination in plain English:
          </label>
          <button
            onClick={handleReset}
            className="text-xs text-secondary hover:underline flex items-center gap-1 transition-colors"
            type="button"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>

        <div className="relative w-full rounded-2xl bg-surface-container-high/90 border border-outline-variant/60 p-4 shadow-lg flex flex-col gap-3">
          <textarea
            id="promptInput"
            value={promptText}
            onChange={handlePromptChange}
            rows={4}
            className="w-full bg-surface-container-lowest text-on-surface text-sm rounded-xl p-3 resize-none focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/50 placeholder-on-surface-variant/70 leading-relaxed font-body-md"
            placeholder="e.g. I want to become an ML Engineer specializing in computer vision. I can spend 10 hours per week and want to be job-ready in 6 months."
          />

          {/* AI Telemetry Status pill */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-outline-variant/30">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isParsing ? 'bg-amber-400' : 'bg-secondary'} opacity-75`} />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isParsing ? 'bg-amber-400' : 'bg-secondary'}`} />
              </span>
              <span className="text-xs font-semibold text-secondary tracking-wide">
                {isParsing ? 'AI Synthesizing Target Profile...' : 'Synthesis Complete & Calibrated'}
              </span>
            </div>
            <div className="text-[11px] text-on-surface-variant flex items-center gap-1">
              <span>Reads goal</span>
              <span>→</span>
              <span>Searches live web</span>
              <span>→</span>
              <span>Strict hour budget</span>
            </div>
          </div>
        </div>
      </section>

      {/* Extracted Target Profile Card (Editable & Interactive) */}
      <section className="w-full flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-tertiary" />
            Extracted Target Profile Telemetry
          </span>
          <span className="text-[10px] font-bold text-tertiary bg-tertiary-container/30 border border-tertiary/40 px-2.5 py-0.5 rounded-full uppercase">
            CALIBRATED
          </span>
        </div>

        <div className="w-full rounded-2xl bg-surface-container border border-outline-variant/60 p-5 shadow-lg flex flex-col gap-5">
          {/* Target Role & Specialization */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-outline-variant/40">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-primary font-headline-md">{currentProfile.role}</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-primary-container text-white font-semibold">
                  {currentProfile.track}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">{currentProfile.spec}</p>
            </div>
            <button className="text-xs text-secondary hover:underline flex items-center gap-1 self-start sm:self-center" type="button">
              <Edit3 className="w-3 h-3" /> Edit Trajectory
            </button>
          </div>

          {/* Telemetry Grid (Commitment & Horizon) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-surface-container-high border border-outline-variant/40 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-on-surface-variant text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5 text-secondary" />
                  <span>WEEKLY COMMITMENT</span>
                </div>
                <button className="text-[11px] text-secondary hover:underline" type="button">Edit</button>
              </div>
              <div className="text-xl font-bold text-on-surface mt-1">
                {currentProfile.commitment} hrs<span className="text-xs font-normal text-outline">/week</span>
              </div>
              <span className="text-[11px] text-tertiary font-medium">Sustainable workload budget</span>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-high border border-outline-variant/40 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-on-surface-variant text-xs font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-secondary" />
                  <span>TARGET HORIZON</span>
                </div>
                <button className="text-[11px] text-secondary hover:underline" type="button">Edit</button>
              </div>
              <div className="text-xl font-bold text-on-surface mt-1">
                {currentProfile.horizon} Months
              </div>
              <span className="text-[11px] text-secondary font-medium">{currentProfile.sprints} Phased Sprints planned</span>
            </div>
          </div>

          {/* Detected Baseline Skills */}
          <div className="flex flex-col gap-2 pb-3 border-b border-outline-variant/40">
            <span className="text-xs font-bold text-outline uppercase tracking-wider">Detected Baseline Claims</span>
            <div className="flex flex-wrap gap-2">
              {currentProfile.baselines.map((b, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-highest text-on-surface text-xs border border-outline-variant/50"
                >
                  <span className="w-2 h-2 rounded-full bg-tertiary" />
                  <span className="font-semibold">{b.name}</span>
                  <span className="text-outline text-[11px]">({b.level})</span>
                </span>
              ))}
            </div>
          </div>

          {/* Selectable Format, Language & Budget Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Preferred Format */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-secondary" /> Format Preference
              </span>
              <div className="flex flex-col gap-1.5">
                {["Video + Code", "Reading First", "Interactive Labs"].map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    type="button"
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium text-left transition-colors border ${
                      selectedFormat === fmt
                        ? 'bg-primary-container text-white border-indigo-400'
                        : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant border-outline-variant/50'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Preference */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-secondary" /> Resource Language
              </span>
              <div className="flex flex-col gap-1.5">
                {["English", "Hindi", "Spanish"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    type="button"
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium text-left transition-colors border ${
                      selectedLanguage === lang
                        ? 'bg-primary-container text-white border-indigo-400'
                        : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant border-outline-variant/50'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Resource Budget Filter */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-tertiary" /> Resource Budget
              </span>
              <div className="flex flex-col gap-1.5">
                {[
                  { id: "Free only", label: "Free only (₹0)", sub: "100% open access" },
                  { id: "Freemium", label: "Freemium", sub: "Free to learn, optional cert" },
                  { id: "Paid fine", label: "Paid fine", sub: `Max ₹${budgetCapInput}/mo` }
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBudget(b.id)}
                    type="button"
                    className={`p-2 rounded-lg text-xs text-left transition-colors border flex items-center justify-between ${
                      selectedBudget === b.id
                        ? 'bg-tertiary-container/40 text-on-tertiary-container border-tertiary'
                        : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant border-outline-variant/50'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{b.label}</div>
                      <div className="text-[10px] opacity-80">{b.sub}</div>
                    </div>
                    {selectedBudget === b.id && <Check className="w-4 h-4 text-tertiary" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Primary Bottleneck Notice */}
          <div className="p-3.5 rounded-xl bg-surface-container-lowest border-l-4 border-error border-y border-r border-outline-variant/40 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-error uppercase tracking-wide flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Primary Bottleneck Identified
              </span>
            </div>
            <p className="text-sm font-medium text-on-surface leading-snug">
              {currentProfile.bottleneck}
            </p>
          </div>
        </div>
      </section>

      {/* Main CTAs */}
      <div className="w-full flex flex-col items-center gap-3 my-2">
        <button
          onClick={onStartDiagnostic}
          type="button"
          className="w-full py-4 px-6 rounded-2xl bg-[#4f46e5] hover:bg-[#4338ca] text-white text-base font-bold shadow-[0_4px_24px_rgba(79,70,229,0.4)] transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer border border-indigo-400/30 group"
        >
          <Zap className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
          <span>Build My Capability Map (4 min diagnostic)</span>
        </button>

        <button
          onClick={onExploreDemoRoute}
          type="button"
          className="text-sm text-secondary hover:text-secondary-fixed transition-colors font-semibold flex items-center gap-1.5 py-1"
        >
          <span>Explore Live Demo Phased Route & Skill DAG</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Footer Proof Points */}
      <footer className="w-full flex flex-col items-center gap-2 pt-4 border-t border-outline-variant/30 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-high border border-outline-variant/50 text-xs font-semibold text-on-surface">
            <ShieldCheck className="w-4 h-4 text-tertiary" />
            <span>Prerequisite-locked</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-high border border-outline-variant/50 text-xs font-semibold text-on-surface">
            <CheckCircle2 className="w-4 h-4 text-secondary" />
            <span>Budget-safe</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-high border border-outline-variant/50 text-xs font-semibold text-on-surface">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>100% Explainable</span>
          </div>
        </div>
        <p className="text-[11px] text-outline mt-1">
          APOGEE cognitive telemetry updates autonomously with verified competency outputs. Zero unbacked claims.
        </p>
      </footer>
    </div>
  );
}
