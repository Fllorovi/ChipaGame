"use client";

import { ROUND_SECONDS } from "../constants";

export default function Timer({ secondsLeft }: { secondsLeft: number }) {
  const timeUp = secondsLeft === 0;
  const hh = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const mm = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const low = secondsLeft < 5 * 60;
  const pct = (secondsLeft / ROUND_SECONDS) * 100;

  return (
    <div className="absolute top-4 left-8 z-[60] flex flex-col gap-1 rounded-xl border-2 border-[#55A4FE]/40 bg-[#03172c]/90 px-4 py-2.5 shadow-[0_0_20px_rgba(0,0,0,0.7)] backdrop-blur-md">
      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#69caff]/70">
        До конца раунда
      </span>
      <span
        className={`font-mono text-2xl font-black leading-none tabular-nums ${
          timeUp ? "text-red-400" : low ? "text-amber-300" : "text-white"
        }`}
      >
        {hh}:{mm}:{ss}
      </span>
      <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            timeUp ? "bg-red-500" : low ? "bg-amber-400" : "bg-[#55A4FE]"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {timeUp && (
        <span className="text-[9px] font-bold tracking-widest text-red-400">ВРЕМЯ ВЫШЛО</span>
      )}
    </div>
  );
}