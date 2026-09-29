import React, { useState } from 'react';
import { 
  Award, 
  X, 
  GitBranch, 
  Link, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Cpu,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProofOfSkillModal({ 
  resourceOrNode, 
  onClose, 
  onVerifySuccess 
}) {
  const [evidenceType, setEvidenceType] = useState('github'); // github, url, summary
  const [evidenceInput, setEvidenceInput] = useState('https://github.com/aamina-hasan/pytorch-autograd-engine');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState(null);

  const skillName = resourceOrNode?.targetSkillName || resourceOrNode?.label || "PyTorch Tensor Operations";

  const handleEvaluate = (e) => {
    e.preventDefault();
    setIsEvaluating(true);

    setTimeout(() => {
      setIsEvaluating(false);
      const result = {
        overallScore: 94,
        status: "VERIFIED",
        criteria: [
          { name: "Tensor Shape Correctness", score: "30/30", comment: "Broadcast rules & stride manipulation verified." },
          { name: "Backward Pass Computation", score: "38/40", comment: "Autograd graph backprop gradients exact match." },
          { name: "Vectorization & Memory", score: "18/20", comment: "In-place ops used cleanly." },
          { name: "Code Cleanliness", score: "8/10", comment: "Well documented with inline docstrings." }
        ]
      };

      setEvalResult(result);

      // Trigger celebration confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Fallback
      }
    }, 1500);
  };

  const handleConfirmVerification = () => {
    onVerifySuccess(resourceOrNode);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-surface-container border border-outline-variant/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 bg-surface-container-high border-b border-outline-variant/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-tertiary-container/40 text-tertiary flex items-center justify-center border border-tertiary/40">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface font-headline-sm">Proof of Skill & AI Rubric Evaluator</h3>
              <p className="text-xs text-on-surface-variant">Submit evidence to verify mastery & unlock downstream skills (FR10)</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-highest">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex flex-col gap-5">
          {!evalResult ? (
            <form onSubmit={handleEvaluate} className="flex flex-col gap-4">
              <div className="p-3.5 rounded-xl bg-surface-container-high border border-outline-variant/40 flex flex-col gap-1">
                <span className="text-[11px] font-bold text-tertiary uppercase tracking-wider">Target Skill Checkpoint:</span>
                <span className="text-sm font-bold text-on-surface">{skillName}</span>
              </div>

              {/* Evidence Type Switcher */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-outline uppercase tracking-wider">Select Evidence Format:</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'github', label: 'GitHub Repo', icon: GitBranch },
                    { id: 'url', label: 'Deployed URL', icon: Link },
                    { id: 'summary', label: 'Code Summary', icon: FileText }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setEvidenceType(item.id)}
                        className={`p-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                          evidenceType === item.id
                            ? 'bg-primary-container text-white border-indigo-400'
                            : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant border-outline-variant/50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Evidence Input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface">Provide Evidence Link or Repository:</label>
                <input
                  type="text"
                  value={evidenceInput}
                  onChange={(e) => setEvidenceInput(e.target.value)}
                  placeholder="https://github.com/username/project"
                  className="w-full p-3 rounded-xl bg-surface-container-lowest text-on-surface text-xs font-mono border border-outline-variant/60 focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              {/* Rubric Criteria Preview */}
              <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/40 flex flex-col gap-2">
                <span className="text-xs font-bold text-secondary flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Evaluation Rubric Criteria (N2):
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-on-surface-variant">
                  <div className="p-2 rounded bg-surface-container-high">• Tensor Shape Correctness (30%)</div>
                  <div className="p-2 rounded bg-surface-container-high">• Backward Pass Computation (40%)</div>
                  <div className="p-2 rounded bg-surface-container-high">• Vectorization & Memory (20%)</div>
                  <div className="p-2 rounded bg-surface-container-high">• Code Cleanliness (10%)</div>
                </div>
              </div>

              {/* Action Submit Button */}
              <button
                type="submit"
                disabled={isEvaluating}
                className="w-full py-3.5 px-4 rounded-xl bg-tertiary text-on-tertiary font-bold text-sm flex items-center justify-center gap-2 hover:bg-tertiary/90 transition-all shadow-lg cursor-pointer"
              >
                {isEvaluating ? (
                  <>
                    <Cpu className="w-5 h-5 animate-spin text-on-tertiary" />
                    <span>AI Evaluator Scoring Rubric Criteria...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Evaluate & Verify Competency</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Evaluator Results Card */
            <div className="flex flex-col gap-5 animate-fadeIn">
              <div className="p-4 rounded-xl bg-tertiary-container/30 border border-tertiary/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-tertiary" />
                  <div>
                    <h4 className="text-base font-bold text-on-surface">Competency Verified!</h4>
                    <p className="text-xs text-on-surface-variant">Passed rubric with high score. Verified badge issued.</p>
                  </div>
                </div>

                <div className="text-2xl font-bold font-mono text-tertiary">
                  {evalResult.overallScore}<span className="text-xs text-outline font-normal">/100</span>
                </div>
              </div>

              {/* Criteria score details */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-outline uppercase tracking-wider">Rubric Feedback Breakdown:</span>
                <div className="flex flex-col gap-2">
                  {evalResult.criteria.map((c, i) => (
                    <div key={i} className="p-3 rounded-xl bg-surface-container-high border border-outline-variant/40 flex justify-between items-start text-xs">
                      <div>
                        <strong className="text-on-surface">{c.name}</strong>
                        <p className="text-on-surface-variant mt-0.5 text-[11px]">{c.comment}</p>
                      </div>
                      <span className="font-mono font-bold text-tertiary text-xs">{c.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleConfirmVerification}
                className="w-full py-3.5 px-4 rounded-xl bg-primary text-on-primary font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-all cursor-pointer shadow-lg"
              >
                <span>Apply Verification to Profile & Unlock Graph</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
