import React, { useState } from 'react';
import { 
  Layers, 
  Lock, 
  CheckCircle2, 
  Zap, 
  Clock, 
  AlertCircle, 
  ShieldCheck, 
  ArrowRight, 
  Info, 
  Award, 
  RotateCcw,
  Check,
  Search,
  Sliders,
  ExternalLink
} from 'lucide-react';

export default function CompletionGraph({ 
  profile, 
  graphViewMode, 
  setGraphViewMode, 
  onSelectNodeForProof,
  userState
}) {
  const [selectedNodeId, setSelectedNodeId] = useState("s4"); // Default selected PyTorch
  const nodes = profile.skillNodes || [];

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  // Derive node status color helpers
  const getStatusColor = (status) => {
    switch (status) {
      case 'Verified':
        return { bg: 'bg-tertiary-container/30', border: 'border-tertiary', text: 'text-tertiary', stroke: '#4edea3', fill: 'rgba(78, 222, 163, 0.15)' };
      case 'Completed':
        return { bg: 'bg-secondary-container/30', border: 'border-secondary', text: 'text-secondary', stroke: '#4cd7f6', fill: 'rgba(76, 215, 246, 0.15)' };
      case 'In Progress':
        return { bg: 'bg-amber-950/40', border: 'border-amber-400', text: 'text-amber-400', stroke: '#f59e0b', fill: 'rgba(245, 158, 11, 0.15)' };
      case 'Available':
        return { bg: 'bg-surface-container-high', border: 'border-secondary/60', text: 'text-secondary', stroke: '#4cd7f6', fill: 'rgba(38, 42, 53, 0.8)' };
      case 'Needs Review':
        return { bg: 'bg-rose-950/40', border: 'border-rose-400', text: 'text-rose-400', stroke: '#f43f5e', fill: 'rgba(244, 63, 94, 0.15)' };
      case 'Locked':
      default:
        return { bg: 'bg-surface-container-low', border: 'border-outline-variant/40', text: 'text-outline', stroke: '#464555', fill: 'rgba(23, 27, 38, 0.8)' };
    }
  };

  // Simple layered DAG node coordinates calculation
  // Group by depth/dependencies for clean SVG rendering
  const levels = [
    { levelName: "Foundation", nodeIds: ["s1", "s2"] },
    { levelName: "Core Concepts", nodeIds: ["s3", "s4"] },
    { levelName: "Core ML & Architectures", nodeIds: ["s5", "s6"] },
    { levelName: "Specialization & Deployment", nodeIds: ["s7", "s8"] }
  ];

  // Map coordinates
  const nodeCoords = {
    s1: { x: 120, y: 100 },
    s2: { x: 120, y: 260 },
    s3: { x: 360, y: 100 },
    s4: { x: 360, y: 260 },
    s5: { x: 600, y: 180 },
    s6: { x: 800, y: 180 },
    s7: { x: 1020, y: 100 },
    s8: { x: 1020, y: 260 }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 flex flex-col gap-6">
      {/* Header Controls & Toggle */}
      <div className="w-full rounded-2xl bg-surface-container border border-outline-variant/60 p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-on-surface font-headline-md">Skill & Course Completion Graph (C18)</h2>
            <span className="text-[10px] font-bold text-tertiary bg-tertiary-container/30 border border-tertiary/40 px-2.5 py-0.5 rounded-full uppercase">
              FR9: DAG VALIDATED ACYCLIC
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1">
            Pure function view over your mastery state. Only <strong>Verified</strong> completions unlock downstream prerequisite skills.
          </p>
        </div>

        {/* View Switcher: Skills vs Courses */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/50">
            <button
              onClick={() => setGraphViewMode('skills')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                graphViewMode === 'skills'
                  ? 'bg-primary text-on-primary font-bold shadow'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Skills DAG
            </button>
            <button
              onClick={() => setGraphViewMode('courses')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                graphViewMode === 'courses'
                  ? 'bg-primary text-on-primary font-bold shadow'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Course Prerequisites
            </button>
          </div>
        </div>
      </div>

      {/* Legend Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-surface-container-high border border-outline-variant/40 text-xs">
        <span className="font-bold text-outline uppercase tracking-wider text-[11px]">Node Status Legend:</span>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-tertiary border border-tertiary" />
            <span className="text-on-surface font-medium">Verified (Passed)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-secondary border border-secondary" />
            <span className="text-on-surface font-medium">Completed (Self)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-400 border border-amber-400" />
            <span className="text-on-surface font-medium">In Progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-surface-container-highest border border-secondary" />
            <span className="text-on-surface font-medium">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-surface-container-low border border-outline" />
            <span className="text-on-surface-variant font-medium">Locked</span>
          </div>
        </div>
      </div>

      {/* Main 2-Pane Desktop Layout (PRD Section 11A Layout Requirement) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2-Cols: Interactive SVG DAG Canvas */}
        <div className="lg:col-span-2 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 p-4 shadow-xl overflow-x-auto relative min-h-[480px]">
          <div className="absolute top-3 left-4 text-[11px] text-outline font-mono">
            Interactive Node Canvas — Click any node to inspect details
          </div>

          <svg className="w-full min-w-[720px] h-[440px]" viewBox="0 0 1180 360">
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#464555" />
              </marker>
              <marker id="arrowhead-active" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#4cd7f6" />
              </marker>
            </defs>

            {/* Draw Prerequisite Edge Lines */}
            {nodes.map((node) => {
              const startCoords = nodeCoords[node.id];
              if (!startCoords) return null;

              return node.deps.map((depId) => {
                const endCoords = nodeCoords[depId];
                if (!endCoords) return null;

                const isDepVerified = nodes.find(n => n.id === depId)?.status === 'Verified';

                return (
                  <g key={`${depId}-${node.id}`}>
                    <line
                      x1={endCoords.x + 80}
                      y1={endCoords.y}
                      x2={startCoords.x - 80}
                      y2={startCoords.y}
                      stroke={isDepVerified ? '#4edea3' : '#464555'}
                      strokeWidth={isDepVerified ? 2.5 : 1.5}
                      strokeDasharray={isDepVerified ? 'none' : '4 4'}
                      markerEnd={isDepVerified ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
                    />
                  </g>
                );
              });
            })}

            {/* Draw Skill Nodes */}
            {nodes.map((node) => {
              const coords = nodeCoords[node.id];
              if (!coords) return null;

              const style = getStatusColor(node.status);
              const isSelected = selectedNodeId === node.id;

              return (
                <g 
                  key={node.id} 
                  transform={`translate(${coords.x}, ${coords.y})`}
                  onClick={() => setSelectedNodeId(node.id)}
                  className="cursor-pointer group"
                >
                  {/* Selection Ring */}
                  {isSelected && (
                    <rect
                      x="-88"
                      y="-38"
                      width="176"
                      height="76"
                      rx="14"
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="3"
                      className="animate-pulse"
                    />
                  )}

                  {/* Node Rect */}
                  <rect
                    x="-82"
                    y="-32"
                    width="164"
                    height="64"
                    rx="12"
                    fill={style.fill}
                    stroke={style.stroke}
                    strokeWidth={isSelected ? "2.5" : "1.5"}
                    className="transition-all group-hover:stroke-primary"
                  />

                  {/* Icon & Label */}
                  <text
                    x="0"
                    y="-8"
                    textAnchor="middle"
                    fill="#dfe2f1"
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="Inter, sans-serif"
                  >
                    {node.label.length > 20 ? node.label.substring(0, 18) + '...' : node.label}
                  </text>

                  {/* Status pill inside node */}
                  <rect
                    x="-45"
                    y="8"
                    width="90"
                    height="18"
                    rx="9"
                    fill={style.stroke}
                    opacity="0.9"
                  />
                  <text
                    x="0"
                    y="21"
                    textAnchor="middle"
                    fill="#0f131d"
                    fontSize="9"
                    fontWeight="bold"
                    fontFamily="Inter, sans-serif"
                  >
                    {node.status.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right Col: Interactive Node Inspection Detail Panel (PRD Requirement) */}
        <div className="flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/60 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/40">
              <span className="text-xs font-bold text-outline uppercase tracking-wider">Node Details</span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${getStatusColor(selectedNode.status).bg} ${getStatusColor(selectedNode.status).text} border ${getStatusColor(selectedNode.status).border}`}>
                {selectedNode.status}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-on-surface font-headline-md">{selectedNode.label}</h3>
              <div className="flex items-center gap-2 text-xs text-on-surface-variant mt-1">
                <span>Category: {selectedNode.category}</span>
                <span>•</span>
                <span>Level: {selectedNode.level}</span>
              </div>
            </div>

            {/* Current Verified Mastery Gauge */}
            <div className="p-3.5 rounded-xl bg-surface-container-high border border-outline-variant/40 flex flex-col gap-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-on-surface-variant">Verified Mastery Vector</span>
                <span className="font-mono text-tertiary font-bold">{selectedNode.mastery}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-surface-container-lowest overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-secondary to-tertiary transition-all duration-500 rounded-full"
                  style={{ width: `${selectedNode.mastery}%` }}
                />
              </div>
            </div>

            {/* Prerequisite Dependencies */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-outline uppercase tracking-wider">Prerequisite Requirements:</span>
              {selectedNode.deps.length === 0 ? (
                <span className="text-xs text-tertiary font-medium">Zero prerequisites (Root Foundational Skill)</span>
              ) : (
                <div className="flex flex-col gap-1.5">
                  {selectedNode.deps.map((depId) => {
                    const depNode = nodes.find(n => n.id === depId);
                    const isVerified = depNode?.status === 'Verified';

                    return (
                      <div key={depId} className="p-2.5 rounded-lg bg-surface-container-high border border-outline-variant/40 flex items-center justify-between text-xs">
                        <span className="text-on-surface font-medium">{depNode?.label}</span>
                        {isVerified ? (
                          <span className="text-tertiary font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Verified
                          </span>
                        ) : (
                          <span className="text-amber-400 font-medium flex items-center gap-1">
                            <Lock className="w-3.5 h-3.5" /> Unverified (Blocks Unlock)
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Unlock Rule Warning FR10 */}
            <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-xs flex flex-col gap-1">
              <div className="flex items-center gap-1.5 font-bold text-secondary">
                <Info className="w-4 h-4" /> FR10 Prerequisite Unlock Rule:
              </div>
              <p className="text-[11px] text-on-surface-variant">
                Only a <strong>Verified</strong> completion (quiz or rubric passed) unlocks dependent downstream nodes in Apogee.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => onSelectNodeForProof(selectedNode)}
                className="w-full py-3 px-4 rounded-xl bg-primary-container text-white font-bold text-xs flex items-center justify-center gap-2 shadow hover:bg-indigo-600 transition-colors"
              >
                <Award className="w-4 h-4" />
                <span>Verify Mastery via Proof / Quiz</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
