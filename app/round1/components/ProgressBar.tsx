"use client";

export default function ProgressBar({ completed, total }: { completed: number; total: number }) {
  const progressPercent = Math.round((completed / total) * 100);

  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
      <div className="relative h-8 w-[400px] overflow-hidden rounded-full border-2 border-white/20 bg-black/60 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#55A4FE] to-[#39E875] transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-black tracking-widest text-white drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
            ПРОГРЕСС: {completed} / {total}
          </span>
        </div>
      </div>
    </div>
  );
}