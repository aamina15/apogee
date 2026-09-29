import React, { useState } from 'react';
import { 
  Zap, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  BarChart2, 
  ShieldAlert,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export default function DiagnosticQuizModal({ 
  profile, 
  onCompleteDiagnostic, 
  onSkipDiagnostic 
}) {
  const diagnostics = profile.diagnostics || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [masteryVector, setMasteryVector] = useState({
    "PyTorch Tensor Ops": 20,
    "Probability & Statistics": 25,
    "Neural Networks": 10
  });

  const currentQ = diagnostics[currentIdx];

  const handleOptionSelect = (optionIdx) => {
    setSelectedOption(optionIdx);
    setShowExplanation(true);

    const isCorrect = optionIdx === currentQ.correctIndex;
    const impact = isCorrect ? currentQ.masteryImpact : -5;
    
    // Dynamically update mastery vector visually
    setMasteryVector((prev) => ({
      ...prev,
      [currentQ.skillName]: Math.min(100, Math.max(0, (prev[currentQ.skillName] || 20) + impact))
    }));

    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        selected: optionIdx,
        correct: isCorrect
      }
    }));
  };

  const handleNext = () => {
    setShowExplanation(false);
    setSelectedOption(null);

    if (currentIdx < diagnostics.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Diagnostic complete
      onCompleteDiagnostic(masteryVector);
    }
  };

  if (!currentQ) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-8 flex flex-col items-center justify-center text-center">
        <Sparkles className="w-12 h-12 text-tertiary mb-3 animate-bounce" />
        <h2 className="text-2xl font-bold text-on-surface">No Diagnostic Required for this Track</h2>
        <p className="text-sm text-on-surface-variant mt-2 max-w-md">Your prior claims for this profile satisfy the baseline requirements.</p>
        <button
          onClick={() => onCompleteDiagnostic(masteryVector)}
          className="mt-6 px-6 py-3 rounded-xl bg-primary text-on-primary font-bold"
        >
          Proceed to Phased Route & Graph
        </button>
      </div>
    );
  }

  const isLast = currentIdx === diagnostics.length - 1;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6">
      {/* Step 2 Progress Header */}
      <section className="w-full">
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-1.5 opacity-60">
            <div className="h-2 w-full rounded-full bg-primary" />
            <span className="text-xs text-on-surface-variant font-medium">1. Goal Intake</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="h-2 w-full rounded-full bg-secondary shadow-[0_0_12px_rgba(76,215,246,0.7)]" />
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-secondary text-on-secondary font-mono text-[10px] flex items-center justify-center font-bold">2</span>
              <span className="text-xs text-on-surface font-bold">Adaptive Diagnostic</span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 opacity-60">
            <div className="h-2 w-full rounded-full bg-surface-container-highest" />
            <span className="text-xs text-on-surface-variant font-medium">3. Phased Route</span>
          </div>
        </div>
      </section>

      {/* Main Diagnostic Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Question Card */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-secondary bg-secondary-container/30 border border-secondary/40 px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-secondary" />
                Question {currentIdx + 1} of {diagnostics.length}
              </span>
              <span className="text-xs text-on-surface-variant font-medium">
                Level: <strong className="text-primary">{currentQ.level}</strong>
              </span>
            </div>

            <button
              onClick={onSkipDiagnostic}
              className="text-xs text-outline hover:text-on-surface underline transition-colors"
              type="button"
            >
              Skip diagnostic (Widens confidence band)
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/60 shadow-xl flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-tertiary uppercase tracking-wider">
                Testing Skill: {currentQ.skillName}
              </span>
              <h3 className="text-lg font-bold text-on-surface font-headline-sm leading-snug">
                {currentQ.question}
              </h3>
            </div>

            {/* Answer Options */}
            <div className="flex flex-col gap-2.5">
              {currentQ.options.map((optionText, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const isCorrect = optIdx === currentQ.correctIndex;
                let btnStyle = "bg-surface-container-high hover:bg-surface-container-highest text-on-surface border-outline-variant/60";

                if (showExplanation) {
                  if (isCorrect) {
                    btnStyle = "bg-tertiary-container/50 text-on-tertiary-container border-tertiary font-semibold";
                  } else if (isSelected) {
                    btnStyle = "bg-error-container/40 text-on-error-container border-error font-semibold";
                  }
                } else if (isSelected) {
                  btnStyle = "bg-primary-container text-white border-indigo-400 font-semibold";
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => !showExplanation && handleOptionSelect(optIdx)}
                    disabled={showExplanation}
                    className={`w-full p-4 rounded-xl text-xs md:text-sm text-left transition-all border flex items-center justify-between gap-3 ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-surface-container-lowest text-on-surface-variant text-xs font-mono font-bold flex items-center justify-center border border-outline-variant/40 shrink-0">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{optionText}</span>
                    </div>

                    {showExplanation && isCorrect && <CheckCircle2 className="w-5 h-5 text-tertiary shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {showExplanation && (
              <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/50 flex flex-col gap-2 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-xs text-secondary">
                  <Sparkles className="w-4 h-4" />
                  Explanation & Rationale:
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {currentQ.explanation}
                </p>
                <div className="text-[11px] text-tertiary font-mono">
                  Mastery Delta Applied: +{currentQ.masteryImpact}% vector adjustment
                </div>
              </div>
            )}

            {/* Bottom action button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                disabled={!showExplanation}
                className={`px-6 py-3 rounded-xl font-bold text-xs md:text-sm flex items-center gap-2 transition-all ${
                  showExplanation
                    ? 'bg-primary text-on-primary hover:bg-primary/90 cursor-pointer shadow-lg shadow-indigo-900/30'
                    : 'bg-surface-container-highest text-outline cursor-not-allowed'
                }`}
              >
                <span>{isLast ? "Complete Diagnostic & Build Map" : "Next Diagnostic Question"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Live Vector Telemetry & Confidence Band */}
        <div className="flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/60 shadow-lg flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-secondary" />
                Live Mastery Vector
              </span>
              <span className="text-[10px] font-bold text-secondary bg-secondary-container/20 px-2 py-0.5 rounded">
                REAL-TIME
              </span>
            </div>

            <p className="text-xs text-on-surface-variant">
              As you answer diagnostic items, your mastery vector updates dynamically, narrowing the confidence band.
            </p>

            <div className="flex flex-col gap-3">
              {Object.entries(masteryVector).map(([skillName, score]) => (
                <div key={skillName} className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-on-surface">{skillName}</span>
                    <span className="font-mono text-tertiary font-bold">{score}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-surface-container-lowest overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-secondary to-tertiary transition-all duration-500 rounded-full"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Readiness Band preview */}
            <div className="p-3.5 rounded-xl bg-surface-container-high border border-outline-variant/40 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-on-surface-variant">Readiness Confidence Band</span>
                <span className="text-secondary font-mono">68% – 76%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-surface-container-lowest relative overflow-hidden">
                <div 
                  className="absolute top-0 bottom-0 bg-secondary/30 border-x border-secondary rounded"
                  style={{ left: '68%', right: '24%' }}
                />
              </div>
              <span className="text-[10px] text-outline">
                Diagnostic input narrows uncertainty from ±12% down to ±4%.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
