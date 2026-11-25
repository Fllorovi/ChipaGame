"use client";

export default function ProgressBar({ completed, total }: { completed: number; total: number }) {
  const progressPercent = Math.round((completed / total) * 100);

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
      <div className="relative h-9 w-[420px] overflow-hidden rounded-full border-2 border-[#55A4FE]/60 bg-[#03172c]/95 shadow-[0_0_0_1px_rgba(0,0,0,0.5),0_0_25px_rgba(85,164,254,0.35),0_8px_24px_rgba(0,0,0,0.6)] backdrop-blur-md">
        {/* заполнение — насыщенный градиент с «искрой» сверху */}
        <div
          className="h-full rounded-full bg-gradient-to-b from-[#7ec8ff] via-[#55A4FE] to-[#2b6cb0] transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
        {/* блик сверху для объёма */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 h-[40%] rounded-full bg-gradient-to-b from-white/35 to-transparent"
          style={{ width: `${progressPercent}%` }}
        />
        {/* тонкая внутренняя обводка поверх заполнения */}
        <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
        {/* текст */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[13px] font-black tracking-[0.18em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            ПРОГРЕСС: {completed} / {total}
          </span>
        </div>
      </div>
    </div>
  );
}