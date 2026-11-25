"use client";

import type { Zone } from "../zones";

type Props = {
  zones: Zone[];
  unlockedZones: number[];
  completedZones: number[];
  failedZones: number[];
  disabled: boolean;
  onZoneClick: (index: number) => void;
};

export default function MechanismStage({
  zones, unlockedZones, completedZones, failedZones, disabled, onZoneClick,
}: Props) {
  return (
    <div className="mechanism-stage">
      <svg className="mech-art" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <radialGradient id="coreGlow">
            <stop offset="0%" stopColor="#69caff" stopOpacity="1" />
            <stop offset="100%" stopColor="#69caff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Фоновые трубы и каркас */}
        <path d="M 0 300 L 200 300 L 250 150 L 400 150 L 450 400 L 600 400 L 650 200 L 800 200 L 850 500 L 1000 500" fill="none" stroke="#2a2a2a" strokeWidth="40" strokeLinejoin="round" />
        <path d="M 0 300 L 200 300 L 250 150 L 400 150 L 450 400 L 600 400 L 650 200 L 800 200 L 850 500 L 1000 500" fill="none" stroke="#555" strokeWidth="20" strokeLinejoin="round" />
        
        {/* Энергетический путь (маршрут) */}
        <path d="M 200 300 L 250 150 L 400 150 L 450 400 L 600 400 L 650 200 L 800 200 L 850 500" fill="none" stroke="#d4af37" strokeWidth="4" strokeDasharray="10 10" filter="url(#glow)" opacity="0.6" />

        {/* Шестерёнки (декор) */}
        <g transform="translate(300, 450)" opacity="0.4">
          <circle r="60" fill="none" stroke="#444" strokeWidth="15" strokeDasharray="20 10" style={{ transformOrigin: "300px 450px" }} className="animate-[spin_20s_linear_infinite]" />
          <circle r="20" fill="#222" />
        </g>
        <g transform="translate(700, 100)" opacity="0.4">
          <circle r="80" fill="none" stroke="#444" strokeWidth="20" strokeDasharray="30 15" style={{ transformOrigin: "700px 100px" }} className="animate-[spin_30s_linear_infinite_reverse]" />
          <circle r="30" fill="#222" />
        </g>
        
        {/* Ядро (в конце) */}
        <circle cx="850" cy="500" r="50" fill="url(#coreGlow)" className="animate-pulse" />
      </svg>

      {zones.map((zone, index) => {
        const isLocked = !unlockedZones.includes(index);
        const isCompleted = completedZones.includes(index);
        const isFailed = failedZones.includes(index);

        return (
          <button
            key={zone.id}
            onClick={() => onZoneClick(index)}
            disabled={disabled || isLocked || isCompleted || isFailed}
            className={`mech-marker ${isLocked ? "locked" : ""} ${isCompleted ? "completed" : ""} ${isFailed ? "failed" : ""}`}
            style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
          >
            <span className="mech-marker-inner">
              {isLocked ? "🔒" : isCompleted ? "✔" : isFailed ? "✖" : ""}
            </span>
            <span className="mech-marker-label">{zone.name}</span>
          </button>
        );
      })}
    </div>
  );
}