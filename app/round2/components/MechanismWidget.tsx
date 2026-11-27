
"use client";

import { useEffect, useState } from "react";
import { getMechanismState } from "../constants";

export default function MechanismWidget({
  waterLevel,
}: {
  waterLevel: number;
}) {
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
    <div className="absolute bottom-4 left-4 z-40">
      <div
        className={`relative h-[170px] w-[235px] overflow-hidden rounded-xl border border-[#b99445]/70 bg-[#101211] shadow-[0_8px_35px_rgba(0,0,0,0.85),inset_0_0_18px_rgba(212,175,55,0.08)] ${
          reacting ? "animate-[shake_0.5s_ease-in-out]" : ""
        }`}
        style={{
          transform: `translateX(${s.shakeIntensity * 2}px)`,
        }}
      >
        <svg
          viewBox="0 0 400 300"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="metalBg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#30332f" />
              <stop offset="50%" stopColor="#171a18" />
              <stop offset="100%" stopColor="#080909" />
            </linearGradient>

            <radialGradient id="coreBg">
              <stop offset="0%" stopColor="#d4af37" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="400" height="300" fill="url(#metalBg)" />

          {/* Декоративные металлические линии */}
          <path
            d="M0 42 H400 M0 258 H400"
            stroke="#b99445"
            strokeOpacity="0.25"
            strokeWidth="2"
          />

          {/* Датчик */}
          <g transform="translate(200, 145)">
            <rect
              x="-100"
              y="-80"
              width="200"
              height="160"
              rx="12"
              fill="#090b0a"
              stroke="#80652d"
              strokeWidth="4"
            />

            <path
              d="M -70 40 A 80 80 0 0 1 70 40"
              fill="none"
              stroke="#333a35"
              strokeWidth="15"
            />

            <path
              d="M -70 40 A 80 80 0 0 1 70 40"
              fill="none"
              stroke={s.toneColor}
              strokeWidth="15"
              strokeDasharray="120 200"
            />

            {Array.from({ length: 9 }).map((_, i) => {
              const angle = -80 + i * 20;
              const rad = (angle * Math.PI) / 180;

              return (
                <line
                  key={i}
                  x1={Math.sin(rad) * 75}
                  y1={40 - Math.cos(rad) * 75}
                  x2={Math.sin(rad) * 85}
                  y2={40 - Math.cos(rad) * 85}
                  stroke="#9b9b8c"
                  strokeWidth="3"
                />
              );
            })}

            <g
              transform={`rotate(${s.needleAngle})`}
              style={{
                transformOrigin: "0px 0px",
                transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <polygon points="-4,10 4,10 0,-70" fill="#ff5555" />
            </g>

            <circle cx="0" cy="0" r="10" fill="#242824" stroke="#b99445" strokeWidth="2" />

            <circle
              cx="0"
              cy="60"
              r="30"
              fill="url(#coreBg)"
              className={s.tone === "critical" ? "animate-ping" : ""}
              opacity="0.5"
            />

            <text
              x="0"
              y="65"
              textAnchor="middle"
              fill={s.toneColor}
              fontSize="12"
              fontWeight="bold"
            >
              ЯДРО
            </text>
          </g>

          {/* Пар */}
          {s.steamIntensity > 0 && (
            <g opacity={s.steamIntensity * 0.6}>
              <circle
                cx="330"
                cy="50"
                r="20"
                fill="white"
                filter="blur(8px)"
                className="animate-[float_4s_infinite]"
              />
              <circle
                cx="350"
                cy="30"
                r="15"
                fill="white"
                filter="blur(6px)"
                className="animate-[float_3s_infinite_0.5s]"
              />
            </g>
          )}
        </svg>

        {/* Заголовок и состояние */}
        <div className="absolute left-2 top-2 z-30 rounded-lg border border-[#b99445]/40 bg-black/80 px-2.5 py-1.5 shadow-lg backdrop-blur-md">
          <div className="mb-1 text-[8px] font-bold tracking-[0.2em] text-[#d4af37]/80">
            МЕХАНИЗМ
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`h-2 w-2 rounded-full ${
                s.tone === "critical" ? "animate-pulse" : ""
              }`}
              style={{
                background: s.toneColor,
                boxShadow: `0 0 8px ${s.toneColor}`,
              }}
            />

            <span
              className="text-[10px] font-bold tracking-wider"
              style={{ color: s.toneColor }}
            >
              {s.label}
            </span>
          </div>

          <span className="mt-0.5 block text-[8px] text-white/50">
            {s.description}
          </span>
        </div>

        {/* Декоративные крепления */}
        <div className="absolute right-2 top-2 h-2 w-2 rounded-full border border-[#d4af37]/70 bg-[#6d5526]" />
        <div className="absolute bottom-2 left-2 h-2 w-2 rounded-full border border-[#d4af37]/70 bg-[#6d5526]" />
        <div className="absolute bottom-2 right-2 h-2 w-2 rounded-full border border-[#d4af37]/70 bg-[#6d5526]" />
      </div>
    </div>
  );
}
