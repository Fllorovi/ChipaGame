"use client";

import { useEffect, useState } from "react";
import { getMechanismState } from "../constants";

export default function MechanismWidget({ waterLevel }: { waterLevel: number }) {
  const s = getMechanismState(waterLevel);
  const [prevWaterLevel, setPrevWaterLevel] = useState(waterLevel);
  const [reacting, setReacting] = useState(false);

  useEffect(() => {
    if (waterLevel !== prevWaterLevel) {
      setReacting(true);
      const id = setTimeout(() => setReacting(false), 800);
      setPrevWaterLevel(waterLevel);
      return () => clearTimeout(id);
    }
  }, [waterLevel, prevWaterLevel]);

  return (
    <div className="absolute bottom-4 right-4 z-40 flex flex-col items-center gap-2">
      <div
        className={`relative h-[202px] w-[275px] overflow-hidden rounded-2xl border-2 border-[#d4af37]/40 shadow-[0_10px_40px_rgba(0,0,0,0.8)] bg-[#0f0f0f] ${
          reacting ? "animate-[shake_0.5s_ease-in-out]" : ""
        }`}
        style={{
           transform: `translateX(${s.shakeIntensity * 2}px)` // Легкая вибрация при высоком давлении
        }}
      >
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="metalBg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2a2a2a" />
              <stop offset="100%" stopColor="#050505" />
            </linearGradient>
            <radialGradient id="coreBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d4af37" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Фон */}
          <rect width="400" height="300" fill="url(#metalBg)" />

          {/* Панель датчика */}
          <g transform="translate(200, 140)">
            {/* Корпус */}
            <rect x="-100" y="-80" width="200" height="160" rx="10" fill="#111" stroke="#444" strokeWidth="4" />
            
            {/* Шкала */}
            <path d="M -70 40 A 80 80 0 0 1 70 40" fill="none" stroke="#333" strokeWidth="15" />
            <path d="M -70 40 A 80 80 0 0 1 70 40" fill="none" stroke={s.toneColor} strokeWidth="15" strokeDasharray="120 200" />
            
            {/* Деления */}
            {Array.from({ length: 9 }).map((_, i) => {
              const angle = -80 + (i * 20);
              const rad = (angle * Math.PI) / 180;
              const x1 = Math.sin(rad) * 75;
              const y1 = 40 - Math.cos(rad) * 75;
              const x2 = Math.sin(rad) * 85;
              const y2 = 40 - Math.cos(rad) * 85;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#666" strokeWidth="3" />;
            })}

            {/* Стрелка */}
            <g transform={`rotate(${s.needleAngle})`} style={{ transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)" }}>
              <polygon points="-4,10 4,10 0,-70" fill="#ff4c4c" />
              <circle cx="0" cy="0" r="10" fill="#222" stroke="#888" strokeWidth="2" />
            </g>

            {/* Ядро внизу */}
            <circle cx="0" cy="60" r="30" fill="url(#coreBg)" className={s.tone === "critical" ? "animate-ping" : ""} opacity="0.5" />
            <text x="0" y="65" textAnchor="middle" fill={s.toneColor} fontSize="12" fontWeight="bold" className="uppercase">
              ЯДРО
            </text>
          </g>

          {/* Пар */}
          {s.steamIntensity > 0 && (
            <g opacity={s.steamIntensity * 0.6}>
              <circle cx="330" cy="50" r="20" fill="white" filter="blur(8px)" className="animate-[float_4s_infinite]" />
              <circle cx="350" cy="30" r="15" fill="white" filter="blur(6px)" className="animate-[float_3s_infinite_0.5s]" />
            </g>
          )}
        </svg>

        {/* Индикатор */}
        <div
          className="absolute top-2 left-2 rounded-lg border px-2.5 py-1.5 backdrop-blur-md z-30 shadow-lg"
          style={{ background: "rgba(0,0,0,0.72)", borderColor: `${s.toneColor}55` }}
        >
          <div className="flex items-center gap-1.5">
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${s.tone === "critical" ? "animate-pulse" : ""}`} style={{ background: s.toneColor, boxShadow: `0 0 6px ${s.toneColor}` }} />
            <span className="text-[10px] font-bold tracking-wider" style={{ color: s.toneColor }}>{s.label}</span>
          </div>
          <span className="mt-0.5 block text-[8px] leading-tight text-white/50">{s.description}</span>
        </div>
      </div>
    </div>
  );
}