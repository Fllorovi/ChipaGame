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

export default function IslandStage({
  zones,
  unlockedZones,
  completedZones,
  failedZones,
  disabled,
  onZoneClick,
}: Props) {
  return (
    <div className="island-stage">
      <svg className="island-art" viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#527c43" />
            <stop offset="48%" stopColor="#315b38" />
            <stop offset="100%" stopColor="#173b32" />
          </linearGradient>
          <linearGradient id="sand" x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#e8d3a0" />
            <stop offset="100%" stopColor="#b89a69" />
          </linearGradient>
          <linearGradient id="cliff" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#596b61" />
            <stop offset="100%" stopColor="#263c39" />
          </linearGradient>
          <radialGradient id="jungle">
            <stop offset="0%" stopColor="#6c914b" />
            <stop offset="100%" stopColor="#244a32" />
          </radialGradient>
          <filter id="islandShadow">
            <feDropShadow dx="0" dy="15" stdDeviation="10" floodColor="#000" floodOpacity="0.5" />
          </filter>
        </defs>

        <path d="M160 220 L260 115 L470 90 L610 120 L780 80 L1010 180 L1100 360 L1050 560 L900 680 L660 710 L430 670 L220 620 L100 440 Z" fill="#001629" opacity=".65" filter="url(#islandShadow)" transform="translate(0 22)" />
        <path d="M165 235 L230 150 L350 115 L455 135 L530 90 L665 105 L745 75 L865 125 L1000 145 L1080 245 L1060 340 L1110 420 L1050 535 L980 600 L875 625 L790 690 L660 670 L565 705 L435 650 L320 665 L220 600 L125 515 L95 405 L135 315 Z" fill="url(#land)" stroke="#b4a77d" strokeWidth="8" strokeLinejoin="round" />
        <path d="M165 235 L230 150 L350 115 L455 135 L530 90 L665 105 L745 75 L865 125 L1000 145 L1080 245 L1060 340 L1020 325 L1010 245 L930 190 L810 165 L700 145 L570 155 L455 190 L340 165 L240 215 Z" fill="url(#sand)" opacity=".95" />
        <path d="M125 515 L220 600 L320 665 L435 650 L565 705 L660 670 L790 690 L875 625 L980 600 L1050 535 L1020 480 L950 550 L840 585 L700 625 L565 650 L440 605 L320 615 L220 550 Z" fill="url(#sand)" opacity=".9" />
        <path d="M200 270 L320 205 L430 215 L480 275 L405 315 L280 330 Z" fill="url(#cliff)" opacity=".8" />
        <path d="M750 185 L870 165 L980 230 L1020 330 L930 370 L820 325 Z" fill="url(#cliff)" opacity=".8" />
        <path d="M270 270 Q370 175 480 250 Q570 190 650 250 Q760 160 850 250 Q960 260 970 370 Q900 465 790 440 Q700 510 600 450 Q500 510 400 440 Q290 470 230 370 Z" fill="url(#jungle)" />

        <path d="M570 280 Q640 235 710 275 Q770 320 725 375 Q670 415 600 375 Q540 335 570 280 Z" fill="#087b83" stroke="#6bc5b6" strokeWidth="6" />
        <path d="M250 430 Q350 350 420 390 Q490 430 550 390 Q640 350 680 400 Q760 470 840 405 Q900 365 950 430" fill="none" stroke="#c9b487" strokeWidth="14" strokeLinecap="round" />
        <path d="M250 430 Q350 350 420 390 Q490 430 550 390 Q640 350 680 400 Q760 470 840 405 Q900 365 950 430" fill="none" stroke="#e4d0a5" strokeWidth="6" strokeLinecap="round" />

        <g fill="#243c45" stroke="#8ba5a0" strokeWidth="4">
          <circle cx="455" cy="250" r="40" />
          <circle cx="610" cy="440" r="45" />
          <circle cx="830" cy="245" r="38" />
          <circle cx="950" cy="450" r="42" />
          <circle cx="265" cy="450" r="35" />
        </g>
        <g fill="#168fff" opacity=".9">
          <circle cx="455" cy="250" r="10" />
          <circle cx="610" cy="440" r="12" />
          <circle cx="830" cy="245" r="9" />
          <circle cx="950" cy="450" r="11" />
          <circle cx="265" cy="450" r="8" />
        </g>

        {[
          [300, 260], [350, 310], [390, 230], [510, 300], [750, 220],
          [900, 290], [960, 350], [390, 510], [720, 530], [850, 540],
          [540, 570], [180, 390], [1030, 390], [650, 190], [320, 550],
        ].map(([x, y], index) => (
          <g key={index} transform={`translate(${x} ${y})`}>
            <polygon points="0,-25 20,10 -20,10" fill="#173d2d" />
            <polygon points="0,-15 22,15 -22,15" fill="#234f25" />
            <rect x="-4" y="10" width="8" height="12" fill="#4a3520" />
          </g>
        ))}
      </svg>

      <svg className="island-route" viewBox="0 0 1000 620" preserveAspectRatio="none">
        <path d="M220 350 Q300 180 380 185 Q465 250 540 350 Q620 470 690 155 Q760 200 810 340" fill="none" stroke="#66caff" strokeWidth="3" strokeDasharray="8 12" strokeLinecap="round" opacity=".8" />
      </svg>

      {zones.map((zone, index) => {
        const isLocked = !unlockedZones.includes(index);
        const isCompleted = completedZones.includes(index);
        const isFailed = failedZones.includes(index);

        return (
          <button
            key={zone.id}
            type="button"
            title={isLocked ? "Зона заблокирована" : isCompleted ? "Зона пройдена" : isFailed ? "Зона провалена" : zone.name}
            onClick={() => onZoneClick(index)}
            disabled={disabled || isLocked || isCompleted || isFailed}
            className={`zone-marker ${isLocked ? "zone-marker-locked" : ""} ${isCompleted ? "zone-marker-completed" : ""} ${isFailed ? "zone-marker-failed" : ""}`}
            style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
          >
            {isLocked ? (
              <span className="zone-marker-lock">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              </span>
            ) : isCompleted ? (
              <span className="zone-marker-completed-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M20 6 9 17l-5-5" /></svg>
              </span>
            ) : isFailed ? (
              <span className="zone-marker-failed-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </span>
            ) : (
              <span className="zone-marker-ring">
                <span className="zone-marker-core" />
              </span>
            )}
            <span className="zone-marker-label">{zone.name}</span>
          </button>
        );
      })}
    </div>
  );
}