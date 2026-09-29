import React, { useState } from 'react';
import { 
  Calendar, 
  X, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  AlertTriangle,
  FileText,
  ChevronRight
} from 'lucide-react';

export default function CalendarRePlanModal({ 
  userState, 
  onClose,
  onApplyRePlan
}) {
  const [hasSimulatedMissed, setHasSimulatedMissed] = useState(false);
  const [isRePlanning, setIsRePlanning] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const handleSimulateMissed = () => {
    setIsRePlanning(true);
    setTimeout(() => {
      setIsRePlanning(false);
      setHasSimulatedMissed(true);
      setReceipt({
        id: "rc-live",
        timestamp: "Just Now",
        trigger: "Missed 2 Sessions (5.0 hours behind)",
        change: "Re-allocated 5.0 hours smoothly across weeks 3–5 (+1.25 hrs/week). Zero guilt adjustment applied.",
        reasonCodes: ["ZERO_GUILT_RE_PLAN", "HOUR_BUDGET_PRESERVED", "PREREQUISITE_ORDER_MAINTAINED"]
      });
    }, 1200);
  };

  const handleApplyReceipt = () => {
    onApplyRePlan(receipt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-surface-container border border-outline-variant/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 bg-surface-container-high border-b border-outline-variant/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-tertiary-container/40 text-tertiary flex items-center justify-center border border-tertiary/40">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface font-headline-sm">Calendar Sync & Smart Re-Plan Engine (N4)</h3>
              <p className="text-xs text-on-surface-variant">Absorbs life disruptions smoothly without guilt spirals or broken streaks</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-highest">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex flex-col gap-5">
          {/* Calendar Schedule Grid Preview */}
          <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/40 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-on-surface flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-secondary" />
                This Week's Learning Sessions (Google Calendar Synced)
              </span>
              <span className="text-tertiary font-mono">10 hrs budget</span>
            </div>

            <div className="grid grid-cols-5 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-tertiary-container/20 border border-tertiary/30 text-tertiary font-semibold">
                Mon (2h)
                <div className="text-[10px] opacity-80 mt-0.5">Done ✓</div>
              </div>
              <div className="p-2.5 rounded-lg bg-tertiary-container/20 border border-tertiary/30 text-tertiary font-semibold">
                Tue (2h)
                <div className="text-[10px] opacity-80 mt-0.5">Done ✓</div>
              </div>
              <div className={`p-2.5 rounded-lg border font-semibold ${hasSimulatedMissed ? 'bg-rose-950/40 border-rose-500/50 text-rose-300' : 'bg-surface-container-high border-outline-variant/40 text-on-surface'}`}>
                Wed (2.5h)
                <div className="text-[10px] opacity-80 mt-0.5">{hasSimulatedMissed ? 'Missed ✖' : 'Scheduled'}</div>
              </div>
              <div className={`p-2.5 rounded-lg border font-semibold ${hasSimulatedMissed ? 'bg-rose-950/40 border-rose-500/50 text-rose-300' : 'bg-surface-container-high border-outline-variant/40 text-on-surface'}`}>
                Thu (2.5h)
                <div className="text-[10px] opacity-80 mt-0.5">{hasSimulatedMissed ? 'Missed ✖' : 'Scheduled'}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-high border border-outline-variant/40 text-on-surface font-semibold">
                Sat (1h)
                <div className="text-[10px] opacity-80 mt-0.5">Scheduled</div>
              </div>
            </div>
          </div>

          {!hasSimulatedMissed ? (
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-xl bg-surface-container-high border border-outline-variant/40 text-xs text-on-surface-variant leading-relaxed">
                <strong>No guilt framing:</strong> Apogee has no streak counters or pressure mechanisms. If work or life causes you to miss sessions, the planner absorbs it automatically.
              </div>

              <button
                onClick={handleSimulateMissed}
                disabled={isRePlanning}
                className="w-full py-3.5 px-4 rounded-xl bg-secondary-container/40 text-secondary border border-secondary/50 font-bold text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-secondary-container/60 transition-all cursor-pointer"
              >
                {isRePlanning ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin text-secondary" />
                    <span>Re-balancing Route Hours & Phase Schedules...</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4" />
                    <span>Simulate Missed 2 Sessions & Trigger Smart Re-Plan</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Route Change Receipt Output C12 */
            <div className="flex flex-col gap-4 animate-fadeIn">
              <div className="p-4 rounded-xl bg-tertiary-container/30 border border-tertiary/40 flex flex-col gap-2">
                <div className="flex items-center gap-2 font-bold text-sm text-tertiary">
                  <CheckCircle2 className="w-5 h-5" />
                  Route Change Receipt Emitted (C12)
                </div>
                <p className="text-xs text-on-surface leading-relaxed">
                  {receipt.change}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-outline uppercase tracking-wider">Receipt Reason Codes:</span>
                <div className="flex flex-wrap gap-1.5">
                  {receipt.reasonCodes.map((rc, i) => (
                    <span key={i} className="text-[11px] font-mono px-2.5 py-1 rounded bg-surface-container-high text-on-surface border border-outline-variant/40">
                      {rc}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={handleApplyReceipt}
                className="w-full py-3.5 px-4 rounded-xl bg-primary text-on-primary font-bold text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-all cursor-pointer shadow-lg"
              >
                <span>Apply Re-Plan & Save Calendar Schedule</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
