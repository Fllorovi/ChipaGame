
"use client";

import { useEffect } from "react";
import type { Zone } from "../zones";

type Props = {
  zones: Zone[];
  unlockedZones: number[];
  completedZones: number[];
  failedZones: number[];
  disabled: boolean;
  onZoneClick: (index: number) => void;
};

const TASK_LAYERS = [1, 2, 3, 4, 5];

export default function MechanismStage({
  zones,
  unlockedZones,
  completedZones,
  failedZones,
  disabled,
  onZoneClick,
}: Props) {
  useEffect(() => {
    TASK_LAYERS.forEach((n) => {
      [0, 1].forEach((s) => {
        const img = new Image();
        img.src = `/round2/${n}_${s}.png`;
      });
    });
  }, []);

  // Текущий узел — первое открытое, но ещё не пройденное задание
  const currentIndex = zones.findIndex(
    (_, index) =>
      unlockedZones.includes(index) &&
      !completedZones.includes(index) &&
      !failedZones.includes(index)
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <img
        src="/round2/0.png"
        alt="Установка"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {TASK_LAYERS.map((n) => {
        const isCompleted = completedZones.includes(n - 1);

        return (
          <img
            key={`${n}-${isCompleted ? 1 : 0}`}
            src={`/round2/${n}_${isCompleted ? 1 : 0}.png`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 pointer-events-none"
            draggable={false}
          />
        );
      })}

      <div className="absolute inset-0 pointer-events-none">
        {zones.map((zone, index) => {
          const isLocked = !unlockedZones.includes(index);
          const isCompleted = completedZones.includes(index);
          const isFailed = failedZones.includes(index);
          const isCurrent = index === currentIndex;
          const isActive = !isLocked && !isCompleted && !isFailed;

          const palette = isCompleted
            ? {
                top: "#a6ffc1",
                left: "#16864c",
                right: "#07552f",
                edge: "#8affad",
                glow: "rgba(45,255,130,0.65)",
                core: "#62ff9c",
                text: "#d8ffe5",
              }
            : isFailed
            ? {
                top: "#ffaaaa",
                left: "#a92e38",
                right: "#671b29",
                edge: "#ff7777",
                glow: "rgba(255,45,65,0.65)",
                core: "#ff5555",
                text: "#ffe0e0",
              }
            : isLocked
            ? {
                top: "#77808e",
                left: "#343c49",
                right: "#202733",
                edge: "#697486",
                glow: "rgba(100,120,150,0.18)",
                core: "#667080",
                text: "#aeb7c5",
              }
            : {
                top: "#ffe9a8",
                left: "#c18a26",
                right: "#75420d",
                edge: "#ffdc75",
                glow: "rgba(255,181,48,0.85)",
                core: "#fff2a6",
                text: "#fff5d6",
              };

          return (
            <button
              key={zone.id}
              type="button"
              title={
                isLocked
                  ? "Зона заблокирована"
                  : isCompleted
                  ? "Зона пройдена"
                  : isFailed
                  ? "Зона провалена"
                  : zone.name
              }
              onClick={() => onZoneClick(index)}
              disabled={disabled || isLocked || isCompleted || isFailed}
              className={`absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-all duration-300 ${
                isActive
                  ? "cursor-pointer hover:scale-110 active:scale-95"
                  : "cursor-default"
              } ${isCurrent ? "z-20" : "z-10"}`}
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                filter: `drop-shadow(0 0 ${isCurrent ? 16 : 8}px ${palette.glow})`,
              }}
            >
              {/* Указатель текущего задания */}
              {isCurrent && (
                <div className="mb-2 flex flex-col items-center animate-[pulse_1.8s_ease-in-out_infinite]">
                  <span className="rounded-full border border-amber-300 bg-black/90 px-3 py-1 text-[10px] font-black tracking-[0.18em] text-amber-200 shadow-[0_0_18px_rgba(255,190,60,0.65)]">
                    ВЫ ЗДЕСЬ
                  </span>
                  <span className="h-3 w-[2px] bg-amber-300 shadow-[0_0_8px_#ffd36a]" />
                </div>
              )}

              {/* Световое кольцо */}
              {isCurrent && (
                <div className="absolute top-1/2 left-1/2 h-[78px] w-[78px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-300/70 animate-ping opacity-30" />
              )}

              {/* Технологический куб */}
              <svg
                width={isCurrent ? "78" : "66"}
                height={isCurrent ? "78" : "66"}
                viewBox="0 0 120 120"
                className="overflow-visible"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id={`top-${index}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={palette.top} />
                    <stop offset="100%" stopColor={palette.left} />
                  </linearGradient>
                  <linearGradient id={`left-${index}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={palette.left} />
                    <stop offset="100%" stopColor="#171c25" />
                  </linearGradient>
                  <linearGradient id={`right-${index}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={palette.right} />
                    <stop offset="100%" stopColor="#10151d" />
                  </linearGradient>
                  <radialGradient id={`core-${index}`}>
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="35%" stopColor={palette.core} />
                    <stop offset="100%" stopColor={palette.right} />
                  </radialGradient>
                </defs>

                

                {/* Верхняя грань */}
                <polygon
                  points="60,12 108,37 60,62 12,37"
                  fill={`url(#top-${index})`}
                  stroke={palette.edge}
                  strokeWidth="2"
                />

                {/* Левая грань */}
                <polygon
                  points="12,37 60,62 60,108 12,82"
                  fill={`url(#left-${index})`}
                  stroke={palette.edge}
                  strokeWidth="2"
                />

                {/* Правая грань */}
                <polygon
                  points="60,62 108,37 108,82 60,108"
                  fill={`url(#right-${index})`}
                  stroke={palette.edge}
                  strokeWidth="2"
                />

                {/* Панели на гранях */}
                <path d="M20 43 L52 60 L52 96 L20 79 Z"
                  fill="none" stroke="#ffffff" strokeOpacity=".22" strokeWidth="1.5" />
                <path d="M68 60 L100 43 L100 79 L68 96 Z"
                  fill="none" stroke="#ffffff" strokeOpacity=".18" strokeWidth="1.5" />

                {/* Технические прорези */}
                <path d="M27 51 L43 59 M27 57 L43 65 M27 63 L43 71"
                  stroke={palette.edge} strokeWidth="2" opacity=".75" />
                <path d="M77 58 L94 49 M77 65 L94 56 M77 72 L94 63"
                  stroke={palette.edge} strokeWidth="2" opacity=".65" />

                {/* Центральная панель */}
                <polygon
                  points="60,23 78,33 60,43 42,33"
                  fill="#111722"
                  stroke={palette.edge}
                  strokeWidth="1.5"
                />

                {/* Светящееся ядро */}
                <circle cx="60" cy="33" r="10" fill={palette.core} opacity=".2" />
                <circle cx="60" cy="33" r="6.5" fill={`url(#core-${index})`}
                  stroke="#fff5ce" strokeWidth="1.2" />

                {/* Болты */}
                {[
                  [19, 40], [101, 40], [19, 78], [101, 78],
                  [60, 67], [60, 101],
                ].map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r="3" fill="#242a32" stroke={palette.edge} strokeWidth="1" />
                    <path d={`M${x - 1.5} ${y} h3`} stroke="#fff" strokeWidth=".8" />
                  </g>
                ))}

                {/* Номер / состояние */}
                <text
                  x="60"
                  y="37"
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="900"
                  fill="#17202a"
                >
                  {isLocked ? "L" : isCompleted ? "✓" : isFailed ? "×" : index + 1}
                </text>

                {/* Контурный блик */}
                <path
                  d="M16 37 L60 60 L104 37"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  opacity=".45"
                />
              </svg>

              {/* Подпись */}
              <span
                className={`mt-1 whitespace-nowrap rounded-md border px-2 py-1 text-[9px] font-bold uppercase tracking-wide backdrop-blur-md ${
                  isCompleted
                    ? "border-green-400/60 bg-green-950/90 text-green-200"
                    : isFailed
                    ? "border-red-400/60 bg-red-950/90 text-red-200"
                    : isLocked
                    ? "border-gray-500/50 bg-black/85 text-gray-400"
                    : isCurrent
                    ? "border-amber-300 bg-amber-950/95 text-amber-100 shadow-[0_0_12px_rgba(255,190,60,0.4)]"
                    : "border-amber-400/50 bg-black/90 text-amber-200"
                }`}
              >
                {zone.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
