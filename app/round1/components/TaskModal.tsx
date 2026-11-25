"use client";

import type { ZoneTask } from "../zones";

type Props = {
  task: ZoneTask;
  selectedAnswer: string | null;
  answerStatus: "idle" | "wrong" | "correct";
  isSubmitting: boolean;
  apiError: string | null;
  onSelect: (optionId: string) => void;
  onCheck: () => void;
  onProceed: () => void;
};

export default function TaskModal({
  task,
  selectedAnswer,
  answerStatus,
  isSubmitting,
  apiError,
  onSelect,
  onCheck,
  onProceed,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg rounded-2xl border border-[#55A4FE]/30 bg-[#03172c] p-6 text-white shadow-2xl shadow-[#55A4FE]/10">
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#69caff]">
              Испытание стража
            </p>
            <h3 className="mt-1 text-xl font-black">{task.title}</h3>
          </div>
        </div>

        <div className="space-y-4 text-sm text-white/70">
          <div className="rounded-xl border border-[#55A4FE]/30 bg-[#55A4FE]/10 p-4">
            <p className="text-base leading-relaxed text-white/90">{task.question}</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {task.options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrect = answerStatus === "correct" && isSelected;
              const isWrong = answerStatus === "wrong" && isSelected;

              return (
                <button
                  key={option.id}
                  onClick={() => onSelect(option.id)}
                  disabled={answerStatus !== "idle" || isSubmitting}
                  className={`relative flex items-center gap-3 rounded-xl border-2 p-4 text-left text-sm font-semibold transition-all ${
                    isCorrect
                      ? "border-green-500 bg-green-500/20 text-green-300"
                      : isWrong
                        ? "border-red-500 bg-red-500/20 text-red-300"
                        : isSelected
                          ? "border-[#55A4FE] bg-[#55A4FE]/20 text-white scale-[1.02]"
                          : "border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10 disabled:opacity-50"
                  }`}
                >
                  {option.label}
                  {isSelected && answerStatus === "idle" && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#55A4FE]">●</span>
                  )}
                  {isCorrect && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400">✔</span>}
                  {isWrong && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400">✖</span>}
                </button>
              );
            })}
          </div>

          {apiError && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-center">
              <p className="text-sm text-red-300">{apiError}</p>
            </div>
          )}

          {answerStatus === "wrong" && (
            <div className="text-center p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-bold text-red-400">Неверно! Остров уходит под воду.</p>
            </div>
          )}

          {answerStatus === "correct" && (
            <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-bold text-green-400">Верно! Руна ваша. Вода отступает.</p>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            {answerStatus === "correct" || answerStatus === "wrong" ? (
              <button
                onClick={onProceed}
                className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-lg transition-all hover:brightness-110 ${
                  answerStatus === "correct"
                    ? "bg-gradient-to-r from-green-600 to-green-700 shadow-green-500/20"
                    : "bg-gradient-to-r from-red-600 to-red-700 shadow-red-500/20"
                }`}
              >
                Продолжить →
              </button>
            ) : (
              <button
                onClick={onCheck}
                disabled={!selectedAnswer || isSubmitting}
                className="flex-1 rounded-xl bg-gradient-to-r from-[#0876c7] to-[#07549a] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Сохранение..." : "Ответить"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}