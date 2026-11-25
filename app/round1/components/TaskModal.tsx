"use client";

import { useState } from "react";
import type { ZoneTask } from "../tasks";

type Props = {
  task: ZoneTask;
  isSubmitting: boolean;
  apiError: string | null;
  onCheck: (answers: Record<string, string>) => void;
  onProceed: () => void;
  answerStatus: "idle" | "wrong" | "correct";
};

export default function TaskModal({
  task,
  isSubmitting,
  apiError,
  onCheck,
  onProceed,
  answerStatus,
}: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleInputChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const allFilled = task.inputs.every((input) => (answers[input.id] || "").trim().length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-[#55A4FE]/30 bg-[#03172c] p-6 text-white shadow-2xl shadow-[#55A4FE]/10 max-h-[90vh] flex flex-col">
        
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3 shrink-0">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#69caff]">
              Испытание стража
            </p>
            <h3 className="mt-1 text-xl font-black">{task.title}</h3>
          </div>
        </div>

        <div className="space-y-4 text-sm overflow-y-auto pr-2 custom-scrollbar">
          
          <div className="rounded-xl border border-[#55A4FE]/30 bg-[#55A4FE]/10 p-4">
            {task.description}
          </div>

          <div className="space-y-3">
            {task.inputs.map((input) => (
              <div key={input.id} className="flex flex-col">
                <label className="text-xs font-bold text-[#69caff] uppercase mb-1">
                  Пункт {input.id}
                </label>
                <input
                  type="text"
                  value={answers[input.id] || ""}
                  onChange={(e) => handleInputChange(input.id, e.target.value)}
                  disabled={answerStatus !== "idle" || isSubmitting}
                  placeholder={input.placeholder}
                  className="rounded-xl border-2 border-white/10 bg-[#0a1628] p-3 text-sm font-semibold text-white placeholder-white/20 outline-none transition-colors focus:border-[#55A4FE] disabled:opacity-50"
                />
              </div>
            ))}
          </div>

          {apiError && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-center">
              <p className="text-sm text-red-300">{apiError}</p>
            </div>
          )}

          {answerStatus === "wrong" && (
            <div className="text-center p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-bold text-red-400">Есть ошибки. Остров уходит под воду.</p>
            </div>
          )}

          {answerStatus === "correct" && (
            <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-bold text-green-400">Верно! Руна ваша. Вода отступает.</p>
            </div>
          )}

        </div>

        <div className="mt-6 flex gap-3 shrink-0">
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
              onClick={() => onCheck(answers)}
              disabled={isSubmitting || !allFilled}
              className="flex-1 rounded-xl bg-gradient-to-r from-[#0876c7] to-[#07549a] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Проверка..." : "Сдать ответы"}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}